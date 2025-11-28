import { FieldDescription, FieldGroup } from "@/components/ui/field";
import { CheckCircle2 } from "lucide-react";
import BackToSignInButton from "./back-to-sign-in-button";

export default function SuccessReqResetPasswordPage({
  email,
}: {
  email: string;
}) {
  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <FieldGroup>
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary animate-in zoom-in-50 duration-300">
                <CheckCircle2 className="size-8" />
              </div>
              <h1 className="text-xl font-bold capitalize animate-in fade-in-50 duration-500">
                Check Your Email
              </h1>
              <FieldDescription className="animate-in fade-in-50 duration-700">
                We&apos;ve sent a password reset link to {email}. Please check
                your inbox and folow the instructions.
              </FieldDescription>
            </div>
            <BackToSignInButton />
          </FieldGroup>
        </div>
      </div>
    </div>
  );
}
