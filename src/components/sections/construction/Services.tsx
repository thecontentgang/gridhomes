'use client';

import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/common';
import { SectionHeading } from '@/components/common';
import { ImageReveal } from '@/components/common';
import Image from 'next/image';
import { cn } from '@/lib/utils/cn';
import { ChevronDown, ChevronUp, ArrowUpRight, ArrowRight } from 'lucide-react';
import { Button } from '@/components/common';
import { openContactModal } from '@/lib/contact';
import type { ExperienceConfig, Service } from '@/types';

interface ServicesProps {
  experience: ExperienceConfig;
  services?: Service[];
  number?: string;
}

const serviceImages: Record<string, string> = {
  'residential-construction': '/images/construction/house-construction.webp',
  'apartment-construction': '/images/construction/Apartment-construction.webp',
  'villa-construction': '/images/construction/villa-construction.webp',
  'land-development': '/images/construction/land-development.webp',
  'farmhouse-construction': '/images/construction/farm-house-development.webp',
};

export function Services({ experience, services = [], number = '03' }: ServicesProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  // Use the passed services but add image mapping
  const displayServices = services.map(service => ({
    ...service,
    image: serviceImages[service.id] || '',
    subcategories: [] // Construction services in data don't have subcategories defined
  }));

  return (
    <section id="services" className="section bg-white text-black py-24 lg:py-36 border-b border-neutral-100" aria-labelledby="services-heading">
      <div className="container-lg mx-auto px-6">
        <ScrollReveal delay={0.1}>
          {/* Black text override wrapper to fix invisible text on white background */}
          <div className="[&_h2]:!text-black [&_p]:!text-black/70 [&_span]:!text-black/60">
            <SectionHeading
              number={number}
              eyebrow={experience.name}
              title="Our Services"
              subtitle="Precision-driven construction solutions tailored to build enduring structures."
              delay={0}
            />
          </div>
        </ScrollReveal>

        <StaggerContainer staggerChildren={0.08} delayChildren={0.1} className="mt-16 border-t border-neutral-200">
          {displayServices.map((service, index) => (
            <StaggerItem key={service.id} delay={index * 0.02}>
              <ServiceRow
                service={service}
                isExpanded={expandedIndex === index}
                onToggle={() => setExpandedIndex(expandedIndex === index ? null : index)}
              />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

interface ServiceRowProps {
  service: {
    id: string;
    number: string;
    name: string;
    description: string;
    image: string;
    subcategories: Array<{ title: string; items: string[] }>;
  };
  isExpanded: boolean;
  onToggle: () => void;
}

function ServiceRow({ service, isExpanded, onToggle }: ServiceRowProps) {
  return (
    <motion.article
      className="relative border-b border-neutral-200 overflow-hidden"
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <button
        onClick={onToggle}
        className="group relative w-full flex items-center gap-6 lg:gap-12 p-6 lg:p-9 text-left overflow-hidden transition-all duration-500 hover:bg-neutral-50/80"
        aria-expanded={isExpanded}
        aria-controls={`service-content-${service.id}`}
      >
        {service.image && (
          <div className="hidden lg:block absolute inset-y-0 right-0 w-1/3 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
            <Image
              src={service.image}
              alt={service.name}
              fill
              sizes="33vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-white via-white/80 to-transparent" aria-hidden="true" />
          </div>
        )}

        <span className="font-mono text-3xl lg:text-4xl text-gold font-medium tabular-nums w-16 lg:w-20 flex-shrink-0 transition-transform duration-500 group-hover:-translate-y-1">
          {service.number}
        </span>

        <div className="flex-1 min-w-0 lg:pr-[34%] z-10">
          <h3 className="font-display text-2xl lg:text-3xl text-black group-hover:text-gold transition-colors duration-300">
            {service.name}
          </h3>
          <p className="font-sans text-sm sm:text-base text-neutral-600 mt-2 max-w-2xl group-hover:text-neutral-700 transition-colors duration-300">
            {service.description}
          </p>
        </div>

        <div className="flex-shrink-0 flex items-center gap-6 z-10">
          <span className="hidden sm:flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-neutral-400 group-hover:text-gold transition-colors duration-300">
            Details
            <ArrowUpRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </span>
          <motion.div
            className="flex items-center justify-center w-10 h-10 rounded-full border border-neutral-200 text-black group-hover:border-gold group-hover:text-gold transition-all duration-300 bg-white shadow-sm"
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </motion.div>
        </div>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            id={`service-content-${service.id}`}
            className="bg-neutral-50/50 border-t border-neutral-100"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 px-6 lg:px-9 py-10 lg:py-12">
              <div className="grid sm:grid-cols-2 gap-8">
                {service.subcategories && service.subcategories.length > 0 ? (
                  service.subcategories.map((sub, idx) => (
                    <div key={idx}>
                      <h4 className="font-mono text-xs text-gold mb-4 tracking-[0.2em] uppercase font-semibold">{sub.title}</h4>
                      <ul className="space-y-3" role="list">
                        {sub.items.map((item, i) => (
                          <li key={i} className="flex items-start gap-3 font-sans text-base text-neutral-700">
                            <span className="w-1.5 h-1.5 bg-gold rounded-full flex-shrink-0 mt-2" aria-hidden="true" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))
                ) : (
                  <div className="sm:col-span-2">
                    <p className="font-sans text-lg text-neutral-700 leading-relaxed max-w-2xl">
                      {service.description}
                    </p>
                  </div>
                )}

                <div className="sm:col-span-2 pt-6 mt-2 border-t border-neutral-200/60">
                  <Button
                    variant="primary-construction"
                    onClick={() => openContactModal(service.name)}
                    className="w-full sm:w-auto"
                  >
                    Discuss This Service
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
              {service.image && (
                <div className="relative rounded-2xl overflow-hidden shadow-lg border border-neutral-200/60">
                  <ImageReveal src={service.image} alt={service.name} aspectRatio="4/3" />
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}