'use client';

import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import BookingkitWidget from '@/components/features/BookingkitWidget';
import { cn } from '@/lib/utils';

const groupTypes = [
  { id: 'schulen', name: 'Angebote für Schulen', configId: '58ae67a2678e690811b49a941b3adc19', color: 'bg-cyan-500' },
  { id: 'firmen', name: 'Angebote für Firmen', configId: '5b9c9af9a951f17cbefdae5de113c854', color: 'bg-blue-600' },
];

export default function GroupsPage() {
  const [activeType, setActiveType] = useState(groupTypes[0]);

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Navbar variant="page" />
      
      <div className="pt-32 pb-20 container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Gruppen & Events
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Wähle dein Gruppentyp für maßgeschneiderte Wassersport-Erlebnisse.
          </p>
        </div>

        {/* Tab Switcher (Matched to Gutscheine style) */}
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

        <div key={activeType.id} className="animate-in fade-in duration-500">
           <h2 className="text-2xl font-bold mb-8 text-center text-slate-800 dark:text-white">
             {activeType.name}
           </h2>
           <BookingkitWidget configId={activeType.configId} />
        </div>
      </div>

      <Footer />
    </main>
  );
}
