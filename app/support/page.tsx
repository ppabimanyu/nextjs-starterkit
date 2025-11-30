import type { Metadata } from "next";
import Link from "next/link";
import { env } from "@/env";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Search,
  HelpCircle,
  CreditCard,
  Shield,
  Settings,
  Users,
  Mail,
  MessageSquare,
  Clock,
  Phone,
  Send,
  Headphones,
} from "lucide-react";

export const metadata: Metadata = {
  title: `Support - ${env.NEXT_PUBLIC_APP_NAME}`,
  description: `Get help and support for ${env.NEXT_PUBLIC_APP_NAME}. Browse FAQs or contact our support team.`,
};

const faqCategories = [
  {
    title: "Getting Started",
    icon: HelpCircle,
    questions: [
      {
        question: "How do I create an account?",
        answer:
          "To create an account, click the 'Sign Up' button on the homepage. Enter your email address, create a password, and follow the verification steps. You'll receive a confirmation email to activate your account.",
      },
      {
        question: "How do I reset my password?",
        answer:
          "Click 'Forgot Password' on the sign-in page. Enter your email address and we'll send you a link to reset your password. The link expires after 24 hours for security purposes.",
      },
      {
        question: "Can I change my email address?",
        answer:
          "Yes, you can change your email address in your account settings. Go to Settings > Profile and click 'Change Email'. You'll need to verify your new email address before the change takes effect.",
      },
    ],
  },
  {
    title: "Account & Security",
    icon: Shield,
    questions: [
      {
        question: "How do I enable two-factor authentication?",
        answer:
          "Navigate to Settings > Security and click 'Enable Two-Factor Authentication'. You can use an authenticator app like Google Authenticator or Authy. Scan the QR code and enter the verification code to complete setup.",
      },
      {
        question: "How do I delete my account?",
        answer:
          "To delete your account, go to Settings > Account > Delete Account. Please note that this action is irreversible and all your data will be permanently deleted. You'll need to confirm your password to proceed.",
      },
      {
        question: "What should I do if I suspect unauthorized access?",
        answer:
          "Immediately change your password and enable two-factor authentication if not already enabled. Review your recent activity in Settings > Security > Sessions and sign out of any unrecognized devices. Contact our support team if you need further assistance.",
      },
    ],
  },
  {
    title: "Billing & Payments",
    icon: CreditCard,
    questions: [
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for annual subscriptions. All payments are processed securely through our payment providers.",
      },
      {
        question: "How do I update my payment information?",
        answer:
          "Go to Settings > Billing > Payment Methods. You can add a new payment method or update existing ones. Changes will apply to your next billing cycle.",
      },
      {
        question: "Can I get a refund?",
        answer:
          "We offer a 30-day money-back guarantee for new subscriptions. If you're not satisfied, contact our support team within 30 days of your purchase for a full refund. Refunds are processed within 5-10 business days.",
      },
    ],
  },
  {
    title: "Features & Usage",
    icon: Settings,
    questions: [
      {
        question: "How do I customize my dashboard?",
        answer:
          "Your dashboard is customizable through Settings > Preferences. You can rearrange widgets, change themes, and adjust notification settings to suit your workflow.",
      },
      {
        question: "Is there a mobile app available?",
        answer:
          "Yes, our mobile app is available for both iOS and Android devices. Download it from the App Store or Google Play Store. Sign in with your existing account credentials.",
      },
      {
        question: "What are the system requirements?",
        answer:
          "Our web application works on all modern browsers (Chrome, Firefox, Safari, Edge). We recommend using the latest version of your browser for the best experience. No additional software installation is required.",
      },
    ],
  },
  {
    title: "Teams & Collaboration",
    icon: Users,
    questions: [
      {
        question: "How do I invite team members?",
        answer:
          "Go to Settings > Team > Invite Members. Enter their email addresses and select their role (Admin, Member, or Viewer). They'll receive an invitation email to join your team.",
      },
      {
        question: "What are the different user roles?",
        answer:
          "We have three roles: Admin (full access including billing and team management), Member (can create and edit content), and Viewer (read-only access). Role permissions can be customized by team admins.",
      },
      {
        question: "How do I transfer ownership of my account?",
        answer:
          "Account ownership can be transferred to another admin. Go to Settings > Team > Transfer Ownership. The new owner must be an existing admin and will need to accept the transfer request.",
      },
    ],
  },
];

export default function SupportPage() {
  const appName = env.NEXT_PUBLIC_APP_NAME || "Our Service";

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto max-w-6xl px-4 py-16 md:py-24">
          <div className="text-center">
            <div className="mb-4 inline-flex items-center rounded-full border bg-background px-4 py-1.5 text-sm">
              <Headphones className="mr-2 h-4 w-4 text-primary" />
              We&apos;re here to help
            </div>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              Support Center
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
              Find answers to common questions or get in touch with our support
              team. We&apos;re ready to help you with {appName}.
            </p>
            <div className="relative mx-auto max-w-md">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search for help..."
                className="h-12 pl-10 pr-4"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="border-y bg-muted/30">
        <div className="container mx-auto max-w-6xl px-4 py-12">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-start gap-4 rounded-lg border bg-card p-6 transition-shadow hover:shadow-md">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Email Us</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  We&apos;ll respond within 24h
                </p>
                <a
                  href="mailto:support@example.com"
                  className="mt-2 inline-flex items-center text-sm text-primary hover:underline"
                >
                  support@example.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-lg border bg-card p-6 transition-shadow hover:shadow-md">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Call Us</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Mon-Fri, 9am-6pm
                </p>
                <a
                  href="tel:+1234567890"
                  className="mt-2 inline-flex items-center text-sm text-primary hover:underline"
                >
                  +1 (234) 567-890
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-lg border bg-card p-6 transition-shadow hover:shadow-md">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Live Chat</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Quick answers in real-time
                </p>
                <button className="mt-2 inline-flex items-center text-sm text-primary hover:underline">
                  Start a chat
                </button>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-lg border bg-card p-6 transition-shadow hover:shadow-md">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Business Hours</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Mon-Fri: 9am-6pm
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Sat: 10am-4pm
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto max-w-6xl px-4 py-16">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold">Frequently Asked Questions</h2>
          <p className="text-muted-foreground">
            Browse through our most common questions and answers
          </p>
        </div>

        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {faqCategories.map((category) => (
            <a
              key={category.title}
              href={`#${category.title.toLowerCase().replace(/\s+/g, "-")}`}
              className="flex items-center gap-3 rounded-lg border bg-card p-4 transition-shadow hover:shadow-md"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <category.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-sm">{category.title}</h3>
                <p className="text-xs text-muted-foreground">
                  {category.questions.length} articles
                </p>
              </div>
            </a>
          ))}
        </div>

        <div className="space-y-12">
          {faqCategories.map((category) => (
            <div
              key={category.title}
              id={category.title.toLowerCase().replace(/\s+/g, "-")}
            >
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <category.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-xl font-bold">{category.title}</h3>
              </div>
              <Accordion type="single" collapsible className="w-full">
                {category.questions.map((item, index) => (
                  <AccordionItem key={index} value={`${category.title}-${index}`}>
                    <AccordionTrigger className="text-left">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="border-t bg-muted/30">
        <div className="container mx-auto max-w-4xl px-4 py-16">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold">Contact Us</h2>
            <p className="text-muted-foreground">
              Can&apos;t find what you&apos;re looking for? Send us a message
              and we&apos;ll get back to you.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Send us a message</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First name</Label>
                    <Input id="firstName" placeholder="John" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last name</Label>
                    <Input id="lastName" placeholder="Doe" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    placeholder="How can we help you?"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <textarea
                    id="message"
                    rows={5}
                    className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Tell us more about your inquiry..."
                    required
                  />
                </div>

                <Button type="submit" size="lg">
                  <Send className="mr-2 h-4 w-4" />
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <footer className="border-t">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-8 md:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} {appName}. All rights reserved.
          </p>
          <nav className="flex gap-4 text-sm text-muted-foreground">
            <Link href="/privacy-policy" className="hover:underline">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="hover:underline">
              Terms of Service
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
