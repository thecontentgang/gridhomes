'use client';

import { motion } from 'motion/react';
import { ScrollReveal, SectionHeading } from '@/components/common';
import { cn } from '@/lib/utils/cn';
import { Quote } from 'lucide-react';
import type { ExperienceConfig, Testimonial } from '@/types';

interface TestimonialsProps {
  experience: ExperienceConfig;
  testimonials: Testimonial[];
  number?: string;
}

export function Testimonials({ experience, testimonials, number = '07' }: TestimonialsProps) {
  // We duplicate the testimonials to create a seamless infinite loop
  const duplicatedTestimonials = [...testimonials, ...testimonials, ...testimonials];
  
  return (
    <section id="testimonials" className="section bg-white py-24 lg:py-36 border-b border-neutral-100 overflow-hidden" aria-labelledby="testimonials-heading">
      <div className="container-lg mx-auto px-6 mb-16 lg:mb-24">
        <ScrollReveal delay={0.1}>
          <SectionHeading
            number={number}
            eyebrow="Client Voices"
            title="Trusted by Visionaries"
            subtitle="The uncompromising standards and foundational principles that drive our craft."
            delay={0}
          />
        </ScrollReveal>
      </div>

      {/* Marquee Container */}
      <div className="relative w-full overflow-hidden flex items-center">
        {/* Left and Right Fade Overlays for seamless entry/exit effect */}
        <div className="absolute top-0 bottom-0 left-0 w-24 md:w-48 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-24 md:w-48 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <motion.div
          className="flex w-max gap-6 md:gap-8 px-6 md:px-8"
          animate={{ x: [0, -((testimonials.length * 400) + (testimonials.length * 32))] }} // approximate width calculation
          transition={{
            repeat: Infinity,
            duration: testimonials.length * 8, // Speed based on item count
            ease: "linear",
          }}
          whileHover={{ animationPlayState: 'paused' }} 
        >
          {duplicatedTestimonials.map((current, index) => (
            <div
              key={`${current.id}-${index}`}
              className={cn(
                "group relative shrink-0 w-[300px] md:w-[400px] p-8 md:p-10 rounded-[2rem]",
                "bg-neutral-50/50 border border-neutral-200/60 shadow-sm transition-all duration-500",
                "hover:bg-white hover:shadow-2xl hover:border-gold/30 hover:-translate-y-2 flex flex-col justify-between"
              )}
            >
              <div>
                <Quote className="w-8 h-8 text-gold mb-6 opacity-80" />
                <p className="font-sans text-base md:text-lg text-neutral-600 leading-relaxed mb-8">
                  &ldquo;{current.quote}&rdquo;
                </p>
              </div>

              <div className="flex items-center gap-4 pt-6 border-t border-neutral-200/60 group-hover:border-gold/20 transition-colors">
                <div className="flex-1">
                  <h4 className="font-display text-lg text-neutral-900 group-hover:text-gold transition-colors">
                    {current.author}
                  </h4>
                  <p className="font-mono text-[10px] text-neutral-400 tracking-widest uppercase mt-1">
                    {current.project} &mdash; {current.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}