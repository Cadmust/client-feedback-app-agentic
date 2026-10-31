# Verify: Landing page · spec 0002 · updated 2026-10-31
_Steps derived from spec 0002 acceptance criteria and its Value sourcing table. `/check verify` runs these; `/test` locks the durable ones. Spec 0002 is `Assumed`, so these check the recorded assumptions._

## UI / manual
- [ ] Open `/` in a browser tab → tab title reads "Client Feedback: clear feedback on live pages" → AC-1
- [ ] Click "Start free" and "Sign in" in the header, and "Sign in" in the footer → each goes to `/sign-in` (404 until feature 6 builds it) → AC-4
- [ ] Submit the URL box empty → focus returns to the box and "Paste a link to the page you want feedback on." is announced → AC-4, AC-5
- [ ] Type `not a url` and submit → "That doesn't look like a web address..." shows, the box border turns orange, the input has `aria-invalid="true"` → AC-5
- [ ] Type `staging.yoursite.com/pricing` and submit → lands on `/sign-in?url=https%3A%2F%2Fstaging.yoursite.com%2Fpricing` (https added) → Value sourcing: URL passed to sign in
- [ ] Type `http://localhost:4000` and submit → passes through unchanged as `http://localhost:4000/` → Value sourcing: URL passed to sign in
- [ ] Press Tab from the top of the page → order is Skip to content, home, How it works, Why no login, Sign in, Start free, URL box, Start review, then footer links; every stop shows an orange focus ring; no mockup element inside the cards takes focus → AC-5
- [ ] Click "How it works" and "Why no login" → page scrolls to the card grid and to the No Login Needed card → AC-4 (nav works)
- [ ] Switch the OS to dark mode and reload → all text stays readable, buttons use orange with dark text → AC-5
- [ ] Resize to 390px wide → header shows the wordmark and "Start free" only, cards stack in order Share, No Login, Review, Inbox, Resolve, no sideways scrolling → AC-5
- [ ] Run a screen reader over the card grid → each card reads its title plus a one sentence summary, not the mockup text → AC-5

## Commands
- [ ] `curl -s localhost:3000/ | grep -o '<meta name="description"[^>]*>'` → the description meta tag is present → AC-1
- [ ] `curl -s localhost:3000/ | grep -o 'og:image\|twitter:image\|summary_large_image'` → all three present → AC-2
- [ ] `curl -s -o /dev/null -w "%{http_code} %{content_type}" localhost:3000/opengraph-image` → `200 image/png` (same for `/twitter-image`) → AC-2
- [ ] Start the server with `APP_ORIGIN=https://example.com`, then `curl -s localhost:3000/sitemap.xml` → `<loc>https://example.com/</loc>`; `og:image` also uses `https://example.com` → AC-3, Value sourcing: canonical URL from `APP_ORIGIN`
- [ ] `curl -s localhost:3000/robots.txt` → `Disallow: /s/` and `Sitemap: <APP_ORIGIN>/sitemap.xml` → AC-3
- [ ] `SKIP_ENV_VALIDATION=1 pnpm build` with no env set → build succeeds (sitemap falls back to `http://localhost:3000`) → spec 0001 CI rule

## Acceptance-criteria coverage
- AC-1 (title, description) → UI step 1, command 1
- AC-2 (social card) → commands 2, 3
- AC-3 (sitemap, robots) → commands 4, 5
- AC-4 (links to sign in) → UI steps 2, 3, 8
- AC-5 (WCAG AA) → UI steps 3, 4, 7, 9, 10, 11
- Value sourcing: canonical URL → command 4 · URL passed to sign in → UI steps 5, 6 · page copy and mockup content → static in code, covered by UI step 11
