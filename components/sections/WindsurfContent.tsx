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
    <div className="bg-white dark:bg-slate-950">
      <CourseHero 
        title="Windsurf Einsteigerkurs"
        subtitle="Lerne Windsurfen in nur 2 Tagen. Dein Ticket in die Welt des Wassersports direkt am Kemnader See."
        image="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=2000&auto=format&fit=crop"
        stats={stats}
      />

      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-8 tracking-tight">
                Dein Start auf dem Wasser
              </h2>
              <div className="space-y-6 text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                <p>
                  Windsurfen ist pure Freiheit. Mit unserem Einsteigerkurs am Kemnader See legen wir den Grundstein für deine Surf-Karriere. In 12 Stunden lernst du alles, was du brauchst, um sicher und mit Spaß über den See zu gleiten.
                </p>
                <p>
                  Unser Revier bietet mit seinem flachen Wasser und konstanten Winden die perfekten Bedingungen für Anfänger. Keine Wellen, keine Strömung – einfach nur Platz zum Üben.
                </p>
              </div>
              
              <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl">
                  <Wind className="text-cyan-500" />
                  <span className="font-bold text-slate-900 dark:text-white">Konstante Winde</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl">
                  <Award className="text-cyan-500" />
                  <span className="font-bold text-slate-900 dark:text-white">Profi-Coaching</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative h-[600px] rounded-[3rem] overflow-hidden shadow-2xl"
            >
              <Image
                src="https://images.unsplash.com/photo-1528154109405-59c253406456?q=80&w=1287&auto=format&fit=crop"
                alt="Windsurfing Einsteigerkurs"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <CourseQuickInfo 
        included={included}
        toBring={toBring}
      />

      {/* FAQ Section */}
      <FAQ items={windsurfFAQ} />
    </div>
  );
}
