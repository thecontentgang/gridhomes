'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/common';
import { cn } from '@/lib/utils/cn';
import type { ExperienceConfig } from '@/types';

interface AboutProps {
  experience: ExperienceConfig;
}

export function About({ experience }: AboutProps) {
  // Destructure with fallbacks for the new fields in case data is missing
  const {
    heading,
    intro,
    body,
    image,
    missionStatement = "Crafting experiences that transcend the ordinary. We believe in the perfect harmony of form, function, and emotion.",
    valuesHeading = "Our Core Principles",
    values = [
      { title: "Craftsmanship", description: "Every detail is meticulously considered, ensuring a standard of excellence that stands the test of time." },
      { title: "Innovation", description: "We push boundaries and challenge conventions to discover new ways of solving complex design problems." },
      { title: "Sustainability", description: "Creating with the future in mind, we prioritize materials and processes that respect our environment." }
    ]
  } = experience.aboutContent;

  const paragraphs = body.split('\n\n').filter(Boolean);
  
  // Split stats: Put the first 2 in the floating box, and the rest in the text area
  const floatingStats = experience.stats.slice(0, 2);
  const textStats = experience.stats.slice(2);

  return (
    <section id="about" className="section bg-white py-24 lg:py-36 border-b border-neutral-100 text-black" aria-labelledby="about-heading">
      <div className="container-lg mx-auto px-4 sm:px-6">

        {/* PART 1: THE STORY (Grid layout) */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-5">
            <ScrollReveal delay={0.1}>
              <div className="flex items-center gap-4 mb-6">
                <span className="font-mono text-xs text-gold font-medium tracking-widest">01</span>
                <span className="h-px w-10 bg-neutral-200" aria-hidden="true" />
                <span className="font-mono text-xs text-neutral-400 tracking-widest uppercase">About Us</span>
              </div>
              <h2 id="about-heading" className="font-display text-4xl sm:text-5xl lg:text-6xl text-black leading-[1.1] mb-6">
                {heading}
              </h2>
              <span className="block h-px w-14 bg-gold mb-8" aria-hidden="true" />
              <p className="font-sans text-lg lg:text-xl text-neutral-700 leading-relaxed font-normal">{intro}</p>
            </ScrollReveal>
          </div>

          <div className="lg:col-span-7">
            <StaggerContainer staggerChildren={0.1} delayChildren={0.15}>
              {paragraphs.map((paragraph, index) => (
                <StaggerItem key={index}>
                  <p className={cn('font-sans text-base lg:text-lg leading-relaxed text-neutral-700 font-normal', index === 0 ? 'mb-6' : 'mb-8')}>
                    {paragraph}
                  </p>
                </StaggerItem>
              ))}

              {/* Only render text stats if there are any left over after the first 2 */}
              {textStats.length > 0 && (
                <StaggerItem>
                  <div className="flex flex-wrap gap-x-16 gap-y-8 border-t border-neutral-200 pt-10 mt-6">
                    {textStats.map((stat, index) => (
                      <motion.div
                        key={stat.label}
                        className="flex flex-col gap-1"
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.08 }}
                      >
                        <span className="font-display text-4xl lg:text-5xl text-black tabular-nums">{stat.value}</span>
                        <span className="font-mono text-[11px] text-neutral-400 tracking-widest uppercase">{stat.label}</span>
                      </motion.div>
                    ))}
                  </div>
                </StaggerItem>
              )}
            </StaggerContainer>
          </div>
        </div>

        {/* PART 2: VISUAL BREAK & FLOATING STATS */}
        <div className="relative mt-20 lg:mt-32 mb-20 lg:mb-32">
          <ScrollReveal delay={0.15} direction="up" className="w-full">
            {/* 
              Changed mobile aspect ratio to `aspect-square` so the image has plenty of height on phones.
              This prevents the image from looking like a thin, cropped strip.
            */}
            <div className="relative w-full aspect-square sm:aspect-video lg:aspect-[21/9] rounded-xl sm:rounded-2xl md:rounded-[2rem] overflow-hidden shadow-2xl group">
              <Image
                src="/images/homepage/about-gh.webp"
                alt={`${experience.name} studio or workspace`}
                fill
                sizes="100vw"
                className="object-cover transition-transform duration-[2s] ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-700" />
            </div>
          </ScrollReveal>

          {/* 
            Floating Stats Box
            Scaled down for mobile: tighter padding (p-4), smaller gap (gap-6), smaller text.
          */}
          {floatingStats.length > 0 && (
            <motion.div
              className="absolute -bottom-6 sm:-bottom-10 lg:-bottom-16 right-4 sm:right-12 lg:right-24 bg-neutral-950 text-white p-4 sm:p-8 lg:p-12 z-10 rounded-xl sm:rounded-2xl shadow-2xl border border-white/10 flex flex-row gap-6 sm:gap-12 lg:gap-20 backdrop-blur-md"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              {floatingStats.map((stat, idx) => (
                <div key={idx} className="flex flex-col">
                  {/* Smaller number font on mobile */}
                  <span className="font-display text-3xl sm:text-5xl lg:text-6xl text-gold tabular-nums tracking-tight block">
                    {stat.value}
                  </span>
                  <span className="block h-px w-6 sm:w-10 bg-gold/50 my-2 sm:my-3 lg:my-4" />
                  {/* Scaled down text label on mobile, allows slight wrapping if needed */}
                  <span className="block font-mono text-[8px] sm:text-[10px] lg:text-xs text-white/70 uppercase tracking-widest max-w-[80px] sm:max-w-none">
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>
          )}
        </div>

        {/* PART 3: MISSION & PHILOSOPHY */}
        {missionStatement && (
          <div className="mt-32 lg:mt-40 max-w-4xl mx-auto text-center">
            <ScrollReveal delay={0.2}>
              <span className="font-mono text-xs text-neutral-400 tracking-[0.3em] uppercase block mb-6">Our Philosophy</span>
              <h3 className="font-display text-3xl sm:text-4xl md:text-5xl text-black leading-tight">
                &ldquo;{missionStatement}&rdquo;
              </h3>
            </ScrollReveal>
          </div>
        )}

        {/* PART 4: CORE VALUES GRID */}
        {values && values.length > 0 && (
          <div className="mt-24 lg:mt-36 pt-20 border-t border-neutral-200">
            <ScrollReveal delay={0.1}>
              <h4 className="font-display text-3xl sm:text-4xl text-black mb-12 lg:mb-16">
                {valuesHeading}
              </h4>
            </ScrollReveal>

            <StaggerContainer staggerChildren={0.15} delayChildren={0.2}>
              <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
                {values.map((value, idx) => (
                  <StaggerItem key={idx}>
                    <div className="flex flex-col h-full bg-neutral-50/50 p-8 lg:p-10 rounded-3xl border border-neutral-100 transition-all duration-300 hover:border-gold/30 hover:bg-gold/[0.02] hover:-translate-y-1">
                      <span className="font-mono text-xs text-gold tracking-widest mb-6 block font-medium">
                        0{idx + 1}
                      </span>
                      <h5 className="font-display text-2xl text-black mb-4">
                        {value.title}
                      </h5>
                      <p className="font-sans text-base text-neutral-700 leading-relaxed font-normal">
                        {value.description}
                      </p>
                    </div>
                  </StaggerItem>
                ))}
              </div>
            </StaggerContainer>
          </div>
        )}

      </div>
    </section>
  );
}