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
                      Surfschule WestUfer<br />
                      Bootshallen Gibraltar<br />
                      Oveneystraße 71<br />
                      44797 Bochum
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Real Google Maps Embed */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="h-[450px] bg-slate-200 dark:bg-slate-800 rounded-[2.5rem] overflow-hidden relative shadow-2xl border-4 border-white dark:border-slate-800"
          >
            <iframe 
              width="100%" 
              height="100%" 
              frameBorder="0" 
              style={{ border: 0 }} 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2487.6534246413247!2d7.257674277161745!3d51.427845316538965!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b9204044996919%3A0xc395f2e825a0d3b!2sSurfschule%20WestUfer!5e0!3m2!1sde!2sde!4v1713612000000!5m2!1sde!2sde" 
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
