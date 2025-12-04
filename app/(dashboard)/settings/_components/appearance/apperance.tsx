"use client";

import {
  Section,
  SectionContent,
  SectionDescription,
  SectionHeader,
  SectionTitle,
} from "@/components/section";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { Monitor, Moon, Palette, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function SettingsAppearancePage() {
  const { setTheme, theme } = useTheme();

  return (
    <Section>
      <SectionHeader>
        <SectionTitle className="flex items-center gap-2">
          <Palette className="size-5" />
          Appearance
        </SectionTitle>
        <SectionDescription>
          Customize the appearance of the application. Automatically switch
          between day and night themes.
        </SectionDescription>
      </SectionHeader>
      <SectionContent>
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
              <div className="flex items-center justify-center gap-1 w-full py-2 text-xs">
                <Sun className="size-4" />
                Light
              </div>
            </Label>
          </div>
          <div className="flex-1/3">
            <Label
              className={cn(theme === "dark" && "bg-background rounded-sm")}
            >
              <RadioGroupItem value="dark" className="sr-only" />
              <span className="flex items-center justify-center gap-1 w-full py-2 text-xs">
                <Moon className="size-4" />
                Dark
              </span>
            </Label>
          </div>
          <div className="flex-1/3">
            <Label
              className={cn(theme === "system" && "bg-background rounded-sm")}
            >
              <RadioGroupItem value="system" className="sr-only" />
              <span className="flex items-center justify-center gap-1 w-full py-2 text-xs">
                <Monitor className="size-4" />
                System
              </span>
            </Label>
          </div>
        </RadioGroup>
      </SectionContent>
    </Section>
  );
}
