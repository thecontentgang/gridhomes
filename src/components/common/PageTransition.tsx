'use client';

import { motion, AnimatePresence } from 'motion/react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils/cn';
import type { ReactNode } from 'react';

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

export function PageTransition({ children, className }: PageTransitionProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
        className={cn('min-h-screen', className)}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

interface ClipPathTransitionProps {
  children: ReactNode;
  triggerRef: React.RefObject<HTMLElement>;
  isOpen: boolean;
  onComplete?: () => void;
  className?: string;
}

export function ClipPathTransition({
  children,
  triggerRef,
  isOpen,
  onComplete,
  className,
}: ClipPathTransitionProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={cn('fixed inset-0 z-[100] pointer-events-none', className)}
          initial={{ clipPath: 'circle(0% at 50% 50%)' }}
          animate={{ clipPath: 'circle(150% at 50% 50%)' }}
          exit={{ clipPath: 'circle(0% at 50% 50%)' }}
          transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
          onAnimationComplete={onComplete}
          style={{
            backgroundColor: 'var(--color-charcoal)',
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}