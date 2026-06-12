'use client';

import { motion } from 'framer-motion';
import { Waves, Clock, Tag, Award, Users } from 'lucide-react';
import Image from 'next/image';

import { FAQ } from './FAQ';
import { CourseHero } from './CourseHero';
import { CourseQuickInfo } from './CourseQuickInfo';

const supFAQ = [
  {
    question: "Ist SUP schwer zu lernen?",
    answer: "Ganz und gar nicht! Die meisten Einsteiger stehen bereits nach 15 Minuten sicher auf dem Board. Unser Kurs hilft dir dabei, von Anfang an die richtige Paddeltechnik zu lernen, um Kraft zu sparen und stabil zu stehen."
  },
  {
    question: "Was passiert, wenn ich ins Wasser falle?",
    answer: "Keine Sorge, das gehört dazu und macht meistens sogar Spaß! Der Kemnader See ist ein ruhiges Gewässer, und du trägst auf Wunsch eine Schwimmweste. Das Board ist über eine Leash (Sicherungsleine) immer mit dir verbunden."
  },
  {
    question: "Brauche ich einen Neoprenanzug?",
    answer: "Im Hochsommer reicht oft Badekleidung aus. An kühleren Tagen oder wenn du empfindlich bist, stellen wir dir gerne einen hochwertigen Neoprenanzug kostenlos zur Verfügung."
  },
  {
    question: "Können Kinder auch teilnehmen?",
    answer: "Ja, SUP ist ein toller Familiensport. Kinder ab ca. 8 Jahren können oft schon gut ein eigenes Board steuern. Für jüngere Kinder bieten wir spezielle Eltern-Kind-Angebote an."
  }
];

const stats = [
  { icon: Clock, label: "Dauer", value: "90 Minuten" },
  { icon: Tag, label: "Preis", value: "45 €" },
  { icon: Award, label: "Level", value: "Einsteiger" },
  { icon: Users, label: "Gruppen", value: "max. 10 Personen" }
];

const included = [
  "Premium SUP-Board & Paddel",
  "Schwimmweste (optional)",
  "Neoprenanzug (bei Bedarf)",
  "Professionelle Einweisung",
  "Wertsachen-Aufbewahrung"
];

const toBring = [
  "Badebekleidung",
  "Handtuch",
  "Sonnenschutz (Creme, Cappy)",
  "Trinkflasche (Plastik, kein Glas)",
  "Gute Laune & Lust auf Natur"
];

export function SupContent() {
  return (
    <div className="bg-transparent">
      <CourseHero 
        title="SUP Einsteigerkurs"
        subtitle="Entdecke den Kemnader See vom Wasser aus. Lerne die richtige Technik für maximalen Spaß und Stabilität."
        image="https://images.unsplash.com/photo-1502680390469-be75c86b636f?q=80&w=2000&auto=format&fit=crop"
        stats={stats}
      />

      <section className="relative py-24 overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] translate-x-1/2" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-[10px] font-black uppercase tracking-[0.3em] mb-6"
              >
                <Waves size={14} />
                Natur & Balance
              </motion.div>
              <h2 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter leading-[0.9]">
                Entspannung <br/><span className="text-blue-500">& Workout</span>
              </h2>
              <div className="space-y-6 text-xl text-slate-400 leading-relaxed font-medium">
                <p>
                  Stand Up Paddling ist der ideale Sport für alle, die Natur und Bewegung kombinieren wollen. Es ist leicht zu erlernen, trainiert den ganzen Körper und bietet gleichzeitig eine unglaubliche Entspannung.
                </p>
                <p>
                  In unserem Einsteigerkurs lernst du alles Wichtige: Vom richtigen Tragen des Boards über das Aufsteigen bis hin zu den verschiedenen Paddelschlägen, mit denen du dein Board effizient steuerst.
                </p>
              </div>
              
              <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex items-center gap-4 p-6 bg-white/5 border border-white/10 rounded-[2rem] backdrop-blur-xl group hover:border-blue-500/30 transition-all">
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                    <Waves size={24} />
                  </div>
                  <span className="font-bold text-white tracking-tight">Ruhiges Wasser</span>
                </div>
                <div className="flex items-center gap-4 p-6 bg-white/5 border border-white/10 rounded-[2rem] backdrop-blur-xl group hover:border-blue-500/30 transition-all">
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                    <Award size={24} />
                  </div>
                  <span className="font-bold text-white tracking-tight">Top Material</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative h-[650px] rounded-[3.5rem] overflow-hidden shadow-2xl border border-white/10"
            >
              <Image
                src="https://images.unsplash.com/photo-1596522512683-11a3d9021669?q=80&w=2070&auto=format&fit=crop"
                alt="SUP Einsteigerkurs"
                fill
                className="object-cover opacity-80 group-hover:scale-110 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>

      <CourseQuickInfo 
        included={included}
        toBring={toBring}
      />

      {/* FAQ Section */}
      <div className="bg-slate-950 pb-24">
        <FAQ items={supFAQ} />
      </div>
    </div>
  );
}
