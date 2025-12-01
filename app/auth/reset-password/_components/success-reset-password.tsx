import { FieldDescription, FieldGroup } from "@/components/ui/field";
import { CheckCircle2 } from "lucide-react";
import BackToSignInButton from "../../_components/back-to-sign-in-button";
import Container from "../../_components/container";

export default function SuccessResetPasswordPage() {
  return (
    <Container>
      <div className="flex flex-col gap-6">
        <FieldGroup>
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary">
              <CheckCircle2 className="size-8" />
            </div>
            <h1 className="text-xl font-bold capitalize">
              Reset Password Successfully!
            </h1>
            <FieldDescription>
              Your password has been updated. You can now sign in with your new
              password.
            </FieldDescription>
          </div>
          <BackToSignInButton />
        </FieldGroup>
      </div>
    </Container>
  );
}
