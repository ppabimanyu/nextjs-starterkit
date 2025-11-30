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
import { FieldError } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { authClient } from "@/lib/auth-client";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { z } from "zod";
import { ShieldCheck, KeyRound } from "lucide-react";
import { PasswordInput } from "@/components/password-input";
import { Separator } from "@/components/ui/separator";

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
              <div className="space-y-2 max-w-md">
                <Label
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
                </Label>
                <PasswordInput
                  id="current-password"
                  required
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Enter current password"
                />
                <FieldError>{field.state.meta.errors[0]?.message}</FieldError>
              </div>
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
                <div className="space-y-2 max-w-md">
                  <Label htmlFor="new-password">New Password</Label>
                  <PasswordInput
                    id="new-password"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    showStrength
                    showRequirements
                    placeholder="Enter new password"
                  />
                  <FieldError>{field.state.meta.errors[0]?.message}</FieldError>
                </div>
              )}
            </form.Field>

            {/* Confirm Password */}
            <form.Field name="confirmPassword">
              {(field) => (
                <div className="space-y-2 max-w-md">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <PasswordInput
                    id="confirm-password"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Confirm new password"
                  />
                  <FieldError>{field.state.meta.errors[0]?.message}</FieldError>
                </div>
              )}
            </form.Field>
          </div>
        </CardContent>
        <CardFooter>
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
          >
            {([canSubmit, isSubmitting]) => (
              <Button
                type="button"
                disabled={!canSubmit || isSubmitting}
                onClick={() => form.handleSubmit()}
              >
                Update Password {isSubmitting && <Spinner />}
              </Button>
            )}
          </form.Subscribe>
        </CardFooter>
      </Card>
    </div>
  );
}
