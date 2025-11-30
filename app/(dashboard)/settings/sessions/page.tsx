"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { authClient } from "@/lib/auth-client";
import { UAParser } from "ua-parser-js";
import { useMutation, useQuery } from "@tanstack/react-query";
import moment from "moment";
import Link from "next/link";

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

export default function SessionsPage() {
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
    <div className="space-y-4">
      {/* Security Notice */}
      <Card className="border-blue-500/20 bg-blue-500/5 shadow-none">
        <CardHeader>
          <CardTitle className="text-sm flex items-center gap-2 text-blue-600 dark:text-blue-400">
            <Shield className="size-4" />
            Security Notice
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
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
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="size-5" />
            Active Sessions
          </CardTitle>
          <CardDescription>
            Manage sessions across all your devices
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {listSessionsQuery.data?.map((session, index) => {
              const isCurrent = session.id === currentSession?.data?.session.id;
              const parser = new UAParser(session.userAgent || "");
              const browser = parser.getBrowser();
              const os = parser.getOS();
              const device = parser.getDevice();

              return (
                <div key={session.id}>
                  {index > 0 && <Separator className="my-6" />}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="mt-1 flex size-10 items-center justify-center rounded-full bg-muted">
                        {getDeviceIcon(device.type)}
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium leading-none">
                            {browser.name || "Unknown Browser"} on{" "}
                            {os.name || "Unknown OS"}
                          </h3>
                          {isCurrent && (
                            <Badge
                              variant="secondary"
                              className="h-5 px-1.5 text-[10px] font-medium text-green-600 bg-green-500/10 hover:bg-green-500/20 border-green-500/20"
                            >
                              Current
                            </Badge>
                          )}
                        </div>
                        <div className="space-y-1 text-sm text-muted-foreground">
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
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRevokeSession(session.token)}
                        disabled={
                          revoking === session.token ||
                          revokeSessionMutation.isPending
                        }
                        className="h-8"
                      >
                        Revoke{" "}
                        {revokeSessionMutation.isPending &&
                          revoking === session.token && (
                            <Spinner className="ml-2" />
                          )}
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
