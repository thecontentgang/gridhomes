'use client';

import { motion } from 'motion/react';
import { ScrollReveal, SectionHeading } from '@/components/common';
import { cn } from '@/lib/utils/cn';
import { Quote, Star } from 'lucide-react';
import type { ExperienceConfig, Testimonial } from '@/types';

interface TestimonialsProps {
  experience: ExperienceConfig;
  testimonials: Testimonial[];
  number?: string;
}

export function Testimonials({ experience, testimonials, number = '06' }: TestimonialsProps) {
  // We duplicate the set specifically into TWO distinct groups for a mathematically perfect seamless loop.
  // If you have very few testimonials (e.g., 2), we double them first so the screen is filled.
  const displayTestimonials = testimonials.length < 4
    ? [...testimonials, ...testimonials]
    : testimonials;

  return (
    <section id="testimonials" className="section bg-white py-24 lg:py-36 border-b border-neutral-100 overflow-hidden text-black" aria-labelledby="testimonials-heading">
      <div className="container-lg mx-auto px-6 mb-16 lg:mb-24">
        <ScrollReveal delay={0.1}>
          {/* Black text override wrapper for the light background */}
          <div className="[&_h2]:!text-black [&_p]:!text-black/70 [&_span]:!text-black/60">
            <SectionHeading
              number={number}
              eyebrow="Client Voices"
              title="Trusted by Visionaries"
              subtitle="The uncompromising standards and foundational principles that drive our craft."
              delay={0}
            />
          </div>
        </ScrollReveal>
      </div>

      {/* Marquee Container */}
      <div className="relative w-full overflow-hidden flex items-center group">
        {/* Left and Right Fade Overlays for seamless entry/exit effect */}
        <div className="absolute top-0 bottom-0 left-0 w-24 md:w-56 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-24 md:w-56 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

        {/* 
          The Seamless Loop Trick:
          We place TWO identical rows side by side. We animate to -50% (exactly the width of one row).
          Once it hits -50%, it instantly loops back to 0%. Since the rows are identical, the user never sees the reset.
        */}
        <motion.div
          className="flex w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: displayTestimonials.length * 8, // Auto-adjusts speed based on content length
          }}
        >
          {/* Group 1 */}
          <div className="flex gap-6 md:gap-8 px-3 md:px-4">
            {displayTestimonials.map((current, index) => (
              <TestimonialCard key={`set1-${current.id || index}`} current={current} />
            ))}
          </div>

          {/* Group 2 (Exact Duplicate for the loop) */}
          <div className="flex gap-6 md:gap-8 px-3 md:px-4">
            {displayTestimonials.map((current, index) => (
              <TestimonialCard key={`set2-${current.id || index}`} current={current} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/**
 * Extracted Card Component for clean, reusable rendering in both sets
 */
function TestimonialCard({ current }: { current: Testimonial }) {
  return (
    <div
      className={cn(
        "group/card relative shrink-0 w-[320px] md:w-[450px] p-8 md:p-12 rounded-[2.5rem]",
        "bg-neutral-50/80 border border-neutral-200/80 transition-all duration-700 ease-out",
        "hover:bg-white hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)] hover:border-gold/40 hover:-translate-y-2 flex flex-col justify-between overflow-hidden"
      )}
    >
      {/* Giant Decorative Background Quote */}
      <div className="absolute -top-4 -right-4 text-neutral-200/40 group-hover/card:text-gold/10 transition-colors duration-700 rotate-12">
        <Quote size={160} strokeWidth={0.5} className="fill-current" />
      </div>

      <div className="relative z-10">
        {/* 5-Star Rating Accent */}
        <div className="flex gap-1 mb-8">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-3.5 h-3.5 fill-gold text-gold" />
          ))}
        </div>

        <p className="font-sans text-lg md:text-xl text-neutral-600 leading-relaxed mb-12 group-hover/card:text-neutral-900 transition-colors duration-500">
          &quot;{current.quote}&quot;
        </p>
      </div>

      <div className="relative z-10 flex items-center gap-5 pt-8 border-t border-neutral-200 group-hover/card:border-gold/30 transition-colors duration-500">
        {/* Avatar Fallback */}
        <div className="w-14 h-14 rounded-full bg-neutral-900 flex items-center justify-center flex-shrink-0 group-hover/card:bg-gold transition-colors duration-500 shadow-sm">
          <span className="font-display text-white text-xl group-hover/card:text-black transition-colors duration-500">
            {current.author?.charAt(0) || 'C'}
          </span>
        </div>

        <div className="flex-1">
          <h4 className="font-display font-semibold text-lg text-black">
            {current.author}
          </h4>
          <p className="font-mono text-[10px] text-neutral-500 tracking-widest uppercase mt-1.5 group-hover/card:text-neutral-700 transition-colors">
            {current.project} {current.location && `— ${current.location}`}
          </p>
        </div>
      </div>
    </div>
  );
}