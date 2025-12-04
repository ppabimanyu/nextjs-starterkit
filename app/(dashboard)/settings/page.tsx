"use client";

import { Separator } from "@/components/ui/separator";
import {
  LockIcon,
  Palette,
  ShieldCheck,
  UserIcon,
  MonitorSmartphone,
  Settings,
} from "lucide-react";
import { env } from "@/env";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SettingsProfilePage } from "./_components/profile/profile";
import { SettingsPasswordPage } from "./_components/password/password";
import { SettingsSessionsPage } from "./_components/sessions/sessions";
import { SettingsTwoFactorAuthPage } from "./_components/two-factor-auth/two-factor-auth";
import { SettingsAppearancePage } from "./_components/appearance/apperance";

export default function SettingsPage() {
  return (
    <div className="flex flex-col h-full w-full mx-auto space-y-4">
      <div className="space-y-0">
        <div className="flex items-center gap-2">
          <Settings className="size-5" />
          <h2 className="text-lg font-medium">Settings</h2>
        </div>
        <p className="text-xs text-muted-foreground">
          Manage your account settings and security preferences.
        </p>
      </div>
      <div className="flex w-dwh border-t -mx-4" />
      <Tabs
        defaultValue="profile"
        className="w-full md:w-3xl mx-auto space-y-8"
      >
        <div>
          <TabsList className="w-full overflow-scroll scrollbar-hidden">
            <TabsTrigger value="profile">
              <UserIcon className="size-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="password">
              <LockIcon className="size-4" />
              Password
            </TabsTrigger>
            <TabsTrigger value="sessions">
              <MonitorSmartphone className="size-4" />
              Sessions
            </TabsTrigger>
            {env.NEXT_PUBLIC_AUTH_ENABLE_2FA && (
              <TabsTrigger value="two-factor-auth">
                <ShieldCheck className="size-4" />
                Two-Factor Auth
              </TabsTrigger>
            )}
            <TabsTrigger value="appearance">
              <Palette className="size-4" />
              Appearance
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="profile">
          <SettingsProfilePage />
        </TabsContent>
        <TabsContent value="password">
          <SettingsPasswordPage />
        </TabsContent>
        <TabsContent value="sessions">
          <SettingsSessionsPage />
        </TabsContent>
        <TabsContent value="two-factor-auth">
          <SettingsTwoFactorAuthPage />
        </TabsContent>
        <TabsContent value="appearance">
          <SettingsAppearancePage />
        </TabsContent>
      </Tabs>
    </div>
  );
}
