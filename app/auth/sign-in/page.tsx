"use client";

import { GalleryVerticalEnd } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { Spinner } from "@/components/ui/spinner";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import SocialAuth from "../_components/social-auth";
import Link from "next/link";
import Footer from "../_components/footer";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

const signInFormSchema = z.object({
  email: z.email("Invalid email"),
  password: z.string(),
  rememberMe: z.boolean(),
});

export default function SignInPage() {
  const signInForm = useForm({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validators: {
      onChange: signInFormSchema,
    },
    onSubmit: async ({ value }) => {
      const { error } = await authClient.signIn.email({
        email: value.email,
        password: value.password,
        rememberMe: value.rememberMe,
        callbackURL: "/dashboard",
      });
      if (error) {
        toast.error(error.message);
        return;
      }
      toast.success("Sign in successful");
    },
  });

  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className={"flex flex-col gap-6"}>
          <FieldGroup>
            <div className="flex flex-col items-center gap-2 text-center">
              <a
                href="#"
                className="flex flex-col items-center gap-2 font-medium"
              >
                <div className="flex size-8 items-center justify-center rounded-md">
                  <GalleryVerticalEnd className="size-6" />
                </div>
                <span className="sr-only">{env.NEXT_PUBLIC_APP_NAME}</span>
              </a>
              <h1 className="text-xl font-bold capitalize">
                Welcome to {env.NEXT_PUBLIC_APP_NAME}
              </h1>
              <FieldDescription>
                Sign in or create an account to continue
              </FieldDescription>
            </div>
            <form onSubmit={signInForm.handleSubmit}>
              <div className="space-y-4">
                <div className="space-y-4">
                  <signInForm.Field name="email">
                    {(field) => (
                      <Field>
                        <FieldLabel htmlFor="email">Email</FieldLabel>
                        <Input
                          id="email"
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
                  </signInForm.Field>
                  <signInForm.Field name="password">
                    {(field) => (
                      <Field>
                        <FieldLabel htmlFor="password">
                          <span>Password</span>
                          <Link
                            href={"/auth/forgot-password"}
                            className="flex justify-end w-full text-primary hover:underline"
                          >
                            Forgot Password?
                          </Link>
                        </FieldLabel>
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
                  </signInForm.Field>
                </div>
                <Field>
                  <signInForm.Subscribe selector={(state) => [state.canSubmit]}>
                    {([canSubmit]) => (
                      <Button
                        type="button"
                        onClick={signInForm.handleSubmit}
                        disabled={!canSubmit}
                      >
                        Sign In
                      </Button>
                    )}
                  </signInForm.Subscribe>
                  <FieldDescription className="text-center">
                    Don&apos;t have an account?{" "}
                    <Link href="/auth/sign-up" className="text-primary">
                      Sign up
                    </Link>
                  </FieldDescription>
                </Field>
              </div>
            </form>
            <FieldSeparator>Or</FieldSeparator>
            <SocialAuth />
          </FieldGroup>
          <Footer />
        </div>
      </div>
    </div>
  );
}
