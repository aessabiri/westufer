'use client';

import { motion } from 'framer-motion';
import { Flame, Coffee, Music, Moon, Heart } from 'lucide-react';
import Image from 'next/image';

const vibeFeatures = [
  {
    icon: Flame,
    title: "Campfire Nights",
    description: "Lagerfeuer-Abende mit Stockbrot und guten Gesprächen direkt am Ufer."
  },
  {
    icon: Music,
    title: "Sunset Sessions",
    description: "Entspannte Beats und kühle Drinks, wenn die Sonne hinter dem See versinkt."
  },
  {
    icon: Coffee,
    title: "Lakeside Chill",
    description: "Unser 'Wohnzimmer' am See: Sitzsäcke, Hängematten und echtes Urlaubsfeeling."
  },
  {
    icon: Heart,
    title: "Community First",
    description: "Kein anonymer Betrieb, sondern ein Ort, an dem Fremde zu Freunden werden."
  }
];

export function CommunityVibe() {
  return (
    <section id="vibe" className="relative py-24 bg-slate-950 overflow-hidden">
      {/* Dynamic Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-orange-500/10 rounded-full blur-[120px]" />
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Visual Side */}
          <div className="relative order-2 lg:order-1">
            <div className="relative h-[600px] w-full rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl">
              <Image 
                src="https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=2069&auto=format&fit=crop" 
                alt="Campfire at night" 
                fill
                className="object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/20" />
              
              {/* Overlay Content */}
              <div className="absolute bottom-12 left-12 right-12">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[2rem]"
                >
                  <div className="flex items-center gap-3 mb-4">
                     <Moon className="text-amber-400" size={24} />
                     <span className="text-xs font-black uppercase tracking-[0.3em] text-white">After-Surf Vibe</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2 italic">&quot;Der See schläft nie.&quot;</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Wenn die Segel eingerollt sind, fängt der Abend erst an. 
                    Komm vorbei auf ein Getränk am Lagerfeuer.
                  </p>
                </motion.div>
              </div>
            </div>

            {/* Floating Element */}
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-8 -right-8 bg-amber-500 text-slate-950 p-6 rounded-3xl font-black text-xl shadow-2xl hidden md:block rotate-12"
            >
              CHILL OUT AREA
            </motion.div>
          </div>

          {/* Text Side */}
          <div className="order-1 lg:order-2 space-y-10">
            <div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] font-black uppercase tracking-[0.3em] mb-6"
              >
                <Flame size={14} />
                Mehr als nur Sport
              </motion.div>
              <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-8 leading-[0.9]">
                Dein <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Living Room</span> <br />
                am Wasser
              </h2>
              <p className="text-xl text-slate-400 font-medium leading-relaxed">
                Wir bauen keine Schule, wir bauen eine Community. Ein Ort für alle, 
                die das Wasser lieben, die Ruhe suchen oder einfach mit Gleichgesinnten 
                den Tag ausklingen lassen wollen.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-10">
              {vibeFeatures.map((feature, idx) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="space-y-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-amber-500">
                    <feature.icon size={20} />
                  </div>
                  <h4 className="font-bold text-white text-lg">{feature.title}</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>

            <div className="pt-8">
              <button className="px-10 py-5 bg-white text-slate-950 rounded-full font-black text-lg transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-white/10">
                Werde Teil der Crew
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
