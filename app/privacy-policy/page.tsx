import type { Metadata } from "next";
import { env } from "@/env";

export const metadata: Metadata = {
  title: `Privacy Policy - ${env.NEXT_PUBLIC_APP_NAME}`,
  description: `Privacy Policy for ${env.NEXT_PUBLIC_APP_NAME}. Learn about how we collect, use, and protect your personal information.`,
};

export default function PrivacyPolicyPage() {
  return <div>Privacy Policy</div>;
}
