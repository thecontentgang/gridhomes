'use client';

import { motion } from 'motion/react';
import { cn } from '@/lib/utils/cn';
import type { ReactNode } from 'react';

interface ButtonProps {
  variant?: 'primary' | 'primary-construction' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  'aria-label'?: string;
  'aria-describedby'?: string;
}

export function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  children,
  className,
  disabled,
  onClick,
  type = 'button',
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
}: ButtonProps) {
  const baseClasses = 'btn';
  const variantClasses = {
    primary: 'btn-primary',
    'primary-construction': 'btn-primary-construction',
    secondary: 'btn-secondary',
    ghost: 'btn-ghost',
  };
  const sizeClasses = {
    sm: 'px-4 py-2 text-caption',
    md: 'px-6 py-4 text-label',
    lg: 'px-8 py-5 text-body-sm',
  };

  return (
    <motion.button
      className={cn(baseClasses, variantClasses[variant], sizeClasses[size], className)}
      disabled={disabled || isLoading}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      type={type}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
    >
      {isLoading && (
        <span className="flex items-center gap-2">
          <motion.svg
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
          >
            <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
            <path d="M12 2a10 10 0 0 1 10 10" strokeOpacity="1" />
          </motion.svg>
          <span>Loading...</span>
        </span>
      )}
      {!isLoading && children}
    </motion.button>
  );
}

interface LinkButtonProps {
  variant?: 'primary' | 'primary-construction' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  className?: string;
  href: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  'aria-label'?: string;
}

export function LinkButton({
  variant = 'primary',
  size = 'md',
  children,
  className,
  href,
  onClick,
  'aria-label': ariaLabel,
}: LinkButtonProps) {
  const baseClasses = 'btn';
  const variantClasses = {
    primary: 'btn-primary',
    'primary-construction': 'btn-primary-construction',
    secondary: 'btn-secondary',
    ghost: 'btn-ghost',
  };
  const sizeClasses = {
    sm: 'px-4 py-2 text-caption',
    md: 'px-6 py-4 text-label',
    lg: 'px-8 py-5 text-body-sm',
  };

  return (
    <motion.a
      className={cn(baseClasses, variantClasses[variant], sizeClasses[size], className)}
      whileTap={{ scale: 0.98 }}
      href={href}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {children}
    </motion.a>
  );
}