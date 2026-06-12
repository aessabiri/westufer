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
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-slate-950">
      {/* Background Image with Cinematic Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={image}
          alt={title}
          fill
          priority
          className="object-cover opacity-60 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900/60 to-slate-950" />
      </div>

      {/* Background Glows */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] -translate-x-1/2" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] translate-x-1/2" />

      <div className="relative z-10 container mx-auto px-6 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="px-4 py-1.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-[10px] font-black uppercase tracking-[0.4em] flex items-center gap-2 w-fit mx-auto mb-8 text-cyan-400"
          >
            <Award size={12} />
            Lizensierter VDWS Partner
          </motion.div>

          <h1 className="text-6xl md:text-9xl font-black tracking-tighter mb-8 drop-shadow-2xl leading-[0.85]">
            {title}
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 mb-16 max-w-2xl mx-auto font-medium leading-relaxed">
            {subtitle}
          </p>

          {/* Modern Quick Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto mb-16">
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + idx * 0.1 }}
                className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 flex flex-col items-center justify-center group hover:bg-white/10 transition-all duration-500 shadow-2xl"
              >
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform text-cyan-400">
                   <stat.icon size={24} />
                </div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-black mb-1">
                  {stat.label}
                </span>
                <span className="text-lg font-black text-white">{stat.value}</span>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <a 
              href="#booking"
              className="inline-flex bg-white text-slate-950 px-12 py-5 rounded-full font-black text-lg transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-white/10"
            >
              Jetzt buchen
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none" />
    </section>
  );
}
