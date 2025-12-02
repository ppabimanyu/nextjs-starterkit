"use client";

import LoadingContent from "@/components/loading-content";
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
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { z } from "zod";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Mail, Trash2, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import ConfirmPasswordDialog from "@/components/confirm-password-dialog";

export default function SettingsProfilePage() {
  // Get session data
  const { data, error, isPending } = authClient.useSession();
  if (error) {
    toast.error("Failed to get session data");
  }

  // Update profile form
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

  // Change email form
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

  // Delete account
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");

  const deleteAccountMutation = useMutation({
    mutationFn: async (password: string) => {
      const { error } = await authClient.deleteUser({
        password,
        callbackURL: "/auth/sign-in",
      });
      if (error) {
        throw error;
      }
    },
    onError: (error) => {
      toast.error(`Failed to delete account, ${error.message}`);
    },
    onSuccess: () => {
      toast.success(
        "We have sent a verification email to your email address, please check your inbox to verify your account deletion."
      );
    },
    onSettled: () => {
      setDeletePassword("");
      setDeleteDialogOpen(false);
    },
  });

  // Loading state
  if (isPending) {
    return <LoadingContent />;
  }

  // Get user initials
  const userInitials = data?.user.name
    ? data.user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .substring(0, 2)
    : "U";

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="size-5" />
            Profile Information
          </CardTitle>
          <CardDescription>
            Update your account&apos;s profile information and public profile.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-6">
            <Avatar className="h-20 w-20">
              <AvatarImage
                src={data?.user.image || ""}
                alt={data?.user.name || "User"}
              />
              <AvatarFallback className="text-lg">
                {userInitials}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h3 className="font-medium">Profile Picture</h3>
              <p className="text-sm text-muted-foreground">
                JPG, GIF or PNG. Max size of 800K.
              </p>
              {/* Placeholder for image upload functionality */}
              <Button variant="outline" size="sm" disabled>
                Upload New Picture
              </Button>
            </div>
          </div>
          <Separator />
          <profileForm.Field name="name">
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor="name">Display Name</Label>
                <Input
                  id="name"
                  placeholder="Your Name"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                <FieldError>{field.state.meta.errors[0]?.message}</FieldError>
                <p className="text-[0.8rem] text-muted-foreground">
                  This is your public display name. It can be your real name or
                  a pseudonym.
                </p>
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
                Save Changes {isSubmitting && <Spinner />}
              </Button>
            )}
          </profileForm.Subscribe>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="size-5" />
            Email Address
          </CardTitle>
          <CardDescription>
            Manage your email address and verification status.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2 ">
            <Label htmlFor="current-email">Current Email</Label>
            <div className="flex items-center gap-2">
              <Input
                id="current-email"
                value={data?.user.email}
                disabled
                className="bg-muted"
              />
              {data?.user.emailVerified ? (
                <div className="flex items-center gap-1.5 text-sm text-green-600 font-medium px-2 py-1 rounded-md bg-green-500/10 border border-green-500/20">
                  <CheckCircle2 className="size-4" />
                  Verified
                </div>
              ) : (
                <div className="flex items-center gap-1.5 text-sm text-amber-600 font-medium px-2 py-1 rounded-md bg-amber-500/10 border border-amber-500/20">
                  <AlertTriangle className="size-4" />
                  Unverified
                </div>
              )}
            </div>
          </div>

          <Separator />

          <emailForm.Field name="email">
            {(field) => (
              <div className="space-y-2 ">
                <Label htmlFor="new-email">New Email Address</Label>
                <Input
                  id="new-email"
                  placeholder="Enter new email address"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                <FieldError>{field.state.meta.errors[0]?.message}</FieldError>
                <p className="text-[0.8rem] text-muted-foreground">
                  You will need to verify your new email address.
                </p>
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
                Update Email {isSubmitting && <Spinner />}
              </Button>
            )}
          </emailForm.Subscribe>
        </CardFooter>
      </Card>

      <Card className="border-destructive/20 shadow-none">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <Trash2 className="size-5" />
            Delete Account
          </CardTitle>
          <CardDescription>
            Permanently delete your account and all associated data.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md bg-destructive/10 p-4 border border-destructive/20">
            <div className="flex items-start gap-3">
              <AlertTriangle className="size-5 text-destructive mt-0.5" />
              <div className="space-y-1">
                <h4 className="font-medium text-destructive">
                  Warning: This action is irreversible
                </h4>
                <p className="text-sm text-muted-foreground">
                  Once your account is deleted, all of its resources and data
                  will be permanently deleted. Please download any data you wish
                  to retain before proceeding.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <ConfirmPasswordDialog
            open={deleteDialogOpen}
            onOpenChange={(open) => {
              setDeleteDialogOpen(open);
              if (!open) setDeletePassword("");
            }}
            password={deletePassword}
            setPassword={setDeletePassword}
            action={() => deleteAccountMutation.mutate(deletePassword)}
            actionDisabled={!deletePassword || deleteAccountMutation.isPending}
            actionPending={deleteAccountMutation.isPending}
          >
            <Button
              variant="destructive"
              disabled={deleteAccountMutation.isPending}
            >
              Delete Account {deleteAccountMutation.isPending && <Spinner />}
            </Button>
          </ConfirmPasswordDialog>
        </CardFooter>
      </Card>
    </div>
  );
}
