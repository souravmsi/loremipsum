'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';
import { useRouter } from 'next/navigation';

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: ErrorPageProps) {
  const router = useRouter();

  useEffect(() => {
    console.error('Unexpected error:', error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md w-full space-y-6 text-center">
        <Alert variant="destructive" className="border-red-400 bg-red-50">
          <AlertTriangle className="h-5 w-5 text-red-500" />
          <AlertTitle className="text-red-700">Something went wrong</AlertTitle>
          <AlertDescription className="text-sm text-red-600">
            {error.message || 'An unexpected error occurred. Please try again later.'}
          </AlertDescription>
        </Alert>

        <div className="flex justify-center gap-4 pt-4">
          <Button variant="outline" onClick={reset}>
            Try Again
          </Button>
          <Button onClick={() => router.push('/')}>Go Home</Button>
        </div>
      </div>
    </div>
  );
}
