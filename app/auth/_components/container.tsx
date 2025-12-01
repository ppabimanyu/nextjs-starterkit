import React from "react";

export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm flex flex-col gap-6">{children}</div>
    </div>
  );
}
