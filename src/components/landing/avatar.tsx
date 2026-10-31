const tones = {
  orange: "bg-accent-soft text-accent-ink",
  blue: "bg-card-blue text-info",
  mint: "bg-card-mint text-success",
  lavender: "bg-card-lavender text-ink",
} as const;

const sizes = {
  sm: "size-6 text-micro",
  md: "size-8 text-mini",
  lg: "size-14 text-base",
} as const;

type AvatarProps = {
  initials: string;
  tone?: keyof typeof tones;
  size?: keyof typeof sizes;
  className?: string;
};

// Initials avatar for the illustrated mockups (spec 0002: no photos).
export function Avatar({
  initials,
  tone = "orange",
  size = "md",
  className = "",
}: AvatarProps) {
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-full font-bold ring-2 ring-surface ${tones[tone]} ${sizes[size]} ${className}`}
    >
      {initials}
    </span>
  );
}
