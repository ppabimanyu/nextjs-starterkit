"use client";

import LoadingContent from "@/components/loading-content";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { authClient } from "@/lib/auth-client";
import {
  ShieldCheck,
  Smartphone,
  Lock,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";
import { EnableTwoFactorDialog } from "./_components/enable-2fa-dialog";
import { DisableTwoFactorAuth } from "./_components/disable-2fa-dialog";
import { TwoFactorBackupCodes } from "./_components/2fa-backup-codes";

export default function SettingsTwoFactorPage() {
  const session = authClient.useSession();
  if (session.error) {
    toast.error(`Failed to get session, ${session.error.message}`);
  }

  if (session.isPending) {
    return <LoadingContent />;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShieldCheck className="size-5" />
            Two-Factor Authentication
          </CardTitle>
          <CardDescription>
            Add an extra layer of security to your account by requiring a
            verification code in addition to your password.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Status Section */}
          <div className="flex items-center justify-between rounded-lg border p-4 bg-muted/30">
            <div className="space-y-0.5">
              <div className="font-medium text-sm">Current Status</div>
              <div className="text-xs text-muted-foreground">
                {session?.data?.user?.twoFactorEnabled
                  ? "Your account is secured with 2FA."
                  : "Two-factor authentication is currently disabled."}
              </div>
            </div>
            {session?.data?.user?.twoFactorEnabled ? (
              <div className="flex items-center gap-1.5 text-xs text-green-600 font-medium px-3 py-1.5 rounded-md bg-green-500/10 border border-green-500/20">
                <CheckCircle2 className="size-4" />
                Enabled
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-xs text-amber-600 font-medium px-3 py-1.5 rounded-md bg-amber-500/10 border border-amber-500/20">
                <AlertTriangle className="size-4" />
                Disabled
              </div>
            )}
          </div>

          <Separator />

          {/* Educational Content */}
          {session?.data?.user?.twoFactorEnabled ? (
            <TwoFactorBackupCodes />
          ) : (
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Why enable 2FA?</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex size-8 items-center justify-center rounded-full bg-blue-500/10 text-blue-600">
                    <Lock className="size-4" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-medium text-sm">Enhanced Security</p>
                    <p className="text-xs text-muted-foreground">
                      {
                        "Even if someone gets your password, they won't be able to access your account without the second factor."
                      }
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex size-8 items-center justify-center rounded-full bg-purple-500/10 text-purple-600">
                    <Smartphone className="size-4" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-medium text-sm">Easy to Use</p>
                    <p className="text-xs text-muted-foreground">
                      Use any authenticator app like Google Authenticator or
                      Authy to generate secure verification codes.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter>
          {session?.data?.user?.twoFactorEnabled ? (
            <DisableTwoFactorAuth />
          ) : (
            <EnableTwoFactorDialog />
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
