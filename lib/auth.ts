import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { env } from "@/env";
import { sendEmail } from "./mail-sender";
import { twoFactor } from "better-auth/plugins";

export const auth = betterAuth({
  appName: env.NEXT_PUBLIC_APP_NAME,
  database: prismaAdapter(prisma, {
    provider: "postgresql", // or "mysql", "postgresql", ...etc
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    requireEmailVerification: false,
    sendResetPassword: async ({ user, url, token }, request) => {
      await sendEmail({
        to: user.email,
        subject: "Reset your password",
        text: `Click the link to reset your password: ${url}`,
      });
    },
    onPasswordReset: async ({ user }, request) => {
      // your logic here
      console.log(`Password for user ${user.email} has been reset.`);
    },
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url, token }, request) => {
      await sendEmail({
        to: user.email,
        subject: "Verify your email address",
        text: `Click the link to verify your email: ${url}`,
      });
    },
  },
  socialProviders: {
    github: {
      clientId: env.BETTER_AUTH_GITHUB_CLIENT_ID || "",
      clientSecret: env.BETTER_AUTH_GITHUB_CLIENT_SECRET || "",
    },
    google: {
      clientId: env.BETTER_AUTH_GOOGLE_CLIENT_ID || "",
      clientSecret: env.BETTER_AUTH_GOOGLE_CLIENT_SECRET || "",
    },
  },
  plugins: [twoFactor()],
});

export type Session = typeof auth.$Infer.Session;
