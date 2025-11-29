"use client";

import { LockKeyhole } from "lucide-react";
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
import { useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import SuccessResetPasswordPage from "../_components/success-reset-password";
import InvalidResetPasswordLinkPage from "../_components/invalid-reset-password-link";

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
  const [isSuccess, setIsSuccess] = useState(false);

  const token = searchParams.get("token");

  const resetPasswordForm = useForm({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    validators: {
      onChange: resetPasswordSchema,
    },
    onSubmit: async ({ value }) => {
      const { error } = await authClient.resetPassword({
        token: token || "",
        newPassword: value.password.trim(),
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      setIsSuccess(true);
    },
  });

  if (!token) {
    return <InvalidResetPasswordLinkPage />;
  }

  if (isSuccess) {
    return <SuccessResetPasswordPage />;
  }

  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <FieldGroup>
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary animate-in zoom-in-50 duration-300">
                <LockKeyhole className="size-8" />
              </div>
              <h1 className="text-xl font-bold animate-in fade-in-50 duration-500">
                Reset Password
              </h1>
              <FieldDescription className="animate-in fade-in-50 duration-700">
                Enter your new password below.
              </FieldDescription>
            </div>
            <form
              onSubmit={resetPasswordForm.handleSubmit}
              className="space-y-4"
            >
              <div className="space-y-4">
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
          </FieldGroup>
        </div>
      </div>
    </div>
  );
}
