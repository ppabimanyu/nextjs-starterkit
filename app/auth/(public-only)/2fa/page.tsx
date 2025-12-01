"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import Container from "../../_components/container";
import { SignInUsingAuthCode } from "./_components/sign-in-auth-code";
import { SignInUsingBackupCode } from "./_components/sign-in-backup-code";

export default function TwoFactorAuthPage() {
  const [usingBackupCode, setUsingBackupCode] = useState(false);

  return (
    <Container>
      {usingBackupCode ? (
        <>
          <SignInUsingBackupCode />
          <div className="text-center">
            or you can{" "}
            <Button
              variant={"link"}
              className="p-0 underline"
              onClick={() => setUsingBackupCode(false)}
            >
              sign in using authentication code
            </Button>
          </div>
        </>
      ) : (
        <>
          <SignInUsingAuthCode />
          <div className="text-center">
            or you can{" "}
            <Button
              variant={"link"}
              className="p-0 underline"
              onClick={() => setUsingBackupCode(true)}
            >
              sign in using backup code
            </Button>
          </div>
        </>
      )}
    </Container>
  );
}
