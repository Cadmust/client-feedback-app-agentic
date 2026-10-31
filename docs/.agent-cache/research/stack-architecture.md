# Stack research: client feedback app (as of 2026-10-30)

Scope: stack layers for a greenfield TypeScript app with an owner dashboard and a public share page that reverse-proxies a third-party site (fetch HTML, rewrite URLs, inject overlay).
Budget: 5 web searches, 8 page fetches. Items marked UNVERIFIED were not checked this run.

## Verified this run (fetched)

### 1. Full-stack framework
- Next.js: latest stable minor on the blog is 16.4 (2026-10-06). Next.js 16 line is current (16.0 released 2025-10-21). Adapter API is stable since 16.2 (2026-03-18). Several security releases in Sep-Oct 2026; plan for frequent patch upgrades.
- No Next.js 17 announcement on the blog as of the fetch.
- UNVERIFIED: SvelteKit, Nuxt, React Router v7, TanStack Start, Astro current versions. Check with `npm view <pkg> version` before choosing.

### 2. Reverse proxy hosting
- Vercel Functions (Fluid compute, verified on docs page last updated 2026-08-24):
  - Max duration: Hobby 300s default and max. Pro/Enterprise 300s default, 800s max, 1800s extended max (Beta). Duration includes streamed responses.
  - Request OR response payload limit: 4.5 MB (stated for Vercel Functions). Unclear whether streamed responses are exempt; verify before relying on it for large pages.
  - Bundle: 250 MB uncompressed (5 GB Beta large functions).
  - Memory: Hobby 2 GB; Pro 4 GB max.
  - Edge runtime: must start responding within 25s, then stream up to 300s.
- Cloudflare Workers (verified on official limits page):
  - Free: 10 ms CPU per invocation, 50 subrequests per request, 100k requests/day, 128 MB memory, 64 MiB worker size.
  - Paid: 5 min CPU max per HTTP request (default 30s). Subrequests on paid are higher.
  - HTMLRewriter: streaming, built into the runtime (third-party sources only; not verified on official HTMLRewriter docs).
  - Risk: 10 ms free-tier CPU is tight for parsing and rewriting large HTML. Measure on real pages; the paid plan removes most of that risk.
- Fly.io / Railway / Render: UNVERIFIED. Free-tier status changed several times in 2024-2025. Check current pricing pages before choosing.
- Recommendation for the proxy: Cloudflare Worker (streaming HTMLRewriter, lowest-friction streaming). Vercel Fluid is a fallback with a 300s hard cap on Hobby, plus the 4.5 MB payload-limit question. Hobby is for non-commercial use per Vercel's terms; confirm that fits a paid client tool.

### 3. Hosted Postgres free tiers
- Neon (neon.com/pricing): free, no card. 100 CU-hours per project (autoscale up to 2 CU / 8 GB). 1 GB storage per project, 20 GB total. 100 projects, 10 branches per project. Compute suspends after 5 min idle (not disableable on Free). Exceeding limits blocks writes until upgrade or next billing period.
- Supabase (supabase.com/pricing): Free: 500 MB database per project, 2 active projects, 50k MAU, 1 GB file storage, 5 GB egress. Projects pause after 1 week of inactivity.
- Turso (turso.tech/pricing, SQLite, not Postgres): Free: 100 databases, 5 GB total storage, 500M rows read/month, 10M rows written/month. Idle databases cost only storage (no separate scale-to-zero term on the page).
- Prisma Postgres: UNVERIFIED this run.

### 4. ORMs
- Prisma (npm registry `latest` fetch): returned 8.0.0-rc.29 (a release candidate). Search results indicate Prisma 7.x is the stable line, with 7.10.0 release notes and a compatibility package for running Prisma 7 config alongside Prisma 8 in early access. Conflicting: confirm with `npm view prisma dist-tags` before pinning. Recommend Prisma 7.x stable for production; do not adopt the 8.x RC.
- Drizzle ORM: UNVERIFIED version. Check `npm view drizzle-orm version`.

### 5. Auth
- Auth.js: announced 2025-09-22 that it is now maintained and overseen by the Better Auth team (better-auth.com post, fetched). Security patches and urgent fixes only; no statement of new features. Existing users can keep using it; migration guide available. Better Auth is recommended for new projects unless you need a specific gap, most notably stateless sessions without a database.
- Better Auth: recommended choice for a single owner sign-in (email/password or OAuth, owner-only). Verify version with `npm view better-auth version`.
- Clerk, Supabase Auth: UNVERIFIED this run.

## Search leads (not fetched, do not treat as confirmed)
- A search result describes Better Auth joining Vercel (blog dated 2026-07-07). Check better-auth.com/blog before relying on it.
- Third-party comparison blogs cite Neon 0.5 GB storage and Supabase 2-project limits; the official pages above supersede them.

## Verify before committing
1. `npm view next version`, `npm view @sveltejs/kit version`, `npm view nuxt version`, `npm view react-router version`, `npm view @tanstack/react-start version`, `npm view astro version`, `npm view drizzle-orm version`, `npm view prisma dist-tags`, `npm view better-auth version`.
2. Confirm Vercel Hobby commercial-use terms and whether streamed responses are exempt from the 4.5 MB limit.
3. Benchmark HTMLRewriter CPU on a real third-party page against the 10 ms free limit.
