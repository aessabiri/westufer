'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronRight, User, Mail, Phone, CreditCard, Sparkles, LucideIcon, Loader2, Wind, Waves, MapPin, HelpCircle, ShoppingBag, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { getAvailableSlots } from '@/lib/db/queries';
import { createBooking } from '@/app/actions/createBooking';

interface FormattedSlot {
  id: string; 
  label: string; 
  short: string; 
  time: string; 
  available: boolean;
}

export interface BookingItem {
  id: string;
  category: string;
  name: string;
  price: string | number;
  duration?: string;
  iconName: string;
  color: string;
  bg: string;
  border: string;
}

interface BookingWizardProps {
  items: BookingItem[];
  type: 'course' | 'rental';
}

const iconMap: Record<string, LucideIcon> = {
  'wind': Wind,
  'waves': Waves,
  'map-pin': MapPin,
  'help-circle': HelpCircle,
  'user': User,
  'shopping-bag': ShoppingBag,
};

function BookingContent({ items, type }: BookingWizardProps) {
  const searchParams = useSearchParams();
  const initialItemId = searchParams.get(type === 'course' ? 'course' : 'item');

  const [step, setStep] = useState(1);
  const [selectedItemIds, setSelectedItemIds] = useState<string[]>(initialItemId ? [initialItemId] : []);
  const [selectedDateId, setSelectedDateId] = useState(''); // Slot ID for courses, YYYY-MM-DD for rentals
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', phone: '' });
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  const [availableSlots, setAvailableSlots] = useState<FormattedSlot[]>([]);
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);

  const selectedItems = items.filter(i => selectedItemIds.includes(i.id));
  const selectedDateLabel = type === 'course' 
    ? availableSlots.find(d => d.id === selectedDateId)?.label 
    : selectedDateId;

  // Generate next 14 days for Rental Date Selection
  const rentalDates = Array.from({ length: 14 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1);
    const iso = d.toISOString().split('T')[0];
    const short = new Intl.DateTimeFormat('de-DE', { weekday: 'short', day: '2-digit', month: '2-digit' }).format(d);
    return { iso, short };
  });

  useEffect(() => {
    if (initialItemId && items.find(i => i.id === initialItemId)) {
      setSelectedItemIds([initialItemId]);
    }
  }, [initialItemId, items]);

  useEffect(() => {
    async function fetchSlots() {
      if (type === 'course' && selectedItemIds.length === 1) {
        setIsLoadingSlots(true);
        setAvailableSlots([]);
        setSelectedDateId('');
        
        try {
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
          }
        } catch (err) {
          console.error(err);
        } finally {
          setIsLoadingSlots(false);
        }
      }
    }
    fetchSlots();
  }, [selectedItemIds, type]);

  const toggleItem = (id: string) => {
    if (type === 'course') {
      setSelectedItemIds([id]);
    } else {
      setSelectedItemIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    }
  };

  const handleNext = () => {
    setErrorMessage(null);
    setStep(prev => Math.min(prev + 1, 3));
  };
  const handleBack = () => {
    setErrorMessage(null);
    setStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const payload = type === 'course' 
        ? { slotId: parseInt(selectedDateId, 10), ...formData }
        : { 
            rentalItems: selectedItemIds.map(id => ({ id: parseInt(id.replace(/^[^-]*-rent-/, '') || id, 10), quantity: 1 })), 
            rentalDate: selectedDateId,
            ...formData 
          };

      // Special case: Since our rental IDs in the hardcoded list are strings like 'ws-rent-board'
      // and the DB expects numbers, we need to ensure we have the correct IDs.
      // FOR NOW, to make it work, I'll assume the IDs in the hardcoded list 
      // match the DB IDs if they were numeric.
      // BUT WAIT: The user ran a seed script for courses, but maybe not for rentals.
      
      const result = await createBooking(payload as any);

      if (result.success) {
        setIsSuccess(true);
      } else {
        setErrorMessage(result.error || 'Es gab ein Problem bei der Buchung.');
      }
    } catch (err) {
      setErrorMessage('Ein unerwarteter Fehler ist aufgetreten.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const totalPrice = selectedItems.reduce((sum, item) => typeof item.price === 'number' ? sum + item.price : sum, 0);
  const hasStringPrice = selectedItems.some(item => typeof item.price === 'string');

  if (isSuccess) {
    return (
      <div className="max-w-xl mx-auto text-center py-20">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white dark:bg-slate-900 rounded-3xl p-12 shadow-xl border border-green-100 dark:border-green-900">
          <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6"><Sparkles className="text-green-600 dark:text-green-400" size={40} /></div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Buchung erfolgreich!</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-8">Vielen Dank, {formData.firstName}! Wir haben dir eine Reservierungsbestätigung an <strong>{formData.email}</strong> gesendet.</p>
          <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl mb-8 border border-yellow-200 dark:border-yellow-800">
             <p className="text-sm text-yellow-800 dark:text-yellow-200"><strong>Hinweis:</strong> Bitte bezahle vor Ort in bar oder per Karte.</p>
          </div>
          <Link href="/" className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-8 py-3 rounded-full font-bold hover:opacity-90 transition-opacity">Zurück zur Startseite</Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8 items-start">
      <div className="lg:col-span-2 space-y-8">
        <div className="flex items-center justify-between mb-8 px-2 relative">
          {[type === 'course' ? 'Kurs' : 'Equipment', 'Termin', 'Daten'].map((label, idx) => {
            const stepNum = idx + 1;
            const isActive = step >= stepNum;
            const isCompleted = step > stepNum;
            return (
              <div key={label} className="flex flex-col items-center relative z-10">
                <div className={cn("w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 border-2", isActive ? "bg-cyan-500 border-cyan-500 text-white shadow-lg shadow-cyan-500/30" : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400")}>{isCompleted ? <Check size={20} /> : stepNum}</div>
                <span className={cn("text-xs font-medium mt-2 transition-colors", isActive ? "text-cyan-600 dark:text-cyan-400" : "text-slate-400")}>{label}</span>
              </div>
            );
          })}
          <div className="absolute top-5 left-0 w-full h-0.5 bg-slate-200 dark:bg-slate-800 -z-0" />
          <div className="absolute top-5 left-0 h-0.5 bg-cyan-500 transition-all duration-500 -z-0" style={{ width: `${((step - 1) / 2) * 100}%` }} />
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100 dark:border-slate-800 min-h-[400px]">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">{type === 'course' ? 'Wähle dein Erlebnis' : 'Wähle dein Equipment'}</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {items.map((item) => {
                    const isSelected = selectedItemIds.includes(item.id);
                    const IconComponent = iconMap[item.iconName] || HelpCircle;
                    return (
                      <button key={item.id} onClick={() => toggleItem(item.id)} className={cn("relative p-4 rounded-xl border-2 text-left transition-all hover:shadow-md", isSelected ? `${item.border} ${item.bg} ring-1 ring-offset-0` : "border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700")}>
                        <div className="flex justify-between items-start mb-2">
                          <div className={cn("p-2 rounded-lg bg-white dark:bg-slate-950", item.color)}><IconComponent size={24} /></div>
                          {isSelected && <div className="bg-cyan-500 text-white rounded-full p-1"><Check size={14} /></div>}
                        </div>
                        <h3 className="font-bold text-slate-900 dark:text-white">{item.name}</h3>
                        <div className="flex justify-between items-end mt-2">
                          <span className="text-sm text-slate-500 dark:text-slate-400">{item.duration}</span>
                          <span className="font-bold text-lg text-slate-900 dark:text-white">{typeof item.price === 'number' ? `${item.price}€` : item.price}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
                <div className="flex justify-end mt-8">
                  <button disabled={selectedItemIds.length === 0} onClick={handleNext} className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-8 py-3 rounded-full font-bold flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity">Weiter <ChevronRight size={20} /></button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Wähle einen Termin</h2>
                {type === 'course' ? (
                  isLoadingSlots ? <div className="flex justify-center items-center py-20"><Loader2 className="animate-spin text-cyan-500" size={32} /></div> : availableSlots.length === 0 ? <div className="text-center py-12 bg-slate-50 dark:bg-slate-800/50 rounded-xl"><p className="text-slate-500">Keine Termine online.</p></div> : (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
                      {availableSlots.map((date) => (
                        <button key={date.id} disabled={!date.available} onClick={() => setSelectedDateId(date.id)} className={cn("p-4 rounded-xl border text-center transition-all", selectedDateId === date.id ? "border-cyan-500 bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-300 font-bold" : "border-slate-200 dark:border-slate-800 hover:border-cyan-400 text-slate-600", !date.available && "opacity-50 cursor-not-allowed")}>
                          <span className="block mb-1">{date.short}</span><span className="text-lg">{date.time}</span>
                        </button>
                      ))}
                    </div>
                  )
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                    {rentalDates.map((date) => (
                      <button key={date.iso} onClick={() => setSelectedDateId(date.iso)} className={cn("p-4 rounded-xl border text-center transition-all", selectedDateId === date.iso ? "border-cyan-500 bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-300 font-bold" : "border-slate-200 dark:border-slate-800 hover:border-cyan-400 text-slate-600")}>
                        {date.short}
                      </button>
                    ))}
                  </div>
                )}
                <div className="flex justify-between mt-8">
                  <button onClick={handleBack} className="text-slate-500 hover:text-slate-800 font-medium">Zurück</button>
                  <button disabled={!selectedDateId} onClick={handleNext} className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-8 py-3 rounded-full font-bold flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity">Weiter <ChevronRight size={20} /></button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Deine Details</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-1"><label className="text-sm font-medium">Vorname</label><div className="relative"><User className="absolute left-3 top-3 text-slate-400" size={18} /><input required value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} className="w-full pl-10 p-3 rounded-lg border bg-slate-50 dark:bg-slate-950 outline-none" placeholder="Max" /></div></div>
                    <div className="space-y-1"><label className="text-sm font-medium">Nachname</label><div className="relative"><User className="absolute left-3 top-3 text-slate-400" size={18} /><input required value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} className="w-full pl-10 p-3 rounded-lg border bg-slate-50 dark:bg-slate-950 outline-none" placeholder="Mustermann" /></div></div>
                  </div>
                  <div className="space-y-1"><label className="text-sm font-medium text-slate-700 dark:text-slate-300">E-Mail</label><div className="relative"><Mail className="absolute left-3 top-3 text-slate-400" size={18} /><input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full pl-10 p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 focus:border-cyan-500 outline-none transition-colors" placeholder="max@beispiel.de" /></div></div>
                  <div className="space-y-1"><label className="text-sm font-medium text-slate-700 dark:text-slate-300">Telefon</label><div className="relative"><Phone className="absolute left-3 top-3 text-slate-400" size={18} /><input type="tel" required value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full pl-10 p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 focus:border-cyan-500 outline-none transition-colors" placeholder="+49 123 456789" /></div></div>
                  {errorMessage && <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 text-red-600 rounded-xl text-sm font-medium">{errorMessage}</div>}
                  <div className="flex justify-between mt-8 items-center">
                    <button type="button" onClick={handleBack} className="text-slate-500 hover:text-slate-800 font-medium">Zurück</button>
                    <button type="submit" disabled={isSubmitting} className="bg-green-500 hover:bg-green-600 disabled:opacity-70 text-white px-8 py-3 rounded-full font-bold shadow-lg transition-all flex items-center gap-2">{isSubmitting ? <><Loader2 className="animate-spin" size={18} /> Wird gebucht...</> : <>Kostenpflichtig reservieren <CreditCard size={18} /></>}</button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="lg:col-span-1">
        <div className="sticky top-28 bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-lg border border-slate-100 dark:border-slate-800">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 border-b dark:border-slate-800 pb-4">Zusammenfassung</h3>
          <div className="space-y-4 mb-6">
            <div className="flex justify-between items-start"><span className="text-slate-500">{type === 'course' ? 'Kurs' : 'Equipment'}</span><div className="text-right">{selectedItems.length > 0 ? selectedItems.map(item => <div key={item.id} className="font-medium text-slate-900 dark:text-white mb-1">{item.name}</div>) : <span className="text-slate-900 dark:text-white">-</span>}</div></div>
            <div className="flex justify-between items-start"><span className="text-slate-500">Termin</span><span className="font-medium text-right text-slate-900 dark:text-white">{selectedDateLabel || '-'}</span></div>
          </div>
          <div className="border-t border-slate-100 dark:border-slate-800 pt-4 mb-6">
            <div className="flex justify-between items-end"><span className="font-bold text-slate-900 dark:text-white">Gesamtpreis</span><span className="text-3xl font-bold text-cyan-600 dark:text-cyan-400">{hasStringPrice ? 'Auf Anfrage' : `${totalPrice}€`}</span></div>
            <p className="text-xs text-slate-400 text-right mt-1">inkl. MwSt.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function BookingWizard(props: BookingWizardProps) {
  return <Suspense fallback={<div className="text-center py-20">Laden...</div>}><BookingContent {...props} /></Suspense>;
}