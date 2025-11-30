import Link from "next/link";
import { Button } from "@/components/ui/button";
import { env } from "@/env";

export default function Home() {
  const appName = env.NEXT_PUBLIC_APP_NAME || "Starter Kit";

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold">{appName}</span>
          </Link>
          <nav className="flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link href="/auth/sign-in">Sign In</Link>
            </Button>
            <Button asChild>
              <Link href="/auth/sign-up">Register</Link>
            </Button>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <section className="container mx-auto flex flex-col items-center justify-center gap-6 px-4 py-24 text-center md:py-32">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Build your next project
            <br />
            <span className="text-primary">faster than ever</span>
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground md:text-xl">
            A modern, full-stack starter kit with authentication, database, and
            everything you need to ship your product quickly.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/auth/sign-up">Get Started</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/dashboard">View Dashboard</Link>
            </Button>
          </div>
        </section>

        <section className="border-t bg-muted/50">
          <div className="container mx-auto px-4 py-16 md:py-24">
            <h2 className="mb-12 text-center text-3xl font-bold">Features</h2>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="rounded-lg border bg-card p-6">
                <h3 className="mb-2 text-xl font-semibold">Authentication</h3>
                <p className="text-muted-foreground">
                  Secure authentication with email/password, social logins, and
                  two-factor authentication.
                </p>
              </div>
              <div className="rounded-lg border bg-card p-6">
                <h3 className="mb-2 text-xl font-semibold">Database Ready</h3>
                <p className="text-muted-foreground">
                  Prisma ORM integration with PostgreSQL for type-safe database
                  operations.
                </p>
              </div>
              <div className="rounded-lg border bg-card p-6">
                <h3 className="mb-2 text-xl font-semibold">Modern Stack</h3>
                <p className="text-muted-foreground">
                  Built with Next.js, TypeScript, Tailwind CSS, and shadcn/ui
                  components.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

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
