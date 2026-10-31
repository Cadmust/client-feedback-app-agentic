import type { LucideIcon } from "lucide-react";

const tones = {
  yellow: "bg-card-yellow",
  blue: "bg-card-blue",
  mint: "bg-card-mint",
  lavender: "bg-card-lavender",
  cream: "bg-card-cream",
} as const;

type FeatureCardProps = {
  id?: string;
  title: string;
  icon: LucideIcon;
  tone: keyof typeof tones;
  // Read to screen readers in place of the illustration.
  summary: string;
  className?: string;
  children: React.ReactNode;
};

export function FeatureCard({
  id,
  title,
  icon: Icon,
  tone,
  summary,
  className = "",
  children,
}: FeatureCardProps) {
  return (
    <article
      id={id}
      className={`relative flex scroll-mt-6 flex-col gap-4 overflow-hidden rounded-3xl p-5 ${tones[tone]} ${className}`}
    >
      <h3 className="flex items-center gap-3 text-base font-bold text-ink">
        <span className="inline-flex size-9 items-center justify-center rounded-full bg-surface shadow-card">
          <Icon
            aria-hidden="true"
            className="size-4 text-ink"
            strokeWidth={2.25}
          />
        </span>
        {title}
      </h3>
      <p className="sr-only">{summary}</p>
      <div aria-hidden="true" className="flex flex-1 flex-col">
        {children}
      </div>
    </article>
  );
}
