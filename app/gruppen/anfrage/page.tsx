'use client';

import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { GroupInquiryForm } from '@/components/features/GroupInquiryForm';
import BookingkitWidget from '@/components/features/BookingkitWidget';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { MessageSquare, Package } from 'lucide-react';

const groupTypes = [
  { id: 'schulen', name: 'Schulen', configId: '58ae67a2678e690811b49a941b3adc19', color: 'bg-cyan-500' },
  { id: 'firmen', name: 'Firmen', configId: '5b9c9af9a951f17cbefdae5de113c854', color: 'bg-blue-600' },
];

export default function GroupInquiryPage() {
  const [activeMode, setActiveMode] = useState<'inquiry' | 'packages'>('inquiry');
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
            Gruppen & Events
          </motion.h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Plane dein perfektes Erlebnis am See. Wähle zwischen einer individuellen Anfrage oder unseren festen Paketen.
          </p>
        </div>

        {/* Top Level Mode Switcher */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          <button
            onClick={() => setActiveMode('inquiry')}
            className={cn(
              "px-8 py-4 rounded-3xl font-bold transition-all shadow-md flex items-center gap-3",
              activeMode === 'inquiry' 
                ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 scale-105" 
                : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100"
            )}
          >
            <MessageSquare size={20} />
            Individuelle Anfrage
          </button>
          <button
            onClick={() => setActiveMode('packages')}
            className={cn(
              "px-8 py-4 rounded-3xl font-bold transition-all shadow-md flex items-center gap-3",
              activeMode === 'packages' 
                ? "bg-cyan-500 text-white scale-105" 
                : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100"
            )}
          >
            <Package size={20} />
            Feste Pakete buchen
          </button>
        </div>

        <AnimatePresence mode="wait">
          {activeMode === 'inquiry' ? (
            <motion.div
              key="inquiry-form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Persönliches Angebot</h2>
                <p className="text-slate-500">Beschreibe uns deine Pläne und wir melden uns bei dir.</p>
              </div>
              <GroupInquiryForm />
            </motion.div>
          ) : (
            <motion.div
              key="booking-packages"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-12"
            >
              <div className="text-center">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Direkt buchbare Pakete</h2>
                <p className="text-slate-500 mb-8 text-center max-w-2xl mx-auto">
                  Ideal für einen schnellen Überblick über unsere Standard-Angebote.
                </p>
                
                {/* Sub-Tabs for Schools/Corporate */}
                <div className="flex justify-center gap-3 mb-12">
                  {groupTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setActiveType(type)}
                      className={cn(
                        "px-6 py-2 rounded-full text-sm font-bold transition-all",
                        activeType.id === type.id 
                          ? `${type.color} text-white` 
                          : "bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                      )}
                    >
                      {type.name}
                    </button>
                  ))}
                </div>
              </div>

              <div key={activeType.id} className="animate-in fade-in duration-500">
                 <BookingkitWidget configId={activeType.configId} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <Footer />
    </main>
  );
}
