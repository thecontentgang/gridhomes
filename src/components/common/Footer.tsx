'use client';

import { MapPin, Phone, Mail } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import type { ExperienceConfig } from '@/types';

// Simple SVG icons for social media
const InstagramIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" strokeWidth="1.5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" strokeWidth="1.5" />
    <circle cx="17.5" cy="6.5" r="1" strokeWidth="1.5" />
  </svg>
);

const FacebookIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M24 12.073c0-6.627-5.373-12-12-12S0 5.446 0 12.073c0 5.987 4.388 10.952 10.125 11.852v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const YoutubeIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M23.498 6.186a3.177 3.177 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.177 3.177 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.177 3.177 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.177 3.177 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

interface FooterProps {
  experience: ExperienceConfig;
  variant?: 'default' | 'interiors';
}

export function Footer({ experience }: FooterProps) {
  const navigateLinks = [
    { label: 'Home', href: `/${experience.type}` },
    { label: 'Gallery', href: `/${experience.type}/gallery` },
    { label: 'About', href: `/${experience.type}#about` },
    { label: 'Contact', href: `/${experience.type}#contact` },
  ];

  const socialIcons = {
    instagram: <InstagramIcon />,
    facebook: <FacebookIcon />,
    linkedin: <LinkedinIcon />,
    youtube: <YoutubeIcon />,
  };

  const linkClass = "font-sans text-white/70 hover:text-gold transition-colors duration-300";

  return (
    <footer
      className="bg-black rounded-t-[2.5rem] lg:rounded-t-[4rem] mt-4 pt-6 overflow-hidden "
      role="contentinfo"
    >
      <div className="container-lg mx-auto px-6 py-20 lg:py-24">

        {/* Minimal 3-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16">

          {/* BRANDING */}
          <div className="md:col-span-5 lg:col-span-4">
            <a href={`/${experience.type}`} className="font-display text-3xl text-gold block mb-6" aria-label={`${experience.name} - Home`}>
              Grid Homes
            </a>
            <p className="font-sans text-white/70 mb-8 max-w-sm leading-relaxed">
              {experience.footer.description}
            </p>

            <div className="flex gap-6" role="list" aria-label="Social media links">
              {experience.footer.social.map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/50 hover:text-gold transition-colors duration-300"
                  aria-label={`${experience.name} on ${social.platform}`}
                >
                  {socialIcons[social.icon as keyof typeof socialIcons] || null}
                </a>
              ))}
            </div>
          </div>

          {/* NAVIGATION */}
          <nav aria-label="Quick links" className="md:col-span-3 lg:col-span-3">
            <h3 className="font-mono text-xs text-white mb-6 tracking-[0.2em] uppercase font-semibold">
              Navigate
            </h3>
            <ul className="space-y-4" role="list">
              {navigateLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className={linkClass}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* CONTACT & ADDRESS */}
          <address className="not-italic md:col-span-4 lg:col-span-5" aria-label="Contact information">
            <h3 className="font-mono text-xs text-white mb-6 tracking-[0.2em] uppercase font-semibold">
              Contact Us
            </h3>
            <div className="space-y-5">
              <a href={`tel:${experience.footer.phone.replace(/\s/g, '')}`} className={`flex items-center gap-4 ${linkClass}`}>
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/5 border border-white/10 flex-shrink-0 group-hover:bg-gold transition-colors">
                  <Phone className="w-3.5 h-3.5 text-gold" aria-hidden="true" />
                </div>
                <span>{experience.footer.phone}</span>
              </a>

              <a href={`mailto:${experience.footer.email}`} className={`flex items-center gap-4 ${linkClass}`}>
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/5 border border-white/10 flex-shrink-0">
                  <Mail className="w-3.5 h-3.5 text-gold" aria-hidden="true" />
                </div>
                <span>{experience.footer.email}</span>
              </a>

              <div className="flex items-start gap-4 text-white/70 font-sans">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/5 border border-white/10 flex-shrink-0 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-gold" aria-hidden="true" />
                </div>
                <span className="leading-relaxed">{experience.footer.address}</span>
              </div>
            </div>
          </address>

        </div>

        {/* BOTTOM ROW: Copyright, Credits & Legal */}
        <div className="mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Copyright and Content Gang Credit */}
          <p className="font-sans text-sm text-white/50 text-center md:text-left leading-relaxed">
            © {new Date().getFullYear()} Grid Homes. All rights reserved.
            <span className="hidden md:inline mx-2">|</span>
            <br className="md:hidden" />
            Crafted by{' '}
            <a
              href="https://thecontentgang.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold hover:text-white transition-colors duration-300 font-medium"
            >
              thecontentgang.com
            </a>
          </p>

          <div className="flex items-center gap-6 font-sans text-sm text-white/50">
            <a href="/privacy" className="hover:text-gold transition-colors">Privacy Policy</a>
            <span aria-hidden="true" className="text-white/20">·</span>
            <a href="/terms" className="hover:text-gold transition-colors">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
}