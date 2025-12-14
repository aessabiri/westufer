'use client';

import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import { Users, GraduationCap, PartyPopper, Check, ArrowRight, Mail } from 'lucide-react';
import Link from 'next/link';

export default function GroupsPage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Navbar variant="page" />
      
      {/* Hero */}
      <section className="pt-32 pb-20 container mx-auto px-6 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6"
        >
          Gruppen & Events
        </motion.h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mb-12">
          Ob Wandertag, Kindergeburtstag oder Firmen-Event – am Westufer Kemnade schaffen wir gemeinsame Erlebnisse, die verbinden.
        </p>
      </section>

      {/* Content Sections */}
      <div className="container mx-auto px-6 pb-24 space-y-32">
        
        {/* Schools */}
        <section id="schulen" className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mb-6">
              <GraduationCap size={32} />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Schulklassen & Wandertage</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6 text-lg">
              Raus aus dem Klassenzimmer, rauf aufs Wasser! Wir bieten spezielle Programme für Schulklassen, die Sport, Spaß und Teambuilding verbinden. Sicherheit steht dabei an erster Stelle.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                <Check className="text-green-500" size={20} /> Betreuung durch lizensierte Trainer
              </li>
              <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                <Check className="text-green-500" size={20} /> Rettungswesten & Neopren inklusive
              </li>
              <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                <Check className="text-green-500" size={20} /> Sonderkonditionen für Schulen
              </li>
            </ul>
            <Link href="/gruppen/anfrage?type=school" className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-bold transition-all">
              Angebot anfordern <ArrowRight className="ml-2" size={18} />
            </Link>
          </motion.div>
                      <div className="h-[400px] rounded-3xl overflow-hidden bg-slate-200 dark:bg-slate-800 shadow-xl">
                       <div 
                        className="w-full h-full bg-cover bg-center"
                        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1644093342265-48a43e8de597?q=80&w=1000&auto=format&fit=crop')" }} 
                       />
                    </div>        </section>

        {/* Kids */}
        <section id="kinder" className="grid md:grid-cols-2 gap-12 items-center md:flex-row-reverse">
          <div className="order-2 md:order-1 h-[400px] rounded-3xl overflow-hidden bg-slate-200 dark:bg-slate-800 shadow-xl">
             <div 
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: "url('https://plus.unsplash.com/premium_photo-1681841125083-78fa9ee82169?q=80&w=1000&auto=format&fit=crop')" }} 
             />
          </div>
          <motion.div 
            className="order-1 md:order-2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="w-16 h-16 bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 rounded-2xl flex items-center justify-center mb-6">
              <PartyPopper size={32} />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Kindergeburtstage</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6 text-lg">
              Der coolste Geburtstag aller Zeiten! Wir organisieren eine unvergessliche Party auf dem Wasser. Egal ob Schnupper-Windsurfen oder Big-SUP-Rennen.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                <Check className="text-green-500" size={20} /> 2 Stunden Programm
              </li>
              <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                <Check className="text-green-500" size={20} /> Ab 8 Jahren (Schwimmer)
              </li>
              <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                <Check className="text-green-500" size={20} /> Kleines Geschenk für das Geburtstagskind
              </li>
            </ul>
            <Link href="/gruppen/anfrage?type=birthday" className="inline-flex items-center bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-full font-bold transition-all">
              Termin anfragen <ArrowRight className="ml-2" size={18} />
            </Link>
          </motion.div>
        </section>

        {/* Company */}
        <section id="firmen" className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="w-16 h-16 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400 rounded-2xl flex items-center justify-center mb-6">
              <Users size={32} />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Firmen-Events & Teambuilding</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6 text-lg">
              Raus aus dem Büro, rein ins Vergnügen. Stärken Sie den Teamgeist bei einer entspannten SUP-Tour oder einer actionreichen Windsurf-Session. Danach entspanntes BBQ am Ufer (auf Anfrage).
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                <Check className="text-green-500" size={20} /> Individuelles Programm
              </li>
              <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                <Check className="text-green-500" size={20} /> Bis zu 50 Personen
              </li>
              <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                <Check className="text-green-500" size={20} /> Optionales Catering
              </li>
            </ul>
            <Link href="/gruppen/anfrage?type=company" className="inline-flex items-center bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-full font-bold transition-all">
              Individuelles Angebot <ArrowRight className="ml-2" size={18} />
            </Link>
          </motion.div>
          <div className="h-[400px] rounded-3xl overflow-hidden bg-slate-200 dark:bg-slate-800 shadow-xl">
             <div 
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1758990935630-440ed41e362e?q=80&w=1000&auto=format&fit=crop')" }} 
             />
          </div>
        </section>

      </div>
      
      {/* Call to Action Footer */}
      <section className="bg-slate-900 text-white py-20 text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Nicht das Richtige dabei?</h2>
          <p className="text-slate-300 max-w-2xl mx-auto mb-8">
            Wir erstellen gerne ein individuelles Angebot für deine Gruppe. Schreib uns einfach eine Nachricht mit deinen Wünschen.
          </p>
          <Link href="/gruppen/anfrage" className="bg-white text-slate-900 px-8 py-3 rounded-full font-bold hover:bg-slate-100 transition-colors">
            Kontakt aufnehmen
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
