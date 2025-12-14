'use client';

import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { GroupInquiryForm } from '@/components/features/GroupInquiryForm';
import { motion } from 'framer-motion';

export default function GroupInquiryPage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Navbar variant="page" />
      
      <div className="pt-32 pb-20 container mx-auto px-6">
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4"
          >
            Event Anfrage
          </motion.h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Plane dein perfektes Event mit uns. Fülle einfach das Formular aus und wir melden uns mit einem individuellen Angebot.
          </p>
        </div>

        <GroupInquiryForm />
      </div>
      <Footer />
    </main>
  );
}
