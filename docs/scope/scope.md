# Scope: Client Feedback App

You share a link to a live website, your client pins comments right on the running page, and you manage every comment from your dashboard. It's built for a solo freelancer working with clients who should never need to create an account.

**Build approach:** Tracer Bullet (prove the whole pipe works with one thin real thread first, then thicken one segment at a time, end to end).
**Workflow:** Alpha (after `/develop`, run `/check verify` on the real app). This is the default level of rigor for the project. `/architect` is the recommended first stop for any feature with a real decision, but you can skip it when you already know how to build it. Any feature can carry its own tag (like `· Beta`) to do more or less.

_These are recommendations to keep your build orderly, not requirements. Skip anything that doesn't fit: if you already know how to build a feature, use `/develop` and skip `/architect`. You decide when a feature is `done`._

## At a glance

| # | Feature | Phase | Status |
|---|---------|-------|--------|
| 1 | Stack & architecture | Foundation | in-progress |
| 2 | Coding standards & tooling | Foundation | planned |
| 3 | Live preview & pin anchoring | Foundation | planned |
| 4 | Data model | Foundation | planned |
| 5 | Design system & UI foundation | Foundation | planned |
| 6 | Owner sign in | Slice 1 | planned |
| 7 | Core feedback loop | Slice 1 | planned |
| 8 | Threaded replies | Slice 2 | planned |
| 9 | Comment status & dashboard filters | Slice 3 | planned |
| 10 | Multi page browsing | Slice 4 | planned |
| 11 | Share link revoke | Slice 5 | planned |
| 12 | Privacy notice | Slice 6 | planned |
| 13 | Landing page | Slice 7 | in-progress |
| 14 | Launch readiness | Launch | planned |

## Foundations

### 1. Stack & architecture · Beta · in-progress
Pick the stack and scaffold a runnable project. The stack has to support whatever approach feature 3 picks for showing a third party site, so a proxy or server side rendering need belongs in this decision.
**Done when:** the stack is recorded in a spec, and the empty scaffold boots locally and passes a build.
spec [0001](../specs/0001-stack-architecture/index.md) · code in `src/`, `overlay/`
- [x] Decide the stack (spec): `/architect stack & architecture`
- [x] Scaffold from the decision: `/develop stack & architecture`
- [ ] Verify it: `/check verify stack & architecture`
- [ ] Test it: `/test stack & architecture`

### 2. Coding standards & tooling
Capture conventions from the real scaffolded project, then install lint, format, and pre commit checks.
**Done when:** root `AGENTS.md` reflects the real stack, and lint, format, and pre commit hooks all run clean.
- [ ] Capture conventions and tooling choices: `/audit`

### 3. Live preview & pin anchoring · needs a decision · Beta
This is the hardest and riskiest piece: rendering the client's live site inside the app with a comment overlay on top, and anchoring each pin to the page so it stays in place after scrolling, resizing, or small layout changes.
**Done when:** a real third party URL loads with the overlay, you can drop a pin on an element, and the pin lands in the same spot when the page loads again.
- [ ] Design it (spec): `/architect live preview & pin anchoring`

### 4. Data model · needs a decision
Core entities every slice builds on: owner, project (a site URL), share link, client identity (name and email), page, pin with its anchor, comment, reply, and status.
**Done when:** the entities support replies, statuses, multiple pages, and link revoke without a breaking migration, and the pin anchor shape matches the feature 3 decision.
- [ ] Design it (spec): `/architect data model`

### 5. Design system & UI foundation · needs a decision
A visual language and base components for the dashboard and the comment overlay. The overlay has to look clean on top of any client site without clashing with its styles.
**Done when:** `design.md` covers type, color, spacing, and components, and base components meet WCAG AA with full keyboard focus and screen reader labels.
- [ ] Design it (spec): `/architect design system & UI foundation`

## Slice 1: Core feedback loop

### 6. Owner sign in · needs a decision
Real sign in for you, the owner, so the dashboard and projects are private from the first slice.
**Done when:** you can sign up, sign in, and sign out, and the dashboard can't be reached when you're signed out.
- [ ] Design it (spec): `/architect owner sign in`

### 7. Core feedback loop · needs a decision
This is the thinnest real thread and doubles as the walking skeleton. You create a project from one URL and copy its share link. The client opens it, enters a name and email, and pins a comment on the live page. You then see that comment in your dashboard. Single page only for now: no replies, statuses, or revoke yet.
**Done when:** a comment the client pins on a real URL through the share link shows up in your dashboard with the client's name, and opening it highlights the same spot on the page; share pages are marked noindex.
- [ ] Design it (spec): `/architect core feedback loop`

## Slice 2: Threaded replies

### 8. Threaded replies
You and the client can reply under any pin, so a piece of feedback becomes a conversation instead of one way notes.
**Done when:** both sides can add replies to a pin, replies show in order with their author, and the client sees your replies the next time they open the link.
- [ ] Build it: `/develop threaded replies`

## Slice 3: Comment status & dashboard filters

### 9. Comment status & dashboard filters
Move each pin through open, in progress, and resolved, and filter the dashboard by status so you can triage fast.
**Done when:** you can change a pin's status, the dashboard filters by status and shows counts, and resolved pins are muted in the preview.
- [ ] Build it: `/develop comment status & dashboard filters`

## Slice 4: Multi page browsing

### 10. Multi page browsing
The client can click through the site inside the preview, and every pin remembers which page it belongs to.
**Done when:** pins left on different pages show only on their own page, and the dashboard groups or filters comments by page.
- [ ] Build it: `/develop multi page browsing`

## Slice 5: Share link revoke

### 11. Share link revoke
Turn a project's share link off from the dashboard, and issue a fresh one when you need to.
**Done when:** a revoked link shows a clear "link no longer active" page, existing comments are kept, and a newly issued link works right away.
- [ ] Build it: `/develop share link revoke`

## Slice 6: Privacy notice

### 12. Privacy notice
A short notice at the client's name and email step plus a privacy page, since you store real people's details.
**Done when:** the client sees the notice and a link to the privacy page before submitting their name and email, and the privacy page explains what's stored and how to ask for removal.
- [ ] Build it: `/develop privacy notice`

## Slice 7: Landing page

### 13. Landing page · in-progress
One public page explaining the app, with SEO basics. The app itself stays behind sign in.
**Done when:** the landing page has a title, description, social card, and sitemap entry, links to sign in, and meets WCAG AA.
spec [0002](../specs/0002-landing-page/index.md) (assumed decision, spec 0002) · code in `src/app/page.tsx`, `src/components/landing/`
- [ ] Design it (spec): `/architect landing page`
- [x] Build it: `/develop landing page`
- [ ] Verify it: `/check verify landing page`

## Launch

### 14. Launch readiness · needs a decision
Get ready before a real client opens a share link: paid hosting and database plans, both production domains, removing the keep alive job, and giving each project its own viewer subdomain so one client site can't read another's viewer storage.
**Done when:** the app runs on commercial plans at both production domains, the keep alive job is gone, and each project's proxied site loads from its own viewer subdomain.
- [ ] Design it (spec): `/architect launch readiness`

## Deferred
Left out of this build pass, but kept here so the plan stays honest.
- **Email notifications**: email you on a new comment, email the client on a reply or resolve · needs a decision
- **Realtime updates**: new pins and replies appear live without a refresh · needs a decision
- **Pin context capture**: a screenshot, viewport, and browser recorded with each pin · needs a decision
- **Device viewport switcher**: desktop, tablet, and mobile widths, with pins tied to a viewport
- **Share link password & expiry**: an optional password and expiry date on each link
- **Image & PDF feedback**: pin comments on uploaded mockups as well as live URLs · needs a decision
- **Teams & workspaces**: invite teammates to share projects · needs a decision
- **Billing & plans**: free and paid tiers · needs a decision · GA
- **Error monitoring**: catch crashes in the dashboard and the overlay · needs a decision
- **Multiple languages**: translated client UI · needs a decision

## Legend

**The decision box.** Every feature carries at most one, the step whose label ends with `(spec)`. Its wording varies (`Design it (spec)` normally, `Decide the stack (spec)` on Stack & architecture), so skills find it by that `(spec)` ending, never by an exact label. Every other box is an execution box, and `/architect` never ticks one.

**Feature lifecycle**: the scope updates as a feature moves. Each row shows what the feature looks like and who sets it:

| State | Set by | The feature shows |
|---|---|---|
| `planned` · needs a decision | `/scope` | one box: `Design it (spec): /architect <feature>` |
| `planned` | `/scope` | one box: `Build it: /develop <feature>` |
| `in-progress` (designed) | `/architect` at spec capture | `Design it` ticked; spec linked; `Build it: /develop <feature>` with 2 to 5 milestones; the tier's closing boxes (`Verify it` Alpha and up, `Test it` Beta and up, `Review it` and `Document it` GA) |
| `in-progress` (building) | `/develop` | milestone boxes tick one by one; code pointer filled |
| `in-progress` (verified) | `/check verify` | `Build it` and milestones ticked; `Verify it` ticked |
| `done` | you, when you decide (any skill sets it when you say so); `/sync` reconciles | the boxes you ran are ticked, skipped ones marked skipped; the tier's last stage is the suggested point to call it done |

- **Next step** = the first unticked box (always a command or a tracked milestone).
- **needs a decision** = run `/architect` first; otherwise go straight to `/develop` (or `/audit` for standards & tooling). The tag drops once the spec is captured.
- **Atomic build tasks live in the spec's `## Build plan`, not here.** The scope carries only the milestone rollup.
- **Status**: `planned` → `in-progress` → `done`, plus `existing` (built before this workflow) and `dropped` (taken out of scope, kept for history).
- **Approach tag** beside a heading (like `· Facade`) overrides the project default for that feature; no tag means it inherits the default.
- **Workflow tier tag** beside a heading (like `· Beta`) sets that one feature's rigor above or below the project default; no tag means it inherits. It decides the feature's check boxes and what each skill suggests next.
- **Workflow** (header line) is the project default for what runs after `/develop`: **Prototype** = nothing (trust develop's own build time self check); **Alpha** = `/check verify`; **Beta** = `/check verify` then `/test`; **GA** = adds a fresh model `/check review` then `/document`. A feature built on a decision that hasn't been ratified yet (an `Assumed` spec) stays flagged, but that never blocks `done`.
- **Pointer line** (`spec <n> · code in <path>`): the spec link is added by `/architect`, the code path by `/develop`.
