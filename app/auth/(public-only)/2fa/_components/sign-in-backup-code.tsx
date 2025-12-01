"use client";

import { Field, FieldDescription, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { env } from "@/env";
import { authClient, ErrorCodes } from "@/lib/auth-client";
import { useMutation } from "@tanstack/react-query";
import { History } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import LoadingButton from "@/components/loading-button";

export function SignInUsingBackupCode() {
  const [twoFactorBackupCode, setTwoFactorBackupCode] = useState("");
  const router = useRouter();

  const signInUsingBackupCodeMutation = useMutation({
    mutationFn: async (code: string) => {
      const { error } = await authClient.twoFactor.verifyBackupCode({
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
          <History className="size-8" />
        </div>
        <h1 className="text-xl font-bold">Backup Code</h1>
        <FieldDescription>
          Please confirm access to your account by entering one of your backup
          codes.
        </FieldDescription>
      </div>
      <div className="space-y-4">
        <FieldGroup>
          <Input
            type="text"
            value={twoFactorBackupCode}
            onChange={(e) => setTwoFactorBackupCode(e.target.value)}
            placeholder="Enter your backup code"
          />
        </FieldGroup>
        <Field>
          <LoadingButton
            type="button"
            onClick={() =>
              signInUsingBackupCodeMutation.mutate(twoFactorBackupCode)
            }
            disabled={!twoFactorBackupCode}
            isLoading={signInUsingBackupCodeMutation.isPending}
          >
            Continue
          </LoadingButton>
        </Field>
      </div>
    </FieldGroup>
  );
}
