'use client';

import { motion } from 'motion/react';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/common';
import { SectionHeading } from '@/components/common';
import { cn } from '@/lib/utils/cn';
import {
  PenTool, Ruler, Gem, FileText,
  Briefcase, Calculator, Clock,
  ShieldCheck, Eye
} from 'lucide-react';
import type { ExperienceConfig } from '@/types';

interface WhyChooseUsProps {
  experience: ExperienceConfig;
  number?: string;
}

export function WhyChooseUs({ experience, number = '06' }: WhyChooseUsProps) {
  // Use the configuration's reasons
  const items = experience.whyChooseUs || [];

  const ICONS = [ShieldCheck, Eye, Ruler, Calculator, Briefcase, FileText, PenTool, Gem, Clock];

  return (
    <section id="why-choose-us" className="section bg-white py-24 lg:py-36 border-b border-neutral-100" aria-labelledby="why-choose-us-heading">
      <div className="container-lg mx-auto px-6">
        <ScrollReveal delay={0.1}>
          <SectionHeading
            number={number}
            eyebrow={experience.name}
            title="The Grid Homes Standard"
            subtitle="The uncompromising discipline and technical rigor that drive our construction."
            delay={0}
          />
        </ScrollReveal>

        <StaggerContainer
          staggerChildren={0.08}
          delayChildren={0.1}
          className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {items.map((item, index) => {
            const IconComponent = ICONS[index % ICONS.length];
            const isCenter = index === 4 || (items.length <= 6 && index === 2); // Highlight center or top right
            
            return (
              <StaggerItem key={item.number || index} delay={index * 0.03}>
                <motion.div
                  className={cn(
                    'group relative overflow-hidden h-full p-8 lg:p-10 rounded-[2rem] border transition-all duration-700 flex flex-col justify-between',
                    isCenter 
                      ? 'bg-neutral-900 border-neutral-800 hover:border-gold/50 hover:shadow-[0_20px_40px_-15px_rgba(212,175,55,0.15)]' 
                      : 'bg-white border-neutral-200/60 hover:border-gold/40 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.08)]'
                  )}
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* Giant Watermark Number */}
                  <div className={cn(
                    "absolute -bottom-6 -right-4 text-[9rem] leading-none font-display font-bold select-none pointer-events-none transition-colors duration-700",
                    isCenter ? "text-white/[0.03] group-hover:text-gold/[0.05]" : "text-neutral-900/[0.03] group-hover:text-gold/[0.05]"
                  )}>
                    {item.number || String(index + 1).padStart(2, '0')}
                  </div>

                  {/* Animated Top Border */}
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-gold/0 via-gold to-gold/0 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />

                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex items-center justify-between mb-10">
                      <div className={cn(
                        "flex items-center justify-center w-14 h-14 rounded-full transition-colors duration-500",
                        isCenter 
                          ? "bg-white/5 text-neutral-400 group-hover:bg-gold/20 group-hover:text-gold" 
                          : "bg-neutral-50 text-neutral-400 group-hover:bg-gold/10 group-hover:text-gold border border-neutral-100"
                      )}>
                        <IconComponent strokeWidth={1.5} className="w-6 h-6" />
                      </div>
                      <span className="font-mono text-sm text-gold font-semibold tracking-widest tabular-nums">
                        {item.number || String(index + 1).padStart(2, '0')}
                      </span>
                    </div>

                    <div>
                      <h3 className={cn(
                        "font-display text-2xl lg:text-3xl mb-4 transition-colors duration-500",
                        isCenter ? "text-white group-hover:text-gold" : "text-neutral-900 group-hover:text-gold"
                      )}>
                        {item.title}
                      </h3>
                      <p className={cn(
                        "font-sans text-sm sm:text-base leading-relaxed transition-colors duration-500",
                        isCenter ? "text-neutral-400 group-hover:text-neutral-300" : "text-neutral-500 group-hover:text-neutral-700"
                      )}>
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}