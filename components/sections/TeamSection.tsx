'use client';

import { motion } from 'framer-motion';
import { Mail, Instagram, Facebook, Heart } from 'lucide-react';
import Image from 'next/image';

const team = [
  {
    name: "Lukas",
    role: "Station Lead & VDWS Instructor",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop",
    bio: "Seit 10 Jahren auf dem Wasser zu Hause. Spezialist für Windsurfen und Materialkunde.",
    skills: ["Windsurfen", "Wingfoil", "Reparatur"]
  },
  {
    name: "Sarah",
    role: "SUP Coach & Yoga Expertin",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop",
    bio: "Sarah kombiniert Kraft und Entspannung. Sie leitet unsere beliebten SUP-Yoga Sessions.",
    skills: ["SUP", "Yoga", "Kids"]
  },
  {
    name: "Marc",
    role: "Longboard Pro",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop",
    bio: "Marc kennt jeden Asphaltmeter am Kemnader See. Er zeigt dir den perfekten Flow.",
    skills: ["Longboard", "Skate", "Events"]
  },
  {
    name: "Julia",
    role: "Guest Relations",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&auto=format&fit=crop",
    bio: "Das Herz unserer Station. Julia kümmert sich um all eure Buchungen und Anfragen.",
    skills: ["Orga", "Booking", "Events"]
  }
];

export function TeamSection() {
  return (
    <section className="relative py-24 bg-slate-950 overflow-hidden">
      {/* Dynamic Background Glows */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px] -translate-x-1/2" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] translate-x-1/2" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[10px] font-black uppercase tracking-[0.3em] mb-6"
          >
            <Heart size={14} className="fill-cyan-500/50" />
            Unsere Crew
          </motion.div>
          <h2 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter leading-[0.9]">
            Das <span className="text-cyan-500">Westufer Team</span>
          </h2>
          <p className="text-xl text-slate-400 font-medium leading-relaxed">
            Wir sind eine Gruppe von Wassersport-Enthusiasten, die ihre Leidenschaft gerne mit dir teilen. 
            Lizenziert, erfahren und immer für einen Spaß zu haben.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, idx) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group"
            >
              <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden mb-6 shadow-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                   <div className="flex gap-4">
                      <a href="#" className="p-2 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-cyan-500 transition-colors border border-white/10">
                        <Instagram size={20} />
                      </a>
                      <a href="#" className="p-2 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-cyan-500 transition-colors border border-white/10">
                        <Mail size={20} />
                      </a>
                   </div>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-1 tracking-tight">{member.name}</h3>
              <p className="text-cyan-500 font-bold text-[10px] uppercase tracking-[0.2em] mb-4">{member.role}</p>
              <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3 font-medium">
                {member.bio}
              </p>
              <div className="flex flex-wrap gap-2">
                {member.skills.map(skill => (
                  <span key={skill} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-24 p-12 bg-gradient-to-br from-cyan-600 to-blue-700 rounded-[3rem] text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden group">
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
           <div className="relative z-10 max-w-xl text-center md:text-left">
              <h3 className="text-3xl font-black mb-4 tracking-tight">Werde Teil der Crew!</h3>
              <p className="text-lg font-medium text-white/90">
                Du bist Surflehrer, SUP-Guide oder hast einfach Lust am Kemnader See zu arbeiten? 
                Wir suchen regelmäßig Verstärkung für die Saison.
              </p>
           </div>
           <a 
            href="mailto:jobs@westufer-kemnade.de"
            className="relative z-10 bg-white text-slate-900 px-10 py-5 rounded-full font-black text-lg hover:scale-105 transition-all active:scale-95 shadow-2xl"
           >
            Jetzt bewerben
           </a>
        </div>
      </div>
    </section>
  );
}
