'use client';

import { motion } from 'framer-motion';
import { Wind, Waves, MapPin } from 'lucide-react';
import Link from 'next/link';

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
    <section id="kurse" className="py-24 bg-slate-50 dark:bg-slate-950 dark:bg-slate-950 transition-colors">
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
              className="group relative bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all border border-transparent dark:border-slate-800"
            >
              {/* Image Header */}
              <div className="h-48 overflow-hidden">
                <div 
                  className="w-full h-full bg-slate-200 dark:bg-slate-800 transition-transform duration-500 group-hover:scale-110"
                  style={{
                    backgroundImage: `url(${activity.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                />
              </div>

              <div className="p-8">
                <div className={`w-12 h-12 ${activity.color} rounded-xl flex items-center justify-center text-white mb-6`}>
                  <activity.icon size={24} />
                </div>
                
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">{activity.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6 line-clamp-3">
                  {activity.description}
                </p>

                <Link 
                  href={activity.link}
                  className="inline-flex items-center text-cyan-600 dark:text-cyan-400 font-semibold group-hover:gap-2 transition-all"
                >
                  Mehr erfahren <span className="text-lg">→</span>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
