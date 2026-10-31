import { z } from "zod";

const serverSchema = z.object({
  DATABASE_URL: z.url(),
  APP_ORIGIN: z.url(),
  VIEWER_ORIGIN: z.url(),
  CRON_SECRET: z.string().min(16),
});

const clientSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.url(),
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: z.string().min(1),
});

type Env = z.infer<typeof serverSchema> & z.infer<typeof clientSchema>;

const isServer = typeof window === "undefined";
const skipValidation = process.env.SKIP_ENV_VALIDATION === "1";

function parse<T extends z.ZodObject>(
  schema: T,
  values: Record<string, string | undefined>,
): z.infer<T> {
  if (skipValidation) return values as z.infer<T>;
  const result = schema.safeParse(values);
  if (!result.success) {
    throw new Error(
      `Invalid environment variables:\n${z.prettifyError(result.error)}`,
    );
  }
  return result.data;
}

// Each NEXT_PUBLIC_* var is referenced by its literal name so Next.js can
// inline it into the client bundle.
const clientEnv = parse(clientSchema, {
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY:
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
});

const serverEnv = isServer ? parse(serverSchema, process.env) : {};

export const env = new Proxy({ ...clientEnv, ...serverEnv } as Env, {
  get(target, prop) {
    if (
      !isServer &&
      typeof prop === "string" &&
      !prop.startsWith("NEXT_PUBLIC_")
    ) {
      throw new Error(`Server env var ${prop} was read in client code.`);
    }
    return Reflect.get(target, prop);
  },
});
