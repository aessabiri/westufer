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
    <div className="bg-slate-950">
      <CourseHero 
        title="Longboard Einsteigerkurs"
        subtitle="Lerne sicher Rollen, Bremsen und Carven. Der perfekte Einstieg in die Welt des Asphaltsurfens am Kemnader See."
        image="https://images.unsplash.com/photo-1547447134-cd3f5c716030?q=80&w=2000&auto=format&fit=crop"
        stats={stats}
      />

      <section className="relative py-24 overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] -translate-x-1/2" />

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
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-black uppercase tracking-[0.3em] mb-6"
              >
                <MapPin size={14} />
                Cruising Lifestyle
              </motion.div>
              <h2 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter leading-[0.9]">
                Cruisen <br/><span className="text-emerald-500">auf Asphalt</span>
              </h2>
              <div className="space-y-6 text-xl text-slate-400 leading-relaxed font-medium">
                <p>
                  Longboarden ist mehr als nur Rollen – es ist ein Lebensgefühl. Rund um den Kemnader See führt ein über 10 km langer, perfekt asphaltierter Weg, der wie gemacht ist für lange Turns und entspanntes Cruisen.
                </p>
                <p>
                  In unserem Workshop lernst du von Grund auf, wie du dein Board beherrschst. Wir zeigen dir verschiedene Bremstechniken, damit du immer sicher unterwegs bist, und bringen dir den richtigen &apos;Flow&apos; beim Pushen bei.
                </p>
              </div>
              
              <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex items-center gap-4 p-6 bg-white/5 border border-white/10 rounded-[2rem] backdrop-blur-xl group hover:border-emerald-500/30 transition-all">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                    <MapPin size={24} />
                  </div>
                  <span className="font-bold text-white tracking-tight">Seerundweg</span>
                </div>
                <div className="flex items-center gap-4 p-6 bg-white/5 border border-white/10 rounded-[2rem] backdrop-blur-xl group hover:border-emerald-500/30 transition-all">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                    <Award size={24} />
                  </div>
                  <span className="font-bold text-white tracking-tight">Safety First</span>
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
                src="https://images.unsplash.com/photo-1536796038751-bb018f95ca01?q=80&w=800&auto=format&fit=crop"
                alt="Longboard Einsteigerkurs"
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
        <FAQ items={longboardFAQ} />
      </div>
    </div>
  );
}
