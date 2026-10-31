import Link from "next/link";
import { primaryButton, secondaryButton, textLink } from "./styles";
import { Wordmark } from "./wordmark";

const navLinks = [
  { href: "#how-it-works", label: "How it works" },
  { href: "#no-login", label: "Why no login" },
];

export function SiteHeader() {
  return (
    <header className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-5 sm:px-6">
      <Link
        href="/"
        aria-label="Client Feedback home"
        className="rounded-md outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
      >
        <Wordmark />
      </Link>

      <nav aria-label="Main" className="hidden md:block">
        <ul className="flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} className={textLink}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex items-center gap-2 sm:gap-3">
        <Link href="/sign-in" className={`${secondaryButton} max-sm:hidden`}>
          Sign in
        </Link>
        <Link href="/sign-in" className={primaryButton}>
          Start free
        </Link>
      </div>
    </header>
  );
}
