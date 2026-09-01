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
  // NEW: We need a ref to track the menu state reliably inside the scroll event
  const isMenuOpenRef = useRef(false);

  const { scrollY } = useScroll();

  // Premium Cinematic Easing
  const cinematicEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

  const navItems: NavItem[] = [
    { label: 'Home', href: `/${experience.type}`, scrollTo: 'hero' },
    { label: 'Gallery', href: `/${experience.type}/gallery` },
    { label: 'About', href: `/${experience.type}#about`, scrollTo: 'about' },
    { label: 'Contact', href: `/${experience.type}#contact`, scrollTo: 'contact' },
  ];

  const normalizedPath = currentPath.endsWith('/') ? currentPath.slice(0, -1) : currentPath;
  const homePath = `/${experience.type}`;
  const isHomePage = normalizedPath === homePath;

  // Keep ref synced with state so the scroll event always knows if the menu is open
  useEffect(() => {
    isMenuOpenRef.current = mobileMenuOpen;
  }, [mobileMenuOpen]);

  // SCROLL SPY
  useEffect(() => {
    const handleScrollSpy = () => {
      if (!isHomePage) return;

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

  // HIDE NAVBAR ON SCROLL DOWN
  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsAtTop(latest < 50);

    // CRITICAL FIX: If the mobile menu is open, completely ignore scroll events.
    // This stops the locking of the body scroll from instantly closing the menu.
    if (isMenuOpenRef.current) return;

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

  const handleNavClick = (item: NavItem) => {
    if (item.scrollTo) {
      if (!isHomePage) {
        window.location.assign(item.href);
      } else if (item.scrollTo === 'hero') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        onScrollTo(item.scrollTo);
      }
    } else {
      onNavigate(item.href);
    }
    setMobileMenuOpen(false);
  };

  const isItemActive = (item: NavItem) => {
    if (item.scrollTo) {
      if (isHomePage) {
        if (item.scrollTo === 'hero') return activeSection === 'home';
        return activeSection === item.scrollTo;
      }
      return false;
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
      {/* NAVBAR PILL */}
      <div
        className={cn(
          'mx-auto flex items-center justify-between w-full transition-all duration-500 ease-in-out relative z-[100]',
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
          className="relative flex-shrink-0 flex items-center"
          whileHover={{ opacity: 0.7 }}
          whileTap={{ scale: 0.96 }}
          aria-label={`${experience.name} - Home`}
        >
          <div className="relative h-8 w-24 md:h-10 md:w-32">
            <Image
              src="/images/entry/grid-logo.png"
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
        <div className="flex items-center gap-4">
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

      {/* MOBILE MENU DROPDOWN (Attached to Nav) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            className="absolute top-[calc(100%+0.5rem)] left-0 w-full bg-white/95 backdrop-blur-2xl rounded-3xl border border-black/10 shadow-2xl p-6 lg:hidden origin-top z-[90]"
            initial={{ opacity: 0, scaleY: 0.9, y: -10 }}
            animate={{ opacity: 1, scaleY: 1, y: 0 }}
            exit={{ opacity: 0, scaleY: 0.9, y: -10, transition: { duration: 0.2 } }}
            transition={{ duration: 0.4, ease: cinematicEase }}
          >
            <nav className="flex flex-col gap-5 text-center" aria-label="Mobile navigation">
              {navItems.map((item, i) => {
                const active = isItemActive(item);
                return (
                  <motion.button
                    key={item.label}
                    onClick={() => handleNavClick(item)}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, transition: { delay: 0 } }}
                    transition={{ delay: 0.1 + (i * 0.05), duration: 0.4, ease: cinematicEase }}
                    className={cn(
                      'font-display text-2xl transition-colors duration-300',
                      active ? 'text-gold' : 'text-black hover:text-gold'
                    )}
                  >
                    {item.label}
                  </motion.button>
                );
              })}

              <motion.div
                className="pt-4 border-t border-black/5 mt-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4, ease: cinematicEase }}
              >
                <Button
                  variant="primary"
                  className="w-full font-mono uppercase tracking-[0.2em] text-[11px] rounded-full py-4 bg-black text-white hover:bg-gold hover:text-black transition-colors duration-500 border border-transparent hover:border-gold"
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
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}