# 0001. Rationale: stack and architecture

Decision record for [index.md](index.md). Read by humans and by `/architect` on update; `/develop` skips it.

## Context

The product is a client feedback tool for one solo freelancer. The owner signs in to a dashboard; clients open a share link with no account, see the owner's live client website, and pin comments on it. Scale is small (one owner, tens of projects, hundreds to low thousands of comments), the builder is one person, and the budget posture is free tier first on managed platforms with no servers to operate.

The hardest force is the live preview (scope feature 3). Showing an arbitrary third party site with an overlay on top, without the site owner installing anything, needs a server side reverse proxy: fetch the page, rewrite its URLs, inject an overlay script. That puts untrusted third party JavaScript inside the app's own pages, so the stack must keep that code away from the owner's session. It also means the host must allow streaming, reasonably long running requests. An embed script option should stay possible too.

The overlay is injected into pages the app does not control, so it must be small and must neither be styled by, nor style, the host page. Everything else (dashboard, share page, data storage, owner sign in) is ordinary web app work.

The project is greenfield (no code, no `AGENTS.md`), uses a Tracer Bullet approach, and this feature is tagged Beta, so end to end tests matter from the first slice. Not deciding now blocks every other feature: the data model, auth, design system, and preview all build on the stack.

## Options considered

### Option 1: One Next.js app on Vercel with Supabase and Drizzle

A single Next.js 16 app serves the dashboard, share page, overlay API, and preview proxy, deployed to Vercel; Supabase supplies Postgres and owner auth; Drizzle runs queries.

**Pros**:
- One codebase and one deploy; route handlers stream the proxy on the Node runtime (basis: monolith first for small teams).
- Supabase covers database and auth with one vendor and generous free limits.

**Cons**:
- Vercel Hobby is non commercial and the proxy consumes function time; Supabase free projects pause when idle.
- Drizzle bypasses RLS, so authorization depends entirely on app code discipline.

### Option 2: Next.js on Vercel plus a separate Cloudflare Worker proxy

Same app, but the preview proxy runs as its own Cloudflare Worker using HTMLRewriter (Cloudflare's streaming HTML rewriter).

**Pros**:
- HTMLRewriter is purpose built for streaming HTML rewrites; the proxy scales and fails separately from the dashboard.
- The proxy origin is naturally separate.

**Cons**:
- Two platforms, two deploys, two sets of secrets and logs for a solo builder.
- The free 10 ms CPU limit is too tight for rewriting real pages, so the paid Workers plan is needed from day one.

### Option 3: Next.js on a long running Node host (Railway, Render, or Fly)

The same Next.js monolith runs as a normal Node server on a container platform, with no function duration limits.

**Pros**:
- No serverless limits on the proxy; persistent database connections.
- Predictable per month pricing.

**Cons**:
- No meaningful free tier (status not verified and it keeps changing); more operations work (scaling, health checks, restarts).
- Weaker Next.js integration than Vercel (preview deploys, caching, image handling need setup).

### Option 4: Laravel (PHP) backend with a JavaScript frontend

A Laravel app for the dashboard, API, and proxy, with a separate JavaScript overlay and frontend.

**Pros**:
- Mature, batteries included framework with auth, queues, and migrations built in.
- Laravel hosting (Forge, Cloud) handles long running requests well.

**Cons**:
- Two languages; the overlay and any rich dashboard UI are still JavaScript.
- The engineer chose TypeScript as their strongest ecosystem.

## Rationale

The forces that decide this are: one builder, free tier first, a proxy that executes untrusted pages, and a Beta level need for end to end tests. Option 1 is the only one that keeps one language, one deploy, and a $0 start while still running a streaming proxy. Vercel's Node functions allow 300 seconds on Hobby and 800 on Pro, far beyond the few seconds a page fetch needs (basis: Vercel Functions limits). Option 2's HTMLRewriter is the better proxy tool, but adding a second platform and a paid plan on day one is premature; if feature 3 finds that rewriting inside a Vercel function is too slow or too costly, moving only the proxy route to a Worker is a contained change, because the preview already lives on its own origin. That separate origin is the load bearing safety decision: proxied sites run their own scripts, and serving them from the dashboard's origin would hand those scripts the owner's cookies (basis: same origin policy, isolate untrusted content on a separate origin).

The engineer picked Supabase over the Neon Postgres recommendation. That choice is sound: Supabase bundles auth, so it removes a vendor (basis: reuse what the stack runs). Its cost is the one week idle pause, handled with a daily Vercel Cron keep alive until Supabase Pro at launch. Because Drizzle connects as a privileged role, RLS cannot guard queries; enforcing ownership in a single data access layer, with RLS turned on and no policies so Supabase's public Data API cannot read tables, is simpler than writing policies for a no account client flow (basis: defense in depth for exposed BaaS APIs).

Drizzle over Prisma: it ships no engine binary into serverless functions and keeps queries close to SQL; Prisma's version signals were mixed at decision time (an 8.0 RC on npm while 7.x is stable). Supabase Auth over Better Auth: both fit, but Supabase Auth is already paid for by the database choice, and Auth.js now receives only security fixes (basis: Auth.js joins Better Auth announcement). Vanilla TypeScript in a Shadow DOM for the overlay keeps the payload on someone else's page minimal; Preact is the fallback if the overlay UI grows complex.

A same model cross check on 2026-10-30 changed three things. First, the overlay shares a JavaScript context with untrusted page scripts, so a Shadow DOM is not a security boundary, and a cookie on the viewer origin would be a third party cookie that Safari and Firefox block. So the comment form and client identity moved to the share page on the app origin, and the overlay only reports pin anchors by `postMessage` (basis: treat code in an untrusted context as untrusted). Second, proxied sites issue root relative requests that HTML rewriting cannot catch, so the viewer host's whole path space goes to the proxied site, with one reserved prefix for the overlay. Third, one shared viewer origin lets one client site read another project's viewer storage. The engineer accepted that for the build phase and planned per project subdomains before launch, because identity and comment text never live on the viewer origin.

## References

**Project sources**:
- `docs/scope/scope.md`: feature 1 (stack must support the feature 3 proxy), feature 3 (live preview), Tracer Bullet approach, Beta tier
- Engineer answers in the /architect session of 2026-10-30 (TypeScript, managed free tier, keep proxy and embed both possible, Supabase)

**Practices & standards**:
- Monolith first for a small team
- Same origin policy: isolate untrusted content on a separate origin
- Defense in depth for exposed BaaS APIs (RLS on, no policies, server only access)
- Reuse what the stack already runs before adding a vendor
- Validate configuration at startup (fail fast)

**Links** (web verified 2026-10-30):
- Vercel Functions limits: https://vercel.com/docs/functions/limitations
- Cloudflare Workers limits: https://developers.cloudflare.com/workers/platform/limits/
- Supabase pricing (free tier limits, idle pause): https://supabase.com/pricing
- Neon pricing: https://neon.com/pricing
- Turso pricing: https://turso.tech/pricing
- Next.js blog (16.x releases): https://nextjs.org/blog
- Auth.js joins Better Auth: https://www.better-auth.com/blog/authjs-joins-better-auth
- Prisma latest on npm: https://registry.npmjs.org/prisma/latest

### Landscape scan (2026-10-30)

- Next.js 16.4 latest (2026-10-06); several security patch releases in Sep and Oct 2026.
- Vercel Functions (Fluid): Hobby 300s, Pro 800s max duration; 4.5 MB request and response payload limit; Edge runtime must send its first byte within 25s.
- Cloudflare Workers: free plan 10 ms CPU per request, 100k requests per day; paid up to 5 min CPU.
- Supabase free: 500 MB database, 2 active projects, 50k monthly active users, pauses after 1 week idle.
- Neon free: 1 GB per project, suspends after 5 min idle. Turso free: 5 GB.
- Prisma: npm `latest` showed 8.0.0-rc.29; 7.x is the stable line.
- Not verified at decision time: SvelteKit, React Router, TanStack Start versions; Railway, Render, Fly free tiers; Drizzle and Supabase Auth versions.
