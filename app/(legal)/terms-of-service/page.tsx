import type { Metadata } from "next";
import Link from "next/link";
import { env } from "@/env";

export const metadata: Metadata = {
  title: `Terms of Service - ${env.NEXT_PUBLIC_APP_NAME}`,
  description: `Terms of Service for ${env.NEXT_PUBLIC_APP_NAME}. Learn about the rules and regulations governing the use of our service.`,
};

export default function TermsOfServicePage() {
  const appName = env.NEXT_PUBLIC_APP_NAME || "Our Service";

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <h1 className="mb-8 text-4xl font-bold">Terms of Service</h1>
      <p className="mb-8 text-muted-foreground">
        Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
      </p>

      <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
          <p className="text-muted-foreground leading-relaxed">
            By accessing and using {appName}, you accept and agree to be bound by the terms and
            provisions of this agreement. If you do not agree to abide by these terms, please do not
            use this service.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">2. Description of Service</h2>
          <p className="text-muted-foreground leading-relaxed">
            {appName} provides users with access to a collection of resources, including various
            communications tools, forums, shopping services, search services, and personalized
            content. You understand and agree that the service is provided &quot;as-is&quot; and that {appName}{" "}
            assumes no responsibility for the timeliness, deletion, mis-delivery, or failure to
            store any user communications or personalization settings.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">3. User Account</h2>
          <p className="text-muted-foreground leading-relaxed">
            To access certain features of the service, you may be required to create an account. You
            are responsible for maintaining the confidentiality of your account credentials and for
            all activities that occur under your account. You agree to notify us immediately of any
            unauthorized use of your account.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">4. User Conduct</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            You agree not to use the service to:
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
            <li>Upload, post, or transmit any content that is unlawful, harmful, or objectionable</li>
            <li>Impersonate any person or entity or falsely state your affiliation</li>
            <li>Interfere with or disrupt the service or servers connected to the service</li>
            <li>Attempt to gain unauthorized access to any portion of the service</li>
            <li>Use the service for any illegal or unauthorized purpose</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">5. Intellectual Property</h2>
          <p className="text-muted-foreground leading-relaxed">
            The service and its original content, features, and functionality are owned by {appName}{" "}
            and are protected by international copyright, trademark, patent, trade secret, and other
            intellectual property laws.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">6. Termination</h2>
          <p className="text-muted-foreground leading-relaxed">
            We may terminate or suspend your account and access to the service immediately, without
            prior notice or liability, for any reason, including if you breach these Terms. Upon
            termination, your right to use the service will immediately cease.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">7. Limitation of Liability</h2>
          <p className="text-muted-foreground leading-relaxed">
            In no event shall {appName}, nor its directors, employees, partners, agents, suppliers,
            or affiliates, be liable for any indirect, incidental, special, consequential, or
            punitive damages, including loss of profits, data, or other intangible losses, resulting
            from your access to or use of the service.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">8. Changes to Terms</h2>
          <p className="text-muted-foreground leading-relaxed">
            We reserve the right to modify or replace these terms at any time. If a revision is
            material, we will provide at least 30 days&apos; notice prior to any new terms taking effect.
            What constitutes a material change will be determined at our sole discretion.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">9. Contact Us</h2>
          <p className="text-muted-foreground leading-relaxed">
            If you have any questions about these Terms, please contact us at{" "}
            <Link href="/support#contact" className="text-primary underline underline-offset-4 hover:text-primary/80">
              our contact page
            </Link>
            .
          </p>
        </section>
      </div>

      <div className="mt-12 pt-8 border-t">
        <Link
          href="/"
          className="text-primary underline underline-offset-4 hover:text-primary/80"
        >
          &larr; Back to Home
        </Link>
      </div>
    </div>
  );
}
