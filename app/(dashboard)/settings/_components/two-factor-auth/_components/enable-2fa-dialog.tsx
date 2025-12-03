"use client";

import { PasswordInput } from "@/components/password-input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { env } from "@/env";
import { authClient } from "@/lib/auth-client";
import { useMutation } from "@tanstack/react-query";
import { LockKeyhole, Copy, QrCode, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import QRCode from "react-qr-code";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import LoadingButton from "@/components/loading-button";

export function EnableTwoFactorDialog() {
  const [open, setOpen] = useState(false);
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setTwoFactorPassword("");
      setTwoFactorSecret("");
      setTwoFactorURI("");
      setTwoFactorCode("");
      setTwoFactorVerifyCode(false);
    }
    setOpen(open);
  };

  const [twoFactorPassword, setTwoFactorPassword] = useState("");
  const [twoFactorURI, setTwoFactorURI] = useState("");
  const [twoFactorSecret, setTwoFactorSecret] = useState("");
  const [twoFactorCode, setTwoFactorCode] = useState("");
  const [twoFactorVerifyCode, setTwoFactorVerifyCode] = useState(false);

  const enableTwoFactorMutation = useMutation({
    mutationFn: async (password: string) => {
      const { data, error } = await authClient.twoFactor.enable({
        password,
        issuer: env.NEXT_PUBLIC_APP_NAME,
      });
      if (error) {
        throw error;
      }
      const urlParams = new URLSearchParams(data.totpURI.split("?")[1]);
      const secret = urlParams.get("secret") ?? "";

      setTwoFactorURI(data.totpURI);
      setTwoFactorSecret(secret);
    },
    onError: (error) => {
      toast.error(`Failed to enable 2FA, ${error.message}`);
      handleOpenChange(false);
    },
    onSettled: () => {
      setTwoFactorPassword("");
    },
  });

  const verifyTwoFactorMutation = useMutation({
    mutationFn: async (code: string) => {
      const { error } = await authClient.twoFactor.verifyTotp({
        code,
        trustDevice: true,
      });
      if (error) {
        throw error;
      }
    },
    onError: (error) => {
      toast.error(`Failed to verify 2FA, ${error.message}`);
    },
    onSuccess: () => {
      toast.success("2FA enabled successfully");
    },
    onSettled: () => {
      handleOpenChange(false);
    },
  });

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button>
          <ShieldCheck />
          Enable 2FA
        </Button>
      </DialogTrigger>
      <DialogContent>
        {!twoFactorURI && !twoFactorVerifyCode && (
          <>
            <DialogHeader>
              <DialogTitle className="text-center flex flex-col items-center gap-4">
                <LockKeyhole className="size-5" />
                Confirm Password
              </DialogTitle>
              <DialogDescription className="text-center">
                Please enter your password to enable two-factor authentication.
              </DialogDescription>
            </DialogHeader>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <PasswordInput
                id="password"
                required
                placeholder="Enter your password"
                value={twoFactorPassword}
                onChange={(e) => setTwoFactorPassword(e.target.value)}
              />
              <FieldDescription>
                Enter your password to enable two-factor authentication.
              </FieldDescription>
            </Field>
            <DialogFooter>
              <LoadingButton
                className="w-full"
                onClick={() =>
                  enableTwoFactorMutation.mutate(twoFactorPassword)
                }
                disabled={!twoFactorPassword}
                isLoading={enableTwoFactorMutation.isPending}
              >
                Confirm
              </LoadingButton>
            </DialogFooter>
          </>
        )}

        {twoFactorURI && !twoFactorVerifyCode && (
          <>
            <DialogHeader>
              <DialogTitle className="text-center flex flex-col items-center gap-4">
                <QrCode size={32} />
                Enable Two-actor Authentication
              </DialogTitle>
              <DialogDescription className="text-center">
                To finish enabling two-factor authentication, you need to scan
                the QR code with your authenticator app or enter the code
                generated by your authenticator app.
              </DialogDescription>
            </DialogHeader>
            <FieldGroup>
              <QRCode
                value={twoFactorURI || ""}
                className="mx-auto w-72 h-72 border p-8 rounded-md"
              />
              <Button
                className="w-full"
                onClick={() => setTwoFactorVerifyCode(true)}
              >
                Continue
              </Button>
              <FieldSeparator>or, enter the code manually</FieldSeparator>
              <ButtonGroup className="w-full">
                <Input value={twoFactorSecret} disabled />
                <Button
                  variant="outline"
                  aria-label="Copy"
                  onClick={() => {
                    navigator.clipboard.writeText(twoFactorSecret);
                    toast.success("Backup code copied to clipboard");
                  }}
                >
                  <Copy />
                </Button>
              </ButtonGroup>
            </FieldGroup>
          </>
        )}

        {twoFactorVerifyCode && (
          <>
            <DialogHeader>
              <DialogTitle className="text-center flex flex-col items-center gap-4">
                <QrCode size={32} />
                Verify Authentication Code
              </DialogTitle>
              <DialogDescription className="text-center">
                Enter 6-digit code from your authenticator app.
              </DialogDescription>
            </DialogHeader>
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
            <DialogFooter className="flex justify-between">
              <Button
                variant={"outline"}
                className="flex-1/2"
                onClick={() => setTwoFactorVerifyCode(false)}
              >
                Back
              </Button>
              <Button
                variant={"default"}
                className="flex-1/2"
                onClick={() => verifyTwoFactorMutation.mutate(twoFactorCode)}
                disabled={verifyTwoFactorMutation.isPending || !twoFactorCode}
              >
                Confirm {verifyTwoFactorMutation.isPending && <Spinner />}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
