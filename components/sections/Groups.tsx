'use client';

import { Users, GraduationCap, PartyPopper, Check, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const groups = [
  {
    type: 'school',
    title: 'Schulklassen',
    description: 'Der perfekte Wandertag am See. Sport, Spaß und Teamgeist für die ganze Klasse.',
    icon: GraduationCap,
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    link: '/gruppen/anfrage?type=school',
    features: ['Lizensierte Trainer', 'Sicherheits-Equipment inkl.', 'Sonderkonditionen']
  },
  {
    type: 'birthday',
    title: 'Kindergeburtstage',
    description: 'Eine unvergessliche Party auf dem Wasser. Wir kümmern uns um Programm und Sicherheit.',
    icon: PartyPopper,
    color: 'text-pink-400',
    bg: 'bg-pink-500/10',
    link: '/gruppen/anfrage?type=birthday',
    features: ['2 Stunden Programm', 'Ab 8 Jahren (Schwimmer)', 'Kleines Geschenk inkl.']
  },
  {
    type: 'company',
    title: 'Firmen-Events',
    description: 'Teambuilding mal anders. Gemeinsam aufs Board und den Kopf freibekommen.',
    icon: Users,
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    link: '/gruppen/anfrage?type=company',
    features: ['Individuelles Programm', 'Bis zu 50 Personen', 'Optionales Catering']
  }
];

export function Groups() {
  return (
    <section id="gruppen" className="py-24 bg-transparent text-white relative overflow-hidden">
      {/* Dynamic Background Glows */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] -translate-x-1/2" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cyan-600/10 rounded-full blur-[120px] translate-x-1/2" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-[10px] font-black uppercase tracking-[0.3em] mb-6"
          >
            <Users size={14} />
            Gemeinsam Erleben
          </motion.div>
          <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter leading-[0.9]">Gruppen & <br/><span className="text-blue-500">Events</span></h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto font-medium">
            Erlebt unvergessliche Momente gemeinsam. Wir organisieren euer perfektes Event direkt am See.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {groups.map((group, index) => (
            <Link key={group.title} href={group.link}>
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="h-full p-10 rounded-[3rem] border border-white/10 bg-white/5 backdrop-blur-xl hover:border-blue-500/30 hover:bg-white/10 transition-all duration-500 group flex flex-col cursor-pointer shadow-2xl"
              >
                <div className={`w-16 h-16 ${group.bg} ${group.color} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                  <group.icon size={32} />
                </div>
                <h3 className="text-3xl font-bold mb-4 tracking-tight">{group.title}</h3>
                <p className="text-slate-400 mb-8 leading-relaxed flex-grow">{group.description}</p>
                
                <ul className="space-y-4 mb-10">
                  {group.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-sm font-medium text-slate-300">
                      <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center">
                        <Check size={12} className="text-blue-400" />
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="inline-flex items-center gap-2 text-blue-400 font-black uppercase text-xs tracking-widest group-hover:gap-4 transition-all">
                  Angebot anfordern <ArrowRight size={16} />
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
