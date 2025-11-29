import { Button } from "@/components/ui/button";
import { FieldDescription, FieldGroup } from "@/components/ui/field";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";
import BackToSignInButton from "./back-to-sign-in-button";

export default function InvalidResetPasswordLinkPage() {
  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <FieldGroup>
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary animate-in zoom-in-50 duration-300">
                <AlertTriangle className="size-8" />
              </div>
              <h1 className="text-xl font-bold capitalize animate-in fade-in-50 duration-500">
                Invalid Reset Link
              </h1>
              <FieldDescription className="animate-in fade-in-50 duration-700">
                This password reset link is invalid or has expired. Please
                request a new one.
              </FieldDescription>
            </div>
            <Link href="/auth/forgot-password">
              <Button className="w-full">Request New Reset Link</Button>
            </Link>
            <BackToSignInButton />
          </FieldGroup>
        </div>
      </div>
    </div>
  );
}
