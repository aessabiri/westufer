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
    <section className="py-24 bg-white dark:bg-slate-950 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
              Starte dein <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">Wassersport-Abenteuer</span>
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 font-medium">
              Unsere beliebtesten Einsteigerkurse. Keine Vorkenntnisse nötig – wir bringen dich sicher aufs Wasser.
            </p>
          </div>
          <Link 
            href="/kurse" 
            className="group flex items-center gap-2 font-bold text-cyan-500 hover:text-cyan-400 transition-colors"
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
              className="group relative bg-slate-50 dark:bg-slate-900 rounded-[3rem] overflow-hidden border border-slate-100 dark:border-slate-800 flex flex-col md:flex-row"
            >
              <div className="relative w-full md:w-1/2 h-64 md:h-auto overflow-hidden">
                <Image 
                  src={course.image} 
                  alt={course.title} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent md:hidden" />
              </div>

              <div className="p-8 md:p-10 flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 flex items-center justify-center">
                      <course.icon size={20} />
                    </div>
                    <span className="text-sm font-bold uppercase tracking-widest text-slate-400">{course.category}</span>
                  </div>
                  <div className="px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 text-[10px] font-black uppercase tracking-widest rounded-full border border-amber-200 dark:border-amber-800">
                    Top Angebot
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{course.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-8 flex-1">{course.description}</p>

                <div className="space-y-3 mb-8">
                  {course.features.map(f => (
                    <div key={f} className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                      <CheckCircle2 size={16} className="text-green-500" />
                      {f}
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between mt-auto">
                  <div className="text-2xl font-black text-slate-900 dark:text-white">
                    {course.price}
                  </div>
                  <Link 
                    href={course.href}
                    className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-3 rounded-full font-bold text-sm transition-all hover:scale-105 active:scale-95 shadow-lg"
                  >
                    Details ansehen
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
