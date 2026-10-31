"use client";

import { Link2, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useId, useRef, useState, useTransition } from "react";
import { primaryButton } from "./styles";

// Adds https:// when missing and accepts only real http(s) web addresses.
function normalizeUrl(raw: string): string | null {
  const value = raw.trim();
  if (!value) return null;
  const withScheme = /^[a-z][a-z\d+.-]*:\/\//i.test(value)
    ? value
    : `https://${value}`;
  try {
    const url = new URL(withScheme);
    const isWeb = url.protocol === "http:" || url.protocol === "https:";
    const hasHost = url.hostname.includes(".") || url.hostname === "localhost";
    return isWeb && hasHost ? url.toString() : null;
  } catch {
    return null;
  }
}

export function ReviewUrlForm() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const inputId = useId();
  const errorId = useId();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const raw = String(new FormData(event.currentTarget).get("url") ?? "");
    const url = normalizeUrl(raw);
    if (!url) {
      setError(
        raw.trim()
          ? "That doesn't look like a web address. Try something like staging.yoursite.com."
          : "Paste a link to the page you want feedback on.",
      );
      inputRef.current?.focus();
      return;
    }
    setError(null);
    startTransition(() => {
      router.push(`/sign-in?url=${encodeURIComponent(url)}`);
    });
  }

  return (
    <form
      action="/sign-in"
      method="get"
      noValidate
      onSubmit={handleSubmit}
      className="mx-auto w-full max-w-xl"
    >
      <div
        className={`flex items-center gap-2 rounded-full border bg-surface p-1.5 pl-4 shadow-float transition-colors duration-150 ease-standard focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-accent sm:gap-3 sm:pl-5 ${
          error ? "border-accent-ink" : "border-border-strong"
        }`}
      >
        <Link2 aria-hidden="true" className="size-5 shrink-0 text-muted" />
        <label htmlFor={inputId} className="sr-only">
          Link to the page you want feedback on
        </label>
        <input
          ref={inputRef}
          id={inputId}
          name="url"
          type="url"
          inputMode="url"
          autoComplete="url"
          placeholder="Paste your staging URL or review link..."
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          onChange={() => error && setError(null)}
          className="min-w-0 flex-1 bg-transparent py-2 text-base text-ink outline-none placeholder:text-muted"
        />
        <button
          type="submit"
          disabled={isPending}
          aria-busy={isPending}
          className={`${primaryButton} shrink-0`}
        >
          {isPending ? (
            <>
              <Loader2 aria-hidden="true" className="size-4 animate-spin" />
              Opening
            </>
          ) : (
            "Start review"
          )}
        </button>
      </div>
      <p
        id={errorId}
        role="alert"
        className="mt-3 min-h-5 text-sm font-medium text-accent-ink"
      >
        {error}
      </p>
    </form>
  );
}
