# 0002 · Landing page

**Status**: Assumed
**Date**: 2026-10-31
**Authorized by**: mustamin.muhamadhatta, during /develop

## Owed decision
The landing page (scope feature 13) had no spec and no `design.md` (feature 5 not designed yet). A screenshot was given as the visual reference, but these were open: what the URL box and its "Start Review" button do while sign in and projects don't exist yet, where the nav links go when Pricing, Resources, and Book Demo have no pages, which design tokens to use before feature 5 sets the system, and where the imagery (avatars, product mockups, the video play button) comes from.

## Assumption built on
- **Visual source:** the screenshot pasted in chat, replicated faithfully: cream canvas with a soft wave pattern, centered hero, URL pill, and a five card bento grid (Share a Link, No Login Needed, Review Live, Open Inbox, Resolve Faster).
- **URL box:** accepts a link with or without `https://` (adds `https://` when missing), checks it is a real `http`/`https` URL, shows an inline error if not, then sends you to `/sign-in?url=<the link>`. Nothing is stored. Feature 6 builds `/sign-in`; until then that route returns 404.
- **Nav and header actions:** Pricing, Resources, and Book Demo are left out (billing is deferred and those pages don't exist). The nav keeps "How it works" (scrolls to the bento grid) and "Why no login" (scrolls to the No Login Needed card). "Book Demo" becomes "Sign in"; "Start Free" stays. Both go to `/sign-in`.
- **Tokens:** taken from the screenshot and written to `src/app/globals.css`, with dark values added. The accent is darkened to `#C94A0A` for button fills and `#C2410C` for orange text so white and orange text pass WCAG AA; the screenshot's bright orange `#F26B1D` is kept for pins and icons (graphics only). Font: Plus Jakarta Sans (closest free match to the screenshot). These are provisional until feature 5 ratifies the design system.
- **Assets:** no photos. Avatars are initials on token colored circles; the product mockups and the plant are built in HTML, CSS, and inline SVG; icons come from `lucide-react`. The video play button is left out (there is no video).
- **Footer:** a small footer (wordmark, sign in link, copyright) is added below the screenshot's last row, because a landing page needs one.

### Value sourcing
| Value | Source |
|---|---|
| Canonical URL, sitemap URL, social card URL | `APP_ORIGIN` (spec 0001 env) |
| Title, description, all page copy | written in this build, in code (`src/app/page.tsx`, `src/components/landing/`) |
| Mockup content (names, comments, counts) | static illustration copy in code, hidden from screen readers with a text summary per card |
| URL passed to sign in | what you type in the URL box, normalized as above |

## Code area
`src/app/page.tsx`, `src/app/layout.tsx`, `src/app/globals.css`, `src/app/opengraph-image.tsx`, `src/app/sitemap.ts`, `src/app/robots.ts`, `src/components/landing/`, `src/lib/site.ts`, `design.md`

## Requirements
- AC-1: the page has a unique title and meta description.
- AC-2: the page has a social card (Open Graph and Twitter image).
- AC-3: `/sitemap.xml` lists the landing page at `APP_ORIGIN`; `/robots.txt` points to it and keeps `/s/` share pages out.
- AC-4: the header, hero, and footer link to sign in (`/sign-in`).
- AC-5: the page meets WCAG AA (contrast, keyboard focus, labels, headings) in light and dark.

## Ratify
This decision was recorded by /develop, not deliberated. Run `/architect landing page`
to deliberate and ratify it. Until then it stays flagged as an owed decision; it does not block marking the feature `done`.
