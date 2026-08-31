'use client';

import { useEffect } from 'react';
import { Button } from '@/components/common';
import { RefreshCw, Home } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary px-6">
      <div className="text-center max-w-md">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-error/10 mb-6">
          <svg className="w-10 h-10 text-error" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
        </div>
        <h1 className="font-display text-h2 text-charcoal mb-3">Something went wrong</h1>
        <p className="text-body text-muted mb-8">
          We encountered an unexpected error. Please try refreshing the page or navigate back home.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            variant="primary"
            onClick={reset}
            className="w-full sm:w-auto"
          >
            <RefreshCw className="w-5 h-5 mr-2" />
            Try Again
          </Button>
          <Button
            variant="secondary"
            onClick={() => window.location.href = '/'}
            className="w-full sm:w-auto"
          >
            <Home className="w-5 h-5 mr-2" />
            Go Home
          </Button>
        </div>
        {process.env.NODE_ENV === 'development' && (
          <details className="mt-8 text-left p-4 bg-stone-50 rounded-lg text-xs font-mono text-error">
            <summary className="cursor-pointer mb-2">Error Details</summary>
            <pre>{error.message}</pre>
            {error.digest && <p className="mt-2">Digest: {error.digest}</p>}
          </details>
        )}
      </div>
    </div>
  );
}