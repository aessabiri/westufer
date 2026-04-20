'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ModeToggle } from '@/components/ui/ModeToggle';

const navLinks = [
  { name: 'Windsurfen', href: '/kurse/windsurf' },
  { name: 'SUP', href: '/kurse/sup' },
  { name: 'Longboard', href: '/kurse/longboard' },
  { name: 'Kids & Co', href: '/kurse/kids' },
  { name: 'Schulen & Firmen', href: '/kurse/gruppen' },
];

interface NavbarProps {
  variant?: 'home' | 'page';
}

export function Navbar({ variant = 'home' }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isSolid = variant === 'page' || scrolled;

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        isSolid 
          ? 'bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50 py-4' 
          : 'bg-transparent py-6'
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link 
          href="/" 
          className={cn(
            "text-2xl font-black tracking-tighter transition-colors flex items-center gap-2",
            isSolid ? "text-slate-900 dark:text-white" : "text-white"
          )}
        >
          WESTUFER
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {/* Combined Dropdown */}
          <div 
            className="relative group"
            onMouseEnter={() => setActiveDropdown(true)}
            onMouseLeave={() => setActiveDropdown(false)}
          >
            <button className={cn(
              "flex items-center gap-1 text-sm font-medium tracking-wide uppercase transition-colors py-2",
              isSolid ? "text-slate-600 dark:text-slate-300" : "text-white/90"
            )}>
              Kurse & Verleih <ChevronDown size={14} className={cn("transition-transform", activeDropdown && "rotate-180")} />
            </button>
            <AnimatePresence>
              {activeDropdown && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-0 w-56 bg-white dark:bg-slate-900 shadow-xl rounded-2xl border border-slate-100 dark:border-slate-800 py-2 mt-2"
                >
                  {navLinks.map((link) => (
                    <a key={link.name} href={link.href} className="block px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-cyan-500 transition-colors">
                      {link.name}
                    </a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <a href="/gutscheine" className={cn(
            "text-sm font-medium tracking-wide uppercase hover:text-cyan-500 transition-colors",
            isSolid ? "text-slate-600 dark:text-slate-300" : "text-white/90"
          )}>Gutscheine</a>

          <ModeToggle />
          <a
            href="/booking"
            className={cn(
              "px-6 py-2.5 rounded-full font-bold text-sm transition-all shadow-lg hover:shadow-cyan-500/25 active:scale-95",
              "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white border border-transparent"
            )}
          >
            Buchen
          </a>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-4">
          <ModeToggle />
          <button
            className="p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <X className={isSolid ? "text-slate-900 dark:text-white" : "text-white"} />
            ) : (
              <Menu className={isSolid ? "text-slate-900 dark:text-white" : "text-white"} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-slate-950 border-t dark:border-slate-800 max-h-[80vh] overflow-y-auto"
          >
            <div className="flex flex-col p-6 gap-6">
              {/* Combined Mobile List */}
              <div className="space-y-3">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Kurse & Verleih</p>
                {navLinks.map((link) => (
                  <a key={link.name} href={link.href} className="block text-lg font-medium text-slate-700 dark:text-slate-200" onClick={() => setIsOpen(false)}>
                    {link.name}
                  </a>
                ))}
              </div>

              <div className="pt-4 border-t dark:border-slate-800 space-y-4">
                <a href="/gutscheine" className="block text-lg font-medium text-slate-700 dark:text-slate-200" onClick={() => setIsOpen(false)}>
                  Gutscheine
                </a>
                <a href="/booking" className="bg-cyan-500 text-white text-center py-3 rounded-xl font-bold block" onClick={() => setIsOpen(false)}>
                  Jetzt Buchen
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
