'use client';

import { cn } from '@/lib/utils';
import { DateStepProps } from './types';
import { ChevronRight } from 'lucide-react';

export function RentalDateStep({ selectedDateId, onSelectDate, onNext, onBack }: DateStepProps) {
  // Generate next 14 days
  const rentalDates = Array.from({ length: 14 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1); // Start from tomorrow
    const iso = d.toISOString().split('T')[0];
    const short = new Intl.DateTimeFormat('de-DE', { weekday: 'short', day: '2-digit', month: '2-digit' }).format(d);
    return { iso, short };
  });

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Wähle einen Tag</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {rentalDates.map((date) => (
          <button 
            key={date.iso} 
            onClick={() => onSelectDate(date.iso)} 
            className={cn(
              "p-4 rounded-xl border text-center transition-all", 
              selectedDateId === date.iso 
                ? "border-cyan-500 bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-300 font-bold" 
                : "border-slate-200 dark:border-slate-800 hover:border-cyan-400 text-slate-600"
            )}
          >
            {date.short}
          </button>
        ))}
      </div>
      <div className="flex justify-between mt-8">
        <button onClick={onBack} className="text-slate-500 hover:text-slate-800 font-medium">Zurück</button>
        <button 
          disabled={!selectedDateId} 
          onClick={onNext} 
          className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-8 py-3 rounded-full font-bold flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
        >
          Weiter <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
