'use client';

import { useEffect } from 'react';
import { Button } from '@/components/common';
import { cn } from '@/lib/utils/cn';
import { RefreshCw, Home } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Global application error:', error);
  }, [error]);

  return (
    <html lang="en">
      <head>
        <title>Error - Grid Homes</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen flex items-center justify-center bg-primary px-6 font-sans antialiased">
        <div className="text-center max-w-md">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-error/10 mb-6">
            <svg className="w-10 h-10 text-error" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
          </div>
          <h1 className="font-serif text-3xl lg:text-4xl text-charcoal mb-3" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
            Something went wrong
          </h1>
          <p className="text-body text-muted mb-8">
            We encountered an unexpected error. Please try refreshing the page or navigate back home.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={reset}
              className={cn(
                'btn btn-primary w-full sm:w-auto'
              )}
            >
              <RefreshCw className="w-5 h-5 mr-2" />
              Try Again
            </button>
            <button
              onClick={() => window.location.href = '/'}
              className={cn(
                'btn btn-secondary w-full sm:w-auto'
              )}
            >
              <Home className="w-5 h-5 mr-2" />
              Go Home
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}