'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/common';
import { LinkButton } from '@/components/common';
import { ChevronRight, Maximize2 } from 'lucide-react';

import type { ExperienceConfig, Project } from '@/types';

interface GalleryProps {
  experience: ExperienceConfig;
  projects: Project[];
  maxItems?: number;
  number?: string;
}

export function Gallery({ experience, projects, maxItems = 6, number = '03' }: GalleryProps) {
  // Grab up to 6 images for the grid
  const galleryItems = projects.slice(0, maxItems);

  return (
    <section id="gallery" className="section bg-white py-24 lg:py-36 border-b border-neutral-100" aria-labelledby="gallery-heading">
      <div className="container-lg mx-auto px-4 md:px-6">

        {/* CUSTOM HEADER SECTION (Forced Black/Dark Text) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 lg:mb-16">
          <ScrollReveal delay={0.1} className="max-w-2xl">
            {/* Number & Eyebrow (e.g. 03 ---- Construction) */}
            <div className="flex items-center gap-4 mb-4 md:mb-6">
              <span className="font-mono text-xs text-gold font-bold tracking-widest">{number}</span>
              <span className="h-px w-8 md:w-10 bg-neutral-300" aria-hidden="true" />
              <span className="font-mono text-[10px] md:text-xs text-neutral-900 tracking-widest uppercase font-semibold">
                {experience.name}
              </span>
            </div>

            {/* Main Title (Black Text) */}
            <h2 id="gallery-heading" className="font-display text-4xl sm:text-5xl lg:text-6xl text-neutral-900 leading-[1.1] mb-4 md:mb-6">
              Visual Journal
            </h2>

            {/* Subtitle (Dark Gray Text) */}
            <p className="font-sans text-base md:text-lg lg:text-xl text-neutral-600 leading-relaxed font-normal">
              A curated gallery exploring the finer details of our completed spaces and structures.
            </p>
          </ScrollReveal>
        </div>

        {/* 
          Uniform 3x3 Grid (Displays exactly 6 items in 2 rows on desktop)
          - Mobile: 1 column
          - Tablet: 2 columns
          - Desktop: 3 columns
        */}
        <StaggerContainer
          staggerChildren={0.1}
          delayChildren={0.2}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 lg:gap-6"
        >
          {galleryItems.map((item, index) => (
            <StaggerItem
              key={item.id}
              delay={index * 0.05}
              // aspect-square forces every image to be a perfect uniform box
              className="relative group overflow-hidden rounded-xl bg-neutral-100 aspect-square"
            >
              <GalleryCard item={item} experience={experience} />
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Centered Bottom Action Button */}
        <div className="mt-12 lg:mt-16 flex justify-center w-full">
          <ScrollReveal delay={0.3} direction="up">
            <LinkButton
              variant="secondary"
              size="lg"
              href={`/${experience.type}/gallery`}
              className="group font-mono text-[11px] sm:text-xs uppercase tracking-widest text-neutral-900 border-neutral-200 hover:border-gold hover:text-gold hover:bg-gold/5 transition-all duration-300 flex items-center justify-center gap-3 px-8 py-4 rounded-full border"
            >
              Explore Full Gallery
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-neutral-100 group-hover:bg-gold transition-colors duration-300">
                <ChevronRight className="w-3 h-3 text-neutral-900 group-hover:text-black transition-colors" />
              </span>
            </LinkButton>
          </ScrollReveal>
        </div>

      </div>
    </section>
  );
}

// --------------------------------------------------------
// Subcomponents
// --------------------------------------------------------

interface GalleryCardProps {
  item: Project;
  experience: ExperienceConfig;
}

function GalleryCard({ item, experience }: GalleryCardProps) {
  return (
    <motion.a
      href={`/${experience.type}/gallery`}
      className="absolute inset-0 block w-full h-full cursor-pointer"
      whileHover="hover"
      initial="initial"
    >
      {/* Background Image */}
      <Image
        src={item.coverImage}
        alt={item.title}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
        className="object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
      />

      {/* Dark Overlay (Fades in on hover) */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-500 ease-out" />

      {/* Hover Content */}
      <div className="absolute inset-0 p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 ease-out">

        {/* Top Right Expand Icon */}
        <div className="absolute top-5 right-5 text-white/70 group-hover:text-gold transition-colors duration-300">
          <Maximize2 className="w-5 h-5" />
        </div>

        {/* Text Details */}
        <div className="flex flex-col gap-1">
          <span className="font-mono text-[10px] text-gold tracking-widest uppercase">
            {item.category}
          </span>
          <h3 className="font-display text-xl md:text-2xl text-white">
            {item.title}
          </h3>
          <p className="font-sans text-xs text-white/70 truncate">
            {item.location}
          </p>
        </div>
      </div>
    </motion.a>
  );
}