'use client';

import { motion } from 'framer-motion';
import { Wind, Waves, MapPin } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const activities = [
  {
    id: 'windsurf',
    title: 'Windsurfen',
    description: 'Lerne das Gleiten über das Wasser. Vom Einsteigerkurs bis zum Fortgeschrittenen-Training.',
    icon: Wind,
    color: 'bg-blue-500',
    image: 'https://images.unsplash.com/photo-1599405758676-66412adbe26e?q=80&w=1000&auto=format&fit=crop', // Windsurfing Lake
    link: '/kurse/windsurf'
  },
  {
    id: 'sup',
    title: 'Stand Up Paddling',
    description: 'Entspannt über den See paddeln. Ideal für Einsteiger, Yoga-Fans und Touren.',
    icon: Waves,
    color: 'bg-cyan-500',
    image: 'https://images.unsplash.com/photo-1661089209976-45c2cbcb24e9?q=80&w=1000&auto=format&fit=crop', // SUP Lake
    link: '/kurse/sup'
  },
  {
    id: 'longboard',
    title: 'Longboarden',
    description: 'Cruisen am Uferweg. Verleih und Kurse für alle, die lieber trocken bleiben.',
    icon: MapPin, // Exploring path
    color: 'bg-emerald-500',
    image: 'https://images.unsplash.com/photo-1536796038751-bb018f95ca01?w=1000&auto=format&fit=crop', // Longboard Road
    link: '/kurse/longboard'
  }
];

export function Activities() {
  return (
    <section id="kurse" className="py-24 bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">Wähle dein Abenteuer</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Egal ob auf dem Wasser oder an Land – wir haben den passenden Kurs für dich.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {activities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="group relative bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-slate-100 dark:border-slate-800"
            >
              {/* Image Header */}
              <div className="h-56 overflow-hidden relative">
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors z-10" />
                <div className="w-full h-full relative transition-transform duration-700 group-hover:scale-110">
                   <Image
                      src={activity.image}
                      alt={activity.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                   />
                </div>
              </div>

              <div className="p-8">
                <div className={`w-14 h-14 ${activity.color} rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-cyan-500/20`}>
                  <activity.icon size={28} />
                </div>
                
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">{activity.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                  {activity.description}
                </p>

                <Link 
                  href={activity.link}
                  className="inline-flex items-center text-cyan-600 dark:text-cyan-400 font-bold tracking-wide uppercase text-sm group-hover:gap-2 transition-all"
                >
                  Mehr erfahren <span className="text-lg ml-1">→</span>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
