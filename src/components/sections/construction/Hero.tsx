'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import { Button } from '@/components/common';
import { openContactModal } from '@/lib/contact';
import type { ExperienceConfig } from '@/types';

interface HeroProps {
  experience: ExperienceConfig;
}

export function Hero({ experience }: HeroProps) {
  // Signature premium cinematic easing
  const cinematicEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

  // Staggered animation variants for the text block
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.2, ease: cinematicEase }
    },
  };

  return (
    <section
      // rounded-b-[2.5rem] rounds ONLY the bottom-left and bottom-right corners.
      // transform-gpu and style are added to fix a WebKit/Safari bug where scaled images bleed out of rounded corners.
      className="relative min-h-[100dvh] flex flex-col overflow-hidden rounded-b-[2.5rem] lg:rounded-b-[4rem] shadow-2xl bg-black transform-gpu"
      style={{ WebkitMaskImage: '-webkit-radial-gradient(white, black)' }}
      aria-labelledby="hero-title"
    >

      {/* 1. FULLSCREEN BACKGROUND IMAGE */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 3, ease: 'easeOut' }}
      >
        <Image
          src="/images/construction/contruction-hero.png"
          alt={`${experience.name} Hero`}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Luxury gradient/dark overlay to ensure perfect text readability */}
        <div className="absolute inset-0 bg-black/50" />
      </motion.div>

      {/* 2. MAIN CONTENT (Responsive Grid Arrangement) */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col items-center justify-center text-center pt-28 pb-32">
        <motion.div
          className="max-w-4xl flex flex-col items-center w-full"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Label / Subtitle */}
          <motion.div variants={itemVariants} className="flex items-center justify-center gap-3 sm:gap-4 mb-6">
            <span className="h-[1px] w-8 sm:w-12 bg-white/50" aria-hidden="true" />
            <span className="font-mono text-[9px] sm:text-[10px] md:text-xs text-white/80 tracking-[0.3em] uppercase">
              {experience.name}
            </span>
            <span className="h-[1px] w-8 sm:w-12 bg-white/50" aria-hidden="true" />
          </motion.div>

          {/* Headline - Clean Gold text without the black card */}
          <motion.h1
            id="hero-title"
            variants={itemVariants}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[5.5rem] text-gold drop-shadow-xl leading-[1.1] tracking-tight mb-6 w-full max-w-[90vw] sm:max-w-none"
          >
            {experience.heroHeadline}
          </motion.h1>

          {/* Main Description / Subtext */}
          <motion.p
            variants={itemVariants}
            className="text-sm sm:text-base md:text-lg text-white/90 max-w-xl leading-relaxed font-sans px-4 shadow-sm"
          >
            {experience.heroSubtext}
          </motion.p>
        </motion.div>

        {/* ACTION BUTTONS */}
        <motion.div
          className="w-full flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mt-10 md:mt-14 px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: cinematicEase }}
        >
          {/* PRIMARY BUTTON: Shining Gold fading to Black on hover */}
          <Button
            variant="primary"
            size="lg"
            className="group flex items-center justify-between sm:justify-center gap-4 sm:gap-6 font-mono uppercase tracking-[0.2em] text-[10px] sm:text-[11px] bg-gold border border-gold hover:bg-black hover:border-black rounded-full pl-6 sm:pl-8 pr-2 py-2 w-full sm:w-auto transition-all duration-500 shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:shadow-2xl"
            onClick={() => openContactModal()}
          >
            {/* Text turns from Black to Gold on hover */}
            <span className="text-black group-hover:text-gold font-bold transition-colors duration-500">
              Start a Conversation
            </span>

            {/* Icon Pill: Inverts from Black/Gold to Gold/Black */}
            <span className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 shrink-0 rounded-full bg-black text-gold group-hover:bg-gold group-hover:text-black transition-all duration-500">
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-500 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </Button>

          {/* SECONDARY BUTTON: Minimalist Editorial Brackets */}
          <button
            className="group flex items-center justify-center gap-3 cursor-pointer px-6 py-4 w-full sm:w-auto"
            onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })}
            aria-label="View Gallery"
          >
            <span className="text-gold/60 group-hover:text-gold group-hover:-translate-x-1 transition-all duration-500 font-mono text-xs">
              [
            </span>
            <span className="font-mono font-medium text-[10px] sm:text-[11px] tracking-[0.2em] text-white/80 uppercase group-hover:text-white transition-colors duration-500 drop-shadow-sm">
              View Structures
            </span>
            <span className="text-gold/60 group-hover:text-gold group-hover:translate-x-1 transition-all duration-500 font-mono text-xs">
              ]
            </span>
          </button>
        </motion.div>
      </div>

      {/* 3. SCROLL INDICATOR (Anchored to the absolute bottom) */}
      <motion.div
        className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2, ease: cinematicEase }}
      >
        <div className="w-[1px] h-8 md:h-12 bg-white/30 relative overflow-hidden">
          <motion.div
            className="w-full h-1/2 bg-gold"
            animate={{ y: ['-100%', '250%'] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: [0.76, 0, 0.24, 1],
            }}
          />
        </div>
      </motion.div>

    </section>
  );
}