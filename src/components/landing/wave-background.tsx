// Soft ribbon pattern behind the hero, matching the reference's canvas.
export function WaveBackground() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[56rem] w-full text-canvas-pattern"
      preserveAspectRatio="none"
      viewBox="0 0 1440 900"
      fill="none"
    >
      <path
        d="M-80 180C180 60 320 320 560 230S920 20 1160 140 1480 300 1560 220"
        stroke="currentColor"
        strokeWidth="70"
        strokeLinecap="round"
        opacity="0.55"
      />
      <path
        d="M-120 520C120 400 300 640 600 560S1020 360 1260 480 1500 640 1580 560"
        stroke="currentColor"
        strokeWidth="90"
        strokeLinecap="round"
        opacity="0.4"
      />
      <path
        d="M980 -40C1100 120 1300 80 1480 200"
        stroke="currentColor"
        strokeWidth="60"
        strokeLinecap="round"
        opacity="0.5"
      />
    </svg>
  );
}
