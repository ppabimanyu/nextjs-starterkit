"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function SettingsAppearancePage() {
  const { setTheme, theme } = useTheme();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
          <CardDescription>
            Customize the appearance of the application. Automatically switch
            between day and night themes.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup
            defaultValue={theme}
            onValueChange={(value) => setTheme(value)}
            className="flex items-center justify-between gap-2 bg-muted px-2 py-1 rounded-md w-full max-w-72"
          >
            <div className="flex-1/3">
              <Label
                className={cn(theme === "light" && "bg-background rounded-sm")}
              >
                <RadioGroupItem value="light" className="sr-only" />
                <div className="flex items-center justify-center gap-1 w-full py-2">
                  <Sun size={16} />
                  Light
                </div>
              </Label>
            </div>
            <div className="flex-1/3">
              <Label
                className={cn(theme === "dark" && "bg-background rounded-sm")}
              >
                <RadioGroupItem value="dark" className="sr-only" />
                <span className="flex items-center justify-center gap-1 w-full py-2">
                  <Moon size={16} />
                  Dark
                </span>
              </Label>
            </div>
            <div className="flex-1/3">
              <Label
                className={cn(theme === "system" && "bg-background rounded-sm")}
              >
                <RadioGroupItem value="system" className="sr-only" />
                <span className="flex items-center justify-center gap-1 w-full py-2">
                  <Monitor size={16} />
                  System
                </span>
              </Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>
    </div>
  );
}
