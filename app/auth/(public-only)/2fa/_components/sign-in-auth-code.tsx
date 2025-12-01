"use client";

import { Field, FieldDescription, FieldGroup } from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { env } from "@/env";
import { authClient, ErrorCodes } from "@/lib/auth-client";
import { useMutation } from "@tanstack/react-query";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { RectangleEllipsis } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import LoadingButton from "@/components/loading-button";

export function SignInUsingAuthCode() {
  const [twoFactorCode, setTwoFactorCode] = useState("");
  const router = useRouter();

  const signInUsingAuthCodeMutation = useMutation({
    mutationFn: async (code: string) => {
      const { error } = await authClient.twoFactor.verifyTotp({
        code,
        trustDevice: false,
      });
      if (error) {
        throw error;
      }
    },
    onError: (error: Error & { code: ErrorCodes }) => {
      toast.error(
        error.code == "INVALID_TWO_FACTOR_COOKIE"
          ? `Failed to verify 2FA, ${error.message}. Please try sign in again`
          : `Failed to verify 2FA, ${error.message}`
      );
      if (error.code == "INVALID_TWO_FACTOR_COOKIE") {
        router.replace(env.NEXT_PUBLIC_DEFAULT_UNAUTHENTICATED_PAGE);
      }
    },
    onSuccess: () => {
      toast.success("Sign in successful");
      router.replace(env.NEXT_PUBLIC_DEFAULT_AUTHENTICATED_PAGE);
    },
  });

  return (
    <FieldGroup>
      <div className="flex flex-col items-center gap-2 text-center">
        <div className="flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary">
          <RectangleEllipsis className="size-8" />
        </div>
        <h1 className="text-xl font-bold capitalize">Authentication Code</h1>
        <FieldDescription>
          Enter the authentication code provided by your authenticator app.
        </FieldDescription>
      </div>
      <div className="space-y-4">
        <FieldGroup>
          <InputOTP
            maxLength={6}
            pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
            value={twoFactorCode}
            onChange={(v) => setTwoFactorCode(v)}
          >
            <InputOTPGroup className="mx-auto">
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </FieldGroup>
        <Field>
          <LoadingButton
            type="button"
            onClick={() => signInUsingAuthCodeMutation.mutate(twoFactorCode)}
            disabled={twoFactorCode.length !== 6}
            isLoading={signInUsingAuthCodeMutation.isPending}
          >
            Continue
          </LoadingButton>
        </Field>
      </div>
    </FieldGroup>
  );
}
