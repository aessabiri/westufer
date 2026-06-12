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
    <div className="bg-white dark:bg-slate-950">
      <CourseHero 
        title="SUP Einsteigerkurs"
        subtitle="Entdecke den Kemnader See vom Wasser aus. Lerne die richtige Technik für maximalen Spaß und Stabilität."
        image="https://images.unsplash.com/photo-1502680390469-be75c86b636f?q=80&w=2000&auto=format&fit=crop"
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
                Entspannung & Workout
              </h2>
              <div className="space-y-6 text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                <p>
                  Stand Up Paddling ist der ideale Sport für alle, die Natur und Bewegung kombinieren wollen. Es ist leicht zu erlernen, trainiert den ganzen Körper und bietet gleichzeitig eine unglaubliche Entspannung.
                </p>
                <p>
                  In unserem Einsteigerkurs lernst du alles Wichtige: Vom richtigen Tragen des Boards über das Aufsteigen bis hin zu den verschiedenen Paddelschlägen, mit denen du dein Board effizient steuerst.
                </p>
              </div>
              
              <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl">
                  <Waves className="text-cyan-500" />
                  <span className="font-bold text-slate-900 dark:text-white">Ruhiges Wasser</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl">
                  <Award className="text-cyan-500" />
                  <span className="font-bold text-slate-900 dark:text-white">Top Material</span>
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
                src="https://images.unsplash.com/photo-1596522512683-11a3d9021669?q=80&w=2070&auto=format&fit=crop"
                alt="SUP Einsteigerkurs"
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
      <FAQ items={supFAQ} />
    </div>
  );
}
