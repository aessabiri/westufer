'use client';

import { motion } from 'framer-motion';
import { Timer, Star, ShoppingBag } from 'lucide-react';
import Link from 'next/link';

const rentals = [
  {
    category: 'Windsurfen',
    items: [
      { name: 'Einsteiger Board (1 Std)', price: '15€' },
      { name: 'Funboard / Pro (1 Std)', price: '20€' },
      { name: 'Rigg komplett (1 Std)', price: '15€' },
      { name: 'Neoprenanzug', price: '5€' },
    ]
  },
  {
    category: 'Stand Up Paddling',
    items: [
      { name: 'SUP Board (1 Std)', price: '15€' },
      { name: 'SUP Board (2 Std)', price: '25€' },
      { name: 'Big SUP (für 6-8 Pers)', price: '80€' },
      { name: 'Trockenbeutel', price: '2€' },
    ]
  },
  {
    category: 'Longboard',
    items: [
      { name: 'Longboard (1 Std)', price: '8€' },
      { name: 'Longboard (Tag)', price: '25€' },
      { name: 'Helm & Schoner', price: 'Inkl.' },
    ]
  }
];

export function VerleihContent() {
  return (
    <>
      <div className="text-center mb-16">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6"
        >
          Materialverleih
        </motion.h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Top-gepflegtes Material für dein perfektes Erlebnis. 
          Einfach vorbeikommen, ausleihen und loslegen.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-16">
        {rentals.map((cat, idx) => (
          <motion.div
            key={cat.category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-100 dark:border-slate-800"
          >
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 border-b dark:border-slate-800 pb-4">{cat.category}</h3>
            <ul className="space-y-4">
              {cat.items.map((item) => (
                <li key={item.name} className="flex justify-between items-center text-slate-700 dark:text-slate-300">
                  <span>{item.name}</span>
                  <span className="font-bold text-cyan-600 dark:text-cyan-400">{item.price}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      {/* Info Box */}
      <div className="bg-slate-900 dark:bg-slate-800 text-white rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 shadow-2xl">
        <div className="flex-1">
          <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
            <Timer className="text-cyan-400" /> 
            Verleih-Infos
          </h3>
          <p className="text-slate-300 mb-4">
            Für den Windsurf-Verleih ist die Vorlage des VDWS-Grundscheins (oder vergleichbar) erforderlich.
            Neoprenanzüge können optional dazu gebucht werden.
          </p>
          <div className="flex flex-wrap gap-4">
            <span className="bg-slate-800 dark:bg-slate-950 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
              <Star size={16} className="text-yellow-400" /> Top Material
            </span>
            <span className="bg-slate-800 dark:bg-slate-950 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
              <ShoppingBag size={16} className="text-green-400" /> Shop vor Ort
            </span>
          </div>
        </div>
        <Link 
          href="/booking/verleih"
          className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-4 rounded-full font-bold text-lg whitespace-nowrap transition-colors"
        >
          Material reservieren
        </Link>
      </div>
    </>
  );
}
