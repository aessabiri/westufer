'use client';

import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import BookingkitWidget from '@/components/features/BookingkitWidget';
import { cn } from '@/lib/utils';

const categories = [
  { id: 'windsurf', name: 'Windsurfen', configId: 'e489a6ef28c776963c986b462fb2afd9', color: 'bg-blue-500' },
  { id: 'sup', name: 'SUP', configId: 'a146776a6a11d0371546474e885fa619', color: 'bg-cyan-500' },
  { id: 'longboard', name: 'Longboarding', configId: 'dc7902d5a240b51f0d1c9f53e4f89125', color: 'bg-emerald-500' },
];

export default function GutscheinePage() {
  const [activeTab, setActiveTab] = useState(categories[0]);

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Navbar variant="page" />
      
      <div className="pt-32 pb-20 container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Gutscheine
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Wähle eine Sportart, um den passenden Gutschein zu finden.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat)}
              className={cn(
                "px-8 py-3 rounded-full font-bold transition-all shadow-md",
                activeTab.id === cat.id 
                  ? `${cat.color} text-white scale-105` 
                  : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100"
              )}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Render only the active widget to avoid ID conflicts */}
        <div key={activeTab.id} className="animate-in fade-in duration-500">
           <h2 className="text-2xl font-bold mb-8 text-center text-slate-800 dark:text-white">
             {activeTab.name} Gutscheine
           </h2>
           <BookingkitWidget configId={activeTab.configId} />
        </div>
      </div>

      <Footer />
    </main>
  );
}
