'use client';

import { Users, GraduationCap, PartyPopper } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const groups = [
  {
    title: 'Schulklassen',
    description: 'Der perfekte Wandertag am See. Sport, Spaß und Teamgeist für die ganze Klasse.',
    icon: GraduationCap,
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    link: '/gruppen#schulen'
  },
  {
    title: 'Kindergeburtstage',
    description: 'Eine unvergessliche Party auf dem Wasser. Wir kümmern uns um Programm und Sicherheit.',
    icon: PartyPopper,
    color: 'text-pink-400',
    bg: 'bg-pink-500/10',
    link: '/gruppen#kinder'
  },
  {
    title: 'Firmen-Events',
    description: 'Teambuilding mal anders. Gemeinsam aufs Board und den Kopf freibekommen.',
    icon: Users,
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    link: '/gruppen#firmen'
  }
];

export function Groups() {
  return (
    <section id="gruppen" className="py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Abstract Background Shapes */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-cyan-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/3 h-full bg-blue-600/5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Gruppen & Events</h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Erlebt unvergessliche Momente gemeinsam. Wir organisieren euer perfektes Event.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {groups.map((group, index) => (
            <motion.div 
              key={group.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-8 rounded-2xl border border-slate-800 bg-slate-800/50 backdrop-blur-sm hover:border-cyan-500/50 hover:bg-slate-800 transition-all group"
            >
              <div className={`w-16 h-16 ${group.bg} ${group.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <group.icon size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">{group.title}</h3>
              <p className="text-slate-400 mb-8">{group.description}</p>
              <Link href={group.link} className="inline-flex items-center text-white font-semibold hover:text-cyan-400 transition-colors">
                Mehr erfahren <span className="ml-2 group-hover:translate-x-1 transition-transform">&rarr;</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
