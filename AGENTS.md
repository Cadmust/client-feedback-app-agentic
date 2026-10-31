# Client Feedback App

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Stack

- **Language / Runtime**: TypeScript (strict), Node.js 24 LTS (`.nvmrc`, `engines`); Node runtime on Fluid compute for every route, no Edge runtime
- **Framework**: Next.js 16 App Router (`cacheComponents` on), hosted on Vercel
- **Key dependencies**: Supabase (Postgres + Auth via `@supabase/ssr`), Drizzle ORM with postgres.js, Zod, Tailwind CSS v4 + shadcn/ui, Vite (overlay bundle)
- **Package manager**: pnpm
- Full decision and origin model: [spec 0001](docs/specs/0001-stack-architecture/index.md). Design tokens: [design.md](design.md)

## Build approach

**Tracer Bullet**: prove the whole pipe works with one thin real thread first, then thicken one segment at a time, end to end.

## Commands

```bash
pnpm install          # Install
pnpm dev              # Dev: builds the overlay, then next dev (app localhost:3000, viewer 127.0.0.1:3000)
pnpm build            # Build: overlay, then next build (CI: SKIP_ENV_VALIDATION=1)
pnpm typecheck        # next typegen && tsc --noEmit
pnpm lint             # ESLint (pnpm lint:fix to fix)
pnpm format           # Prettier write (pnpm format:check to check only)
# Test scripts: added by /test
```

## Specs

Stored in `docs/specs/`. Format: `docs/specs/NNNN-title/index.md`. Scope: `docs/scope/scope.md`.

## Rules

- Functional style: pure functions by default, plain immutable data (`const`, `readonly`), no classes where a function works, module level values are constants only. Side effects (DB, network, cookies) live at the edges: Server Actions, route handlers, `src/server/data/`.
- Expected failures return typed results (`{ ok: true, data } | { ok: false, error }`), never thrown to the client. Unexpected errors are logged as structured JSON.
- Only `src/server/data/` queries the DB, through owner scoped or share token scoped entry points. RLS is on with no policies, so it is not a safety net; never query outside this layer.
- Two origins: owner session and client identity live only on `APP_ORIGIN`. The `VIEWER_ORIGIN` sets no app cookies. The overlay is untrusted: it only reports anchors by `postMessage`; the share page checks `event.origin` and validates with Zod.
- Validate with Zod at every trust boundary: env (`src/lib/env.ts`), Server Action inputs, route handler bodies, `postMessage` payloads.
- Folders follow spec 0001: routes in `src/app`, server code by layer in `src/server/{db,auth,data}`, UI by feature in `src/components/<feature>/`, shadcn in `src/components/ui/`, overlay in `overlay/` (vanilla TS, no Tailwind in its shadow root).
- Named exports only; default exports only where Next.js requires them (page, layout, route, metadata files).
- Conventional commit messages (`feat:`, `fix:`, `docs:`, `chore:`, `test:`).
- Testing gate: Vitest (unit, integration) for `src/` and `overlay/`, Playwright end to end against a local fixture site. Pure functions get plain input/output tests, no mocks.

## Tooling

Chosen by /audit, installed by `/develop tooling`: ESLint (flat config, `eslint-config-next`) + Prettier (with the Tailwind plugin); pre-commit hook runs lint + format on staged files plus `pnpm typecheck`; GitHub Actions CI on push runs install, lint, typecheck, unit tests, and build with `SKIP_ENV_VALIDATION=1`.

## Git

- integration: on
- branch prefix: feat/
- commit: end-of-build

## Agent skills

- [supabase](.agents/skills/supabase/): `supabase/agent-skills`, Supabase Auth, SSR client, and platform work
- [supabase-postgres-best-practices](.agents/skills/supabase-postgres-best-practices/): `supabase/agent-skills`, schema, migrations, indexes, RLS
- [shadcn](.agents/skills/shadcn/): `shadcn-ui/ui`, shadcn/ui components and theming
- [vercel-react-best-practices](.agents/skills/vercel-react-best-practices/): `vercel-labs/agent-skills`, React and Next.js performance
- [playwright-cli](.agents/skills/playwright-cli/): `microsoft/playwright-cli`, browser automation and end to end tests

Declined: Drizzle, Vite, Vitest, Tailwind community skills
MCP servers: Supabase (hosted, read only, recommended)

## Context files

<!-- Nested AGENTS.md files are listed here as they are created -->

_Drafted by /audit from the repo, worth a quick human pass. Edit freely: once a line stops matching this draft, later runs treat it as curated and will flag rather than overwrite it._
