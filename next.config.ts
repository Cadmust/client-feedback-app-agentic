import type { NextConfig } from "next";

// Validates env at startup so a missing key fails loudly (spec 0001).
import "./src/lib/env";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  // Local VIEWER_ORIGIN is http://127.0.0.1:3000, a different origin from
  // APP_ORIGIN (http://localhost:3000); this lets dev assets load there.
  allowedDevOrigins: ["127.0.0.1"],
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
