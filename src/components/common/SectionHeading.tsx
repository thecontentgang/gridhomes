'use client';

import { ScrollReveal } from './ScrollReveal';
import { cn } from '@/lib/utils/cn';

interface SectionHeadingProps {
  number?: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  className?: string;
  align?: 'left' | 'center';
  delay?: number;
  tone?: 'light' | 'dark';
}

export function SectionHeading({
  number,
  eyebrow,
  title,
  subtitle,
  className,
  align = 'left',
  delay = 0,
  tone = 'light',
}: SectionHeadingProps) {
  const isDark = tone === 'dark';

  return (
    <ScrollReveal delay={delay} className={cn('text-center md:text-left', align === 'center' && 'mx-auto max-w-3xl', className)}>
      {(number || eyebrow) && (
        <div className={cn('flex items-center gap-4 mb-6', align === 'center' && 'justify-center')}>
          {number && (
            <span className="font-mono text-label text-gold font-medium tracking-wider">
              {number}
            </span>
          )}
          {eyebrow && (
            <>
              <span className={cn('h-px w-10', isDark ? 'bg-gold/40' : 'bg-gold/60')} aria-hidden="true" />
              <span className={cn('font-body text-label tracking-wider', isDark ? 'text-ivory/70' : 'text-ivory/60')}>
                {eyebrow}
              </span>
            </>
          )}
        </div>
      )}
      <h2 className={cn('font-display text-display-md lg:text-display-lg mb-6', isDark ? 'text-ivory' : 'text-charcoal')}>
        {title}
      </h2>
      <span className={cn('block h-px w-14', align === 'center' && 'mx-auto', isDark ? 'bg-gold/50' : 'bg-gold/70')} aria-hidden="true" />
      {subtitle && (
        <p className={cn('text-body-lg mt-6 max-w-2xl', isDark ? 'text-ivory/70' : 'text-ivory/60', align === 'center' && 'mx-auto')}>
          {subtitle}
        </p>
      )}
    </ScrollReveal>
  );
}

interface NumberedHeadingProps {
  number: string;
  title: string;
  className?: string;
}

export function NumberedHeading({ number, title, className }: NumberedHeadingProps) {
  return (
    <div className={cn('flex items-baseline gap-4', className)}>
      <span className="font-mono text-caption text-gold font-medium tracking-wider">
        {number}
      </span>
      <h3 className="font-display text-h3 text-charcoal">{title}</h3>
    </div>
  );
}