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
    requireEmailVerification: env.AUTH_REQUIRED_EMAIL_VERIFICATION,
    sendResetPassword: async ({ user, url }) => {
      await sendEmail({
        to: user.email,
        subject: "Reset your password",
        text: `Click the link to reset your password: ${url}`,
      });
    },
    onPasswordReset: async ({ user }) => {
      await sendEmail({
        to: user.email,
        subject: "Password reset",
        text: `Your password has been reset.`,
      });
    },
  },
  user: {
    changeEmail: {
      enabled: true,
    },
    deleteUser: {
      enabled: true,
      sendDeleteAccountVerification: async ({ user, url }) => {
        await sendEmail({
          to: user.email,
          subject: "Verify deletion of your account",
          text: `Click the link to verify your account deletion: ${url}`,
        });
      },
    },
  },
  emailVerification: {
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url }) => {
      await sendEmail({
        to: user.email,
        subject: "Verify your email address",
        text: `Click the link to verify your email: ${url}`,
      });
    },
  },
  socialProviders: {
    github: {
      clientId: env.AUTH_GITHUB_CLIENT_ID || "",
      clientSecret: env.AUTH_GITHUB_CLIENT_SECRET || "",
    },
    google: {
      clientId: env.AUTH_GOOGLE_CLIENT_ID || "",
      clientSecret: env.AUTH_GOOGLE_CLIENT_SECRET || "",
    },
  },
  plugins: [twoFactor()],
});

export type Session = typeof auth.$Infer.Session;
