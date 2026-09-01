'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils/cn';
import { ChevronRight } from 'lucide-react';

type DivisionType = 'interiors' | 'construction';

const divisions = [
  {
    id: 'interiors',
    number: '01',
    title: 'Interiors',
    headline: 'World of Spaces',
    description: 'Bespoke interior design solutions tailored to elevate your living and working environments.',
    image: '/images/entry/Interiors-cover.png',
  },
  {
    id: 'construction',
    number: '02',
    title: 'Construction',
    headline: 'World of Structure',
    description: 'Robust engineering and architectural construction building the foundations of tomorrow.',
    image: '/images/entry/construction-cover.png',
  }
];

export function EntryScreen() {
  const router = useRouter();
  const [selected, setSelected] = useState<DivisionType | null>(null);

  const cinematicEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

  const handleSelect = (type: DivisionType) => {
    if (selected) return; // Prevent double clicks
    setSelected(type);

    // Smooth transition to the next page
    setTimeout(() => {
      router.push(`/${type}`);
    }, 1500);
  };

  return (
    <div className="relative h-[100dvh] w-screen bg-neutral-950 flex flex-col overflow-hidden px-3 py-4 md:px-8 md:py-8 lg:p-12 font-sans">
      
      {/* Background Ambient Glow */}
      <div className="absolute inset-0 z-0 pointer-events-none flex justify-center items-center opacity-30">
        <div className="w-[80vw] h-[80vw] max-w-3xl max-h-3xl bg-gold/5 blur-[120px] rounded-full" />
      </div>

      {/* TOP HEADER: Heavily scaled down on mobile to save vertical space */}
      <motion.header 
        className="relative z-10 flex-none flex flex-col items-center mb-4 md:mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: cinematicEase }}
      >
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-2 md:p-3 lg:p-4 rounded-full shadow-2xl mb-3 md:mb-6">
          <Image
            src="/images/entry/Main-logo.png"
            alt="Grid Homes Logo"
            width={160}
            height={60}
            priority
            className="h-6 md:h-8 lg:h-10 w-auto object-contain drop-shadow-md"
          />
        </div>
        <h1 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-5xl text-white tracking-tight mb-1 md:mb-2">
          What do you want to explore?
        </h1>
        <span className="font-mono text-[9px] sm:text-[10px] md:text-xs text-gold/70 tracking-[0.2em] uppercase">
          Select Your Division
        </span>
      </motion.header>

      {/* CARDS CONTAINER: Stacks vertically on mobile (flex-col), horizontally on desktop (lg:flex-row) */}
      <main className="relative z-10 flex-1 min-h-0 w-full max-w-6xl mx-auto flex flex-col lg:flex-row gap-3 md:gap-6 lg:gap-8 pb-2 md:pb-0">
        {divisions.map((div, index) => {
          const isSelected = selected === div.id;
          const isNotSelected = selected && selected !== div.id;

          return (
            <motion.article
              key={div.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ 
                opacity: isNotSelected ? 0.3 : 1, 
                scale: isNotSelected ? 0.95 : 1,
                y: 0 
              }}
              transition={{ duration: 0.8, delay: 0.2 + index * 0.15, ease: cinematicEase }}
              onClick={() => handleSelect(div.id as DivisionType)}
              className={cn(
                "group relative flex-1 min-h-0 flex flex-col cursor-pointer bg-neutral-900/50 backdrop-blur-sm border rounded-xl md:rounded-2xl p-2 md:p-4 lg:p-5 transition-all duration-500",
                isSelected ? "border-gold bg-gold/10 shadow-[0_0_40px_rgba(212,175,55,0.1)]" : "border-white/10 hover:border-gold/40 hover:bg-white/5"
              )}
            >
              {/* Card Image: Uses Next.js Image with `fill` */}
              <div className="relative flex-1 min-h-0 w-full overflow-hidden rounded-lg md:rounded-xl mb-3 md:mb-4">
                <Image
                  src={div.image}
                  alt={`${div.title} Cover`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                  className={cn(
                    "object-cover transition-transform duration-700 ease-out",
                    isSelected ? "scale-105" : "group-hover:scale-105",
                    div.id === 'construction' && !isSelected && "grayscale hover:grayscale-0"
                  )}
                />
                <div className="absolute inset-0 bg-neutral-950/40 group-hover:bg-transparent transition-colors duration-500" />
                
                {/* Loading Overlay */}
                <AnimatePresence>
                  {isSelected && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute inset-0 bg-neutral-950/80 backdrop-blur-sm flex flex-col items-center justify-center gap-3 z-20"
                    >
                      <div className="w-6 h-6 md:w-8 md:h-8 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
                      <span className="font-mono text-[9px] md:text-[10px] text-white uppercase tracking-widest">
                        Entering {div.title}...
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Card Content: Fixed minimal height */}
              <div className="flex-none flex flex-col px-1 md:px-2">
                <div className="flex items-center gap-2 mb-1 md:mb-2">
                  <span className="font-mono text-[9px] md:text-[10px] text-gold tracking-wider">{div.number}</span>
                  <span className="h-px w-4 md:w-6 bg-gold/50" />
                  <span className="font-sans text-[9px] md:text-[10px] text-gold/80 tracking-wider uppercase font-semibold">
                    {div.title}
                  </span>
                </div>

                <h2 className="font-display text-lg md:text-2xl lg:text-3xl text-white group-hover:text-gold transition-colors duration-500 leading-tight mb-1 md:mb-2">
                  {div.headline}
                </h2>
                
                {/* Description strictly hidden on mobile to guarantee no scrolling */}
                <p className="text-xs md:text-sm text-white/60 mb-3 line-clamp-2 hidden md:block">
                  {div.description}
                </p>

                {/* Footer / Button Area */}
                <div className="flex items-center justify-between pt-2 md:pt-4 border-t border-white/10 group-hover:border-gold/30 transition-colors duration-500">
                  <span className="flex items-center gap-2 text-gold/90 group-hover:text-gold transition-colors duration-300">
                    <span className="font-sans text-[9px] md:text-[10px] lg:text-xs tracking-widest font-semibold uppercase">Explore</span>
                    <span className="flex items-center justify-center w-5 h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 rounded-full border border-gold/40 group-hover:border-gold group-hover:bg-gold/10 transition-all duration-300">
                      <ChevronRight className="w-3 h-3 md:w-4 md:h-4 text-gold" />
                    </span>
                  </span>
                </div>
              </div>
            </motion.article>
          );
        })}
      </main>
    </div>
  );
}