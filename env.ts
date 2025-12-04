import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.url(),
    BETTER_AUTH_SECRET: z.string().min(1),
    BETTER_AUTH_URL: z.string().min(1),
    AUTH_GOOGLE_CLIENT_ID: z.string().optional(),
    AUTH_GOOGLE_CLIENT_SECRET: z.string().optional(),
    AUTH_GITHUB_CLIENT_ID: z.string().optional(),
    AUTH_GITHUB_CLIENT_SECRET: z.string().optional(),
    AUTH_REQUIRED_EMAIL_VERIFICATION: z.boolean().optional().default(false),
    // Storage configuration
    STORAGE_PROVIDER: z
      .enum(["local", "vercel-blob"])
      .optional()
      .default("local"),
    BLOB_READ_WRITE_TOKEN: z.string().optional(),
  },
  client: {
    NEXT_PUBLIC_SITE_URL: z.string().optional(),
    NEXT_PUBLIC_APP_NAME: z.string().optional(),
    NEXT_PUBLIC_AUTH_ENABLE_GOOGLE: z.boolean().optional(),
    NEXT_PUBLIC_AUTH_ENABLE_GITHUB: z.boolean().optional(),
    NEXT_PUBLIC_DEFAULT_AUTHENTICATED_PAGE: z
      .string()
      .optional()
      .default("/dashboard"),
    NEXT_PUBLIC_DEFAULT_UNAUTHENTICATED_PAGE: z
      .string()
      .optional()
      .default("/auth/sign-in"),
    NEXT_PUBLIC_AUTH_ENABLE_2FA: z.boolean().optional().default(false),
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
    BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
    AUTH_GOOGLE_CLIENT_ID: process.env.AUTH_GOOGLE_CLIENT_ID,
    AUTH_GOOGLE_CLIENT_SECRET: process.env.AUTH_GOOGLE_CLIENT_SECRET,
    AUTH_GITHUB_CLIENT_ID: process.env.AUTH_GITHUB_CLIENT_ID,
    AUTH_GITHUB_CLIENT_SECRET: process.env.AUTH_GITHUB_CLIENT_SECRET,
    NEXT_PUBLIC_AUTH_ENABLE_GOOGLE:
      process.env.NEXT_PUBLIC_AUTH_ENABLE_GOOGLE == "true",
    NEXT_PUBLIC_AUTH_ENABLE_GITHUB:
      process.env.NEXT_PUBLIC_AUTH_ENABLE_GITHUB == "true",
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
    NEXT_PUBLIC_DEFAULT_AUTHENTICATED_PAGE:
      process.env.NEXT_PUBLIC_DEFAULT_AUTHENTICATED_PAGE,
    NEXT_PUBLIC_DEFAULT_UNAUTHENTICATED_PAGE:
      process.env.NEXT_PUBLIC_DEFAULT_UNAUTHENTICATED_PAGE,
    NEXT_PUBLIC_AUTH_ENABLE_2FA:
      process.env.NEXT_PUBLIC_AUTH_ENABLE_2FA == "true",
    AUTH_REQUIRED_EMAIL_VERIFICATION:
      process.env.AUTH_REQUIRED_EMAIL_VERIFICATION == "true",
    // Storage configuration
    STORAGE_PROVIDER: process.env.STORAGE_PROVIDER as
      | "local"
      | "vercel-blob"
      | undefined,
    BLOB_READ_WRITE_TOKEN: process.env.BLOB_READ_WRITE_TOKEN,
  },
});
