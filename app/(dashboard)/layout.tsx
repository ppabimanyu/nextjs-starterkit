import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "./_components/app-sidebar";
import { env } from "@/env";
import { auth } from "@/lib/auth";
import { redirect, RedirectType } from "next/navigation";
import { headers } from "next/headers";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    return redirect(
      env.NEXT_PUBLIC_DEFAULT_UNAUTHENTICATED_PAGE,
      RedirectType.replace
    );
  }
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="h-dvh w-full overflow-hidden p-2">
        <SidebarInset className="h-full rounded-lg overflow-scroll scrollbar-hidden border">
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:hidden border-b sticky top-0 z-10 bg-background">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <h1 className="text-md font-semibold">
                {env.NEXT_PUBLIC_APP_NAME}
              </h1>
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 h-full p-4">
            {children}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
