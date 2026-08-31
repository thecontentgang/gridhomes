'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'motion/react';
import { cn } from '@/lib/utils/cn';
import Image from 'next/image';
import type { ImgHTMLAttributes } from 'react';

interface ImageRevealProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'style' | 'onDrag' | 'onDragStart' | 'onDragEnd' | 'onDragEnter' | 'onDragLeave' | 'onDragOver' | 'onDrop' | 'onAnimationStart' | 'onAnimationEnd' | 'onAnimationIteration'> {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: '4/3' | '16/10' | '3/2' | '1/1';
  revealDirection?: 'left' | 'right' | 'up' | 'down';
  parallax?: boolean;
  grayscaleHover?: boolean;
  onLoad?: (e: React.SyntheticEvent<HTMLImageElement>) => void;
  onError?: (e: React.SyntheticEvent<HTMLImageElement>) => void;
}

export function ImageReveal({
  src,
  alt,
  className,
  aspectRatio = '4/3',
  revealDirection = 'left',
  parallax = false,
  grayscaleHover = false,
  onLoad,
  onError,
}: ImageRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center'],
  });

  const clipPath = useTransform(
    scrollYProgress,
    [0, 1],
    [
      revealDirection === 'left' ? 'inset(0% 100% 0% 0%)' : 'inset(0% 0% 0% 100%)',
      'inset(0% 0% 0% 0%)',
    ]
  );

  const scale = useTransform(scrollYProgress, [0, 1], [1.12, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.4, 1], [0, 1, 1]);

  const parallaxY = parallax
    ? useTransform(scrollYProgress, [0, 1], ['-15%', '15%'])
    : undefined;

  const aspectClass = {
    '4/3': 'aspect-4-3',
    '16/10': 'aspect-16-10',
    '3/2': 'aspect-3-2',
    '1/1': 'aspect-1-1',
  }[aspectRatio];

  return (
    <motion.div
      ref={ref}
      className={cn('image-reveal', aspectClass, className)}
      style={{ opacity: opacity as MotionValue<number> }}
    >
      <motion.div
        style={{
          clipPath: clipPath as MotionValue<string>,
          scale: scale as MotionValue<number>,
          y: parallaxY as MotionValue<string | number> | undefined,
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
      </motion.div>
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

export function ImageParallax({ src, alt, className, speed = 0.3, scale = 1.15 }: ImageParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', `${speed * 100}%`]);
  const scaleTransform = useTransform(scrollYProgress, [0, 1], [scale, 1]);

  return (
    <div ref={ref} className={cn('relative overflow-hidden', className)}>
      <motion.div
        style={{
          backgroundImage: `url(${src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          y: y as MotionValue<string>,
          scale: scaleTransform as MotionValue<number>,
        }}
        className="absolute inset-0"
        aria-hidden="true"
      />
    </div>
  );
}