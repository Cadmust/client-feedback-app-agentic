import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier/flat";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Named exports only (AGENTS.md); Next.js file conventions and tool configs
  // are the exceptions that must export default.
  {
    rules: {
      "import/no-default-export": "error",
    },
  },
  {
    files: [
      "src/app/**/{page,layout,template,default,loading,error,global-error,not-found,forbidden,unauthorized,route}.{ts,tsx}",
      "src/app/**/{opengraph-image,twitter-image,icon,apple-icon,robots,sitemap,manifest}.{ts,tsx}",
      "*.config.{ts,mjs,js}",
      "overlay/vite.config.ts",
    ],
    rules: {
      "import/no-default-export": "off",
    },
  },
  // Turns off style rules that Prettier owns; keep last.
  prettier,
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "public/overlay/**",
    ".agents/**",
    ".claude/**",
  ]),
]);

export default eslintConfig;
