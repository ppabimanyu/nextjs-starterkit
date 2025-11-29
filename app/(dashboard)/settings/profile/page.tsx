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
import { trpc } from "@/lib/trpc/client";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { z } from "zod";

export default function SettingsProfilePage() {
  const trpcUtils = trpc.useUtils();

  const profileQuery = trpc.user.getProfile.useQuery();
  if (profileQuery.isError) {
    toast.error("Failed to get profile data");
  }

  const profileMutation = trpc.user.updateProfile.useMutation({
    onSuccess: () => {
      toast.success("Profile updated successfully");
    },
    onError: (err) => {
      toast.error(`Failed to update profile, ${err.message}`);
      form.reset();
    },
    onSettled: () => {
      trpcUtils.user.getProfile.invalidate();
    },
  });

  const form = useForm({
    defaultValues: {
      name: profileQuery.data?.name || "",
      email: profileQuery.data?.email || "",
    },
    validators: {
      onChange: z.object({
        name: z.string().min(1, "Name is required"),
        email: z.email(),
      }),
    },
    onSubmit: async ({ value }) => {
      await profileMutation.mutateAsync(value);
    },
  });

  if (profileQuery.isLoading) {
    return <LoadingContent />;
  }

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
          <form.Field name="name">
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
          </form.Field>
          <form.Field name="email">
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="Your Email"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                <FieldError>{field.state.meta.errors[0]?.message}</FieldError>
              </div>
            )}
          </form.Field>
        </CardContent>
        <CardFooter>
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
          >
            {([canSubmit, isSubmitting]) => (
              <Button
                type="button"
                onClick={form.handleSubmit}
                disabled={!canSubmit || isSubmitting}
              >
                Save {isSubmitting && <Spinner />}
              </Button>
            )}
          </form.Subscribe>
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
          <Button variant="destructive">Delete Account</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
