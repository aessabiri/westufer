'use client';

import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import { GraduationCap, ShoppingBag, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function BookingSelectionPage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Navbar variant="page" />
      
      <div className="container mx-auto px-6 pt-32 pb-20">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6"
          >
            Was möchtest du buchen?
          </motion.h1>
          <p className="text-xl text-slate-600 dark:text-slate-400">
            Wähle zwischen unseren Kursangeboten oder dem Materialverleih.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Courses Option */}
          <Link href="/booking/kurse" className="group">
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-slate-900 p-10 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl hover:shadow-2xl hover:border-blue-200 dark:hover:border-blue-800 transition-all h-full text-center"
            >
              <div className="w-24 h-24 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform">
                <GraduationCap size={40} />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Kurse & Training</h2>
              <p className="text-slate-600 dark:text-slate-400 mb-8 text-lg">
                Lerne Windsurfen, SUP oder Longboarden mit unseren professionellen Trainern.
                Vom Schnupperkurs bis zum Grundschein.
              </p>
              <span className="inline-flex items-center text-blue-600 dark:text-blue-400 font-bold text-lg group-hover:gap-2 transition-all">
                Kurse anzeigen <ArrowRight className="ml-2" />
              </span>
            </motion.div>
          </Link>

          {/* Rental Option */}
          <Link href="/booking/verleih" className="group">
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-slate-900 p-10 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl hover:shadow-2xl hover:border-cyan-200 dark:hover:border-cyan-800 transition-all h-full text-center"
            >
              <div className="w-24 h-24 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400 rounded-full flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform">
                <ShoppingBag size={40} />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Equipment Verleih</h2>
              <p className="text-slate-600 dark:text-slate-400 mb-8 text-lg">
                Miete dir dein Material stunden- oder tageweise.
                Windsurf-Riggs, SUP-Boards, Longboards und Neoprenanzüge.
              </p>
              <span className="inline-flex items-center text-cyan-600 dark:text-cyan-400 font-bold text-lg group-hover:gap-2 transition-all">
                Zum Verleih <ArrowRight className="ml-2" />
              </span>
            </motion.div>
          </Link>
        </div>
      </div>
      <Footer />
    </main>
  );
}
