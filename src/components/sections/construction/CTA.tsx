'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import { ScrollReveal } from '@/components/common';
import { ChevronRight } from 'lucide-react';
import { openContactModal } from '@/lib/contact';
import type { ExperienceConfig } from '@/types';
import { cn } from '@/lib/utils/cn';

interface CTAProps {
  experience: ExperienceConfig;
}

export function CTA({ experience }: CTAProps) {
  const { headline, subtext, buttonText, backgroundImage } = experience.cta;

  return (
    <section id="contact" className="section bg-white py-24 lg:py-32 text-black" aria-labelledby="cta-heading">
      <div className="container-lg mx-auto px-4 sm:px-6">
        <ScrollReveal delay={0.1}>

          {/* THE CARD CONTAINER */}
          <div className="relative overflow-hidden rounded-3xl lg:rounded-[3rem] shadow-2xl px-6 py-24 lg:py-32 flex flex-col items-center text-center bg-black">

            {/* Background Image (Constrained inside the card) */}
            <div className="absolute inset-0 z-0">
              <motion.div
                className="absolute inset-0"
                initial={{ scale: 1.1 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 1.5, ease: [0.21, 0.47, 0.32, 0.98] }}
                viewport={{ once: true }}
              >
                <Image
                  src={backgroundImage}
                  alt="Construction Architecture"
                  fill
                  sizes="100vw"
                  className="object-cover opacity-80"
                />
              </motion.div>

              {/* Luxury dark overlay to make the gold/white text pop */}
              <div className="absolute inset-0 bg-black/60" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            </div>

            {/* CARD CONTENT */}
            <div className="relative z-10 max-w-4xl mx-auto">
              <div className="flex items-center justify-center gap-4 sm:gap-6 mb-8 sm:mb-10">
                <span className="h-px w-12 sm:w-16 bg-gold/50" aria-hidden="true" />
                <span className="font-mono text-[10px] sm:text-xs text-gold tracking-[0.3em] uppercase font-semibold">
                  Get in touch
                </span>
                <span className="h-px w-12 sm:w-16 bg-gold/50" aria-hidden="true" />
              </div>

              <h2
                id="cta-heading"
                className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-[1.1] tracking-tight mb-6 sm:mb-8"
              >
                {headline}
              </h2>

              <p className="font-sans text-base sm:text-lg lg:text-xl text-neutral-300 mb-12 lg:mb-14 max-w-2xl mx-auto font-normal leading-relaxed shadow-sm">
                {subtext}
              </p>

              {/* ACTION BUTTON */}
              <button
                onClick={() => openContactModal()}
                className={cn(
                  "group relative inline-flex items-center justify-center h-14 sm:h-16 px-8 sm:px-12 rounded-full",
                  "bg-gold border border-gold transition-all duration-500",
                  "hover:shadow-[0_0_40px_-10px_rgba(212,175,55,0.4)] hover:-translate-y-1 overflow-hidden"
                )}
              >
                {/* Inner hover effect - pure white swipe up */}
                <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1]" />

                <span className="relative z-10 flex items-center gap-3 text-black font-mono uppercase tracking-[0.2em] text-[10px] sm:text-[11px] font-bold group-hover:text-black transition-colors duration-300">
                  {buttonText}
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
