# Client Feedback App

Share a link to a live website, let your client pin comments on the running page, and manage every comment from your dashboard.

Stack and architecture: [spec 0001](docs/specs/0001-stack-architecture/index.md). Scope: [docs/scope/scope.md](docs/scope/scope.md).

## Run it locally

You need Node.js 24 (see `.nvmrc`) and pnpm. If `pnpm` isn't on your PATH, run `corepack enable` once.

```bash
pnpm install
cp .env.example .env.local   # fill in real values, or: vercel env pull .env.local
pnpm dev
```

- App origin: <http://localhost:3000>
- Viewer origin: <http://127.0.0.1:3000> (a separate origin on purpose; see the origin model in spec 0001)

The app checks its environment at startup and stops with a clear message if a value is missing or malformed.

## Scripts

| Script               | What it does                                                           |
| -------------------- | ---------------------------------------------------------------------- |
| `pnpm dev`           | Builds the overlay, then starts the Next.js dev server                 |
| `pnpm build`         | Builds the overlay (`public/overlay/overlay.js`), then the Next.js app |
| `pnpm build:overlay` | Builds only the overlay bundle with Vite                               |
| `pnpm typecheck`     | Generates route types, then runs `tsc`                                 |
| `pnpm lint`          | Runs ESLint (`pnpm lint:fix` to fix what it can)                       |
| `pnpm format`        | Formats with Prettier (`pnpm format:check` only checks)                |

A pre-commit hook (husky + lint-staged) lints and formats staged files, then runs `pnpm typecheck`. CI on GitHub Actions runs lint, format check, typecheck, tests, and build, without secrets, by setting `SKIP_ENV_VALIDATION=1`.
