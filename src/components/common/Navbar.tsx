'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'motion/react';
import Image from 'next/image';
import { cn } from '@/lib/utils/cn';
import { Menu, X } from 'lucide-react';
import { Button } from './Button';
import type { NavItem, ExperienceConfig } from '@/types';

interface NavbarProps {
  experience: ExperienceConfig;
  currentPath: string;
  onNavigate: (path: string) => void;
  onScrollTo: (sectionId: string) => void;
  onOpenContact?: () => void;
  variant?: 'default' | 'interiors';
}

export function Navbar({
  experience,
  currentPath,
  onNavigate,
  onScrollTo,
  onOpenContact,
  variant = 'default',
}: NavbarProps) {
  const [hidden, setHidden] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('home');
  const prevScrollRef = useRef(0);

  const { scrollY } = useScroll();

  // Premium Cinematic Easing
  const cinematicEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

  // 1. DYNAMIC NAVIGATION ITEMS (Fixed Hrefs)
  const navItems: NavItem[] = [
    { label: 'Home', href: `/${experience.type}`, scrollTo: 'hero' },
    { label: 'Gallery', href: `/${experience.type}/gallery` },
    // Explicitly set the base path so it knows to leave the projects page
    { label: 'About', href: `/${experience.type}#about`, scrollTo: 'about' },
    { label: 'Contact', href: `/${experience.type}#contact`, scrollTo: 'contact' },
  ];

  // Normalize path to ignore trailing slashes
  const normalizedPath = currentPath.endsWith('/') ? currentPath.slice(0, -1) : currentPath;
  const homePath = `/${experience.type}`;
  const isHomePage = normalizedPath === homePath;

  // 2. SCROLL SPY: Dynamically detect which section is currently in view
  useEffect(() => {
    const handleScrollSpy = () => {
      if (!isHomePage) return; // Don't run scroll spy on projects page

      const scrollPos = window.scrollY + 200;
      const sections = ['contact', 'about'];
      let current = 'home';

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el && el.offsetTop <= scrollPos) {
          current = sectionId;
          break;
        }
      }

      if (window.scrollY < 100) {
        current = 'home';
      }

      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScrollSpy, { passive: true });
    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, [isHomePage]);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsAtTop(latest < 50);

    // Hide when scrolling down past 150px, show immediately when scrolling up
    if (latest > prevScrollRef.current && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    prevScrollRef.current = latest;
  });

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  // Handle cross-page and in-page navigation flawlessly
  const handleNavClick = (item: NavItem) => {
    if (item.scrollTo) {
      if (!isHomePage) {
        // If we are on /interiors/gallery, navigate to /interiors#about
        window.location.href = item.href;
      } else if (item.scrollTo === 'hero') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        onScrollTo(item.scrollTo);
      }
    } else {
      // Direct page navigation (like Projects)
      onNavigate(item.href);
    }
    setMobileMenuOpen(false);
  };

  // 3. FIXED ACTIVE CHECK
  const isItemActive = (item: NavItem) => {
    if (item.scrollTo) {
      if (isHomePage) {
        if (item.scrollTo === 'hero') return activeSection === 'home';
        return activeSection === item.scrollTo;
      }
      return false; // About/Contact are not active if we are on the Projects page
    }
    return normalizedPath === item.href || normalizedPath.startsWith(`${item.href}/`);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: hidden ? -120 : 0 }}
      transition={{ duration: 0.6, ease: cinematicEase }}
      className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] md:w-[calc(100%-3rem)] max-w-5xl z-[100]"
    >
      <div
        className={cn(
          'mx-auto flex items-center justify-between w-full transition-all duration-500 ease-in-out',
          'rounded-full px-5 py-3 md:px-6 md:py-3.5',
          isAtTop
            ? 'bg-white/80 backdrop-blur-md border border-black/5 shadow-sm'
            : 'bg-white/95 backdrop-blur-xl border border-black/10 shadow-[0_8px_30px_rgb(0,0,0,0.08)]'
        )}
      >
        {/* LOGO */}
        <motion.a
          href={homePath}
          onClick={(e) => {
            e.preventDefault();
            if (!isHomePage) {
              onNavigate(homePath);
            } else {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
          className="z-[101] relative flex-shrink-0 flex items-center"
          whileHover={{ opacity: 0.7 }}
          whileTap={{ scale: 0.96 }}
          aria-label={`${experience.name} - Home`}
        >
          <div className="relative h-8 w-24 md:h-10 md:w-32">
            <Image
              src="/images/entry/Main-logo.png"
              alt="Grid Homes Logo"
              fill
              sizes="(max-width: 768px) 96px, 128px"
              className="object-contain transition-all duration-500"
            />
          </div>
        </motion.a>

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden lg:flex items-center justify-center gap-10 absolute left-1/2 -translate-x-1/2" aria-label="Main navigation">
          {navItems.map((item) => {
            const active = isItemActive(item);
            return (
              <motion.button
                key={item.label}
                onClick={() => handleNavClick(item)}
                className={cn(
                  'group font-mono text-[11px] tracking-[0.15em] uppercase relative py-2 transition-colors duration-300',
                  active
                    ? 'text-black font-semibold'
                    : 'text-black/50 hover:text-gold'
                )}
              >
                {item.label}

                {/* Active Gold Dot Indicator */}
                <motion.span
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-[3px] w-[3px] rounded-full bg-gold"
                  initial={false}
                  animate={{
                    scale: active ? 1 : 0,
                    opacity: active ? 1 : 0
                  }}
                  transition={{ duration: 0.3, ease: cinematicEase }}
                />
              </motion.button>
            );
          })}
        </nav>

        {/* CTA BUTTON & MOBILE TOGGLE */}
        <div className="flex items-center gap-4 z-[101]">
          <div className="hidden lg:block">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => (onOpenContact ? onOpenContact() : handleNavClick({ label: 'Contact', href: `/${experience.type}#contact`, scrollTo: 'contact' }))}
              className="group relative overflow-hidden rounded-full bg-black px-6 py-3 flex items-center gap-3 shadow-md border border-black transition-colors hover:border-gold"
            >
              <div className="absolute inset-0 bg-gold translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-out" />

              <span className="relative z-10 font-mono uppercase tracking-widest text-[10px] text-white group-hover:text-black transition-colors duration-500">
                Start a Project
              </span>

              {/* Pulsing Gold Dot */}
              <span className="relative z-10 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-gold"></span>
              </span>
            </motion.button>
          </div>

          <button
            className="lg:hidden p-2 -mr-2 flex items-center justify-center transition-colors duration-500 rounded-full text-black hover:bg-black/5"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            <motion.div
              animate={{ rotate: mobileMenuOpen ? 90 : 0 }}
              transition={{ duration: 0.4, ease: cinematicEase }}
            >
              {mobileMenuOpen ? <X strokeWidth={1.5} className="w-6 h-6 text-gold" /> : <Menu strokeWidth={1.5} className="w-6 h-6" />}
            </motion.div>
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-[90] flex flex-col justify-center px-8 bg-white/95 backdrop-blur-3xl lg:hidden h-[100dvh]"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
            transition={{ duration: 0.5, ease: cinematicEase }}
          >
            <nav className="flex flex-col gap-8 mt-12 items-center text-center" aria-label="Mobile navigation">
              {navItems.map((item, i) => {
                const active = isItemActive(item);
                return (
                  <motion.button
                    key={item.label}
                    onClick={() => handleNavClick(item)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, transition: { delay: 0 } }}
                    transition={{ delay: 0.1 + (i * 0.05), duration: 0.5, ease: cinematicEase }}
                    className={cn(
                      'font-display text-4xl sm:text-5xl transition-colors duration-300 relative',
                      active
                        ? 'text-gold'
                        : 'text-black hover:text-gold'
                    )}
                  >
                    {item.label}
                  </motion.button>
                );
              })}

              <motion.div
                className="pt-12 w-full max-w-xs"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5, ease: cinematicEase }}
              >
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full font-mono uppercase tracking-[0.2em] text-[11px] rounded-full py-5 bg-black text-white hover:bg-gold hover:text-black transition-colors duration-500 border border-transparent hover:border-gold"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onOpenContact) onOpenContact();
                    else handleNavClick({ label: 'Contact', href: `/${experience.type}#contact`, scrollTo: 'contact' });
                  }}
                >
                  Start a Conversation
                </Button>
              </motion.div>
            </nav>

            <motion.div
              className="absolute bottom-10 left-8 right-8 flex justify-between items-center pt-6 border-t border-black/10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-black/40">
                EST. {experience.type === 'interiors' ? 'SPACES' : 'STRUCTURE'}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-black/40">
                Grid Homes ©
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}