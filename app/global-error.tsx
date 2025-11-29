"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

// Error boundaries must be Client Components

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    // global-error must include html and body tags
    <html>
      <body className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="w-full max-w-md text-center space-y-4">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight text-foreground">
              Oops!
            </h1>
            <h2 className="text-xl font-semibold text-muted-foreground">
              Something went wrong
            </h2>
          </div>
          <p className="text-muted-foreground">
            We apologize for the inconvenience. An unexpected error has
            occurred.
          </p>
          <div className="flex justify-between items-start gap-4">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className="flex justify-start gap-1">
                  Error details
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-start">
                    <span className="text-primary">{error.digest}</span>
                    {" - "}
                    <span className="text-muted-foreground">
                      {error.message}
                    </span>
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <Button variant={"link"} onClick={() => reset()}>
              Try again
            </Button>
          </div>
        </div>
      </body>
    </html>
  );
}
