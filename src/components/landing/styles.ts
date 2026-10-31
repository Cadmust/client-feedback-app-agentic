// Shared class strings for the landing page's real (interactive) controls.

const focusRing =
  "outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

export const primaryButton = `inline-flex min-h-11 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-accent px-5 text-sm font-semibold text-accent-contrast shadow-card transition-colors duration-150 ease-standard hover:bg-accent-pressed active:bg-accent-pressed disabled:cursor-not-allowed disabled:opacity-70 ${focusRing}`;

export const secondaryButton = `inline-flex min-h-11 items-center justify-center whitespace-nowrap rounded-full border border-border-strong bg-surface px-5 text-sm font-semibold text-ink transition-colors duration-150 ease-standard hover:bg-surface-muted ${focusRing}`;

export const textLink = `rounded-sm text-sm font-medium text-body transition-colors duration-150 ease-standard hover:text-ink ${focusRing}`;
