'use client';

import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getAvailableSlots } from '@/lib/db/queries';
import { DateStepProps } from './types';
import { ChevronRight } from 'lucide-react';

interface FormattedSlot {
  id: string; 
  label: string; 
  short: string; 
  time: string; 
  available: boolean;
}

export function CourseDateStep({ selectedDateId, onSelectDate, onNext, onBack, selectedItemIds }: DateStepProps) {
  const [availableSlots, setAvailableSlots] = useState<FormattedSlot[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSlots() {
      if (selectedItemIds.length === 1) {
        setIsLoading(true);
        setAvailableSlots([]);
        setError(null);
        
        try {
          // Assuming the ID passed is the numeric ID from the DB
          const courseId = parseInt(selectedItemIds[0], 10);
          
          if (!isNaN(courseId)) {
            const slots = await getAvailableSlots(courseId);
            const formatted = slots.map(slot => {
              const date = new Date(slot.start_time);
              const days = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
              const dayName = days[date.getDay()];
              const day = date.getDate().toString().padStart(2, '0');
              const month = (date.getMonth() + 1).toString().padStart(2, '0');
              const time = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
              
              return {
                id: slot.id.toString(),
                label: `${dayName} ${day}.${month}. - ${time}`,
                short: `${dayName} ${day}.${month}.`,
                time: time,
                available: slot.booked_count < slot.max_capacity
              };
            });
            setAvailableSlots(formatted);
          } else {
            // If we have a string slug instead of an ID, we might need a lookup
            // For now, we assume the frontend passes correct IDs
            console.warn("Invalid Course ID:", selectedItemIds[0]);
          }
        } catch (err) {
          console.error(err);
          setError("Fehler beim Laden der Termine.");
        } finally {
          setIsLoading(false);
        }
      }
    }
    fetchSlots();
  }, [selectedItemIds]);

  if (isLoading) {
    return <div className="flex justify-center items-center py-20"><Loader2 className="animate-spin text-cyan-500" size={32} /></div>;
  }

  if (error) {
    return <div className="text-center py-12 text-red-500">{error}</div>;
  }

  if (availableSlots.length === 0) {
     return <div className="text-center py-12 bg-slate-50 dark:bg-slate-800/50 rounded-xl"><p className="text-slate-500">Keine Termine online.</p></div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Wähle einen Termin</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
        {availableSlots.map((date) => (
          <button 
            key={date.id} 
            disabled={!date.available} 
            onClick={() => onSelectDate(date.id)} 
            className={cn(
              "p-4 rounded-xl border text-center transition-all", 
              selectedDateId === date.id 
                ? "border-cyan-500 bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-300 font-bold" 
                : "border-slate-200 dark:border-slate-800 hover:border-cyan-400 text-slate-600", 
              !date.available && "opacity-50 cursor-not-allowed"
            )}
          >
            <span className="block mb-1">{date.short}</span>
            <span className="text-lg">{date.time}</span>
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
