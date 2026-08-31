import type { Metadata } from 'next';
import { Hero, About, Gallery, Services, Process, WhyChooseUs, Testimonials, CTA } from '@/components/sections/interiors';
import { interiorsConfig } from '@/data/interiors/config';
import { interiorsProjects } from '@/data/interiors/projects';
import { interiorsServices } from '@/data/interiors/services';
import { interiorsTestimonials } from '@/data/interiors/testimonials';

export const metadata: Metadata = {
  title: "Interior Design Services | Grid Homes",
  description: "Bespoke interior design services across Hyderabad and Bangalore. We specialize in luxury residential interiors, villas, and commercial spaces.",
  alternates: {
    canonical: 'https://gridhomes.in/interiors'
  }
};

export default function InteriorsHome() {
  return (
    <>
      <Hero experience={interiorsConfig} />
      <About experience={interiorsConfig} />
     <Gallery 
        experience={interiorsConfig} 
        projects={interiorsProjects} 
      />
      <Services experience={interiorsConfig} number="03" />
      <Process experience={interiorsConfig} number="04" />
      <WhyChooseUs experience={interiorsConfig} number="05" />
      <Testimonials experience={interiorsConfig} testimonials={interiorsTestimonials} number="06" />
      <CTA experience={interiorsConfig} />
    </>
  );
}