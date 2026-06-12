'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ChevronDown, Wind, Waves, MapPin, Baby, Heart, Flame } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ModeToggle } from '@/components/ui/ModeToggle';

const courseCategories = [
  { 
    name: 'Windsurfen', 
    icon: Wind, 
    href: '/kurse/windsurf',
    items: ['Einsteigerkurs', 'Aufsteigerkurs', 'Schnupperkurs', 'Privatstunden']
  },
  { 
    name: 'SUP', 
    icon: Waves, 
    href: '/kurse/sup',
    items: ['Einsteigerkurs', 'Aufsteigerkurs', 'Yoga & Fitness', 'Touren']
  },
  { 
    name: 'Longboard', 
    icon: MapPin, 
    href: '/kurse/longboard',
    items: ['Einsteigerkurs', 'Workshops', 'Verleih']
  },
  { 
    name: 'Kids & Co', 
    icon: Baby, 
    href: '/kurse/kids',
    items: ['Feriencamps', 'Kindergeburtstage', 'Schulangebote']
  },
];

interface NavbarProps {
  variant?: 'home' | 'page';
}

export function Navbar({ variant = 'home' }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<'kurse' | 'team' | null>(null);

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
            "text-2xl font-black tracking-tighter transition-colors flex items-center gap-3",
            isSolid ? "text-slate-900 dark:text-white" : "text-white"
          )}
        >
          <div className="relative w-10 h-10 md:w-12 md:h-12">
            <Image 
              src="/logo/westuferlogo.png" 
              alt="Westufer Logo" 
              fill
              className="object-contain"
            />
          </div>
          <span className="hidden sm:block">WESTUFER</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {/* Kurse Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setActiveDropdown('kurse')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <Link 
              href="/kurse"
              className={cn(
                "flex items-center gap-1 text-sm font-bold tracking-wide uppercase transition-colors py-2",
                isSolid ? "text-slate-600 dark:text-slate-300" : "text-white/90",
                activeDropdown === 'kurse' && "text-cyan-500"
              )}
            >
              Kurse <ChevronDown size={14} className={cn("transition-transform", activeDropdown === 'kurse' && "rotate-180")} />
            </Link>
            <AnimatePresence>
              {activeDropdown === 'kurse' && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute top-full -left-20 w-[640px] bg-white dark:bg-slate-900 shadow-2xl rounded-[2.5rem] border border-slate-100 dark:border-slate-800 p-8 mt-2 grid grid-cols-2 gap-x-12 gap-y-8"
                >
                  {courseCategories.map((cat) => (
                    <div key={cat.name} className="space-y-4">
                      <Link 
                        href={cat.href}
                        className="flex items-center gap-3 text-slate-900 dark:text-white group"
                      >
                        <div className="w-10 h-10 rounded-xl bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <cat.icon size={20} />
                        </div>
                        <span className="font-bold text-lg">{cat.name}</span>
                      </Link>
                      <div className="space-y-2 pl-12">
                        {cat.items.map((item, idx) => (
                          <Link 
                            key={item} 
                            href={cat.href}
                            className="text-sm text-slate-500 dark:text-slate-400 hover:text-cyan-500 transition-colors flex items-center gap-2"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/30" />
                            <span className="font-bold text-[10px] uppercase tracking-wider text-slate-400">Lvl {idx + 1}</span> 
                            <span>{item}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link href="/gutscheine" className={cn(
            "text-sm font-bold tracking-wide uppercase hover:text-cyan-500 transition-colors",
            isSolid ? "text-slate-600 dark:text-slate-300" : "text-white/90"
          )}>Gutscheine</Link>

          <Link href="/#vibe" className={cn(
            "text-sm font-bold tracking-wide uppercase hover:text-cyan-500 transition-colors flex items-center gap-1",
            isSolid ? "text-slate-600 dark:text-slate-300" : "text-white/90"
          )}>
            Vibe <Flame size={14} className="text-orange-500 fill-orange-500" />
          </Link>

          <Link href="/team" className={cn(
            "text-sm font-bold tracking-wide uppercase hover:text-cyan-500 transition-colors flex items-center gap-1",
            isSolid ? "text-slate-600 dark:text-slate-300" : "text-white/90"
          )}>
            Crew <Heart size={14} className="text-red-500 fill-red-500" />
          </Link>

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
              {courseCategories.map((cat) => (
                <div key={cat.name} className="space-y-3">
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
                    <cat.icon size={14} /> {cat.name}
                  </p>
                  <div className="grid grid-cols-1 gap-3 pl-4">
                    {cat.items.map((item, idx) => (
                      <Link 
                        key={item} 
                        href={cat.href} 
                        className="text-lg font-medium text-slate-700 dark:text-slate-200 flex items-center gap-3"
                        onClick={() => setIsOpen(false)}
                      >
                        <span className="text-[10px] font-black bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-500 uppercase">Lvl {idx + 1}</span>
                        {item}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}

              <div className="pt-4 border-t dark:border-slate-800 space-y-4">
                <Link href="/gutscheine" className="block text-lg font-bold text-slate-700 dark:text-slate-200" onClick={() => setIsOpen(false)}>
                  Gutscheine
                </Link>
                <Link href="/#vibe" className="block text-lg font-bold text-slate-700 dark:text-slate-200 flex items-center gap-2" onClick={() => setIsOpen(false)}>
                  Vibe <Flame size={18} className="text-orange-500 fill-orange-500" />
                </Link>
                <Link href="/team" className="block text-lg font-bold text-slate-700 dark:text-slate-200 flex items-center gap-2" onClick={() => setIsOpen(false)}>
                  Crew <Heart size={18} className="text-red-500 fill-red-500" />
                </Link>
                <Link href="/booking" className="bg-cyan-500 text-white text-center py-3 rounded-xl font-bold block" onClick={() => setIsOpen(false)}>
                  Jetzt Buchen
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
