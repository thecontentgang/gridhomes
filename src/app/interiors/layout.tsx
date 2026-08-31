'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Navbar, Footer, PageTransition, CustomCursor } from '@/components/common';
import { ContactModal } from '@/components/ui';
import { OPEN_CONTACT_EVENT } from '@/lib/contact';
import { interiorsConfig } from '@/data/interiors/config';
import type { ReactNode } from 'react';

interface InteriorsLayoutProps {
  children: ReactNode;
}

export default function InteriorsLayout({ children }: InteriorsLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [defaultService, setDefaultService] = useState<string>('');

  useEffect(() => {
    const open = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail?.defaultService) {
        setDefaultService(customEvent.detail.defaultService);
      } else {
        setDefaultService('');
      }
      setContactModalOpen(true);
    };
    window.addEventListener(OPEN_CONTACT_EVENT, open);
    return () => window.removeEventListener(OPEN_CONTACT_EVENT, open);
  }, []);

  const handleNavigate = (path: string) => {
    if (path.startsWith('#')) {
      const element = document.getElementById(path.slice(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      router.push(path);
    }
  };

  const handleScrollTo = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="theme-interiors flex flex-col min-h-full w-full bg-background text-foreground font-body">
      <CustomCursor />
      <Navbar
        experience={interiorsConfig}
        currentPath={pathname}
        onNavigate={handleNavigate}
        onScrollTo={handleScrollTo}
        onOpenContact={() => setContactModalOpen(true)}
        variant="interiors"
      />
      <main id="main-content" className="flex-1 w-full">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer experience={interiorsConfig} variant="interiors" />
      <ContactModal
        experience={interiorsConfig}
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
        defaultService={defaultService}
      />
    </div>
  );
}