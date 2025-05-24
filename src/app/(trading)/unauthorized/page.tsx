// app/unauthorized/page.tsx
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-md w-full space-y-6 text-center space-y-6">
        <Alert variant="destructive">
          <AlertTriangle className="h-6 w-6" />
          <AlertTitle>Access Denied</AlertTitle>
          <AlertDescription>
            You are not authorized to view this page.
          </AlertDescription>
        </Alert>

        <p className="text-muted-foreground py-8">
          Please check your role or contact the administrator if you believe this is an error.
        </p>

        <Link className="mt-6" href="/">
          <Button variant="default">Go to Home</Button>
        </Link>
      </div>
    </div>
  );
}
