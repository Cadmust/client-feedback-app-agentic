import { MessageSquare } from "lucide-react";
import { siteName } from "@/lib/site";

export function Wordmark() {
  return (
    <span className="inline-flex items-center gap-2 text-lg font-bold tracking-tight whitespace-nowrap text-ink">
      <MessageSquare
        aria-hidden="true"
        className="size-7 text-accent-bright"
        strokeWidth={2.5}
      />
      {siteName}
    </span>
  );
}
