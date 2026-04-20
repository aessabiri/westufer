'use client';

import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import BookingkitWidget from '@/components/features/BookingkitWidget';
import { cn } from '@/lib/utils';

const groupTypes = [
  { id: 'schulen', name: 'Angebote für Schulen', configId: '58ae67a2678e690811b49a941b3adc19' },
  { id: 'firmen', name: 'Angebote für Firmen', configId: '5b9c9af9a951f17cbefdae5de113c854' },
];

export default function GroupsPage() {
  const [activeType, setActiveType] = useState(groupTypes[0]);

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950">
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

        {/* Switcher */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1 bg-slate-100 dark:bg-slate-900 rounded-2xl border dark:border-slate-800">
            {groupTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setActiveType(type)}
                className={cn(
                  "px-6 py-3 rounded-xl font-bold transition-all",
                  activeType.id === type.id 
                    ? "bg-white dark:bg-slate-800 text-cyan-600 shadow-sm" 
                    : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
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
      </div>

      <Footer />
    </main>
  );
}
