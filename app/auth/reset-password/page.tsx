"use client";

import { LockKeyhole } from "lucide-react";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import SuccessResetPasswordPage from "./_components/success-reset-password";
import InvalidResetPasswordLinkPage from "./_components/invalid-reset-password-link";
import Container from "../_components/container";
import { PasswordInput } from "@/components/password-input";
import LoadingButton from "@/components/loading-button";

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
  const token = searchParams.get("token");
  const [isSuccess, setIsSuccess] = useState(false);

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

  if (!isSuccess) {
    return <SuccessResetPasswordPage />;
  }

  return (
    <Container>
      <FieldGroup>
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary">
            <LockKeyhole className="size-8" />
          </div>
          <h1 className="text-xl font-bold">Reset Password</h1>
          <FieldDescription>Enter your new password below.</FieldDescription>
        </div>
        <form onSubmit={resetPasswordForm.handleSubmit} className="space-y-4">
          <div className="space-y-4">
            <resetPasswordForm.Field name="password">
              {(field) => (
                <Field>
                  <FieldLabel htmlFor="password">New Password</FieldLabel>
                  <PasswordInput
                    id="password"
                    required
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    showRequirements
                    showStrength
                  />
                  <FieldError>{field.state.meta.errors[0]?.message}</FieldError>
                </Field>
              )}
            </resetPasswordForm.Field>
            <resetPasswordForm.Field name="confirmPassword">
              {(field) => (
                <Field>
                  <FieldLabel htmlFor="confirmPassword">
                    Confirm New Password
                  </FieldLabel>
                  <PasswordInput
                    id="confirmPassword"
                    required
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FieldError>{field.state.meta.errors[0]?.message}</FieldError>
                </Field>
              )}
            </resetPasswordForm.Field>
          </div>
          <Field>
            <resetPasswordForm.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
            >
              {([canSubmit, isSubmitting]) => (
                <LoadingButton
                  type="button"
                  onClick={resetPasswordForm.handleSubmit}
                  disabled={!canSubmit}
                  isLoading={isSubmitting}
                  className="w-full"
                >
                  Reset Password
                </LoadingButton>
              )}
            </resetPasswordForm.Subscribe>
          </Field>
        </form>
      </FieldGroup>
    </Container>
  );
}
