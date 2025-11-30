"use client";

import LoadingContent from "@/components/loading-content";
import { Badge } from "@/components/ui/badge";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { authClient } from "@/lib/auth-client";
import { trpc } from "@/lib/trpc/client";
import { cn } from "@/lib/utils";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

export default function SettingsProfilePage() {
  const { data, error, isPending } = authClient.useSession();
  if (error) {
    toast.error("Failed to get session data");
  }

  const profileForm = useForm({
    defaultValues: {
      name: data?.user.name || "",
      image: data?.user.image || null,
    },
    validators: {
      onChange: z.object({
        name: z.string().min(1, "Name is required"),
        image: z.string().nullable(),
      }),
    },
    onSubmit: async ({ value }) => {
      const { error } = await authClient.updateUser({
        image: value.image,
        name: value.name,
      });
      if (error) {
        toast.error(`Failed to update profile, ${error.message}`);
        profileForm.reset();
        return;
      }
      toast.success("Profile updated successfully");
    },
  });

  const emailForm = useForm({
    defaultValues: {
      email: "",
    },
    validators: {
      onChange: z
        .object({
          email: z.email("Invalid email address").trim(),
        })
        .refine((v) => v.email !== data?.user.email, {
          message: "Email cannot be the same",
          path: ["email"],
        }),
    },
    onSubmit: async ({ value }) => {
      const { error } = await authClient.changeEmail({
        newEmail: value.email,
        callbackURL: "/settings/profile",
      });
      if (error) {
        toast.error(`Failed to send verification email, ${error.message}`);
        emailForm.reset();
        return;
      }
      toast.success(
        `We have sent a verification email to ${value.email}, please check your inbox to verify your email change.`
      );
      emailForm.reset();
    },
  });

  const deleteAccountMutation = useMutation({
    mutationFn: async () =>
      authClient.deleteUser({
        callbackURL: "/auth/sign-in",
      }),
    onError: (error) => {
      toast.error(`Failed to send verification email, ${error.message}`);
    },
    onSuccess: () => {
      toast.success(
        "We have sent a verification email to your email address, please check your inbox to verify your account deletion."
      );
    },
  });

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>
            {"Update your account's profile information and email address."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <profileForm.Field name="name">
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Your Name"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                <FieldError>{field.state.meta.errors[0]?.message}</FieldError>
              </div>
            )}
          </profileForm.Field>
        </CardContent>
        <CardFooter>
          <profileForm.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
          >
            {([canSubmit, isSubmitting]) => (
              <Button
                type="button"
                onClick={profileForm.handleSubmit}
                disabled={!canSubmit || isSubmitting}
              >
                Save {isSubmitting && <Spinner />}
              </Button>
            )}
          </profileForm.Subscribe>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Update Email</CardTitle>
          <CardDescription>
            {
              "Update your account's email. You need to verify the new email address before it takes effect."
            }
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Label htmlFor="email" className="flex items-center gap-2">
            Email
            <Badge variant="outline">Primary Sign-In</Badge>
          </Label>
          <Input id="email" value={data?.user.email} disabled />
          <emailForm.Field name="email">
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor="email">New Email</Label>
                <Input
                  id="email"
                  placeholder="Your new email"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                <FieldError>{field.state.meta.errors[0]?.message}</FieldError>
              </div>
            )}
          </emailForm.Field>
        </CardContent>
        <CardFooter>
          <emailForm.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
          >
            {([canSubmit, isSubmitting]) => (
              <Button
                type="button"
                onClick={emailForm.handleSubmit}
                disabled={!canSubmit || isSubmitting}
              >
                Send Verification Email {isSubmitting && <Spinner />}
              </Button>
            )}
          </emailForm.Subscribe>
        </CardFooter>
      </Card>
      <Card className="border-destructive/50">
        <CardHeader>
          <CardTitle className="text-destructive">Delete Account</CardTitle>
          <CardDescription>
            Permanently delete your account. This action cannot be undone.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Once your account is deleted, all of its resources and data will be
            permanently deleted. Before deleting your account, please download
            any data or information that you wish to retain.
          </p>
        </CardContent>
        <CardFooter>
          <Button
            variant="destructive"
            onClick={() => deleteAccountMutation.mutate()}
            disabled={deleteAccountMutation.isPending}
          >
            Delete Account {deleteAccountMutation.isPending && <Spinner />}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
