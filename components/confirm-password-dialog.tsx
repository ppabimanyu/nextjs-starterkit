import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { PropsWithChildren } from "react";
import { Button } from "./ui/button";
import { LockKeyhole } from "lucide-react";
import { PasswordInput } from "./password-input";
import { Label } from "./ui/label";
import { Spinner } from "./ui/spinner";

type ConfirmPasswordDialogProps = PropsWithChildren & {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  password: string;
  setPassword: (password: string) => void;
  action: () => void;
  actionDisabled?: boolean;
  actionPending?: boolean;
};

export default function ConfirmPasswordDialog({
  open,
  onOpenChange,
  password,
  setPassword,
  action,
  actionDisabled,
  actionPending,
  children,
}: ConfirmPasswordDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center flex flex-col items-center gap-4">
            <LockKeyhole size={32} />
            Confirm Password
          </DialogTitle>
          <DialogDescription className="text-center">
            This is a secure area of the application. Please confirm your
            password before continueing.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <PasswordInput
            id="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>
        <DialogFooter>
          <Button
            onClick={() => action()}
            disabled={actionDisabled || actionPending}
            className="w-full"
          >
            Confirm {actionPending && <Spinner />}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
