"use client";

import { GalleryVerticalEnd } from "lucide-react";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { env } from "@/env";
import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import SocialAuth from "../../_components/social-auth";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import Footer from "../../_components/footer";
import SuccessSignUpPage from "./_components/success-sign-up";
import { toast } from "sonner";
import { PasswordInput } from "@/components/password-input";
import Container from "../../_components/container";
import LoadingButton from "@/components/loading-button";

const signUpFormSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.email("Invalid email"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function SignUpPage() {
  const [successSignUp, setSuccessSignUp] = useState(false);

  const signUpForm = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validators: {
      onChange: signUpFormSchema,
    },
    onSubmit: async ({ value }) => {
      const { error } = await authClient.signUp.email({
        email: value.email.toLowerCase().trim(),
        password: value.password.trim(),
        name: value.name.trim(),
        callbackURL: "/dashboard",
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      setSuccessSignUp(true);
    },
  });

  if (successSignUp) {
    return <SuccessSignUpPage />;
  }

  return (
    <Container>
      <FieldGroup>
        <div className="flex flex-col items-center gap-2 text-center">
          <a href="#" className="flex flex-col items-center gap-2 font-medium">
            <div className="flex size-8 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-6" />
            </div>
            <span className="sr-only">{env.NEXT_PUBLIC_APP_NAME}</span>
          </a>
          <h1 className="text-xl font-bold capitalize">
            Welcome to {env.NEXT_PUBLIC_APP_NAME}
          </h1>
          <FieldDescription>
            Create your account to get started
          </FieldDescription>
        </div>
        <form onSubmit={signUpForm.handleSubmit}>
          <div className="space-y-6">
            <div className="space-y-4">
              <signUpForm.Field name="name">
                {(field) => (
                  <Field>
                    <FieldLabel htmlFor="name">Name</FieldLabel>
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      required
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    <FieldError>
                      {field.state.meta.errors[0]?.message}
                    </FieldError>
                  </Field>
                )}
              </signUpForm.Field>
              <signUpForm.Field name="email">
                {(field) => (
                  <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      required
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    <FieldError>
                      {field.state.meta.errors[0]?.message}
                    </FieldError>
                  </Field>
                )}
              </signUpForm.Field>
              <signUpForm.Field name="password">
                {(field) => (
                  <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <PasswordInput
                      id="password"
                      required
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      showStrength
                      showRequirements
                      compact
                    />
                    <FieldError>
                      {field.state.meta.errors[0]?.message}
                    </FieldError>
                  </Field>
                )}
              </signUpForm.Field>
              <signUpForm.Field name="confirmPassword">
                {(field) => (
                  <Field>
                    <FieldLabel htmlFor="confirmPassword">
                      Confirm Password
                    </FieldLabel>
                    <PasswordInput
                      id="confirmPassword"
                      required
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    <FieldError>
                      {field.state.meta.errors[0]?.message}
                    </FieldError>
                  </Field>
                )}
              </signUpForm.Field>
            </div>
            <Field>
              <signUpForm.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
              >
                {([canSubmit, isSubmitting]) => (
                  <LoadingButton
                    type="button"
                    onClick={signUpForm.handleSubmit}
                    disabled={!canSubmit}
                    isLoading={isSubmitting}
                  >
                    Sign Up
                  </LoadingButton>
                )}
              </signUpForm.Subscribe>
              <FieldDescription className="text-center">
                Already have an account?{" "}
                <Link href="/auth/sign-in" className="text-primary">
                  Sign in
                </Link>
              </FieldDescription>
            </Field>
          </div>
        </form>
        <FieldSeparator>Or</FieldSeparator>
        <SocialAuth />
      </FieldGroup>
      <Footer />
    </Container>
  );
}
