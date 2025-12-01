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
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { authClient } from "@/lib/auth-client";
import { useMutation } from "@tanstack/react-query";
import { Lock, LockKeyhole, Eye, EyeClosed, RefreshCcw } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc/client";

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
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lock size={20} /> 2FA Backup Codes
        </CardTitle>
        <CardDescription>
          Backup codes are used to access your account if you lose access to
          your authenticator app.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {viewBackupCodes ? (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2 justify-between">
              <Button onClick={() => setViewBackupCodes(false)}>
                <EyeClosed />
                <span>Hide Backup Codes</span>
              </Button>
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <RefreshCcw />
                    <span>Regenerate Codes</span>
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="text-center flex flex-col items-center gap-4">
                      <LockKeyhole size={32} />
                      Confirm Password
                    </DialogTitle>
                    <DialogDescription className="text-center">
                      Please enter your password to enable two-factor
                      authentication.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <PasswordInput
                      id="password"
                      required
                      value={twoFactorPassword}
                      onChange={(e) => setTwoFactorPassword(e.target.value)}
                      placeholder="Enter your password"
                    />
                  </div>
                  <DialogFooter>
                    <Button
                      className="w-full"
                      onClick={() =>
                        regenerateTwoFactorBackupCodesMutation.mutate(
                          twoFactorPassword
                        )
                      }
                      disabled={
                        regenerateTwoFactorBackupCodesMutation.isPending ||
                        !twoFactorPassword
                      }
                    >
                      Confirm{" "}
                      {regenerateTwoFactorBackupCodesMutation.isPending && (
                        <Spinner />
                      )}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            <div className="space-y-2 bg-muted p-4 rounded-md">
              {listTwoFactorBackupCodesQuery.data?.backupCodes?.map(
                (code, index) => (
                  <div key={index}>{code}</div>
                )
              )}
            </div>
            <p className="text-muted-foreground text-sm">
              Each backup code can be used once to access your account and will
              be removed after use. If you need more backup codes, you can
              generate new ones.
            </p>
          </div>
        ) : (
          <Button onClick={() => setViewBackupCodes(true)}>
            <Eye />
            <span>View Backup Codes</span>
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
