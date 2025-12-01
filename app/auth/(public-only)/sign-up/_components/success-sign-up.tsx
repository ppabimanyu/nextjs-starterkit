import { FieldDescription, FieldGroup } from "@/components/ui/field";
import { CheckCircle2 } from "lucide-react";
import BackToSignInButton from "../../../_components/back-to-sign-in-button";
import Container from "@/app/auth/_components/container";

export default function SuccessSignUpPage() {
  return (
    <Container>
      <FieldGroup>
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary">
            <CheckCircle2 className="size-8" />
          </div>
          <h1 className="text-xl font-bold capitalize">Verify Your Email</h1>
          <FieldDescription>
            We&apos;ve sent a verification link to your email address. Please
            check your inbox and click the link to verify your account and
            complete the registration process.
          </FieldDescription>
        </div>
        <BackToSignInButton />
      </FieldGroup>
    </Container>
  );
}
