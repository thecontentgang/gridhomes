import type { Metadata } from 'next';
import { Hero, About, Gallery, Services, WhyChooseUs, Testimonials, CTA, Process } from '@/components/sections/construction';
import { constructionConfig } from '@/data/construction/config';
import { constructionProjects } from '@/data/construction/projects';
import { constructionServices } from '@/data/construction/services';
import { constructionTestimonials } from '@/data/construction/testimonials';

export const metadata: Metadata = {
  title: "Premium Construction Services | Grid Homes",
  description: "Grid Homes Construction delivers enduring structures with precision, quality, and rigorous schedule discipline across residential, commercial, and institutional sectors.",
  alternates: {
    canonical: 'https://gridhomes.in/construction'
  }
};

export default function ConstructionHome() {
  return (
    <>
      <Hero experience={constructionConfig} />
      <About experience={constructionConfig} />

      <Gallery experience={constructionConfig} projects={constructionProjects} />
      <Services experience={constructionConfig} services={constructionServices} />
      <WhyChooseUs experience={constructionConfig} />
      <Process experience={constructionConfig} />
      <Testimonials experience={constructionConfig} testimonials={constructionTestimonials} />

      <CTA experience={constructionConfig} />
    </>
  );
}