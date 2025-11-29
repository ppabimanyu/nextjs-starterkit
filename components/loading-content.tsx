import React from "react";
import { Spinner } from "./ui/spinner";

export default function LoadingContent() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Spinner className="size-8" />
    </div>
  );
}
