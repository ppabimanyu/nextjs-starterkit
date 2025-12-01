"use client";

import { Separator } from "@/components/ui/separator";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  LockIcon,
  Palette,
  ShieldCheck,
  UserIcon,
  MonitorSmartphone,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { env } from "@/env";

const sidebarNavItems = [
  {
    title: "Profile",
    href: "/settings/profile",
    icon: <UserIcon size={18} />,
    enable: true,
  },
  {
    title: "Password",
    href: "/settings/password",
    icon: <LockIcon size={18} />,
    enable: true,
  },
  {
    title: "Sessions",
    href: "/settings/sessions",
    icon: <MonitorSmartphone size={18} />,
    enable: true,
  },
  {
    title: "Two-Factor Auth",
    href: "/settings/two-factor-auth",
    icon: <ShieldCheck size={18} />,
    enable: env.NEXT_PUBLIC_AUTH_ENABLE_2FA,
  },
  {
    title: "Appearance",
    href: "/settings/appearance",
    icon: <Palette size={18} />,
    enable: true,
  },
];

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full max-w-6xl w-full">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Manage your account settings and security preferences.
        </p>
      </div>
      <Separator className="my-6" />
      <div className="flex flex-col space-y-8 md:flex-row md:space-x-6 md:space-y-0">
        <aside className="lg:w-1/5">
          <nav className="flex space-x-2 md:flex-col md:space-x-0 md:space-y-1 overflow-x-auto scrollbar-hide px-4 md:px-0 pb-2 md:pb-0">
            {sidebarNavItems.map(
              (item) =>
                item.enable && (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      buttonVariants({ variant: "ghost" }),
                      pathname === item.href
                        ? "bg-muted hover:bg-muted"
                        : "hover:bg-transparent hover:underline",
                      "justify-start"
                    )}
                  >
                    <span className="mr-1">{item.icon}</span>
                    {item.title}
                  </Link>
                )
            )}
          </nav>
        </aside>
        <div className="flex-1 lg:max-w-2xl">{children}</div>
      </div>
    </div>
  );
}
