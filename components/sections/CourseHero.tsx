'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Clock, Tag, Award, Users } from 'lucide-react';

interface Stat {
  icon: any;
  label: string;
  value: string;
}

interface CourseHeroProps {
  title: string;
  subtitle: string;
  image: string;
  stats: Stat[];
}

export function CourseHero({ title, subtitle, image, stats }: CourseHeroProps) {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={image}
          alt={title}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/40 to-slate-900/80" />
      </div>

      <div className="relative z-10 container mx-auto px-6 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-8xl font-black tracking-tight mb-6 drop-shadow-lg">
            {title}
          </h1>
          <p className="text-xl md:text-2xl text-slate-200 mb-12 max-w-3xl mx-auto font-medium leading-relaxed drop-shadow-md">
            {subtitle}
          </p>

          {/* Quick Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + idx * 0.1 }}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 flex flex-col items-center justify-center group hover:bg-white/20 transition-all cursor-default"
              >
                <stat.icon className="w-6 h-6 mb-2 text-cyan-400 group-hover:scale-110 transition-transform" />
                <span className="text-xs uppercase tracking-widest text-slate-300 font-bold mb-1">
                  {stat.label}
                </span>
                <span className="text-lg font-bold">{stat.value}</span>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-12"
          >
            <a 
              href="#booking"
              className="inline-flex bg-cyan-500 hover:bg-cyan-400 text-white px-10 py-5 rounded-full font-bold text-xl transition-all shadow-lg hover:shadow-cyan-500/40 hover:-translate-y-1"
            >
              Jetzt Kursplatz sichern
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative Wave Mask (optional, but adds flair) */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white dark:from-slate-950 to-transparent pointer-events-none" />
    </section>
  );
}
