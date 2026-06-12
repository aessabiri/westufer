'use client';

import { motion } from 'framer-motion';
import { Mail, Instagram, Facebook } from 'lucide-react';
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
    <section className="py-24 bg-white dark:bg-slate-950 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
            Das <span className="text-cyan-500">Westufer Team</span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
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
              <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden mb-6 shadow-xl">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                   <div className="flex gap-4">
                      <a href="#" className="p-2 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-cyan-500 transition-colors">
                        <Instagram size={20} />
                      </a>
                      <a href="#" className="p-2 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-cyan-500 transition-colors">
                        <Mail size={20} />
                      </a>
                   </div>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">{member.name}</h3>
              <p className="text-cyan-500 font-bold text-sm uppercase tracking-widest mb-4">{member.role}</p>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4 line-clamp-3">
                {member.bio}
              </p>
              <div className="flex flex-wrap gap-2">
                {member.skills.map(skill => (
                  <span key={skill} className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-[10px] font-bold uppercase tracking-tighter text-slate-500 dark:text-slate-400">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-24 p-12 bg-cyan-500 rounded-[3rem] text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl shadow-cyan-500/20">
           <div className="max-w-xl text-center md:text-left">
              <h3 className="text-3xl font-black mb-4 tracking-tight">Werde Teil der Crew!</h3>
              <p className="text-lg font-medium text-white/90">
                Du bist Surflehrer, SUP-Guide oder hast einfach Lust am Kemnader See zu arbeiten? 
                Wir suchen regelmäßig Verstärkung für die Saison.
              </p>
           </div>
           <a 
            href="mailto:jobs@westufer-kemnade.de"
            className="bg-white text-slate-900 px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform active:scale-95 shadow-xl"
           >
            Jetzt bewerben
           </a>
        </div>
      </div>
    </section>
  );
}
