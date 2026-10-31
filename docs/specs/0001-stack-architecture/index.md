# 0001. Next.js on Vercel with Supabase as the application stack

**Date**: 2026-10-30
**Status**: In Progress

## Summary

The app is one TypeScript project: a Next.js app hosted on Vercel, with Supabase for the Postgres database and owner sign in, and Drizzle for database queries. Client websites are loaded through a viewer proxy (the server fetches the client's page and adds a small pin overlay) on a separate web address, so a client site's own scripts can never touch your session or the client's details. The comment form and the client's name and email live on the trusted share page around the site, not inside it. Everything is one codebase and one deploy, free to start, with clear paid upgrades (Vercel Pro, Supabase Pro) when real clients arrive.

## Decision

**Chosen option**: Option 1: One Next.js app on Vercel with Supabase and Drizzle

Build a single full stack Next.js 16 app (App Router, TypeScript, pnpm) deployed to Vercel, backed by Supabase Postgres and Supabase Auth, queried through Drizzle. Proxied client pages are served from a separate viewer origin, and a minimal vanilla TypeScript overlay (built by Vite) captures pins and talks to the trusted share page by `postMessage`.

**Implementation skills**: `supabase` (`supabase/agent-skills`, `.agents/skills/supabase/`) · `supabase-postgres-best-practices` (`supabase/agent-skills`, `.agents/skills/supabase-postgres-best-practices/`) · `shadcn` (`shadcn-ui/ui`, `.agents/skills/shadcn/`) · `vercel-react-best-practices` (`vercel-labs/agent-skills`, `.agents/skills/vercel-react-best-practices/`) · `playwright-cli` (`microsoft/playwright-cli`, `.agents/skills/playwright-cli/`)

## Proposed stack

| Layer | Choice | Reason |
|---|---|---|
| Pattern | One monolith (single deployable app) | Solo builder, small scale; one codebase and one deploy is the cheapest to build, debug, and run. |
| Language | TypeScript (strict) everywhere | One language for the dashboard, the server, and the overlay, which has to be browser JavaScript anyway. |
| Runtime & package manager | Node.js 24 LTS (pinned in `engines` and `.nvmrc`) with pnpm | Node 24 is the LTS line every host supports today; pin it on purpose rather than drifting to the next LTS. pnpm is fast and strict. |
| Framework | Next.js 16 (App Router), pinned to the current 16.x minor | Server components for the dashboard, route handlers for the viewer proxy, first class on Vercel. |
| Hosting | Vercel: Hobby while building, Pro before real client use | Zero config deploys; Hobby is non commercial, so client work moves to Pro. |
| Server runtime | Node.js runtime (Fluid compute) for all route handlers, no Edge runtime | The viewer proxy streams and rewrites HTML; Node avoids the Edge 25s first byte cap and supports every library. |
| Primary DB | Supabase Postgres: one project for Development and Vercel Preview, one for Production (the free tier allows two) | Relational data fits Postgres; Supabase also supplies auth, so one vendor covers both. |
| ORM & migrations | Drizzle ORM with the `postgres` (postgres.js) driver; `drizzle-kit generate` locally, SQL migrations committed in `drizzle/`; `drizzle-kit migrate` run by hand (later from CI) against `DATABASE_URL_DIRECT`, never inside the Vercel build | Lightweight, SQL shaped TypeScript schema, no engine binary; keeping migrations out of the build stops a deploy from changing the schema. |
| DB connection | App queries: transaction pooler (port 6543), one module level postgres.js client with `max: 3` and `prepare: false`, registered with `attachDatabasePool` from `@vercel/functions`. Migrations: session pooler (port 5432) | Serverless functions open many short connections; the pooler stops them exhausting Postgres. Transaction mode does not support prepared statements. The free tier direct connection is IPv6 only, so migrations use the session pooler. |
| Auth | Supabase Auth with `@supabase/ssr` (cookie based sessions) for the owner only; Supabase Site URL `http://localhost:3000` in dev | Already in the stack; feature 6 designs the flows. Clients never get accounts. |
| Authorization | Server only data access through `src/server/data/`, the only code that queries the DB, with two entry points: owner scoped (by signed in owner id) and share token scoped (by a valid, unrevoked share token). RLS on for every table with no policies | Drizzle connects as a privileged user, so RLS cannot be the guard; RLS on with no policies blocks Supabase's public Data API from reading tables. |
| API shape | Server Actions for dashboard and share page mutations; route handlers for the viewer proxy, the overlay's read only pin data, and cron | The comment form lives on the share page (app origin), so it can use Server Actions; only the proxy and overlay need plain HTTP. |
| Validation | Zod for env, Server Action inputs, route handler bodies, and every `postMessage` payload | One schema library at every trust boundary; messages from the proxied frame are untrusted input. |
| Origin isolation | Two hosts, one deployment: `APP_ORIGIN` and `VIEWER_ORIGIN` (see *Origin model*). Next.js `proxy.ts` (the request interceptor, formerly middleware) routes by host | Client site scripts run on the viewer origin, so they never see owner cookies or client identity. |
| Overlay bundle | Vanilla TypeScript, Vite library build to one IIFE file at `public/overlay/overlay.js` (gitignored, built before Next), mounted in a closed Shadow DOM, CSS hand written with `:host` scoped custom properties | Smallest payload on someone else's page. Tailwind v4 relies on `:root` variables and `@property`, which do not work inside a shadow root. |
| Styling | Tailwind CSS v4 + shadcn/ui for the dashboard and share page | Fast, accessible, owned component source; feature 5 sets the visual language and the overlay's token set. |
| Env & secrets | `src/lib/env.ts` with separate server and client (`NEXT_PUBLIC_*`) Zod schemas, parsed at startup; `SKIP_ENV_VALIDATION=1` lets CI build without secrets. Values live in Vercel env settings per scope, pulled locally with `vercel env pull` | A missing key fails loudly; client code can never import a server secret. |
| Scheduled jobs | One daily Vercel Cron job hitting `/api/cron/keepalive`; it checks `Authorization: Bearer $CRON_SECRET` and runs `select 1` against the DB | A real query is what stops the free Supabase project pausing after a week idle; delete it once on Supabase Pro. |
| Testing | Vitest (unit and integration, covering `src/` and `overlay/`), Playwright end to end against a local fixture site server, plus one opt in smoke test against a real URL | The risky bugs live where the proxy, overlay, and share page meet; a fixture site makes those tests deterministic. |
| Observability | Structured JSON logs to Vercel runtime logs from day one | Enough for a solo build; a hosted error tracker stays deferred per the scope. |

### Origin model

| Origin | Serves | Rules |
|---|---|---|
| `APP_ORIGIN` | Dashboard, sign in, the share page `/s/[token]` (frames the viewer, holds the comment form and the client identity cookie), Server Actions, `/api/cron/*` | Sends `frame-ancestors 'none'` everywhere except `/s/*`, which sends `frame-src VIEWER_ORIGIN`. Unknown hosts (deployment hash URLs, health checks) are treated as `APP_ORIGIN`. `/api/cron/*` is allowed on any host. |
| `VIEWER_ORIGIN` | The whole path space belongs to the proxied client site; `proxy.ts` rewrites every request on this host to the viewer proxy route handler. One reserved prefix, `/__fb/`, serves the overlay script and its read only pin data | No owner session, no client identity, no cookies set by the app. Strips the upstream site's `X-Frame-Options` and `Content-Security-Policy` frame rules and sends `frame-ancestors APP_ORIGIN`. Dashboard or share routes requested here redirect to `APP_ORIGIN`. |

**Overlay trust boundary**: the overlay shares a JavaScript context with the untrusted page, so it is treated as untrusted too. It only captures the pin anchor and draws pins, then sends the anchor to the share page with `postMessage` (target origin `APP_ORIGIN`). The share page checks `event.origin === VIEWER_ORIGIN`, validates the payload with Zod, and owns the client's name and email, the comment text, and the submit. Features 3 and 7 design the message shapes and the anchor.

**Origins per environment** (Vercel env scope in brackets):

| Environment | APP_ORIGIN | VIEWER_ORIGIN |
|---|---|---|
| Local [Development] | `http://localhost:3000` | `http://127.0.0.1:3000` (a different host, so a different origin with separate cookies; `allowedDevOrigins: ['127.0.0.1']` in `next.config.ts` lets dev assets load) |
| Branch preview deploys [Preview] | the deployment URL | the same URL (single origin). Viewer and overlay flows are tested locally and in Production only |
| Production [Production] | your app domain | a separate registrable domain, not a subdomain of the app domain |

The Playwright config starts the dev server once and uses both local hosts.

### Project layout

Single package; the overlay lives in its own folder with its own Vite config. `package.json` `build` runs `pnpm build:overlay && next build`.

```
src/
  app/
    (dashboard)/            owner pages (APP_ORIGIN, signed in)
    s/[token]/              client share page (APP_ORIGIN, public, noindex)
    api/cron/keepalive/     daily keep alive
    viewer/[[...path]]/     viewer proxy route handler (reached only via the proxy.ts rewrite on VIEWER_ORIGIN)
  proxy.ts                  host routing, security headers, owner session refresh
  server/
    db/                     Drizzle schema and client
    auth/                   Supabase server client helpers
    data/                   data access layer: owner scoped and share token scoped entry points
  lib/env.ts                Zod validated env (server and client schemas)
  components/ui/            shadcn components
overlay/
  src/main.ts               overlay entry
  vite.config.ts            library build to public/overlay/overlay.js
drizzle/                    generated SQL migrations
tests/e2e/                  Playwright specs and the fixture site
```

**Configuration required** (Vercel scopes: Development and Preview point at the dev Supabase project, Production at the prod one):
- `NEXT_PUBLIC_SUPABASE_URL`: Supabase project URL
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`: Supabase publishable (anon) key for the auth client
- `DATABASE_URL`: transaction pooler connection string (port 6543) for app queries
- `DATABASE_URL_DIRECT`: session pooler connection string (port 5432), used only by `drizzle-kit`
- `APP_ORIGIN`: the app origin
- `VIEWER_ORIGIN`: the viewer origin (equals `APP_ORIGIN` on branch preview deploys)
- `CRON_SECRET`: the secret Vercel Cron sends as a bearer token
- `SKIP_ENV_VALIDATION`: optional, CI only

A real Supabase dev project must exist before feature 1 counts as done, so the scaffold boots against real values.

## Consequences

**Positive**:
- One repo, one deploy, one language; a solo builder can hold the whole system in their head.
- $0 to start; the upgrade path is two known line items (Vercel Pro, Supabase Pro).
- Origin isolation and the overlay trust boundary are designed in before the first proxied page, not retrofitted after a leak.

**Negative / tradeoffs**:
- Vercel Hobby forbids commercial use. Before any real client opens a share link, move to Vercel Pro (about $20/month).
- Supabase free projects pause after a week idle; the keep alive cron is a workaround until Supabase Pro (about $25/month) at launch.
- The viewer proxy runs in serverless functions: each proxied request counts toward function time and billing, buffered bodies hit Vercel's 4.5 MB limit (feature 3 must stream, never buffer, the upstream HTML), and a very slow site can hit the 300s Hobby cap.
- All projects share one viewer origin for now, so one client site's scripts could read another project's viewer origin storage. Accepted for the build phase (identity and comment text never live there); move to per project `<token>` subdomains on a wildcard viewer domain before launch, which needs the domain on Vercel nameservers.
- Branch preview deploys run single origin, so they cannot exercise the isolation; viewer flows are tested locally and in Production only.
- Two origins mean two production domains plus header and `postMessage` rules between them.
- RLS is not the safety net: one unscoped query in the data access layer leaks data. Every query goes through `src/server/data/`.
- Next.js ships frequent security patches; staying on the current 16.x minor is ongoing work.

**Neutral**:
- `proxy.ts` is Next.js's name for its request interceptor; it is unrelated to the viewer proxy route.
- Auth user ids live in Supabase's `auth.users`; app tables reference them by uuid (feature 4 designs the tables).
- Feature 2 (`/audit`) adds lint, format, and pre commit hooks on top of this scaffold.

## Follow-up

- [ ] Feature 3 (live preview): design the streaming HTML rewrite (parser choice, URL rewriting, script and CSP handling, root relative and `/_next/*` requests from proxied sites, timeouts) inside the origin model, plus the overlay `postMessage` shapes and the anchor.
- [ ] Feature 4 (data model): reference Supabase `auth.users` ids for owners; enable RLS on every table in each migration.
- [ ] Feature 5 (design system): the overlay cannot use Tailwind inside its shadow root; define its token set as `:host` custom properties.
- [ ] Feature 6 (owner sign in): design the Supabase Auth flows (methods, email confirmation, session refresh in `proxy.ts`).
- [ ] Feature 7 (core feedback loop): design the client identity cookie on the share page and the comment Server Action.
- [ ] Before launch: Vercel Pro and Supabase Pro, delete the keep alive cron, buy both production domains, move to per project viewer subdomains.
- [ ] Root `AGENTS.md` does not exist yet; feature 2 (`/audit`) should create it from the real scaffold and record this stack, the origin model, the overlay trust boundary, and the data access layer rule under `## Rules`, plus an `## Agent skills` section listing the five skills above, `MCP servers: Supabase (hosted, read only)`, and `Declined:` community skills for Drizzle, Vite, Vitest, and Tailwind.
- [ ] Connect the Supabase MCP server in your own Claude settings (`https://mcp.supabase.com/mcp`, read only mode).
- [ ] Error monitoring stays deferred per the scope; revisit when the overlay runs on real client sites.

## Rationale

Reasoning and options: see [rationale.md](rationale.md).
