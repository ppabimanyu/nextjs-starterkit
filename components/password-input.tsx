"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Eye, EyeOff, Check, X, Info } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  showStrength?: boolean;
  showRequirements?: boolean;
  compact?: boolean;
}

function calculatePasswordStrength(password: string): {
  strength: number;
  label: string;
} {
  let strength = 0;

  if (password.length >= 8) strength += 25;
  if (password.length >= 12) strength += 10;
  if (/[a-z]/.test(password)) strength += 15;
  if (/[A-Z]/.test(password)) strength += 15;
  if (/[0-9]/.test(password)) strength += 15;
  if (/[^a-zA-Z0-9]/.test(password)) strength += 20;

  let label = "Weak";

  if (strength >= 80) {
    label = "Very Strong";
  } else if (strength >= 60) {
    label = "Strong";
  } else if (strength >= 40) {
    label = "Medium";
  }

  return { strength, label };
}

function getPasswordRequirements(password: string, compact = false) {
  if (compact) {
    return [
      {
        met: password.length >= 8,
        label: "At least 8 characters",
      },
      {
        met: /[a-z]/.test(password) && /[A-Z]/.test(password),
        label: "Upper & lowercase letters",
      },
      {
        met: /[0-9]/.test(password),
        label: "Contains number",
      },
      {
        met: /[^a-zA-Z0-9]/.test(password),
        label: "Special character",
      },
    ];
  }

  return [
    {
      met: password.length >= 8,
      label: "At least 8 characters",
    },
    {
      met: /[a-z]/.test(password),
      label: "Contains lowercase letter",
    },
    {
      met: /[A-Z]/.test(password),
      label: "Contains uppercase letter",
    },
    {
      met: /[0-9]/.test(password),
      label: "Contains number",
    },
    {
      met: /[^a-zA-Z0-9]/.test(password),
      label: "Contains special character",
    },
  ];
}

export function PasswordInput({
  showStrength = false,
  showRequirements = false,
  compact = false,
  className,
  value,
  ...props
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const passwordValue = (value as string) || "";

  const passwordStrength = calculatePasswordStrength(passwordValue);
  const requirements = getPasswordRequirements(passwordValue, compact);

  return (
    <div className="space-y-2">
      <div className="relative">
        <Input
          type={showPassword ? "text" : "password"}
          className={cn("pr-10", className)}
          value={value}
          {...props}
        />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
          onClick={() => setShowPassword(!showPassword)}
          tabIndex={-1}
        >
          {showPassword ? (
            <EyeOff className="size-4 text-muted-foreground" />
          ) : (
            <Eye className="size-4 text-muted-foreground" />
          )}
        </Button>
      </div>

      {/* Password Strength & Requirements */}
      {(showStrength || showRequirements) && passwordValue.length > 0 && (
        <div className="space-y-2">
          {showStrength && (
            <>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Password strength</span>
                <span
                  className={cn(
                    "font-medium",
                    passwordStrength.strength >= 80 && "text-green-500",
                    passwordStrength.strength >= 60 &&
                      passwordStrength.strength < 80 &&
                      "text-blue-500",
                    passwordStrength.strength >= 40 &&
                      passwordStrength.strength < 60 &&
                      "text-yellow-500",
                    passwordStrength.strength < 40 && "text-red-500"
                  )}
                >
                  {passwordStrength.label}
                </span>
              </div>
              <Progress
                value={passwordStrength.strength}
                className={cn(compact ? "h-1.5" : "h-2")}
              />
            </>
          )}

          {showRequirements && (
            <>
              {compact ? (
                // Compact 2-column grid layout
                <div className="grid grid-cols-2 gap-1.5 text-xs">
                  {requirements.map((req, index) => (
                    <div key={index} className="flex items-center gap-1.5">
                      {req.met ? (
                        <Check className="size-3 text-green-500 shrink-0" />
                      ) : (
                        <X className="size-3 text-muted-foreground/40 shrink-0" />
                      )}
                      <span
                        className={cn(
                          "text-xs",
                          req.met
                            ? "text-green-600 dark:text-green-500"
                            : "text-muted-foreground"
                        )}
                      >
                        {req.label}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                // Full layout with border and info icon
                <div className="mt-3 space-y-1.5 rounded-md border border-border/50 p-3 bg-muted/30">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-2">
                    <Info className="size-3" />
                    <span className="font-medium">Password requirements</span>
                  </div>
                  {requirements.map((req, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-xs"
                    >
                      {req.met ? (
                        <Check className="size-3.5 text-green-500" />
                      ) : (
                        <X className="size-3.5 text-muted-foreground/50" />
                      )}
                      <span
                        className={cn(
                          req.met
                            ? "text-green-600 dark:text-green-500"
                            : "text-muted-foreground"
                        )}
                      >
                        {req.label}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
