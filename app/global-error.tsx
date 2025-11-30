"use client";

import { ThemeProvider } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { RefreshCw, Home, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <html lang="en">
      <body className="min-h-screen bg-background flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex-1 flex items-center justify-center p-6">
            <div className="w-full max-w-lg text-center space-y-8">
              <div className="space-y-4">
                <div className="relative">
                  <div className="text-[10rem] font-bold leading-none tracking-tighter text-destructive/10 select-none sm:text-[12rem]">
                    500
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="space-y-3">
                      <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
                        Error 500
                      </p>
                      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                        Something went wrong
                      </h1>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-muted-foreground text-lg max-w-md mx-auto">
                We apologize for the inconvenience. An unexpected error has
                occurred while processing your request.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button size="lg" onClick={reset}>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Try Again
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/">
                    <Home className="mr-2 h-4 w-4" />
                    Back to Home
                  </Link>
                </Button>
              </div>

              {(error.message || error.digest) && (
                <div className="pt-6">
                  <button
                    onClick={() => setShowDetails(!showDetails)}
                    className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${
                        showDetails ? "rotate-180" : ""
                      }`}
                    />
                    {showDetails ? "Hide" : "Show"} error details
                  </button>
                  {showDetails && (
                    <div className="mt-4 rounded-lg border bg-muted/50 p-4 text-left">
                      {error.digest && (
                        <p className="text-sm mb-2">
                          <span className="font-medium text-foreground">
                            Error ID:{" "}
                          </span>
                          <code className="text-xs bg-muted px-1.5 py-0.5 rounded text-destructive">
                            {error.digest}
                          </code>
                        </p>
                      )}
                      {error.message && (
                        <p className="text-sm">
                          <span className="font-medium text-foreground">
                            Message:{" "}
                          </span>
                          <span className="text-muted-foreground">
                            {error.message}
                          </span>
                        </p>
                      )}
                    </div>
                  )}
                </div>
              )}

              <div className="pt-8 border-t">
                <p className="text-sm text-muted-foreground">
                  If this problem persists, please{" "}
                  <a
                    href="/support#contact"
                    className="text-primary underline underline-offset-4 hover:text-primary/80"
                  >
                    contact support
                  </a>
                </p>
              </div>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
