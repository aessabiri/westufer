'use client';

import { motion } from 'framer-motion';
import { Check, MapPin } from 'lucide-react';

import Image from 'next/image';

export function LongboardContent() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1536796038751-bb018f95ca01?w=2000&auto=format&fit=crop"
            alt="Longboarden am Kemnader See"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-emerald-900/60" />
        </div>
        <div className="relative z-10 container mx-auto px-6 text-center text-white">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            Longboarding
          </motion.h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto font-light">
            Cruisen auf Asphalt. Der endlose Sommer auf vier Rollen.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-8">
                <MapPin size={32} />
              </div>
              <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-6">Asphalt Surfing</h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                Rund um den Kemnader See führt ein perfekter, asphaltierter Weg. Ideal zum Longboarden!
                Wir haben Boards für jeden Style: Cruiser, Dancer und Downhill (für die Mutigen an der Halde).
                Lerne sicher Bremsen, Pushen und Carven in unseren Workshops.
              </p>
              <ul className="space-y-4 mb-8">
                {['Premium Boards von Globe & Sector9', 'Helme & Schoner inklusive', 'Direkter Zugang zum See-Rundweg', 'Kurse für Kids & Erwachsene'].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-slate-700 font-medium">
                    <Check className="text-green-500" size={20} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-slate-100 rounded-3xl h-[500px] overflow-hidden relative">
                 <div className="w-full h-full relative">
                   <Image
                      src="https://images.unsplash.com/photo-1555597408-26bc8e548a46?q=80&w=2073&auto=format&fit=crop"
                      alt="Longboard Detail"
                      fill
                      className="object-cover"
                   />
                 </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
