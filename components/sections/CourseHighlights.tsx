'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Wind, Waves, Award, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const highlightedCourses = [
  {
    title: "Windsurf Einsteiger",
    category: "Windsurfen",
    description: "Lerne die Grundlagen in 12h. Perfekt für absolute Anfänger.",
    price: "195€",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=800&auto=format&fit=crop",
    href: "/kurse/windsurf",
    icon: Wind,
    features: ["Ausrüstung inkl.", "VDWS-Lizenz möglich", "Max. 8 Personen"]
  },
  {
    title: "SUP Einsteiger",
    category: "SUP",
    description: "Der entspannte Start auf dem Wasser. In 90 Min zum Profi.",
    price: "45€",
    image: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?q=80&w=800&auto=format&fit=crop",
    href: "/kurse/sup",
    icon: Waves,
    features: ["Premium Boards", "Inkl. Einweisung", "Natur pur"]
  }
];

export function CourseHighlights() {
  return (
    <section className="relative py-24 bg-slate-950 overflow-hidden">
      {/* Dynamic Background Glows */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[10px] font-black uppercase tracking-[0.3em] mb-6"
            >
              <Award size={14} />
              Beste Einsteigerkurse
            </motion.div>
            <h2 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter leading-[0.9]">
              Starte dein <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Wassersport</span> <br />
              Abenteuer
            </h2>
            <p className="text-xl text-slate-400 font-medium leading-relaxed">
              Unsere beliebtesten Einsteigerkurse. Keine Vorkenntnisse nötig – wir bringen dich sicher aufs Wasser.
            </p>
          </div>
          <Link 
            href="/kurse" 
            className="group flex items-center gap-2 font-bold text-cyan-500 hover:text-cyan-400 transition-colors bg-white/5 px-6 py-3 rounded-full border border-white/10 backdrop-blur-md"
          >
            Alle Kurse entdecken <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {highlightedCourses.map((course, idx) => (
            <motion.div
              key={course.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="group relative bg-white/5 backdrop-blur-xl rounded-[3rem] overflow-hidden border border-white/10 flex flex-col md:flex-row hover:border-cyan-500/30 transition-all duration-500 shadow-2xl"
            >
              <div className="relative w-full md:w-1/2 h-72 md:h-auto overflow-hidden">
                <Image 
                  src={course.image} 
                  alt={course.title} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent md:bg-gradient-to-r" />
              </div>

              <div className="p-8 md:p-10 flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                      <course.icon size={20} />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-400">{course.category}</span>
                  </div>
                  <div className="px-3 py-1 bg-amber-500/20 text-amber-400 text-[10px] font-black uppercase tracking-widest rounded-full border border-amber-500/30">
                    Top Angebot
                  </div>
                </div>

                <h3 className="text-3xl font-bold text-white mb-4 tracking-tight">{course.title}</h3>
                <p className="text-slate-400 mb-8 flex-1 leading-relaxed">{course.description}</p>

                <div className="space-y-3 mb-8">
                  {course.features.map(f => (
                    <div key={f} className="flex items-center gap-2 text-sm font-medium text-slate-300">
                      <CheckCircle2 size={16} className="text-cyan-500" />
                      {f}
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/10">
                  <div className="text-3xl font-black text-white">
                    {course.price}
                  </div>
                  <Link 
                    href={course.href}
                    className="bg-white text-slate-950 px-8 py-3 rounded-full font-black text-sm transition-all hover:scale-105 active:scale-95 shadow-xl"
                  >
                    Ansehen
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
