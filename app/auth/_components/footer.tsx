import { FieldDescription } from "@/components/ui/field";
import React from "react";

export default function Footer() {
  return (
    <FieldDescription className="px-6 text-center">
      By clicking continue, you agree to our{" "}
      <a href="/terms-of-service">Terms of Service</a> and{" "}
      <a href="/privacy-policy">Privacy Policy</a>.
    </FieldDescription>
  );
}
