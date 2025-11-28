"use client";

import { GalleryVerticalEnd, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { env } from "@/env";
import { useState, useEffect } from "react";
import { Spinner } from "@/components/ui/spinner";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const resetPasswordSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const [token, setToken] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const tokenParam = searchParams.get("token");
    // setToken(tokenParam);
  }, [searchParams]);

  const resetPasswordForm = useForm({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    validators: {
      onChange: resetPasswordSchema,
    },
    onSubmit: async ({ value }) => {
      // TODO: Integrate with better-auth reset password functionality
      console.log("Reset password with token:", token);
      console.log("New password:", value.password);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setIsSuccess(true);
    },
  });

  if (!token) {
    return (
      <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
        <div className="w-full max-w-sm">
          <div className="flex flex-col gap-6">
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <a
                  href="#"
                  className="flex flex-col items-center gap-2 font-medium"
                >
                  <div className="flex size-8 items-center justify-center rounded-md">
                    <GalleryVerticalEnd className="size-6" />
                  </div>
                  <span className="sr-only">{env.NEXT_PUBLIC_APP_NAME}</span>
                </a>
                <h1 className="text-xl font-bold">Invalid Reset Link</h1>
                <FieldDescription>
                  This password reset link is invalid or has expired. Please
                  request a new one.
                </FieldDescription>
              </div>
              <Link href="/auth/forgot-password">
                <Button className="w-full">Request New Reset Link</Button>
              </Link>
            </FieldGroup>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <FieldGroup>
            <div className="flex flex-col items-center gap-2 text-center">
              <a
                href="#"
                className="flex flex-col items-center gap-2 font-medium"
              >
                <div className="flex size-8 items-center justify-center rounded-md">
                  <GalleryVerticalEnd className="size-6" />
                </div>
                <span className="sr-only">{env.NEXT_PUBLIC_APP_NAME}</span>
              </a>
              {!isSuccess ? (
                <>
                  <h1 className="text-xl font-bold">Reset Password</h1>
                  <FieldDescription>
                    Enter your new password below.
                  </FieldDescription>
                </>
              ) : (
                <>
                  <div className="flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary animate-in zoom-in-50 duration-300">
                    <CheckCircle2 className="size-8" />
                  </div>
                  <h1 className="text-xl font-bold animate-in fade-in-50 duration-500">
                    Password Reset Successfully!
                  </h1>
                  <FieldDescription className="animate-in fade-in-50 duration-700">
                    Your password has been updated. You can now sign in with
                    your new password.
                  </FieldDescription>
                </>
              )}
            </div>
            {!isSuccess ? (
              <form
                onSubmit={resetPasswordForm.handleSubmit}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <resetPasswordForm.Field name="password">
                    {(field) => (
                      <Field>
                        <FieldLabel htmlFor="password">New Password</FieldLabel>
                        <Input
                          id="password"
                          type="password"
                          required
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                        />
                        <FieldError>
                          {field.state.meta.errors[0]?.message}
                        </FieldError>
                      </Field>
                    )}
                  </resetPasswordForm.Field>
                  <resetPasswordForm.Field name="confirmPassword">
                    {(field) => (
                      <Field>
                        <FieldLabel htmlFor="confirmPassword">
                          Confirm New Password
                        </FieldLabel>
                        <Input
                          id="confirmPassword"
                          type="password"
                          required
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                        />
                        <FieldError>
                          {field.state.meta.errors[0]?.message}
                        </FieldError>
                      </Field>
                    )}
                  </resetPasswordForm.Field>
                </div>
                <Field>
                  <resetPasswordForm.Subscribe
                    selector={(state) => [state.canSubmit, state.isSubmitting]}
                  >
                    {([canSubmit, isSubmitting]) => (
                      <Button
                        type="button"
                        onClick={resetPasswordForm.handleSubmit}
                        disabled={!canSubmit || isSubmitting}
                        className="w-full"
                      >
                        Reset Password {isSubmitting && <Spinner />}
                      </Button>
                    )}
                  </resetPasswordForm.Subscribe>
                </Field>
              </form>
            ) : (
              <div className="space-y-4 animate-in fade-in-50 duration-1000">
                <Link href="/auth">
                  <Button className="w-full">Go to Sign In</Button>
                </Link>
              </div>
            )}
          </FieldGroup>
        </div>
      </div>
    </div>
  );
}
