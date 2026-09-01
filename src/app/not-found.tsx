'use client';

import { LinkButton } from '@/components/common';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-primary px-6">
      <div className="text-center max-w-md">
        <div className="inline-flex items-center justify-center w-20 h-20 border border-gold/30 mb-6">
          <span className="font-display text-4xl text-gold">404</span>
        </div>
        <h1 className="font-display text-h2 text-charcoal mb-3">Page Not Found</h1>
        <p className="font-sans text-lg text-neutral-400 max-w-lg mx-auto mb-12">
          The page you&apos;re looking for doesn&apos;t exist or has been moved. 
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <LinkButton variant="primary" href="/">
            <Home className="w-5 h-5 mr-2" />
            Go Home
          </LinkButton>
          <LinkButton variant="secondary" href="/interiors">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Interiors
          </LinkButton>
          <LinkButton variant="secondary" href="/construction">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Construction
          </LinkButton>
        </div>
      </div>
    </div>
  );
}