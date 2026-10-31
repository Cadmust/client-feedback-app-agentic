import {
  ChevronRight,
  CircleCheck,
  Eye,
  Flame,
  Inbox,
  Link2,
  MoreVertical,
  Plus,
  ShieldCheck,
  Sparkles,
  UserRound,
  Zap,
} from "lucide-react";
import { Avatar } from "./avatar";
import { FeatureCard } from "./feature-card";

// Everything inside a card body is an illustration (aria-hidden). Mock
// controls are spans, never real buttons, so they never take focus.

function Pin({ n, className = "" }: { n: number; className?: string }) {
  return (
    <span
      className={`absolute inline-flex size-6 items-center justify-center rounded-full bg-accent text-mini font-bold text-accent-contrast shadow-float ring-2 ring-surface ${className}`}
    >
      {n}
    </span>
  );
}

function ShareLinkCard() {
  return (
    <FeatureCard
      title="Share a Link"
      icon={Link2}
      tone="yellow"
      summary="Paste your site's address and copy one share link to send your client."
    >
      <svg
        className="absolute top-5 right-6 h-12 w-20 text-ink"
        viewBox="0 0 80 48"
        fill="none"
      >
        <path
          d="M4 6c26-6 52 4 62 30"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M58 32l8 6 4-10"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <div className="my-auto flex items-center gap-2 rounded-full bg-surface p-1.5 pl-3 shadow-card">
        <Link2 className="size-4 shrink-0 text-muted" />
        <span className="min-w-0 flex-1 truncate text-sm text-body">
          staging.yoursite.com
        </span>
        <span className="rounded-full bg-accent px-3 py-1.5 text-xs font-semibold text-accent-contrast">
          Copy Link
        </span>
      </div>
    </FeatureCard>
  );
}

function NoLoginCard() {
  return (
    <FeatureCard
      id="no-login"
      title="No Login Needed"
      icon={UserRound}
      tone="blue"
      summary="Your client opens the link, types a name, and leaves feedback. No account, no password."
      className="lg:flex-1"
    >
      <div className="relative mt-2 ml-8 rounded-2xl bg-surface p-4 pl-10 shadow-card">
        <Avatar
          initials="AT"
          tone="orange"
          size="lg"
          className="absolute top-3 -left-7"
        />
        <p className="text-xs font-semibold text-ink">Your Name</p>
        <p className="mt-1.5 rounded-lg border border-border px-3 py-1.5 text-xs text-ink">
          Alex Taylor
        </p>
        <p className="mt-2.5 flex min-h-14 items-start gap-1 rounded-lg border border-border px-3 py-2 text-xs text-ink">
          Love the new layout!
          <Flame className="size-3.5 text-accent-bright" />
        </p>
        <div className="mt-3 flex justify-end">
          <span className="rounded-full bg-info px-3.5 py-1.5 text-xs font-semibold text-info-contrast">
            Submit Feedback
          </span>
        </div>
      </div>
    </FeatureCard>
  );
}

function ReviewLiveCard() {
  const features = [
    { icon: Zap, title: "Fast", text: "Built for speed and performance." },
    { icon: ShieldCheck, title: "Secure", text: "Enterprise grade security." },
    { icon: Sparkles, title: "Flexible", text: "Works the way you do." },
  ];

  return (
    <FeatureCard
      title="Review Live"
      icon={Eye}
      tone="mint"
      summary="Your client sees the real, running site and pins comments right where they want changes."
    >
      <div className="flex flex-1 gap-3">
        <div className="flex flex-col items-center gap-3 pt-10">
          <Avatar initials="MR" tone="orange" />
          <Avatar initials="JK" tone="blue" />
          <Avatar initials="SL" tone="lavender" />
          <span className="inline-flex size-8 items-center justify-center rounded-full border border-border-strong bg-surface text-muted">
            <Plus className="size-4" />
          </span>
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-3">
          <div className="relative rounded-2xl bg-surface p-3 shadow-card">
            <div className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-accent-bright" />
              <span className="size-2 rounded-full bg-card-yellow" />
              <span className="size-2 rounded-full bg-success" />
            </div>
            <div className="mt-3 flex items-center justify-between gap-2 text-micro text-body">
              <span className="font-bold text-ink">YourSite</span>
              <span className="hidden gap-2 sm:flex">
                <span>Features</span>
                <span>Pricing</span>
                <span>Blog</span>
                <span>Contact</span>
              </span>
              <span className="rounded-full bg-info px-2 py-0.5 font-semibold text-info-contrast">
                Sign Up
              </span>
            </div>

            <div className="mt-4 grid grid-cols-[1fr_auto] gap-3">
              <div>
                <p className="text-lg leading-tight font-extrabold text-ink">
                  Build better experiences.
                </p>
                <p className="mt-1.5 text-micro text-body">
                  A modern platform for growing teams.
                </p>
                <span className="mt-3 inline-block rounded-full bg-ink px-2.5 py-1 text-micro font-semibold text-canvas">
                  Get Started
                </span>
              </div>
              <div className="relative flex h-24 w-24 items-end justify-center rounded-xl bg-card-cream sm:w-28">
                <svg className="h-20 w-14" viewBox="0 0 56 80" fill="none">
                  <path
                    d="M28 52C14 40 10 22 20 8c4 14 8 26 8 44Z"
                    className="fill-success"
                  />
                  <path
                    d="M28 52c14-12 18-30 8-44-4 14-8 26-8 44Z"
                    className="fill-success"
                    opacity="0.75"
                  />
                  <path
                    d="M28 54C18 46 4 44 2 30c12 2 22 10 26 24Z"
                    className="fill-success"
                    opacity="0.6"
                  />
                  <rect
                    x="16"
                    y="54"
                    width="24"
                    height="22"
                    rx="4"
                    className="fill-surface"
                  />
                </svg>
                <Pin n={1} className="top-1/3 -left-3" />
              </div>
            </div>

            <div className="relative mt-4 grid grid-cols-3 gap-2 border-t border-border pt-3">
              {features.map(({ icon: Icon, title, text }) => (
                <div key={title}>
                  <p className="flex items-center gap-1 text-micro font-bold text-ink">
                    <Icon className="size-3 text-accent-bright" />
                    {title}
                  </p>
                  <p className="mt-0.5 text-micro text-body">{text}</p>
                </div>
              ))}
              <Pin n={2} className="-bottom-6 left-1/3" />
            </div>
          </div>

          <div className="flex items-start gap-2.5 rounded-2xl bg-surface p-3 shadow-card">
            <Avatar initials="JK" tone="blue" />
            <div className="min-w-0 flex-1">
              <p className="text-xs text-ink">
                Looks great! Can we make the headline a bit smaller?
              </p>
              <p className="mt-1 text-micro text-muted">2m ago</p>
            </div>
            <span className="inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-accent text-micro font-bold text-accent-contrast">
              2
            </span>
          </div>
        </div>
      </div>
    </FeatureCard>
  );
}

function OpenInboxCard() {
  const items = [
    {
      initials: "MR",
      tone: "orange" as const,
      title: "Homepage hero",
      preview: "Looks great! Can we...",
      time: "8m",
      unread: true,
      resolved: false,
    },
    {
      initials: "SL",
      tone: "lavender" as const,
      title: "Pricing section",
      preview: "Could you clarify this line?",
      time: "24m",
      unread: true,
      resolved: false,
    },
    {
      initials: "JK",
      tone: "blue" as const,
      title: "Footer links",
      preview: "Let's update the link text.",
      time: "1h",
      unread: false,
      resolved: true,
    },
  ];

  return (
    <FeatureCard
      id="inbox"
      title="Open Inbox"
      icon={Inbox}
      tone="lavender"
      summary="Every comment from every page lands in one inbox, with unread and resolved views."
    >
      <div className="rounded-2xl bg-surface p-3 shadow-card">
        <div className="flex items-center gap-3 border-b border-border pb-2 text-xs text-body">
          <span className="flex items-center gap-1.5 border-b-2 border-accent-bright pb-1 font-semibold text-ink">
            All
            <span className="rounded-full bg-accent px-1.5 text-micro font-bold text-accent-contrast">
              5
            </span>
          </span>
          <span className="flex items-center gap-1.5 pb-1">
            Unread
            <span className="rounded-full bg-surface-muted px-1.5 text-micro font-semibold">
              2
            </span>
          </span>
          <span className="pb-1">Resolved</span>
          <MoreVertical className="ml-auto size-4 text-muted" />
        </div>
        <ul className="mt-1 divide-y divide-border">
          {items.map((item) => (
            <li key={item.title} className="flex items-center gap-2 py-2">
              <span
                className={`size-1.5 shrink-0 rounded-full ${item.unread ? "bg-accent-bright" : "bg-transparent"}`}
              />
              <Avatar initials={item.initials} tone={item.tone} size="sm" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-mini font-semibold text-ink">
                  {item.title}
                </p>
                <p className="truncate text-micro text-body">{item.preview}</p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="text-micro text-muted">{item.time}</span>
                {item.resolved ? (
                  <span className="rounded-full bg-success-soft px-1.5 text-micro font-semibold text-success">
                    Resolved
                  </span>
                ) : (
                  <span className="rounded-full bg-card-lavender px-1.5 text-micro font-semibold text-ink">
                    New
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </FeatureCard>
  );
}

function ResolveFasterCard() {
  return (
    <FeatureCard
      title="Resolve Faster"
      icon={CircleCheck}
      tone="cream"
      summary="Move each comment from open to in review to resolved, and mark it done in one click."
      className="lg:flex-1"
    >
      <div className="flex flex-wrap items-center gap-1.5 text-xs font-semibold">
        <span className="rounded-lg bg-accent-soft px-2.5 py-1.5 text-accent-ink">
          Open
        </span>
        <ChevronRight className="size-4 text-muted" />
        <span className="rounded-lg bg-surface px-2.5 py-1.5 text-ink shadow-card">
          In review
        </span>
        <ChevronRight className="size-4 text-muted" />
        <span className="flex items-center gap-1.5 rounded-lg bg-success-soft px-2.5 py-1.5 text-success">
          Resolved
          <span className="rounded-md bg-surface px-1.5 text-micro text-ink">
            12
          </span>
        </span>
      </div>
      <div className="mt-4 flex flex-1 items-center justify-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-surface px-5 py-2.5 text-sm font-semibold text-ink shadow-float">
          Mark as Resolved
          <CircleCheck className="size-5 fill-success text-surface" />
        </span>
      </div>
    </FeatureCard>
  );
}

const sideColumn =
  "flex flex-col gap-4 md:grid md:grid-cols-2 lg:flex lg:flex-col";

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      aria-labelledby="how-it-works-title"
      className="mx-auto w-full max-w-6xl scroll-mt-6 px-4 pt-8 pb-20 sm:px-6"
    >
      <h2 id="how-it-works-title" className="sr-only">
        How it works
      </h2>
      {/* Each side column stacks on its own, as in the reference. Below lg
          the side pairs sit two up, then one up on phones. */}
      <div className="grid gap-4 lg:grid-cols-[1fr_1.3fr_1fr]">
        <div className={sideColumn}>
          <ShareLinkCard />
          <NoLoginCard />
        </div>
        <ReviewLiveCard />
        <div className={sideColumn}>
          <OpenInboxCard />
          <ResolveFasterCard />
        </div>
      </div>
    </section>
  );
}
