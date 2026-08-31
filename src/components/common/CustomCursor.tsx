'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils/cn';

interface CustomCursorProps {
  enabled?: boolean;
}

export function CustomCursor({ enabled = true }: CustomCursorProps) {
  // 1. We use a ref to track the absolute latest mouse position without triggering re-renders
  const targetPosition = useRef({ x: 0, y: 0 });

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [ringPosition, setRingPosition] = useState({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState(false);
  const [label, setLabel] = useState('');
  const [mounted, setMounted] = useState(false);

  const animationRef = useRef<number | null>(null);
  const reducedMotion = useRef(false);

  // Mount setup
  useEffect(() => {
    setMounted(true);
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    reducedMotion.current = mediaQuery.matches;
  }, []);

  // Movement & Animation Loop
  useEffect(() => {
    if (!mounted || reducedMotion.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      // Update the ref for the animation loop to read
      targetPosition.current = { x: e.clientX, y: e.clientY };
      // Update state for the inner dot
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const animate = () => {
      if (reducedMotion.current) return;

      setRingPosition((prev) => {
        // Read directly from the ref, solving the stale closure problem
        const target = targetPosition.current;
        return {
          x: prev.x + (target.x - prev.x) * 0.15,
          y: prev.y + (target.y - prev.y) * 0.15,
        };
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [mounted]); // Dependency array is now safely free of `[position]`

  // Hover States
  useEffect(() => {
    if (!enabled || !mounted || reducedMotion.current) return;

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest('a, button, [role="button"], .cursor-interactive, [data-cursor-label]');

      if (interactive) {
        setIsActive(true);
        const cursorLabel = interactive.getAttribute('data-cursor-label');
        if (cursorLabel) setLabel(cursorLabel);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [role="button"], .cursor-interactive, [data-cursor-label]')) {
        setIsActive(false);
        setLabel('');
      }
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, [enabled, mounted]);

  if (!enabled || reducedMotion.current || !mounted) {
    return null;
  }

  return (
    <div
      // 2. CRITICAL FIX: Added pointer-events-none and z-[9999] so the cursor cannot trigger its own hover events
      className={cn(
        'custom-cursor pointer-events-none fixed inset-0 z-[9999]',
        isActive && 'custom-cursor--active'
      )}
      style={{
        transform: `translate(${ringPosition.x}px, ${ringPosition.y}px)`,
      }}
      aria-hidden="true"
    >
      <div
        className="custom-cursor__dot"
        style={{ transform: `translate(${position.x - ringPosition.x}px, ${position.y - ringPosition.y}px)` }}
      />
      <div className="custom-cursor__ring" />
      {label && <span className="custom-cursor__label">{label}</span>}
    </div>
  );
}