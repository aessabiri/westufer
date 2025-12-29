'use client';

import { motion } from 'framer-motion';
import { Check, MapPin } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Course } from '@/lib/db/types';

interface LongboardContentProps {
  courses?: Course[];
}

export function LongboardContent({ courses = [] }: LongboardContentProps) {

  const formatPrice = (cents: number) => {
    return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(cents / 100);
  };

  const displayItems = [
    { 
      slug: 'lb-rent-1h',
      title: 'Verleih (2 Std)', 
      defaultPrice: '12€', 
      duration: '120 Minuten', 
      features: ['Longboard nach Wahl', 'Schutzausrüstung', 'Routen-Tipp'], 
      targetId: '7', 
      type: 'rental' 
    },
    { 
      slug: 'lb-rent-day',
      title: 'Tagesmiete', 
      defaultPrice: '25€', 
      duration: 'Den ganzen Tag', 
      features: ['Maximale Flexibilität', 'Board-Wechsel möglich', 'Perfekt für die Seerunde'], 
      popular: true, 
      targetId: '8', 
      type: 'rental' 
    },
    { 
      slug: 'lb-basic',
      title: 'Workshop', 
      defaultPrice: '35€', 
      duration: '90 Minuten', 
      features: ['Bremsen & Fallen', 'Kurventechnik', 'Kleingruppe'], 
      targetId: 'lb-basic', 
      type: 'course' 
    },
  ];

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

          {/* Pricing */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-12">Preise</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {displayItems.map((item) => {
                 // Try to find price in DB
                 const dbCourse = courses.find(c => c.slug === item.slug);
                 const price = dbCourse ? formatPrice(dbCourse.price_cents) : item.defaultPrice;

                return (
                  <div key={item.title} className={`bg-white dark:bg-slate-900 p-8 rounded-3xl border ${item.popular ? 'border-emerald-500 shadow-xl scale-105' : 'border-slate-200 dark:border-slate-800'} relative`}>
                    {item.popular && (
                      <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-emerald-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                        Best Deal
                      </span>
                    )}
                    <h3 className="text-2xl font-bold mb-2 text-slate-900 dark:text-white">{item.title}</h3>
                    <div className="text-4xl font-bold text-emerald-600 mb-2">{price}</div>
                    <p className="text-slate-500 dark:text-slate-400 mb-6">{item.duration}</p>
                    <ul className="space-y-3 mb-8">
                      {item.features.map((f) => (
                        <li key={f} className="text-slate-600 dark:text-slate-400 flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" /> {f}
                        </li>
                      ))}
                    </ul>
                    <Link 
                      href={item.type === 'rental' ? `/booking/verleih?item=${item.targetId}` : `/booking/kurse?course=${dbCourse ? dbCourse.id : item.targetId}`} 
                      className={`block w-full text-center py-3 rounded-xl font-bold transition-all ${item.popular ? 'bg-emerald-600 hover:bg-emerald-700 text-white' : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white'}`}
                    >
                      Jetzt Buchen
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
