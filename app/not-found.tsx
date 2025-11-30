import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-lg text-center space-y-8">
          <div className="space-y-4">
            <div className="relative">
              <h1 className="text-[10rem] font-bold leading-none tracking-tighter text-primary/10 select-none sm:text-[12rem]">
                404
              </h1>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="space-y-2">
                  <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
                    Error 404
                  </p>
                  <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                    Page not found
                  </h2>
                </div>
              </div>
            </div>
          </div>

          <p className="text-muted-foreground text-lg max-w-md mx-auto">
            Oops! The page you&apos;re looking for doesn&apos;t exist or has
            been moved to another location.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button size="lg" asChild>
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/dashboard">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Go to Dashboard
              </Link>
            </Button>
          </div>

          <div className="pt-8 border-t">
            <p className="text-sm text-muted-foreground">
              Need help?{" "}
              <Link
                href="/support#contact"
                className="text-primary underline underline-offset-4 hover:text-primary/80"
              >
                Contact support
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
