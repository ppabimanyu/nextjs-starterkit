"use client";

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
import { Spinner } from "@/components/ui/spinner";
import { authClient } from "@/lib/auth-client";
import { useMutation } from "@tanstack/react-query";
import { LockKeyhole, ShieldAlert } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function DisableTwoFactorAuth() {
  const [open, setOpen] = useState(false);
  const [twoFactorPassword, setTwoFactorPassword] = useState("");

  const disableTwoFactorMutation = useMutation({
    mutationFn: async (password: string) => {
      const { error } = await authClient.twoFactor.disable({
        password,
      });
      if (error) {
        throw error;
      }
    },
    onError: (error) => {
      toast.error(`Failed to disable 2FA, ${error.message}`);
    },
    onSuccess: () => {
      toast.success("2FA disabled successfully");
    },
    onSettled: () => {
      setOpen(false);
    },
  });

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (!open) {
          setTwoFactorPassword("");
        }
        setOpen(open);
      }}
    >
      <DialogTrigger asChild>
        <Button variant={"destructive"} className="w-full sm:w-auto">
          <ShieldAlert />
          Disable 2FA
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center flex flex-col items-center gap-4">
            <LockKeyhole size={32} />
            Disable Two-actor Authentication
          </DialogTitle>
          <DialogDescription className="text-center">
            Are you sure you want to disable two-factor authentication?
          </DialogDescription>
        </DialogHeader>
        <FieldGroup>
          <Input
            type="password"
            placeholder="Enter your password"
            value={twoFactorPassword}
            onChange={(e) => setTwoFactorPassword(e.target.value)}
          />
        </FieldGroup>
        <DialogFooter>
          <Button
            className="w-full"
            onClick={() => disableTwoFactorMutation.mutate(twoFactorPassword)}
            disabled={disableTwoFactorMutation.isPending || !twoFactorPassword}
          >
            Confirm {disableTwoFactorMutation.isPending && <Spinner />}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
