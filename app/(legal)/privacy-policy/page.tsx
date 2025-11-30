import type { Metadata } from "next";
import Link from "next/link";
import { env } from "@/env";

export const metadata: Metadata = {
  title: `Privacy Policy - ${env.NEXT_PUBLIC_APP_NAME}`,
  description: `Privacy Policy for ${env.NEXT_PUBLIC_APP_NAME}. Learn about how we collect, use, and protect your personal information.`,
};

export default function PrivacyPolicyPage() {
  const appName = env.NEXT_PUBLIC_APP_NAME || "Our Service";

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <h1 className="mb-8 text-4xl font-bold">Privacy Policy</h1>
      <p className="mb-8 text-muted-foreground">
        Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
      </p>

      <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
          <p className="text-muted-foreground leading-relaxed">
            Welcome to {appName}. We respect your privacy and are committed to protecting your
            personal data. This privacy policy explains how we collect, use, disclose, and safeguard
            your information when you use our service.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            We may collect the following types of information:
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
            <li>
              <strong>Personal Information:</strong> Name, email address, and other contact details
              you provide when creating an account
            </li>
            <li>
              <strong>Usage Data:</strong> Information about how you interact with our service,
              including pages visited, time spent, and features used
            </li>
            <li>
              <strong>Device Information:</strong> Browser type, operating system, IP address, and
              device identifiers
            </li>
            <li>
              <strong>Cookies:</strong> Small data files stored on your device to enhance your
              experience
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            We use the collected information for various purposes:
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
            <li>To provide and maintain our service</li>
            <li>To notify you about changes to our service</li>
            <li>To provide customer support</li>
            <li>To gather analysis or valuable information to improve our service</li>
            <li>To monitor the usage of our service</li>
            <li>To detect, prevent, and address technical issues</li>
            <li>To send you marketing and promotional communications (with your consent)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">4. Data Sharing and Disclosure</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            We may share your information in the following situations:
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
            <li>
              <strong>Service Providers:</strong> With third-party vendors who assist us in
              operating our service
            </li>
            <li>
              <strong>Legal Requirements:</strong> If required by law or in response to valid
              requests by public authorities
            </li>
            <li>
              <strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale
              of assets
            </li>
            <li>
              <strong>With Your Consent:</strong> For any other purpose with your explicit consent
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">5. Data Security</h2>
          <p className="text-muted-foreground leading-relaxed">
            We implement appropriate technical and organizational security measures to protect your
            personal data against unauthorized access, alteration, disclosure, or destruction.
            However, no method of transmission over the Internet is 100% secure, and we cannot
            guarantee absolute security.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">6. Data Retention</h2>
          <p className="text-muted-foreground leading-relaxed">
            We retain your personal data only for as long as necessary to fulfill the purposes for
            which it was collected, including to satisfy any legal, accounting, or reporting
            requirements. When your data is no longer needed, we will securely delete or anonymize
            it.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">7. Your Rights</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Depending on your location, you may have the following rights regarding your personal
            data:
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
            <li>The right to access your personal data</li>
            <li>The right to rectify inaccurate or incomplete data</li>
            <li>The right to erasure (&quot;right to be forgotten&quot;)</li>
            <li>The right to restrict processing</li>
            <li>The right to data portability</li>
            <li>The right to object to processing</li>
            <li>The right to withdraw consent</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">8. Cookies and Tracking</h2>
          <p className="text-muted-foreground leading-relaxed">
            We use cookies and similar tracking technologies to track activity on our service and
            store certain information. You can instruct your browser to refuse all cookies or to
            indicate when a cookie is being sent. However, if you do not accept cookies, you may not
            be able to use some portions of our service.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">9. Third-Party Links</h2>
          <p className="text-muted-foreground leading-relaxed">
            Our service may contain links to third-party websites. We are not responsible for the
            privacy practices of these external sites. We encourage you to review the privacy
            policies of any third-party sites you visit.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">10. Children&apos;s Privacy</h2>
          <p className="text-muted-foreground leading-relaxed">
            Our service is not intended for children under the age of 13. We do not knowingly
            collect personal information from children under 13. If we become aware that we have
            collected personal data from a child under 13, we will take steps to delete that
            information.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">11. Changes to This Policy</h2>
          <p className="text-muted-foreground leading-relaxed">
            We may update this privacy policy from time to time. We will notify you of any changes
            by posting the new policy on this page and updating the &quot;Last updated&quot; date. You are
            advised to review this policy periodically for any changes.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">12. Contact Us</h2>
          <p className="text-muted-foreground leading-relaxed">
            If you have any questions about this Privacy Policy, please contact us at{" "}
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
