---
source: image
status: provisional (spec 0002, assumed; feature 5 ratifies the design system)
tokens: src/app/globals.css
---

# Design: Client Feedback

## Character
Warm, friendly, and calm. A cream canvas with soft ribbon shapes, one confident orange accent, and pastel cards (yellow, blue, mint, lavender, cream) that each hold a small, believable product mockup. Rounded everything (cards about 24px, controls fully pill shaped), gentle shadows, bold tight headlines in Plus Jakarta Sans. It should feel like a tool a freelancer is proud to send a client, never like an enterprise console.

## Build mandate
- Show the product, don't describe it: features are illustrated as small working looking UI (inbox rows, pins on a page, status chips), not icon plus paragraph blocks.
- One accent. Orange is for the primary action and for pins; everything else stays neutral or pastel.
- Pastel cards carry neutral ink text only; color comes from the card surface, not colored text.
- Every surface works in light and dark; dark keeps the same pastel roles as deep tints.

## Tokens
Values live only in `src/app/globals.css` (`:root`, dark under `prefers-color-scheme`), exposed to Tailwind via `@theme inline`. Key roles: `canvas`, `surface`, `ink`, `body`, `muted`, `border`, `border-strong`, `accent` (button fill), `accent-ink` (orange text), `accent-bright` (pins and icons only, graphics not text), `info`, `success`, `card-*`. Two small sizes, `text-micro` and `text-mini`, exist only for illustrated mockups.

## Composition and components
- Page width: `max-w-6xl`, 16px side padding on phones, 24px from `sm`.
- Primary button: pill, `accent` fill, `accent-contrast` text, 44px minimum height. Secondary: pill, `surface` with `border-strong`.
- Feature card: `rounded-3xl`, pastel `card-*` surface, a white icon disc plus bold title, then an illustration that is hidden from screen readers and replaced by a one sentence summary.
- Mock controls inside illustrations are never real buttons or links.

## Do's and Don'ts
- Do keep white text only on `accent` or `info`; check AA when adding a new pair.
- Do use `accent-bright` for shapes only; never for text.
- Don't add a second accent color or gradients on text.
- Don't use photos until real assets exist; initials avatars stand in.

## Responsive behavior
- Phone: one column; header shows the wordmark and the primary action only.
- `md`: side card pairs sit two up, the Review Live card spans full width.
- `lg`: three columns, each side column stacking on its own beside the tall middle card.
