'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import type { ExperienceConfig } from '@/types';

interface EntryCardProps {
  experience: ExperienceConfig;
  onSelect: (type: 'interiors' | 'construction') => void;
  index: number;
}

export function EntryCard({
  experience,
  onSelect,
  index,
}: EntryCardProps) {
  const number = index === 0 ? '01' : '02';

  // 1. ADD YOUR EXACT IMAGE PATHS HERE
  const imagePath = experience.type === 'interiors'
    ? '/images/entry/interiors-cover.png'       // <-- Path for Interiors card
    : '/images/entry/construction-cover.png';   // <-- Path for Construction card

  return (
    <motion.article
      layoutId={`card-container-${experience.type}`}
      className="group relative flex-1 flex flex-col cursor-pointer bg-charcoal border border-gold/10 rounded-2xl p-3 lg:p-4 transition-colors duration-500 hover:border-gold/30 hover:bg-gold/[0.02]"
      onClick={() => onSelect(experience.type)}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 + index * 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
      aria-label={`Enter ${experience.name} experience`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(experience.type);
        }
      }}
    >
      {/* Top: Compact Rounded Image Container */}
      <div className="relative w-full aspect-video overflow-hidden rounded-xl mb-5 group bg-[#111]">
        <Image
          src={imagePath}
          alt={`${experience.name} Entry`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          // 2. FORCING FULL COLOR: Added !important flags to override any global black-and-white CSS
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 !grayscale-0 !saturate-100 !brightness-100 !contrast-100"
          style={{ filter: 'none', WebkitFilter: 'none' }} // Ultimate failsafe to block grayscale
        />
      </div>

      {/* Bottom: Tighter Text & Content */}
      <div className="flex flex-col flex-1 px-2">
        <motion.div
          className="flex items-center gap-2 mb-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 + index * 0.15 }}
        >
          <span className="font-mono text-[10px] lg:text-xs text-gold tracking-wider">{number}</span>
          <span className="h-px w-6 bg-gold/50" aria-hidden="true" />
          <span className="font-body text-[10px] lg:text-xs text-gold/80 tracking-wider uppercase">
            {experience.name}
          </span>
        </motion.div>

        <div className="flex-1">
          <motion.h2
            className="font-display text-xl lg:text-2xl text-ivory group-hover:text-gold transition-colors duration-500 leading-tight mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.85 + index * 0.15 }}
          >
            {experience.heroHeadline}
          </motion.h2>
          <motion.p
            className="text-sm text-ivory/70 mb-5 max-w-sm line-clamp-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 + index * 0.15 }}
          >
            {experience.description}
          </motion.p>
        </div>

        {/* Compact Footer / Button Area */}
        <motion.div
          className="flex items-center justify-between pt-4 border-t border-gold/10 group-hover:border-gold/30 transition-colors duration-500 mt-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.15 + index * 0.15 }}
        >
          <motion.span
            className="flex items-center gap-2 text-gold/90 group-hover:text-gold transition-colors duration-300"
            whileHover={{ x: 4 }}
            transition={{ duration: 0.3 }}
          >
            <span className="font-body text-xs tracking-wider font-semibold">Explore</span>
            <span className="flex items-center justify-center w-8 h-8 rounded-full border border-gold/40 group-hover:border-gold group-hover:bg-gold/20 transition-all duration-300">
              <ChevronRight className="w-4 h-4 text-gold" />
            </span>
          </motion.span>
          <span className="font-mono text-[9px] text-gold/50 hidden sm:block">
            {index === 0 ? 'EST. WORLD OF SPACES' : 'EST. WORLD OF STRUCTURE'}
          </span>
        </motion.div>
      </div>
    </motion.article>
  );
}