'use client';

import { motion } from 'motion/react';
import { cn } from '@/lib/utils/cn';
import type { ReactNode, ElementType } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  once?: boolean;
  className?: string;
  as?: ElementType;
  direction?: 'up' | 'down' | 'left' | 'right';
  distance?: number;
}

export function ScrollReveal({
  children,
  delay = 0,
  duration = 0.6,
  once = true,
  className,
  direction = 'up',
  distance = 40,
}: ScrollRevealProps) {
  const initialPosition = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
  }[direction];

  return (
    <motion.div
      initial={{ opacity: 0, ...initialPosition }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, margin: '-80px' }}
      transition={{ duration, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerContainerProps {
  children: ReactNode;
  staggerChildren?: number;
  delayChildren?: number;
  className?: string;
  as?: ElementType;
}

export function StaggerContainer({
  children,
  staggerChildren = 0.08,
  delayChildren = 0.1,
  className,
}: StaggerContainerProps) {
  return (
    <motion.div
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren,
            delayChildren,
          },
        },
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  delay?: number;
  duration?: number;
}

export function StaggerItem({
  children,
  className,
  delay = 0,
  duration = 0.5,
}: StaggerItemProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 40, scale: 0.96 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration, delay, ease: [0.21, 0.47, 0.32, 0.98] },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}