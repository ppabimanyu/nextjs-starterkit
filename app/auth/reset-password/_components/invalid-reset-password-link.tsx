import { Button } from "@/components/ui/button";
import { FieldDescription, FieldGroup } from "@/components/ui/field";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";
import BackToSignInButton from "../../_components/back-to-sign-in-button";
import Container from "../../_components/container";

export default function InvalidResetPasswordLinkPage() {
  return (
    <Container>
      <FieldGroup>
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary">
            <AlertTriangle className="size-8" />
          </div>
          <h1 className="text-xl font-bold capitalize">Invalid Reset Link</h1>
          <FieldDescription>
            This password reset link is invalid or has expired. Please request a
            new one.
          </FieldDescription>
        </div>
        <Link href="/auth/forgot-password">
          <Button className="w-full">Request New Reset Link</Button>
        </Link>
        <BackToSignInButton />
      </FieldGroup>
    </Container>
  );
}
