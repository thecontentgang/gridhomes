'use client';

import { useState, useMemo, useCallback } from 'react';
import { motion } from 'motion/react';
import Image from 'next/image';
import { ScrollReveal } from '@/components/common';
import type { GalleryImage } from '@/components/ui/GalleryViewer';
import dynamic from 'next/dynamic';

const GalleryViewer = dynamic(() => import('@/components/ui/GalleryViewer').then(mod => mod.GalleryViewer), { ssr: false });
import { cn } from '@/lib/utils/cn';

// Data
import { interiorsConfig } from '@/data/interiors/config';
import { interiorsProjects } from '@/data/interiors/projects';
import type { ExperienceConfig, Project } from '@/types';

function GalleryPageContent({ experience, projects }: { experience: ExperienceConfig; projects: Project[] }) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  // Categories precisely as requested
  const categories = useMemo(() => {
    return ['All', '3D Design', '2D Design', 'Site Photos', 'Material Selection'];
  }, []);

  // Flatten all images into a single gallery array
  const allImages: GalleryImage[] = useMemo(() => {
    return projects.flatMap((project) => {
      const images: string[] = [project.coverImage, ...(project.gallery || [])];

      return images.map(src => ({
        src,
        alt: `${project.title} - ${project.location}`,
        projectId: project.id,
        projectName: project.title,
        location: project.location,
        category: project.category
      }));
    });
  }, [projects]);

  // Filter the flattened images based on category
  const filteredImages = useMemo(() => {
    if (activeFilter === 'All') return allImages;
    return allImages.filter(img => img.category === activeFilter);
  }, [allImages, activeFilter]);

  const handleImageClick = useCallback((index: number) => {
    setSelectedIndex(index);
    setIsViewerOpen(true);
  }, []);

  const handleCloseViewer = useCallback(() => {
    setIsViewerOpen(false);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* HERO SECTION */}
      <section className="relative min-h-[50vh] lg:min-h-[60vh] flex items-center justify-center overflow-hidden rounded-b-[2.5rem] lg:rounded-b-[4rem]" aria-labelledby="gallery-page-heading">
        <div className="absolute inset-0 z-0 bg-black">
          <motion.img
            src="/images/interiors/gallery/gallery-hero.webp"
            alt={`${experience.name} Gallery`}
            className="w-full h-full object-cover opacity-60"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        </div>

        <div className="relative z-10 container-lg px-6 py-28 text-center mt-16">
          <ScrollReveal delay={0.1}>
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="h-[1px] w-8 lg:w-12 bg-gold/50" aria-hidden="true" />
              <span className="font-mono text-[10px] md:text-xs text-gold tracking-[0.3em] uppercase font-semibold">
                {experience.name} Portfolio
              </span>
              <span className="h-[1px] w-8 lg:w-12 bg-gold/50" aria-hidden="true" />
            </div>
            <h1 id="gallery-page-heading" className="font-display text-5xl md:text-6xl lg:text-7xl text-white mb-6 tracking-tight">
              Gallery
            </h1>
            <p className="font-sans text-lg text-white/70 max-w-2xl mx-auto">
              {experience.type === 'interiors'
                ? 'A curated visual journey through our residential and commercial interiors, balancing form, function, and emotion.'
                : 'A visual record of our construction projects, showcasing structures built with precision and enduring craftsmanship.'}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* FILTER & GALLERY GRID SECTION */}
      <section className="section bg-white py-20 lg:py-32" aria-labelledby="gallery-filter-heading">
        <div className="container-lg mx-auto px-4 sm:px-6">
          <ScrollReveal delay={0.1}>
            {/* Minimalist Pill Filters */}
            <div className="flex flex-row overflow-x-auto sm:flex-wrap items-center sm:justify-center gap-3 mb-16 lg:mb-24 pb-4 sm:pb-0 scrollbar-hide snap-x snap-mandatory" role="group" aria-label="Gallery category filters">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => setActiveFilter(category)}
                  className={cn(
                    'shrink-0 snap-start px-6 py-2.5 rounded-full font-mono text-[11px] uppercase tracking-widest transition-all duration-300 border',
                    activeFilter === category
                      ? 'bg-black text-white border-black shadow-md'
                      : 'border-neutral-200 text-neutral-600 hover:border-gold hover:text-black bg-transparent'
                  )}
                  whileTap={{ scale: 0.97 }}
                  aria-pressed={activeFilter === category}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </ScrollReveal>

          {/* Editorial Masonry Grid */}
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {filteredImages.map((image, index) => (
              <motion.div
                key={`${image.src}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                className="relative group overflow-hidden bg-neutral-100 rounded-2xl cursor-pointer break-inside-avoid"
                onClick={() => handleImageClick(index)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleImageClick(index);
                  }
                }}
              >
                <div className="relative w-full" style={{ paddingBottom: index % 3 === 0 ? '125%' : index % 2 === 0 ? '75%' : '100%' }}>
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Subtle Project Label Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <p className="font-display text-white text-xl mb-1">{image.projectName}</p>
                    <p className="font-mono text-gold text-[10px] tracking-widest uppercase">{image.location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredImages.length === 0 && (
            <ScrollReveal delay={0.2} className="text-center py-24">
              <p className="font-sans text-lg text-neutral-600">No images found in this category.</p>
            </ScrollReveal>
          )}
        </div>
      </section>

      {/* FULLSCREEN GALLERY VIEWER */}
      <GalleryViewer
        images={filteredImages}
        initialIndex={selectedIndex}
        isOpen={isViewerOpen}
        onClose={handleCloseViewer}
      />
    </div>
  );
}

export default function InteriorsGalleryPage() {
  return <GalleryPageContent experience={interiorsConfig} projects={interiorsProjects} />;
}