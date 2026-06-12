'use client';

import { motion } from 'framer-motion';
import { MapPin, Clock, Tag, Award, Users } from 'lucide-react';
import Image from 'next/image';

import { FAQ } from './FAQ';
import { CourseHero } from './CourseHero';
import { CourseQuickInfo } from './CourseQuickInfo';

const longboardFAQ = [
  {
    question: "Ist der Kurs für absolute Anfänger geeignet?",
    answer: "Ja, absolut! Wir fangen mit der richtigen Fußstellung an und lernen das sichere Aufsteigen, Pushen (Anschieben) und vor allem das Bremsen. Du brauchst keinerlei Vorkenntnisse."
  },
  {
    question: "Muss ich mein eigenes Board mitbringen?",
    answer: "Nein, wir stellen dir ein hochwertiges Longboard passend zu deiner Körpergröße und deinem Gewicht zur Verfügung. Wenn du schon ein eigenes Board hast, kannst du es natürlich gerne mitbringen."
  },
  {
    question: "Wie sieht es mit Schutzausrüstung aus?",
    answer: "Sicherheit geht vor! Helm sowie Knie-, Ellenbogen- und Handgelenkschoner sind im Kurspreis enthalten und werden von uns gestellt."
  },
  {
    question: "Wo findet der Kurs statt?",
    answer: "Wir nutzen die perfekt asphaltierten Wege rund um den Kemnader See. Diese bieten ideale Bedingungen, um sicher und ohne Autoverkehr das Rollen zu lernen."
  }
];

const stats = [
  { icon: Clock, label: "Dauer", value: "90 Minuten" },
  { icon: Tag, label: "Preis", value: "35 €" },
  { icon: Award, label: "Level", value: "Einsteiger" },
  { icon: Users, label: "Gruppen", value: "max. 8 Personen" }
];

const included = [
  "Premium Longboard Leihboard",
  "Komplette Schutzausrüstung (Helm & Schoner)",
  "Professionelles Coaching",
  "Tipps zum Boardkauf",
  "Gute Laune Garantie"
];

const toBring = [
  "Festes Schuhwerk (Sneaker, keine Sandalen!)",
  "Bequeme Sportkleidung",
  "Trinkflasche",
  "Sonnenschutz",
  "Lust auf Asphalt-Surfen"
];

export function LongboardContent() {
  return (
    <div className="bg-white dark:bg-slate-950">
      <CourseHero 
        title="Longboard Einsteigerkurs"
        subtitle="Lerne sicher Rollen, Bremsen und Carven. Der perfekte Einstieg in die Welt des Asphaltsurfens am Kemnader See."
        image="https://images.unsplash.com/photo-1547447134-cd3f5c716030?q=80&w=2000&auto=format&fit=crop"
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
                Cruisen auf Asphalt
              </h2>
              <div className="space-y-6 text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                <p>
                  Longboarden ist mehr als nur Rollen – es ist ein Lebensgefühl. Rund um den Kemnader See führt ein über 10 km langer, perfekt asphaltierter Weg, der wie gemacht ist für lange Turns und entspanntes Cruisen.
                </p>
                <p>
                  In unserem Workshop lernst du von Grund auf, wie du dein Board beherrschst. Wir zeigen dir verschiedene Bremstechniken, damit du immer sicher unterwegs bist, und bringen dir den richtigen &apos;Flow&apos; beim Pushen bei.
                </p>
              </div>
              
              <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl">
                  <MapPin className="text-cyan-500" />
                  <span className="font-bold text-slate-900 dark:text-white">Seerundweg</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl">
                  <Award className="text-cyan-500" />
                  <span className="font-bold text-slate-900 dark:text-white">Safety First</span>
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
                src="https://images.unsplash.com/photo-1536796038751-bb018f95ca01?q=80&w=800&auto=format&fit=crop"
                alt="Longboard Einsteigerkurs"
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
      <FAQ items={longboardFAQ} />
    </div>
  );
}
