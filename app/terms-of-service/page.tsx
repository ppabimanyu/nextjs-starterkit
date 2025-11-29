import type { Metadata } from "next";
import Link from "next/link";
import { env } from "@/env";

export const metadata: Metadata = {
  title: `Terms of Service - ${env.NEXT_PUBLIC_APP_NAME}`,
  description: `Terms of Service for ${env.NEXT_PUBLIC_APP_NAME}. Learn about the rules and regulations governing the use of our service.`,
};

export default function TermsOfServicePage() {
  return <div>Terms of Service</div>;
}
