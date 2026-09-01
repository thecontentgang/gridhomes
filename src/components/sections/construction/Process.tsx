'use client';

import { ScrollReveal, SectionHeading } from '@/components/common';
import { cn } from '@/lib/utils/cn';
import type { ExperienceConfig } from '@/types';

interface ProcessProps {
  experience: ExperienceConfig;
  number?: string;
}

export function Process({ experience, number = '05' }: ProcessProps) {
  const steps = experience.processSteps || [];

  return (
    <section id="process" className="section bg-neutral-50 text-black py-24 lg:py-36 border-b border-neutral-100" aria-labelledby="process-heading">
      <div className="container-lg mx-auto px-6">
        <ScrollReveal delay={0.1}>
          {/* Black text override wrapper for the light background */}
          <div className="[&_h2]:!text-black [&_p]:!text-black/70 [&_span]:!text-black/60">
            <SectionHeading
              number={number}
              eyebrow={experience.name}
              title="Our Execution Process"
              subtitle="A rigorous, transparent journey from site mobilization to final handover."
              delay={0}
            />
          </div>
        </ScrollReveal>

        <div className="mt-20 lg:mt-32 max-w-5xl mx-auto relative">
          {/* Central Line for Desktop */}
          <div className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1px] bg-neutral-200" />

          <div className="flex flex-col gap-12 lg:gap-0">
            {steps.map((step, index) => {
              const isEven = index % 2 !== 0; // 0-indexed, so index 1 is right side

              return (
                <ScrollReveal
                  key={step.number}
                  delay={0.1 + (index * 0.05)}
                  className="relative w-full lg:-mt-12 first:mt-0"
                >
                  <div className={cn(
                    "flex flex-col md:flex-row items-center w-full group",
                    isEven ? "md:flex-row-reverse" : ""
                  )}>

                    {/* Content Half */}
                    <div className={cn(
                      "w-full md:w-1/2 flex",
                      isEven ? "md:justify-start md:pl-12 lg:pl-20" : "md:justify-end md:pr-12 lg:pr-20"
                    )}>
                      <div className="bg-white p-8 lg:p-10 rounded-[2rem] border border-neutral-200/60 shadow-sm transition-all duration-500 hover:shadow-2xl hover:border-gold/40 hover:-translate-y-2 relative overflow-hidden w-full max-w-md">

                        {/* Number Watermark */}
                        <div className="absolute -bottom-4 -right-4 text-[7rem] leading-none font-display font-bold text-neutral-50 group-hover:text-gold/5 transition-colors duration-700 select-none pointer-events-none">
                          {step.number}
                        </div>

                        <div className="relative z-10">
                          <div className="flex items-center gap-4 mb-6">
                            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-neutral-50 text-gold font-mono text-sm tracking-widest font-bold border border-neutral-100 group-hover:bg-gold/10 transition-colors shrink-0">
                              {step.number}
                            </div>
                            <h3 className="font-display text-xl lg:text-2xl text-black group-hover:text-gold transition-colors">
                              {step.title}
                            </h3>
                          </div>
                          <p className="font-sans text-sm sm:text-base text-neutral-600 leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Central Node for Desktop */}
                    <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center justify-center w-12 h-12">
                      <div className="w-3 h-3 rounded-full bg-neutral-300 group-hover:bg-gold group-hover:scale-[1.8] transition-all duration-500 shadow-[0_0_0_8px_#fafafa]" />
                    </div>

                    {/* Empty Space Half */}
                    <div className="hidden md:block w-1/2" />
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}