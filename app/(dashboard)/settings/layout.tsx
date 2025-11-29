"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { LockIcon, Settings, ShieldCheck, UserIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const sidebarNavItems = [
  {
    title: "Profile",
    href: "/settings/profile",
    icon: <UserIcon size={16} />,
  },
  {
    title: "Password",
    href: "/settings/password",
    icon: <LockIcon size={16} />,
  },
  {
    title: "Two-Factor Auth",
    href: "/settings/two-factor-auth",
    icon: <ShieldCheck size={16} />,
  },
  {
    title: "Appearance",
    href: "/settings/appearance",
    icon: <Settings size={16} />,
  },
];

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full">
      <div className="">
        <h2 className="text-2xl font-bold">Settings</h2>
        <p className="text-muted-foreground">
          Manage your account settings and set e-mail preferences.
        </p>
      </div>
      <Separator className="my-4" />
      <div className="flex flex-col h-full space-y-4 md:space-y-8 md:flex-row space-x-4">
        <aside className="lg:w-56">
          <nav
            className={
              "flex overflow-x-scroll scrollbar-hidden space-x-2 md:flex-col"
            }
          >
            {sidebarNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "justify-start text-left",
                  pathname === item.href
                    ? "bg-muted hover:bg-muted"
                    : "hover:bg-transparent hover:underline",
                  "inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2"
                )}
              >
                <div className="mr-2">{item.icon}</div>
                {item.title}
              </Link>
            ))}
          </nav>
        </aside>
        <div className="w-full lg:max-w-2xl">{children}</div>
      </div>
    </div>
  );
}
