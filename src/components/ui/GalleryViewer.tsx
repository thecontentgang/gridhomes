'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, type PanInfo } from 'motion/react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

export interface GalleryImage {
  src: string;
  alt: string;
  projectId: string;
  projectName: string;
  location: string;
  category: string;
}

interface GalleryViewerProps {
  images: GalleryImage[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

export function GalleryViewer({ images, initialIndex, isOpen, onClose }: GalleryViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [dragStart, setDragStart] = useState(0);
  const [prevInitial, setPrevInitial] = useState(initialIndex);
  if (initialIndex !== prevInitial) {
    setPrevInitial(initialIndex);
    setCurrentIndex(initialIndex);
  }

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isOpen) return;
    switch (e.key) {
      case 'Escape':
        onClose();
        break;
      case 'ArrowLeft':
        handlePrev();
        break;
      case 'ArrowRight':
        handleNext();
        break;
    }
  }, [isOpen, onClose, handlePrev, handleNext]);

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

  const handleDragStart = (e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setDragStart(info.point.x);
  };

  const handleDragEnd = (e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const dragDistance = info.point.x - dragStart;
    const swipeThreshold = 50;

    if (dragDistance > swipeThreshold) {
      handlePrev();
    } else if (dragDistance < -swipeThreshold) {
      handleNext();
    }
  };

  if (!isOpen || images.length === 0) return null;

  const currentImage = images[currentIndex];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm"
        >
          {/* Top Bar */}
          <div className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between p-4 md:p-6 bg-gradient-to-b from-black/60 to-transparent pointer-events-none">
            <div className="flex flex-col text-white pointer-events-auto">
              <span className="font-display text-lg md:text-xl">{currentImage.projectName}</span>
              <span className="font-mono text-xs text-white/60 tracking-wider uppercase">
                {currentImage.location} &mdash; {currentImage.category}
              </span>
            </div>
            
            <button
              onClick={onClose}
              className="p-3 md:p-4 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors pointer-events-auto"
              aria-label="Close gallery"
            >
              <X className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </div>

          {/* Main Image Area with Swipe Support */}
          <motion.div 
            className="relative w-full h-full flex items-center justify-center px-0 md:px-24 py-20 touch-none"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="relative w-full h-full max-h-[85vh] flex items-center justify-center"
              >
                <div className="relative w-full h-full">
                  <Image
                    src={currentImage.src}
                    alt={currentImage.alt}
                    fill
                    sizes="100vw"
                    className="object-contain"
                    priority
                    quality={90}
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Desktop Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 p-5 rounded-full bg-black/40 hover:bg-black/80 border border-white/10 hover:border-gold text-white hover:text-gold transition-all duration-300 z-50"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
              
              <button
                onClick={(e) => { e.stopPropagation(); handleNext(); }}
                className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 p-5 rounded-full bg-black/40 hover:bg-black/80 border border-white/10 hover:border-gold text-white hover:text-gold transition-all duration-300 z-50"
                aria-label="Next image"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            </>
          )}

          {/* Bottom Counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 px-6 py-2 rounded-full bg-black/50 backdrop-blur-md border border-white/10">
            <span className="font-mono text-sm tracking-widest text-white/80 tabular-nums">
              {currentIndex + 1} <span className="text-white/30 mx-2">/</span> {images.length}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
