'use client';

import { motion } from 'framer-motion';
import { Check, Wind, Clock, Tag, Award, Users } from 'lucide-react';
import Image from 'next/image';

import { FAQ } from './FAQ';
import { CourseHero } from './CourseHero';
import { CourseQuickInfo } from './CourseQuickInfo';

const windsurfFAQ = [
  {
    question: "Brauche ich Vorkenntnisse für den Einsteigerkurs?",
    answer: "Nein, unser Einsteigerkurs ist genau dafür da! Wir fangen bei den absoluten Grundlagen an: Materialkunde, Aufsteigen, Starten und die ersten Meter fahren. Schwimmen solltest du aber sicher können (mind. 15 Minuten am Stück)."
  },
  {
    question: "Wie lange dauert der Einsteigerkurs?",
    answer: "Der Kurs geht über zwei Tage mit insgesamt 12 Unterrichtsstunden. Das ist die ideale Zeit, um ein solides Fundament zu legen und sicher alleine auf dem Wasser klarzukommen."
  },
  {
    question: "Bekomme ich eine Lizenz?",
    answer: "Ja, am Ende des Kurses kannst du die Prüfung für den VDWS-Grundschein ablegen. Dieser ist weltweit anerkannt und ermöglicht dir das Ausleihen von Material an fast jeder Surfstation."
  },
  {
    question: "Was passiert bei schlechtem Wetter?",
    answer: "Windsurfen ist ein Outdoorsport. Wir schulen auch bei Regen – nass wirst du sowieso! Bei Gewitter oder Sturm verschieben wir den Kurs aus Sicherheitsgründen natürlich kostenlos."
  }
];

const stats = [
  { icon: Clock, label: "Dauer", value: "2 Tage (12h)" },
  { icon: Tag, label: "Preis", value: "195 €" },
  { icon: Award, label: "Lizenz", value: "VDWS möglich" },
  { icon: Users, label: "Alter", value: "ab 7 Jahren" }
];

const included = [
  "Komplette Windsurfausrüstung (Board & Rigg)",
  "Hochwertiger Neoprenanzug",
  "VDWS-lizenzierte Surflehrer",
  "Kleine Gruppen (max. 8 Personen)",
  "Nutzung der sanitären Anlagen & Duschen"
];

const toBring = [
  "Badebekleidung für unter den Neopren",
  "Handtuch & Duschzeug",
  "Sonnencreme (auch bei Bewölkung)",
  "Alte Turnschuhe oder Surfschuhe (falls vorhanden)",
  "Viel gute Laune!"
];

export function WindsurfContent() {
  return (
    <div className="bg-slate-950">
      <CourseHero 
        title="Windsurf Einsteigerkurs"
        subtitle="Lerne Windsurfen in nur 2 Tagen. Dein Ticket in die Welt des Wassersports direkt am Kemnader See."
        image="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=2000&auto=format&fit=crop"
        stats={stats}
      />

      <section className="relative py-24 overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] -translate-x-1/2" />

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
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[10px] font-black uppercase tracking-[0.3em] mb-6"
              >
                <Wind size={14} />
                Der perfekte Start
              </motion.div>
              <h2 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter leading-[0.9]">
                Dein Start <br/><span className="text-cyan-500">auf dem Wasser</span>
              </h2>
              <div className="space-y-6 text-xl text-slate-400 leading-relaxed font-medium">
                <p>
                  Windsurfen ist pure Freiheit. Mit unserem Einsteigerkurs am Kemnader See legen wir den Grundstein für deine Surf-Karriere. In 12 Stunden lernst du alles, was du brauchst, um sicher und mit Spaß über den See zu gleiten.
                </p>
                <p>
                  Unser Revier bietet mit seinem flachen Wasser und konstanten Winden die perfekten Bedingungen für Anfänger. Keine Wellen, keine Strömung – einfach nur Platz zum Üben.
                </p>
              </div>
              
              <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex items-center gap-4 p-6 bg-white/5 border border-white/10 rounded-[2rem] backdrop-blur-xl group hover:border-cyan-500/30 transition-all">
                  <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                    <Wind size={24} />
                  </div>
                  <span className="font-bold text-white tracking-tight">Konstante Winde</span>
                </div>
                <div className="flex items-center gap-4 p-6 bg-white/5 border border-white/10 rounded-[2rem] backdrop-blur-xl group hover:border-cyan-500/30 transition-all">
                  <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                    <Award size={24} />
                  </div>
                  <span className="font-bold text-white tracking-tight">Profi-Coaching</span>
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
                src="https://images.unsplash.com/photo-1528154109405-59c253406456?q=80&w=1287&auto=format&fit=crop"
                alt="Windsurfing Einsteigerkurs"
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
        <FAQ items={windsurfFAQ} />
      </div>
    </div>
  );
}
