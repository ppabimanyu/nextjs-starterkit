"use client";

import LoadingContent from "@/components/loading-content";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { z } from "zod";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  User,
  Mail,
  Trash2,
  AlertTriangle,
  CheckCircle2,
  LockKeyhole,
  TriangleAlert,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import LoadingButton from "@/components/loading-button";
import {
  Section,
  SectionContent,
  SectionDescription,
  SectionHeader,
  SectionItem,
  SectionItemContent,
  SectionItemDescription,
  SectionItemHeader,
  SectionItemTitle,
  SectionTitle,
} from "@/components/section";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PasswordInput } from "@/components/password-input";

export function SettingsProfilePage() {
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
      if (value.name === data?.user.name && value.image === data?.user.image) {
        return;
      }
      const { error } = await authClient.updateUser({
        image: value.image?.trim(),
        name: value.name.trim(),
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
          email: z.email("Invalid email address"),
        })
        .refine((v) => v.email !== data?.user.email, {
          message: "Email cannot be the same",
          path: ["email"],
        }),
    },
    onSubmit: async ({ value }) => {
      const { error } = await authClient.changeEmail({
        newEmail: value.email.trim(),
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
    <div className="space-y-8">
      <Section>
        <SectionHeader>
          <SectionTitle className="flex items-center gap-2">
            <User className="size-5" />
            Profile Information
          </SectionTitle>
          <SectionDescription>
            Update your account&apos;s profile information and public profile.
          </SectionDescription>
        </SectionHeader>
        <SectionContent>
          <SectionItem>
            <SectionItemHeader>
              <SectionItemTitle>Profile Picture</SectionItemTitle>
              <SectionItemDescription>
                JPG, GIF or PNG. Max size of 800K.
              </SectionItemDescription>
            </SectionItemHeader>
            <SectionItemContent>
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src={data?.user.image || ""}
                  alt={data?.user.name || "User"}
                />
                <AvatarFallback className="text-lg">
                  {userInitials}
                </AvatarFallback>
              </Avatar>
            </SectionItemContent>
          </SectionItem>
          <Separator />
          <SectionItem>
            <SectionItemHeader>
              <SectionItemTitle>Display Name</SectionItemTitle>
              <SectionItemDescription>
                This is your public display name. It can be your real name or a
                pseudonym.
              </SectionItemDescription>
            </SectionItemHeader>
            <SectionItemContent className="md:w-xs">
              <profileForm.Field name="name">
                {(field) => (
                  <Field>
                    <Input
                      id="name"
                      placeholder="Your Name"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={profileForm.handleSubmit}
                    />
                    <FieldError>
                      {field.state.meta.errors[0]?.message}
                    </FieldError>
                  </Field>
                )}
              </profileForm.Field>
            </SectionItemContent>
          </SectionItem>
        </SectionContent>
      </Section>

      <Section>
        <SectionHeader>
          <SectionTitle className="flex items-center gap-2">
            <Mail className="size-5" />
            Email Address
          </SectionTitle>
          <SectionDescription>
            Manage your email address and verification status.
          </SectionDescription>
        </SectionHeader>
        <SectionContent>
          <SectionItem>
            <SectionItemHeader>
              <SectionItemTitle>
                Current Email{" "}
                <Badge variant={"outline"}>
                  {data?.user.emailVerified ? (
                    <>
                      <CheckCircle2 className="size-4" />
                      Verified
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="size-4" />
                      Unverified
                    </>
                  )}
                </Badge>
              </SectionItemTitle>
              <SectionItemDescription>
                Your current email address is used to log in to your account and
                receive notifications.
              </SectionItemDescription>
            </SectionItemHeader>
            <SectionItemContent>
              <Input value={data?.user.email} disabled />
            </SectionItemContent>
          </SectionItem>
          <Separator />
          <SectionItem>
            <SectionItemHeader>
              <SectionItemTitle>New Email Address</SectionItemTitle>
              <SectionItemDescription>
                You will need to verify your new email address.
              </SectionItemDescription>
            </SectionItemHeader>
            <SectionItemContent>
              <emailForm.Field name="email">
                {(field) => (
                  <Field>
                    <Input
                      id="new-email"
                      placeholder="Enter new email address"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={emailForm.handleSubmit}
                    />
                    <FieldError>
                      {field.state.meta.errors[0]?.message}
                    </FieldError>
                  </Field>
                )}
              </emailForm.Field>
            </SectionItemContent>
          </SectionItem>
        </SectionContent>
      </Section>

      <Section>
        <SectionHeader>
          <SectionTitle className="flex items-center gap-2 text-destructive">
            <TriangleAlert className="size-5" />
            Danger Zone
          </SectionTitle>
          <SectionDescription>
            This section contains actions that cannot be undone.
          </SectionDescription>
        </SectionHeader>
        <SectionContent>
          <SectionItem>
            <SectionItemHeader>
              <SectionItemTitle>
                Delete Account{" "}
                <Badge
                  variant={"outline"}
                  className="border-destructive/50 text-destructive/80"
                >
                  <AlertTriangle />
                  Warning: This action is irreversible
                </Badge>
              </SectionItemTitle>
              <SectionItemDescription>
                Once your account is deleted, all of its resources and data will
                be permanently deleted. Please download any data you wish to
                retain before proceeding.
              </SectionItemDescription>
            </SectionItemHeader>
            <SectionItemContent>
              <Dialog
                open={deleteDialogOpen}
                onOpenChange={setDeleteDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button className="flex gap-1 text-destructive bg-destructive/10 hover:bg-destructive/20">
                    <Trash2 className="size-4" />
                    Delete Account
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="text-center flex flex-col items-center gap-4">
                      <LockKeyhole className="size-5" />
                      Delete Account
                    </DialogTitle>
                    <DialogDescription className="text-center">
                      Are you sure you want to delete your account?
                    </DialogDescription>
                  </DialogHeader>
                  <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <PasswordInput
                      id="password"
                      required
                      placeholder="Enter your password"
                      value={deletePassword}
                      onChange={(e) => setDeletePassword(e.target.value)}
                    />
                    <FieldDescription>
                      Enter your password to confirm. We will send a
                      confirmation email to your email address.
                    </FieldDescription>
                  </Field>
                  <DialogFooter>
                    <LoadingButton
                      className="w-full"
                      onClick={() =>
                        deleteAccountMutation.mutate(deletePassword)
                      }
                      disabled={!deletePassword}
                      isLoading={deleteAccountMutation.isPending}
                    >
                      Confirm
                    </LoadingButton>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </SectionItemContent>
          </SectionItem>
        </SectionContent>
      </Section>
    </div>
  );
}
