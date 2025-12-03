"use client";

import LoadingContent from "@/components/loading-content";
import { PasswordInput } from "@/components/password-input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { authClient } from "@/lib/auth-client";
import { useMutation } from "@tanstack/react-query";
import { Lock, LockKeyhole, Eye, EyeClosed, RefreshCcw } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc/client";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import LoadingButton from "@/components/loading-button";
import {
  SectionContent,
  SectionItemDescription,
  SectionItemHeader,
  SectionItemTitle,
} from "@/components/section";

export function TwoFactorBackupCodes() {
  const [open, setOpen] = useState(false);
  const [twoFactorPassword, setTwoFactorPassword] = useState("");
  const [viewBackupCodes, setViewBackupCodes] = useState(false);

  const trpcUtils = trpc.useUtils();

  const listTwoFactorBackupCodesQuery =
    trpc.user.listTwoFactorBackupCodes.useQuery();
  if (listTwoFactorBackupCodesQuery.isError) {
    toast.error("Failed to list 2FA backup codes");
  }

  const regenerateTwoFactorBackupCodesMutation = useMutation({
    mutationFn: async (password: string) => {
      const { error } = await authClient.twoFactor.generateBackupCodes({
        password,
      });
      if (error) {
        throw error;
      }
    },
    onError: (error) => {
      toast.error(`Failed to regenerate 2FA backup codes, ${error.message}`);
    },
    onSuccess: () => {
      toast.success("2FA backup codes regenerated successfully");
      trpcUtils.user.listTwoFactorBackupCodes.invalidate();
    },
    onSettled: () => {
      setTwoFactorPassword("");
      setOpen(false);
    },
  });

  if (listTwoFactorBackupCodesQuery.isPending) {
    return <LoadingContent />;
  }

  return (
    <SectionContent>
      <SectionItemHeader>
        <SectionItemTitle className="flex items-center gap-2">
          <Lock className="size-4" /> 2FA Backup Codes
        </SectionItemTitle>
        <SectionItemDescription>
          Backup codes are used to access your account if you lose access to
          your authenticator app.
        </SectionItemDescription>
      </SectionItemHeader>
      {viewBackupCodes ? (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2 justify-between">
            <Button onClick={() => setViewBackupCodes(false)}>
              <EyeClosed className="size-4" />
              <span>Hide Backup Codes</span>
            </Button>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <RefreshCcw className="size-4" />
                  <span>Regenerate Codes</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="text-center flex flex-col items-center gap-4">
                    <LockKeyhole className="size-5" />
                    Confirm Password
                  </DialogTitle>
                  <DialogDescription className="text-center">
                    Please enter your password to regenerate backup codes.
                  </DialogDescription>
                </DialogHeader>
                <Field>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <PasswordInput
                    id="password"
                    required
                    value={twoFactorPassword}
                    onChange={(e) => setTwoFactorPassword(e.target.value)}
                    placeholder="Enter your password"
                  />
                  <FieldDescription>
                    Enter your password to confirm.
                  </FieldDescription>
                </Field>
                <DialogFooter>
                  <LoadingButton
                    className="w-full"
                    onClick={() =>
                      regenerateTwoFactorBackupCodesMutation.mutate(
                        twoFactorPassword
                      )
                    }
                    disabled={!twoFactorPassword}
                    isLoading={regenerateTwoFactorBackupCodesMutation.isPending}
                  >
                    Confirm
                  </LoadingButton>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <div className="space-y-2 bg-muted p-4 rounded-md">
            {listTwoFactorBackupCodesQuery.data?.backupCodes?.map(
              (code, index) => (
                <div className="text-sm" key={index}>
                  {code}
                </div>
              )
            )}
          </div>
          <p className="text-xs text-muted-foreground">
            Each backup code can be used once to access your account and will be
            removed after use. If you need more backup codes, you can generate
            new ones.
          </p>
        </div>
      ) : (
        <Button onClick={() => setViewBackupCodes(true)}>
          <Eye />
          <span>View Backup Codes</span>
        </Button>
      )}
    </SectionContent>
  );
}
