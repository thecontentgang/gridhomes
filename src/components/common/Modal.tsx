'use client';

import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils/cn';
import { X } from 'lucide-react';
import type { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  tone?: 'light' | 'dark';
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  showCloseButton?: boolean;
}

export function Modal({
  isOpen,
  onClose,
  children,
  className,
  size = 'lg',
  tone = 'light',
  closeOnOverlayClick = true,
  closeOnEscape = true,
  showCloseButton = true,
}: ModalProps) {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape' && closeOnEscape) {
        onClose();
      }
    },
    [closeOnEscape, onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-3xl',
    xl: 'max-w-5xl',
    full: 'max-w-[90vw]',
  };

  const isDark = tone === 'dark';

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[50] flex items-center justify-center p-4">
          <motion.div
            className="fixed inset-0 bg-burgundy/90 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
            onClick={closeOnOverlayClick ? onClose : undefined}
            aria-hidden="true"
          />
          <motion.div
            className={cn(
              'relative w-full overflow-hidden shadow-xl',
              isDark ? 'bg-brown' : 'bg-ivory',
              sizeClasses[size],
              className
            )}
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            {showCloseButton && (
              <button
                onClick={onClose}
                className={cn(
                  'absolute top-4 right-4 z-10 p-2 rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2',
                  isDark ? 'bg-charcoal/10 text-ivory hover:bg-charcoal/20' : 'bg-stone-50 text-charcoal hover:bg-stone-100'
                )}
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            )}
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

interface ModalHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
  tone?: 'light' | 'dark';
}

export function ModalHeader({ title, subtitle, className, tone = 'light' }: ModalHeaderProps) {
  const isDark = tone === 'dark';

  return (
    <header className={cn('px-8 py-6 border-b', isDark ? 'border-ivory/10' : 'border-stone-100', className)}>
      <h2 id="modal-title" className={cn('font-display text-h2', isDark ? 'text-ivory' : 'text-charcoal')}>
        {title}
      </h2>
      {subtitle && (
        <p className={cn('mt-2 font-mono text-caption tracking-wider uppercase', isDark ? 'text-gold' : 'text-ivory/60')}>
          {subtitle}
        </p>
      )}
    </header>
  );
}

interface ModalBodyProps {
  children: ReactNode;
  className?: string;
}

export function ModalBody({ children, className }: ModalBodyProps) {
  return (
    <div className={cn('px-8 py-6', className)}>
      {children}
    </div>
  );
}

interface ModalFooterProps {
  children: ReactNode;
  className?: string;
}

export function ModalFooter({ children, className }: ModalFooterProps) {
  return (
    <footer className={cn('px-8 py-6 border-t border-stone-100 flex items-center justify-end gap-4', className)}>
      {children}
    </footer>
  );
}