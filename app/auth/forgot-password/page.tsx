"use client";

import { GalleryVerticalEnd, ArrowLeft, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import SuccessReqResetPasswordPage from "../_components/success-req-reset-password";

const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export default function ForgotPasswordPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const forgotPasswordForm = useForm({
    defaultValues: {
      email: "",
    },
    validators: {
      onChange: forgotPasswordSchema,
    },
    onSubmit: async ({ value }) => {
      const { error } = await authClient.requestPasswordReset({
        email: value.email,
        redirectTo: "/auth/reset-password",
      });

      if (error) {
        toast.error(error.message);
      }
      setIsSubmitted(true);
    },
  });

  if (isSubmitted) {
    return (
      <SuccessReqResetPasswordPage
        email={forgotPasswordForm.state.values.email}
      />
    );
  }

  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <FieldGroup>
            <div className="flex flex-col items-center gap-2 text-center">
              <h1 className="text-xl font-bold">Forgot Password?</h1>
              <FieldDescription>
                Enter your email address and we&apos;ll send you a link to reset
                your password.
              </FieldDescription>
            </div>
            <form
              onSubmit={forgotPasswordForm.handleSubmit}
              className="space-y-4"
            >
              <forgotPasswordForm.Field name="email">
                {(field) => (
                  <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      required
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    <FieldError>
                      {field.state.meta.errors[0]?.message}
                    </FieldError>
                  </Field>
                )}
              </forgotPasswordForm.Field>
              <Field>
                <forgotPasswordForm.Subscribe
                  selector={(state) => [state.canSubmit, state.isSubmitting]}
                >
                  {([canSubmit, isSubmitting]) => (
                    <Button
                      type="button"
                      onClick={forgotPasswordForm.handleSubmit}
                      disabled={!canSubmit || isSubmitting}
                      className="w-full"
                    >
                      Send Reset Link {isSubmitting && <Spinner />}
                    </Button>
                  )}
                </forgotPasswordForm.Subscribe>
              </Field>
            </form>
            <div className="text-center">
              <Link
                href="/auth/sign-in"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="size-4" />
                Back to Sign In
              </Link>
            </div>
          </FieldGroup>
        </div>
      </div>
    </div>
  );
}
