"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import { authClient } from "@/lib/auth-client";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { z } from "zod";
import { ShieldCheck, KeyRound } from "lucide-react";
import { PasswordInput } from "@/components/password-input";
import { Separator } from "@/components/ui/separator";
import LoadingButton from "@/components/loading-button";

export default function SettingsAccountPage() {
  const form = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validators: {
      onChange: z
        .object({
          currentPassword: z.string().min(1, "Password is required"),
          newPassword: z
            .string()
            .min(8, "Password must be at least 8 characters long"),
          confirmPassword: z.string().min(1, "Confirm password is required"),
        })
        .refine((data) => data.newPassword === data.confirmPassword, {
          message: "Passwords do not match",
          path: ["confirmPassword"],
        }),
    },
    onSubmit: async ({ value }) => {
      const { error } = await authClient.changePassword({
        currentPassword: value.currentPassword,
        newPassword: value.newPassword,
      });
      if (error) {
        toast.error(`Failed to change password, ${error.message}`);
        form.reset();
        return;
      }
      toast.success("Password changed successfully");
      form.reset();
    },
  });

  const forgotPasswordMutation = useMutation({
    mutationFn: async () => {
      const { data, error: sessionError } = await authClient.getSession();
      if (sessionError) {
        throw sessionError;
      }
      const { error } = await authClient.requestPasswordReset({
        email: data?.user?.email || "",
        redirectTo: "/auth/reset-password",
      });
      if (error) {
        throw error;
      }
    },
    onSuccess: () => {
      toast.success(
        "We have sent a password reset link to your email, please check your email."
      );
    },
    onError: (error) => {
      toast.error(`Failed to send password reset link, ${error.message}`);
    },
  });

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShieldCheck className="size-5" />
            Change Password
          </CardTitle>
          <CardDescription>
            Update your password to keep your account secure. Make sure
            it&apos;s strong and unique.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Current Password */}
          <form.Field name="currentPassword">
            {(field) => (
              <Field>
                <FieldLabel
                  htmlFor="current-password"
                  className="flex items-center justify-between"
                >
                  Current Password
                  <Button
                    variant={"link"}
                    className="p-0 h-auto font-normal text-sm text-muted-foreground hover:text-primary"
                    onClick={() => forgotPasswordMutation.mutate()}
                    disabled={forgotPasswordMutation.isPending}
                  >
                    Forgot your password?{" "}
                    {forgotPasswordMutation.isPending && (
                      <Spinner className="ml-1 size-3" />
                    )}
                  </Button>
                </FieldLabel>
                <PasswordInput
                  id="current-password"
                  required
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Enter current password"
                />
                <FieldDescription>
                  Enter your current password to confirm the change.
                </FieldDescription>
                <FieldError>{field.state.meta.errors[0]?.message}</FieldError>
              </Field>
            )}
          </form.Field>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <KeyRound className="size-4" />
              <span>New Credentials</span>
            </div>

            {/* New Password */}
            <form.Field name="newPassword">
              {(field) => (
                <Field>
                  <FieldLabel htmlFor="new-password">New Password</FieldLabel>
                  <PasswordInput
                    id="new-password"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    showStrength
                    showRequirements
                    placeholder="Enter new password"
                  />
                  <FieldDescription>
                    Your password must be at least 8 characters long and contain
                    a mix of uppercase, lowercase, numbers, and symbols.
                  </FieldDescription>
                  <FieldError>{field.state.meta.errors[0]?.message}</FieldError>
                </Field>
              )}
            </form.Field>

            {/* Confirm Password */}
            <form.Field name="confirmPassword">
              {(field) => (
                <Field>
                  <FieldLabel htmlFor="confirm-password">
                    Confirm New Password
                  </FieldLabel>
                  <PasswordInput
                    id="confirm-password"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Confirm new password"
                  />
                  <FieldDescription>
                    Please enter the same password as above.
                  </FieldDescription>
                  <FieldError>{field.state.meta.errors[0]?.message}</FieldError>
                </Field>
              )}
            </form.Field>
          </div>
        </CardContent>
        <CardFooter>
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
          >
            {([canSubmit, isSubmitting]) => (
              <LoadingButton
                type="button"
                disabled={!canSubmit}
                isLoading={isSubmitting}
                onClick={() => form.handleSubmit()}
              >
                Update Password
              </LoadingButton>
            )}
          </form.Subscribe>
        </CardFooter>
      </Card>
    </div>
  );
}
