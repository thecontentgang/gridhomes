'use client';

import { motion } from 'motion/react';
import { cn } from '@/lib/utils/cn';
import Image from 'next/image';
import type { ImgHTMLAttributes } from 'react';

interface ImageRevealProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'style' | 'onDrag' | 'onDragStart' | 'onDragEnd' | 'onDragEnter' | 'onDragLeave' | 'onDragOver' | 'onDrop' | 'onAnimationStart' | 'onAnimationEnd' | 'onAnimationIteration'> {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: '4/3' | '16/10' | '3/2' | '1/1';
  revealDirection?: 'left' | 'right' | 'up' | 'down'; // Kept for backwards compatibility but not used
  parallax?: boolean; // Kept for backwards compatibility
  grayscaleHover?: boolean;
  onLoad?: (e: React.SyntheticEvent<HTMLImageElement>) => void;
  onError?: (e: React.SyntheticEvent<HTMLImageElement>) => void;
}

export function ImageReveal({
  src,
  alt,
  className,
  aspectRatio = '4/3',
  grayscaleHover = false,
  onLoad,
  onError,
}: ImageRevealProps) {
  const aspectClass = {
    '4/3': 'aspect-4-3',
    '16/10': 'aspect-16-10',
    '3/2': 'aspect-3-2',
    '1/1': 'aspect-1-1',
  }[aspectRatio];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={cn('image-reveal relative', aspectClass, className)}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={cn('object-cover transition-filter duration-700', grayscaleHover && 'grayscale hover:grayscale-0')}
          onLoad={onLoad}
          onError={onError}
        />
      </div>
    </motion.div>
  );
}

interface ImageParallaxProps {
  src: string;
  alt: string;
  className?: string;
  speed?: number;
  scale?: number;
}

export function ImageParallax({ src, alt, className }: ImageParallaxProps) {
  return (
    <div className={cn('relative overflow-hidden', className)}>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
        style={{
          backgroundImage: `url(${src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        className="absolute inset-0"
        aria-hidden="true"
      />
    </div>
  );
}