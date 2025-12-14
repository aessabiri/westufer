'use client';

import { motion } from 'framer-motion';
import { Check, Wind, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function WindsurfContent() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1599405758676-66412adbe26e?q=80&w=2000&auto=format&fit=crop')",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <div className="absolute inset-0 bg-blue-900/60" />
        </div>
        <div className="relative z-10 container mx-auto px-6 text-center text-white">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            Windsurfen
          </motion.h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto font-light">
            Spüre die Kraft des Windes. Die Trend-Sportart am Kemnader See.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-8">
                <Wind size={32} />
              </div>
              <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-6">Der perfekte Einstieg</h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                Unser Revier bietet optimale Bedingungen für Einsteiger und Aufsteiger. 
                Flaches Wasser und konstante Winde machen das Lernen einfach und sicher. 
                Unsere lizenzierten VDWS-Instructor begleiten dich von den ersten Schritten 
                auf dem Board bis zum Gleiten.
              </p>
              <ul className="space-y-4 mb-8">
                {['VDWS-Lizenzierte Surfschule', 'Neuestes Material von Top-Marken', 'Kleine Gruppen für maximalen Lernerfolg', 'Neoprenanzüge inklusive'].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-slate-700 font-medium">
                    <Check className="text-green-500" size={20} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-slate-100 rounded-3xl h-[500px] overflow-hidden relative">
                 <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1528154109405-59c253406456?q=80&w=1287&auto=format&fit=crop')"
                  }}
                 />
            </div>
          </div>

          {/* Pricing */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-12">Unsere Kurse</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: 'Schnupperkurs', price: '80€', duration: '4 Stunden', features: ['Theorie & Praxis', 'Material inklusive', 'Keine Vorkenntnisse'], id: 'ws-trial' },
                { title: 'Grundschein', price: '195€', duration: '12 Stunden', features: ['VDWS-Lizenz Abschluss', 'Intensivtraining', 'Aufgeteilt auf 2 Tage'], popular: true, id: 'ws-basic' },
                { title: 'Privatstunde', price: 'Anfrage', duration: '60 Minuten', features: ['1-zu-1 Betreuung', 'Individueller Fokus', 'Flexibler Termin'], id: 'ws-private' },
              ].map((course) => (
                <div key={course.title} className={`bg-white dark:bg-slate-900 p-8 rounded-3xl border ${course.popular ? 'border-blue-500 shadow-xl scale-105' : 'border-slate-200 dark:border-slate-800'} relative`}>
                  {course.popular && (
                    <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                      Beliebt
                    </span>
                  )}
                  <h3 className="text-2xl font-bold mb-2 text-slate-900 dark:text-white">{course.title}</h3>
                  <div className="text-4xl font-bold text-blue-600 mb-2">{course.price}</div>
                  <p className="text-slate-500 dark:text-slate-400 mb-6">{course.duration}</p>
                  <ul className="space-y-3 mb-8">
                    {course.features.map((f) => (
                      <li key={f} className="text-slate-600 dark:text-slate-400 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" /> {f}
                      </li>
                    ))}
                  </ul>
                  <Link href={`/booking/kurse?course=${course.id}`} className={`block w-full text-center py-3 rounded-xl font-bold transition-all ${course.popular ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white'}`}>
                    Jetzt Buchen
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
