"use client";

import { Field, FieldError } from "@/components/ui/field";
import { authClient } from "@/lib/auth-client";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { z } from "zod";
import { ShieldCheck, KeyRound, RotateCcwKey } from "lucide-react";
import { PasswordInput } from "@/components/password-input";
import { Separator } from "@/components/ui/separator";
import LoadingButton from "@/components/loading-button";
import {
  Section,
  SectionContent,
  SectionDescription,
  SectionFooter,
  SectionHeader,
  SectionItem,
  SectionItemContent,
  SectionItemDescription,
  SectionItemHeader,
  SectionItemTitle,
  SectionTitle,
} from "@/components/section";

export function SettingsPasswordPage() {
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
    <Section>
      <SectionHeader>
        <SectionTitle className="flex items-center gap-2">
          <ShieldCheck className="size-5" />
          Change Password
        </SectionTitle>
        <SectionDescription>
          Update your password to keep your account secure. Make sure it&apos;s
          strong and unique.
        </SectionDescription>
      </SectionHeader>
      <SectionContent>
        {/* Current Password */}
        <SectionItem>
          <SectionItemHeader>
            <SectionItemTitle>Current Password</SectionItemTitle>
            <SectionItemDescription>
              Enter your current password to confirm the change.
            </SectionItemDescription>
            <LoadingButton
              className="p-0"
              variant="link"
              size="sm"
              onClick={() => forgotPasswordMutation.mutate()}
              isLoading={forgotPasswordMutation.isPending}
            >
              Forgot Password?
            </LoadingButton>
          </SectionItemHeader>
          <SectionItemContent>
            <form.Field name="currentPassword">
              {(field) => (
                <Field>
                  <PasswordInput
                    id="current-password"
                    required
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Enter current password"
                  />
                  <FieldError>{field.state.meta.errors[0]?.message}</FieldError>
                </Field>
              )}
            </form.Field>
          </SectionItemContent>
        </SectionItem>

        <Separator />

        {/* New Password */}
        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <KeyRound className="size-4" />
          <span>New Credentials</span>
        </div>
        <SectionItem>
          <SectionItemHeader>
            <SectionItemTitle>New Password</SectionItemTitle>
            <SectionItemDescription>
              Enter your new password to confirm the change.
            </SectionItemDescription>
          </SectionItemHeader>
          <SectionItemContent>
            <form.Field name="newPassword">
              {(field) => (
                <Field>
                  <PasswordInput
                    id="new-password"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    showStrength
                    showRequirements
                    placeholder="Enter new password"
                  />
                  <FieldError>{field.state.meta.errors[0]?.message}</FieldError>
                </Field>
              )}
            </form.Field>
          </SectionItemContent>
        </SectionItem>
        {/* Confirm Password */}
        <SectionItem>
          <SectionItemHeader>
            <SectionItemTitle>Confirm Password</SectionItemTitle>
            <SectionItemDescription>
              Please enter the same password as above.
            </SectionItemDescription>
          </SectionItemHeader>
          <SectionItemContent>
            <form.Field name="confirmPassword">
              {(field) => (
                <Field>
                  <PasswordInput
                    id="confirm-password"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Confirm new password"
                  />
                  <FieldError>{field.state.meta.errors[0]?.message}</FieldError>
                </Field>
              )}
            </form.Field>
          </SectionItemContent>
        </SectionItem>
      </SectionContent>
      <SectionFooter className="flex justify-end">
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
              <RotateCcwKey />
              Change Password
            </LoadingButton>
          )}
        </form.Subscribe>
      </SectionFooter>
    </Section>
  );
}
