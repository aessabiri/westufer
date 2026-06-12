'use client';

import { Clock, MapPin, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

export function InfoHub() {
  return (
    <section id="infos" className="relative py-24 bg-slate-950 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-cyan-500/5 blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Status & Hours */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-10"
          >
            <div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[10px] font-black uppercase tracking-[0.3em] mb-6"
              >
                <Clock size={14} />
                Geöffnet & Erreichbar
              </motion.div>
              <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-8 leading-[0.9]">Besuch uns <br/><span className="text-cyan-500">Live am See</span></h2>
              <p className="text-xl text-slate-400 font-medium leading-relaxed">
                Wir sind während der Saison täglich für euch da. Ob für einen Kurs, zum Ausleihen oder einfach nur zum Chillen.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-2xl p-10 rounded-[3rem] border border-white/10 shadow-2xl space-y-10">
              <div className="flex items-center gap-4">
                <span className="relative flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.5)]"></span>
                </span>
                <span className="font-black text-green-400 uppercase tracking-widest text-sm">Status: Heute geöffnet</span>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-10 pt-4 border-t border-white/10">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-cyan-500">
                    <Clock className="w-5 h-5" />
                    <h4 className="font-bold text-white uppercase tracking-wider text-xs">Saisonzeiten</h4>
                  </div>
                  <div className="space-y-1 text-slate-400 text-sm">
                    <p className="font-bold text-slate-200">Mo - Fr: 14:00 - 20:00</p>
                    <p className="font-bold text-slate-200">Sa, So & Feiertage: 12:00 - 20:00</p>
                    <p className="text-[10px] uppercase tracking-widest pt-2">April bis Oktober</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-cyan-500">
                    <MapPin className="w-5 h-5" />
                    <h4 className="font-bold text-white uppercase tracking-wider text-xs">Standort</h4>
                  </div>
                  <div className="text-slate-400 text-sm leading-relaxed font-bold text-slate-200">
                    Surfschule WestUfer<br />
                    Bootshallen Gibraltar<br />
                    44797 Bochum
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Real Google Maps Embed */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="h-[550px] bg-slate-900 rounded-[3rem] overflow-hidden relative shadow-2xl border border-white/10 group"
          >
            <div className="absolute inset-0 bg-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 blur-3xl" />
            <iframe 
              width="100%" 
              height="100%" 
              frameBorder="0" 
              style={{ border: 0, filter: 'grayscale(0.5) invert(0.9) contrast(1.2)' }} 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2487.6534246413247!2d7.257674277161745!3d51.427845316538965!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b9204044996919%3A0xc395f2e825a0d3b!2sSurfschule%20WestUfer!5e0!3m2!1sde!2sde!4v1713612000000!5m2!1sde!2sde" 
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="relative z-0"
            ></iframe>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
