'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ModeToggle } from '@/components/ui/ModeToggle';

const navLinks = [
  { name: 'Kurse', href: '/#kurse' },
  { name: 'Verleih', href: '/verleih' },
  { name: 'Gruppen', href: '/gruppen' },
  { name: 'Infos', href: '/#infos' },
];

interface NavbarProps {
  variant?: 'home' | 'page';
}

export function Navbar({ variant = 'home' }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "text-sm font-medium tracking-wide uppercase hover:text-cyan-500 transition-colors relative group",
                isSolid ? "text-slate-600 dark:text-slate-300" : "text-white/90"
              )}
            >
              {link.name}
              <span className={cn(
                "absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-500 transition-all duration-300 group-hover:w-full",
                isSolid ? "" : "bg-white"
              )} />
            </Link>
          ))}
          <ModeToggle />
          <Link
            href="/booking"
            className={cn(
              "px-6 py-2.5 rounded-full font-bold text-sm transition-all shadow-lg hover:shadow-cyan-500/25 active:scale-95",
              "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white border border-transparent"
            )}
          >
            Buchen
          </Link>
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
            className="md:hidden bg-white dark:bg-slate-950 border-t dark:border-slate-800"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-lg font-medium text-slate-700 dark:text-slate-200"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/booking"
                className="bg-cyan-500 text-white text-center py-3 rounded-lg font-medium"
                onClick={() => setIsOpen(false)}
              >
                Jetzt Buchen
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
