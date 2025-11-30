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
  LogOut,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";

// Mock session data - replace with actual API call later
const MOCK_SESSIONS = [
  {
    id: "current",
    deviceType: "desktop",
    browser: "Chrome",
    browserVersion: "120.0.0",
    os: "macOS",
    osVersion: "14.1",
    ipAddress: "192.168.1.100",
    location: "Jakarta, Indonesia",
    lastActive: new Date(),
    isCurrent: true,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  },
  {
    id: "2",
    deviceType: "mobile",
    browser: "Safari",
    browserVersion: "17.2",
    os: "iOS",
    osVersion: "17.2.1",
    ipAddress: "192.168.1.101",
    location: "Jakarta, Indonesia",
    lastActive: new Date(Date.now() - 3 * 60 * 60 * 1000),
    isCurrent: false,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
  },
  {
    id: "3",
    deviceType: "tablet",
    browser: "Firefox",
    browserVersion: "121.0",
    os: "Android",
    osVersion: "14",
    ipAddress: "192.168.1.102",
    location: "Bandung, Indonesia",
    lastActive: new Date(Date.now() - 24 * 60 * 60 * 1000),
    isCurrent: false,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
  },
];

function getDeviceIcon(deviceType: string) {
  switch (deviceType) {
    case "mobile":
      return <Smartphone className="size-5" />;
    case "tablet":
      return <Tablet className="size-5" />;
    default:
      return <Laptop className="size-5" />;
  }
}

function formatRelativeTime(date: Date) {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return "Just now";
  if (diffInSeconds < 3600)
    return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400)
    return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  return `${Math.floor(diffInSeconds / 86400)} days ago`;
}

export default function SessionsPage() {
  const [sessions, setSessions] = useState(MOCK_SESSIONS);
  const [revoking, setRevoking] = useState<string | null>(null);
  const [revokingAll, setRevokingAll] = useState(false);

  const handleRevokeSession = async (sessionId: string) => {
    setRevoking(sessionId);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setSessions((prev) => prev.filter((s) => s.id !== sessionId));
    toast.success("Session revoked successfully");
    setRevoking(null);
  };

  const handleRevokeAllOtherSessions = async () => {
    setRevokingAll(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setSessions((prev) => prev.filter((s) => s.isCurrent));
    toast.success("All other sessions have been revoked");
    setRevokingAll(false);
  };

  const otherSessions = sessions.filter((s) => !s.isCurrent);

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Shield className="size-5" />
                Active Sessions
              </CardTitle>
              <CardDescription>
                Manage sessions across all your devices
              </CardDescription>
            </div>
            {otherSessions.length > 0 && (
              <Button
                variant="destructive"
                size="sm"
                onClick={handleRevokeAllOtherSessions}
                disabled={revokingAll}
                className="h-8"
              >
                <LogOut className="mr-2 size-3.5" />
                Revoke All Others {revokingAll && <Spinner className="ml-2" />}
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {sessions.map((session, index) => (
              <div key={session.id}>
                {index > 0 && <Separator className="my-6" />}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="mt-1 flex size-10 items-center justify-center rounded-full bg-muted">
                      {getDeviceIcon(session.deviceType)}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium leading-none">
                          {session.browser} on {session.os}
                        </h3>
                        {session.isCurrent && (
                          <Badge
                            variant="secondary"
                            className="h-5 px-1.5 text-[10px] font-medium text-green-600 bg-green-500/10 hover:bg-green-500/20 border-green-500/20"
                          >
                            Active Now
                          </Badge>
                        )}
                      </div>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Globe className="size-3.5" />
                          <span>
                            {session.browser} {session.browserVersion}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="size-3.5" />
                          <span>
                            {session.location} • {session.ipAddress}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="size-3.5" />
                          <span>
                            {session.isCurrent
                              ? `Signed in ${formatRelativeTime(
                                  session.createdAt
                                )}`
                              : `Last active ${formatRelativeTime(
                                  session.lastActive
                                )}`}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {!session.isCurrent && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleRevokeSession(session.id)}
                      disabled={revoking === session.id}
                      className="h-8"
                    >
                      {revoking === session.id ? (
                        <>
                          Revoking... <Spinner className="ml-2" />
                        </>
                      ) : (
                        "Revoke"
                      )}
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

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
              <a href="/settings/password">change your password</a>
            </Button>
            . This helps protect your account from unauthorized access.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
