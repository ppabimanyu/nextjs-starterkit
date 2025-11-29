import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck } from "lucide-react";

export default function SettingsAccountPage() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Two Factor Authentication</CardTitle>
          <CardDescription>
            Add additional security to your account using two factor
            authentication.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Badge className="rounded-md py-1 px-2 bg-destructive/10 text-destructive">
            Disabled
          </Badge>
          <p className="text-muted-foreground text-sm">
            When you enable two-factor authentication, you will be prompted for
            a secure pin during login. This pin can be retrieved from a
            TOTP-supported application on your phone.
          </p>
        </CardContent>
        <CardFooter>
          <Button>
            <ShieldCheck />
            Enable 2FA
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
