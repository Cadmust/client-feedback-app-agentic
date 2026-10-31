import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    // Share pages (/s/) are private client links and are also marked noindex.
    rules: { userAgent: "*", allow: "/", disallow: "/s/" },
    sitemap: new URL("/sitemap.xml", siteUrl).toString(),
  };
}
