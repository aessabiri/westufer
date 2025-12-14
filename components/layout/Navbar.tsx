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
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isSolid ? 'bg-white/90 dark:bg-slate-950/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link 
          href="/" 
          className={cn(
            "text-2xl font-bold tracking-tighter transition-colors",
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
                "font-medium hover:text-cyan-500 transition-colors",
                isSolid ? "text-slate-700 dark:text-slate-200" : "text-white/90"
              )}
            >
              {link.name}
            </Link>
          ))}
          <ModeToggle />
          <Link
            href="/booking"
            className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-2 rounded-full font-medium transition-colors"
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
