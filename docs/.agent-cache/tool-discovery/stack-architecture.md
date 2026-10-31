# Stack discovery: Agent Skills and MCP servers (2026-10-30)

Source: `npx -y skills find <tool>` output, plus 4 web searches for MCP servers. Owner tags: official = vendor-owned repo; community = third party.

## Agent Skills

### Supabase (Postgres + Auth, @supabase/ssr)
- supabase/agent-skills@supabase - core Supabase skill (official)
- supabase/agent-skills@supabase-postgres-best-practices - Postgres guidance (official)
- supabase/server@supabase-server - server-side Supabase usage (official)
- supabase/supabase@vitest - Vitest against Supabase (official)
- sickn33/agentic-awesome-skills@nextjs-supabase-auth - Next.js + Supabase auth (community)

### Drizzle ORM (drizzle-kit)
- giuseppe-trisciuoglio/developer-kit@drizzle-orm-patterns - schema and query patterns (community)
- lobehub/lobehub@drizzle - Drizzle usage (community)
- bobmatnyc/claude-mpm-skills@drizzle-orm - Drizzle ORM guidance (community)
- No official drizzle-team skill appeared in results.

### Tailwind CSS v4
- wshobson/agents@tailwind-design-system - design system with Tailwind (community)
- lombiq/tailwind-agent-skills@tailwind-4-docs - Tailwind v4 docs reference (community)
- paulrberg/agent-skills@tailwind-css - Tailwind CSS usage (community)
- No official tailwindlabs skill appeared in results.

### shadcn/ui
- shadcn-ui/ui@shadcn - CLI, components, theming (official)
- shadcn-ui/ui@migrate-radix-to-base - Radix to Base UI migration (official)
- secondsky/claude-skills@tailwind-v4-shadcn - Tailwind v4 + shadcn (community)

### Vite (library build)
- antfu/skills@vite - Vite config and build (community)
- affaan-m/ecc@vite-patterns - Vite patterns (community)
- No official vitejs skill appeared in results.

### Vitest
- antfu/skills@vitest - Vitest usage (community)
- pproenca/dot-skills@vitest - Vitest usage (community)
- sentimony/skills@vitest - Vitest usage (community)

### Playwright
- microsoft/playwright-cli@playwright-cli - Playwright CLI (official)
- anthropics/skills@webapp-testing - browser app testing (official)
- currents-dev/playwright-best-practices-skill@playwright-best-practices - Playwright practices (community)

### Next.js 16
- vercel-labs/agent-skills@vercel-react-best-practices - React and Next.js practices (official)
- vercel-labs/openreview@next-cache-components - Cache Components (official)
- gocallum/nextjs16-agent-skills@nextjs16-skills - Next.js 16 specifics (community)
- affaan-m/ecc@nextjs-turbopack - Turbopack (community)

### Vercel
- vercel-labs/agent-skills@deploy-to-vercel - deployment (official)
- vercel-labs/agent-browser@agent-browser - browser automation (official)
- Skipped as already present as plugins: vercel:nextjs, vercel:shadcn, vercel:vercel-cli, vercel:vercel-storage, vercel:env-vars, vercel:deployments-cicd, vercel:vercel-functions.

## MCP servers

### Supabase
- Hosted: URL https://mcp.supabase.com/mcp (OAuth 2.1). Append `read_only` query param for read-only. Official per directory listings; not confirmed on supabase.com.
- Repo: supabase-community/supabase-mcp, npm @supabase/mcp-server-supabase (public alpha). Official-org (supabase-community).
- Community: PyPI supabase-mcp-server (not official, do not use as the default).

### Drizzle / Postgres
- defrex drizzle-mcp - Drizzle ORM and drizzle-kit wrapper, takes a drizzle.config.ts path (community; Postgres support unconfirmed).
- Crystaldba Postgres MCP Pro - index tuning, explain plans, safe SQL (community).
- devopam/MCPg - Python Postgres query server, low adoption (community).
- No official Drizzle MCP server found.

### Playwright
- microsoft/playwright-mcp (Apache-2.0). Connect: `npx @playwright/mcp@latest` over stdio (official).

### shadcn/ui
- Built into the shadcn CLI, per ui.shadcn.com/docs/registry/mcp. Init: `pnpm dlx shadcn@latest mcp init --client claude` (official).
- @reuvenorg/shadcn-registry-manager - community registry tool (community).

### Vercel
- Skipped: Vercel MCP already connected.

## Notes
- Search results for MCP were mostly third-party directories; verify repos before adopting.
- Playwright MCP version was unconfirmed (sources disagree).
