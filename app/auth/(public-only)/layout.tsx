import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect, RedirectType } from "next/navigation";

export default async function PublicOnlyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (session) {
    return redirect("/dashboard", RedirectType.replace);
  }
  return <div>{children}</div>;
}
