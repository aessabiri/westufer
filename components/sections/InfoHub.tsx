'use client';

import { Clock, MapPin, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

export function InfoHub() {
  return (
    <section id="infos" className="py-24 bg-white dark:bg-slate-950 transition-colors overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Status & Hours */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white">Infos & Öffnungszeiten</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Wir sind täglich für euch da, wenn das Wetter mitspielt.
              Schaut kurz auf den Status, bevor ihr losfahrt.
            </p>

            <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                <span className="font-bold text-green-700 dark:text-green-400 uppercase tracking-wide">Heute geöffnet</span>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-slate-400 mt-1" />
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white">Saison (April - Okt)</h4>
                    <p className="text-slate-600 dark:text-slate-400">Mo - Fr: 14:00 - 20:00</p>
                    <p className="text-slate-600 dark:text-slate-400">Sa, So & Feiertage: 12:00 - 20:00</p>
                    <p className="text-xs text-slate-400 mt-1">Wetterabhängige Öffnungszeiten</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-slate-400 mt-1" />
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white">Standort</h4>
                    <p className="text-slate-600 dark:text-slate-400">
                      Westufer Kemnade<br />
                      Oveneystr. 71<br />
                      44797 Bochum
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <button className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-semibold hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors group">
              <Phone className="w-5 h-5 group-hover:shake" />
              <span>+49 123 4567890 anrufen</span>
            </button>
          </motion.div>

          {/* Map / Image Placeholder */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="h-[400px] bg-slate-200 dark:bg-slate-800 rounded-3xl overflow-hidden relative shadow-lg"
          >
            <div 
               className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
               style={{
                 backgroundImage: "url('https://images.unsplash.com/photo-1534234828569-1f27c71f3088?q=80&w=2070&auto=format&fit=crop')"
               }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent flex items-end p-8">
              <div className="text-white">
                <p className="font-bold text-lg">Direkt am Wasser</p>
                <p className="text-white/80">Kostenlose Parkplätze vorhanden</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
