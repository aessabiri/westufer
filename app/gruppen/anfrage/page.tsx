'use client';

import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { GroupInquiryForm } from '@/components/features/GroupInquiryForm';
import BookingkitWidget from '@/components/features/BookingkitWidget';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const groupTypes = [
  { id: 'schulen', name: 'Angebote für Schulen', configId: '58ae67a2678e690811b49a941b3adc19', color: 'bg-cyan-500' },
  { id: 'firmen', name: 'Angebote für Firmen', configId: '5b9c9af9a951f17cbefdae5de113c854', color: 'bg-blue-600' },
];

export default function GroupInquiryPage() {
  const [activeType, setActiveType] = useState(groupTypes[0]);

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

        {/* The Inquiry Form Box */}
        <div className="mb-24">
          <GroupInquiryForm />
        </div>

        {/* Section for standard group offers */}
        <div className="mt-20 pt-20 border-t border-slate-200 dark:border-slate-800">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Direkt buchbare Pakete</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Du kannst auch eines unserer Standard-Pakete für Schulen oder Firmen direkt über Bookingkit einsehen und anfragen.
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {groupTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setActiveType(type)}
                className={cn(
                  "px-8 py-3 rounded-full font-bold transition-all shadow-md",
                  activeType.id === type.id 
                    ? `${type.color} text-white scale-105` 
                    : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100"
                )}
              >
                {type.name}
              </button>
            ))}
          </div>

          {/* Render the active widget */}
          <div key={activeType.id} className="animate-in fade-in duration-500">
             <h3 className="text-2xl font-bold mb-8 text-center text-slate-800 dark:text-white">
               {activeType.name}
             </h3>
             <BookingkitWidget configId={activeType.configId} />
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
