import Link from "next/link";
import { siteName } from "@/lib/site";
import { textLink } from "./styles";
import { Wordmark } from "./wordmark";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface-muted">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex flex-col gap-2">
          <Wordmark />
          <p className="text-sm text-body">
            Feedback on live sites, for freelancers and their clients.
          </p>
        </div>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap items-center gap-6">
            <li>
              <a href="#how-it-works" className={textLink}>
                How it works
              </a>
            </li>
            <li>
              <Link href="/sign-in" className={textLink}>
                Sign in
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <p className="mx-auto w-full max-w-6xl px-4 pb-8 text-sm text-body sm:px-6">
        © 2026 {siteName}
      </p>
    </footer>
  );
}
