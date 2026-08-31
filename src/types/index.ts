export type ExperienceType = 'interiors' | 'construction';

export interface Project {
  id: string;
  title: string;
  location: string;
  category: string;
  year: number;
  description: string;
  coverImage: string;
  gallery: string[];
  services: string[];
  featured: boolean;
  experience: ExperienceType;
}

export interface Service {
  id: string;
  number: string;
  name: string;
  description: string;
  image?: string;
  experience: ExperienceType;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  project: string;
  location: string;
  image?: string;
  experience: ExperienceType;
}

export interface Stat {
  label: string;
  value: string | number;
  experience: ExperienceType;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image?: string;
  experience: ExperienceType;
}

export interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  projectType: string;
  location: string;
  budget: string;
  message: string;
}

export interface NavItem {
  label: string;
  href: string;
  scrollTo?: string;
}

// 1. Define the new types here first
export interface CoreValue {
  title: string;
  description: string;
}

export interface AboutContent {
  heading: string;
  intro: string;
  body: string;
  image: string;
  // NEW FIELDS
  missionStatement?: string; 
  valuesHeading?: string;
  values?: CoreValue[];
}

export interface ExperienceConfig {
  type: ExperienceType;
  name: string;
  description: string;
  heroHeadline: string;
  heroSubtext: string;
  accentColor: 'clay' | 'steel';
  accentColorLight: string;
  accentColorDark: string;
  focusColor: string;
  projects: Project[];
  services: Service[];
  testimonials: Testimonial[];
  stats: Stat[];
  
  // 2. Use the AboutContent interface here instead of typing it inline
  aboutContent: AboutContent;
  
  whyChooseUs: Array<{ number: string; title: string; description: string }>;
  processSteps?: Array<{ number: string; title: string; description: string }>;
  cta: {
    headline: string;
    subtext: string;
    buttonText: string;
    backgroundImage: string;
  };
  footer: {
    description: string;
    address: string;
    mapsUrl?: string;
    phone: string;
    email: string;
    social: Array<{ platform: string; url: string; icon: string }>;
  };
}