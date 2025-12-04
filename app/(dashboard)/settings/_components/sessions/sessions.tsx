"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Laptop,
  Smartphone,
  Tablet,
  Globe,
  MapPin,
  Clock,
  Shield,
  Monitor,
  Tv,
  Watch,
  Gamepad2,
  MonitorSmartphone,
  LogOut,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { authClient } from "@/lib/auth-client";
import { UAParser } from "ua-parser-js";
import { useMutation, useQuery } from "@tanstack/react-query";
import moment from "moment";
import Link from "next/link";
import {
  Section,
  SectionContent,
  SectionDescription,
  SectionHeader,
  SectionItem,
  SectionItemDescription,
  SectionItemHeader,
  SectionItemTitle,
  SectionTitle,
} from "@/components/section";
import LoadingButton from "@/components/loading-button";

function getDeviceIcon(deviceType: string | undefined) {
  switch (deviceType) {
    case "mobile":
      return <Smartphone className="size-5" />;
    case "tablet":
      return <Tablet className="size-5" />;
    case "smarttv":
      return <Tv className="size-5" />;
    case "wearable":
      return <Watch className="size-5" />;
    case "console":
      return <Gamepad2 className="size-5" />;
    case "embedded":
      return <Monitor className="size-5" />;
    default:
      return <Laptop className="size-5" />;
  }
}

export function SettingsSessionsPage() {
  const [revoking, setRevoking] = useState<string | null>(null);

  const currentSession = authClient.useSession();

  const listSessionsQuery = useQuery({
    queryKey: ["list-sessions"],
    queryFn: async () => {
      const { error, data } = await authClient.listSessions();
      if (error) {
        throw error;
      }
      return data;
    },
  });

  const revokeSessionMutation = useMutation({
    mutationFn: async (token: string) => {
      const { error } = await authClient.revokeSession({
        token,
      });
      if (error) {
        throw error;
      }
    },
    onSuccess: () => {
      toast.success("Session revoked successfully");
    },
    onError: (error) => {
      toast.error(`Failed to revoke session, ${error.message}`);
    },
    onSettled: () => {
      listSessionsQuery.refetch();
    },
  });

  const handleRevokeSession = async (token: string) => {
    setRevoking(token);
    await revokeSessionMutation.mutateAsync(token);
    setRevoking(null);
  };

  if (listSessionsQuery.isPending) {
    return (
      <div className="flex items-center justify-center p-8">
        <Spinner className="size-8" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Section>
        <SectionHeader>
          <SectionTitle className="flex items-center gap-2">
            <MonitorSmartphone className="size-5" />
            Active Sessions
          </SectionTitle>
          <SectionDescription>
            Manage sessions across all your devices
          </SectionDescription>
        </SectionHeader>
        <SectionContent>
          <div className="space-y-5">
            {listSessionsQuery.data?.map((session, index) => {
              const isCurrent = session.id === currentSession?.data?.session.id;
              const parser = new UAParser(session.userAgent || "");
              const browser = parser.getBrowser();
              const os = parser.getOS();
              const device = parser.getDevice();

              return (
                <div key={session.id}>
                  {index > 0 && <Separator className="my-5" />}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="mt-1 flex size-10 items-center justify-center rounded-full bg-muted">
                        {getDeviceIcon(device.type)}
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h5 className="font-medium leading-none text-sm">
                            {browser.name || "Unknown Browser"} on{" "}
                            {os.name || "Unknown OS"}
                          </h5>
                          {isCurrent && (
                            <Badge
                              variant="secondary"
                              className="h-5 px-1.5 text-[10px] font-medium text-green-600 bg-green-500/10 hover:bg-green-500/20 border-green-500/20"
                            >
                              Current
                            </Badge>
                          )}
                        </div>
                        <div className="space-y-1 text-xs text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Globe className="size-3.5" />
                            <span>
                              {browser.name} {browser.version}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="size-3.5" />
                            <span>{session.ipAddress}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="size-3.5" />
                            <span>
                              {isCurrent
                                ? `Signed in ${moment(
                                    session.createdAt
                                  ).fromNow()}`
                                : `Last active ${moment(
                                    session.expiresAt
                                  ).fromNow()}`}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    {!isCurrent && (
                      <LoadingButton
                        variant="outline"
                        size="sm"
                        onClick={() => handleRevokeSession(session.token)}
                        disabled={revokeSessionMutation.isPending}
                        isLoading={revoking === session.token}
                        className="h-8"
                      >
                        <LogOut />
                        Revoke
                      </LoadingButton>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </SectionContent>
      </Section>

      {/* Security Notice */}
      <SectionContent className="border-blue-500/20 bg-blue-500/5">
        <SectionItem>
          <SectionItemHeader>
            <SectionItemTitle className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
              <Shield className="size-5" />
              Security Notice
            </SectionItemTitle>
            <SectionItemDescription>
              <p className="text-xs text-muted-foreground">
                If you notice any suspicious activity or unrecognized sessions,
                revoke them immediately and{" "}
                <Button
                  variant="link"
                  className="p-0 h-auto font-normal text-blue-600 dark:text-blue-400 hover:no-underline"
                  asChild
                >
                  <Link href="/settings/password">change your password</Link>
                </Button>
                . This helps protect your account from unauthorized access.
              </p>
            </SectionItemDescription>
          </SectionItemHeader>
        </SectionItem>
      </SectionContent>
    </div>
  );
}
