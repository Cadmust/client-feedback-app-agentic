# Verify: Stack & architecture · spec 0001 · updated 2026-10-31
_Spec 0001 is a decision spec with no `AC-N` list, so these steps come from the scope's **Done when** ("the stack is recorded in a spec, and the empty scaffold boots locally and passes a build") and the spec's `## Proposed stack`. `/check verify` runs these; `/test` locks the durable ones._

## Commands
- [ ] `node -v` → `v24.x` (matches `.nvmrc` and `engines`) → Done when: boots locally
- [ ] `pnpm install` → completes with no errors → Done when: boots locally
- [ ] `pnpm typecheck` → route types generate, `tsc` exits 0 → Done when: passes a build
- [ ] `SKIP_ENV_VALIDATION=1 pnpm build` → overlay builds to `public/overlay/overlay.js`, then `next build` finishes with `/` prerendered → Done when: passes a build
- [ ] With no `.env.local` and no `SKIP_ENV_VALIDATION`, run `pnpm build` → stops with `Invalid environment variables` naming each missing key → Proposed stack: Env & secrets
- [ ] Set `CRON_SECRET` to fewer than 16 characters → startup fails naming `CRON_SECRET` → Proposed stack: Env & secrets
- [ ] `git status` → `public/overlay/` and `.env.local` are not listed (gitignored); `.env.example` is tracked → Proposed stack: Overlay bundle, Env & secrets

## UI / manual
- [ ] Fill `.env.local` with the real dev Supabase project values, run `pnpm dev`, open <http://localhost:3000> → page shows "Client Feedback App" and "Scaffold is running" → Done when: boots locally (needs a real Supabase dev project, per spec 0001)
- [ ] With the dev server still running, open <http://127.0.0.1:3000> → same page loads with no blocked dev asset warnings in the terminal (`allowedDevOrigins`) → Proposed stack: Origin model, Local

## Acceptance-criteria coverage
- Done when "stack is recorded in a spec" → spec 0001 exists (`/architect` already ticked it)
- Done when "boots locally" → steps 1, 2, and both UI steps
- Done when "passes a build" → steps 3 and 4
- Proposed stack rows checked by the scaffold: Runtime pin (1), Env & secrets (5, 6, 7), Overlay bundle (4, 7), Origin model, Local (UI step 2)
