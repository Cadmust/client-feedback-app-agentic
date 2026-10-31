import { env } from "@/lib/env";

export const siteName = "Client Feedback";
export const siteDescription =
  "Share a link to your live site. Clients pin comments right on the page, no account needed, and you resolve everything in one inbox.";

// APP_ORIGIN is the canonical origin (spec 0001). A CI build with
// SKIP_ENV_VALIDATION=1 may not have it, so fall back to local dev.
export const siteUrl = new URL(env.APP_ORIGIN || "http://localhost:3000");
