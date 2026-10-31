import type { Metadata } from "next";
import { Hero } from "@/components/landing/hero";
import { HowItWorks } from "@/components/landing/how-it-works";
import { SiteFooter } from "@/components/landing/site-footer";
import { SiteHeader } from "@/components/landing/site-header";
import { WaveBackground } from "@/components/landing/wave-background";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <div className="relative isolate flex flex-1 flex-col overflow-x-clip">
      <a
        href="#main"
        className="sr-only rounded-full bg-ink px-4 py-2 text-sm font-semibold text-canvas focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-10"
      >
        Skip to content
      </a>
      <WaveBackground />
      <SiteHeader />
      <main id="main" className="flex-1">
        <Hero />
        <HowItWorks />
      </main>
      <SiteFooter />
    </div>
  );
}
