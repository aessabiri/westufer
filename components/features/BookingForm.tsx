'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Check, ChevronRight, Wind, Waves, MapPin, User, Mail, Phone, CreditCard, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

// Course Data (Centralized)
const courses = [
  { 
    id: 'ws-basic', 
    category: 'Windsurf',
    name: 'Windsurf Grundschein', 
    price: 195, 
    duration: '12 Std.',
    icon: Wind,
    color: 'text-blue-500',
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    border: 'border-blue-200 dark:border-blue-800'
  },
  { 
    id: 'ws-trial', 
    category: 'Windsurf',
    name: 'Schnupperkurs', 
    price: 80, 
    duration: '4 Std.',
    icon: Wind,
    color: 'text-blue-400',
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    border: 'border-blue-200 dark:border-blue-800'
  },
  { 
    id: 'sup-basic', 
    category: 'SUP',
    name: 'SUP Einsteiger', 
    price: 39, 
    duration: '90 Min.',
    icon: Waves,
    color: 'text-cyan-500',
    bg: 'bg-cyan-50 dark:bg-cyan-900/20',
    border: 'border-cyan-200 dark:border-cyan-800'
  },
  { 
    id: 'sup-tour', 
    category: 'SUP',
    name: 'SUP Sunset Tour', 
    price: 29, 
    duration: '2 Std.',
    icon: Waves,
    color: 'text-cyan-400',
    bg: 'bg-cyan-50 dark:bg-cyan-900/20',
    border: 'border-cyan-200 dark:border-cyan-800'
  },
  { 
    id: 'lb-basic', 
    category: 'Longboard',
    name: 'Longboard Basic', 
    price: 25, 
    duration: '90 Min.',
    icon: MapPin,
    color: 'text-emerald-500',
    bg: 'bg-emerald-50 dark:bg-emerald-900/20',
    border: 'border-emerald-200 dark:border-emerald-800'
  },
];

// Mock Dates
const availableDates = [
  { id: 'd1', label: 'Mo 15.07. - 14:00', short: 'Mo 15.07' },
  { id: 'd2', label: 'Di 16.07. - 14:00', short: 'Di 16.07' },
  { id: 'd3', label: 'Mi 17.07. - 14:00', short: 'Mi 17.07' },
  { id: 'd4', label: 'Sa 20.07. - 11:00', short: 'Sa 20.07' },
  { id: 'd5', label: 'So 21.07. - 11:00', short: 'So 21.07' },
];

function BookingContent() {
  const searchParams = useSearchParams();
  const initialCourseId = searchParams.get('course');

  const [step, setStep] = useState(1);
  const [selectedCourseId, setSelectedCourseId] = useState(initialCourseId || '');
  const [selectedDateId, setSelectedDateId] = useState('');
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', phone: '' });
  const [isSuccess, setIsSuccess] = useState(false);

  const selectedCourse = courses.find(c => c.id === selectedCourseId);
  const selectedDate = availableDates.find(d => d.id === selectedDateId);

  // Auto-advance if course is pre-selected via URL
  useEffect(() => {
    if (initialCourseId && courses.find(c => c.id === initialCourseId)) {
      setSelectedCourseId(initialCourseId);
      // Optional: Auto-jump to step 2? Let's verify first.
      // setStep(2); 
    }
  }, [initialCourseId]);

  const handleNext = () => setStep(prev => Math.min(prev + 1, 3));
  const handleBack = () => setStep(prev => Math.max(prev - 1, 1));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    // Here you would normally send data to API
  };

  if (isSuccess) {
    return (
      <div className="max-w-xl mx-auto text-center py-20">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white dark:bg-slate-900 rounded-3xl p-12 shadow-xl border border-green-100 dark:border-green-900"
        >
          <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <Sparkles className="text-green-600 dark:text-green-400" size={40} />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Buchung erfolgreich!</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-8">
            Vielen Dank, {formData.firstName}! Wir haben dir eine Bestätigung an <strong>{formData.email}</strong> gesendet.
          </p>
          <Link href="/" className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-8 py-3 rounded-full font-bold hover:opacity-90 transition-opacity">
            Zurück zur Startseite
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8 items-start">
      
      {/* LEFT COLUMN: Steps */}
      <div className="lg:col-span-2 space-y-8">
        {/* Progress Bar */}
        <div className="flex items-center justify-between mb-8 px-2">
          {['Kurs', 'Termin', 'Daten'].map((label, idx) => {
            const stepNum = idx + 1;
            const isActive = step >= stepNum;
            const isCompleted = step > stepNum;
            return (
              <div key={label} className="flex flex-col items-center relative z-10">
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 border-2",
                  isActive ? "bg-cyan-500 border-cyan-500 text-white shadow-lg shadow-cyan-500/30" : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400"
                )}>
                  {isCompleted ? <Check size={20} /> : stepNum}
                </div>
                <span className={cn("text-xs font-medium mt-2 transition-colors", isActive ? "text-cyan-600 dark:text-cyan-400" : "text-slate-400")}>{label}</span>
              </div>
            );
          })}
          {/* Connecting Line */}
          <div className="absolute top-5 left-0 w-full h-0.5 bg-slate-200 dark:bg-slate-800 -z-0" />
          <div 
            className="absolute top-5 left-0 h-0.5 bg-cyan-500 transition-all duration-500 -z-0" 
            style={{ width: `${((step - 1) / 2) * 100}%` }}
          />
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100 dark:border-slate-800 min-h-[400px]">
          <AnimatePresence mode="wait">
            
            {/* STEP 1: SELECT COURSE */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Wähle dein Erlebnis</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {courses.map((course) => (
                    <button
                      key={course.id}
                      onClick={() => { setSelectedCourseId(course.id); }}
                      className={cn(
                        "relative p-4 rounded-xl border-2 text-left transition-all hover:shadow-md",
                        selectedCourseId === course.id 
                          ? `${course.border} ${course.bg} ring-1 ring-offset-0`
                          : "border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700"
                      )}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className={cn("p-2 rounded-lg bg-white dark:bg-slate-950", course.color)}>
                          <course.icon size={24} />
                        </div>
                        {selectedCourseId === course.id && (
                          <div className="bg-cyan-500 text-white rounded-full p-1">
                            <Check size={14} />
                          </div>
                        )}
                      </div>
                      <h3 className="font-bold text-slate-900 dark:text-white">{course.name}</h3>
                      <div className="flex justify-between items-end mt-2">
                        <span className="text-sm text-slate-500 dark:text-slate-400">{course.duration}</span>
                        <span className="font-bold text-lg text-slate-900 dark:text-white">{course.price}€</span>
                      </div>
                    </button>
                  ))}
                </div>
                <div className="flex justify-end mt-8">
                  <button 
                    disabled={!selectedCourseId}
                    onClick={handleNext}
                    className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-8 py-3 rounded-full font-bold flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
                  >
                    Weiter <ChevronRight size={20} />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 2: SELECT DATE */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Wähle einen Termin</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
                  {availableDates.map((date) => (
                    <button 
                      key={date.id}
                      onClick={() => setSelectedDateId(date.id)}
                      className={cn(
                        "p-4 rounded-xl border text-center transition-all",
                        selectedDateId === date.id 
                          ? "border-cyan-500 bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-300 font-bold"
                          : "border-slate-200 dark:border-slate-800 hover:border-cyan-400 text-slate-600 dark:text-slate-300"
                      )}
                    >
                      {date.short}
                      <span className="block text-xs font-normal mt-1 opacity-70">Verfügbar</span>
                    </button>
                  ))}
                </div>
                <div className="flex justify-between mt-8">
                  <button onClick={handleBack} className="text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white font-medium">Zurück</button>
                  <button 
                    disabled={!selectedDateId}
                    onClick={handleNext}
                    className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-8 py-3 rounded-full font-bold flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
                  >
                    Weiter <ChevronRight size={20} />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 3: DETAILS */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Deine Details</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Vorname</label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 text-slate-400" size={18} />
                        <input 
                          required
                          value={formData.firstName}
                          onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                          className="w-full pl-10 p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 focus:border-cyan-500 outline-none transition-colors" 
                          placeholder="Max" 
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Nachname</label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 text-slate-400" size={18} />
                        <input 
                          required
                          value={formData.lastName}
                          onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                          className="w-full pl-10 p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 focus:border-cyan-500 outline-none transition-colors" 
                          placeholder="Mustermann" 
                        />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">E-Mail</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 text-slate-400" size={18} />
                      <input 
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full pl-10 p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 focus:border-cyan-500 outline-none transition-colors" 
                        placeholder="max@beispiel.de" 
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Telefon</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 text-slate-400" size={18} />
                      <input 
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full pl-10 p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 focus:border-cyan-500 outline-none transition-colors" 
                        placeholder="+49 123 456789" 
                      />
                    </div>
                  </div>

                  <div className="flex justify-between mt-8 items-center">
                    <button type="button" onClick={handleBack} className="text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white font-medium">Zurück</button>
                    <button 
                      type="submit"
                      className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-green-500/20 hover:shadow-xl hover:shadow-green-500/30 transition-all flex items-center gap-2"
                    >
                      Kostenpflichtig buchen <CreditCard size={18} />
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* RIGHT COLUMN: Summary (Sticky) */}
      <div className="lg:col-span-1">
        <div className="sticky top-28 bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-lg border border-slate-100 dark:border-slate-800">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 border-b dark:border-slate-800 pb-4">Zusammenfassung</h3>
          
          <div className="space-y-4 mb-6">
            <div className="flex justify-between items-start">
              <span className="text-slate-500 dark:text-slate-400">Kurs</span>
              <span className="font-medium text-right text-slate-900 dark:text-white">{selectedCourse ? selectedCourse.name : '-'}</span>
            </div>
            <div className="flex justify-between items-start">
              <span className="text-slate-500 dark:text-slate-400">Termin</span>
              <span className="font-medium text-right text-slate-900 dark:text-white">{selectedDate ? selectedDate.label : '-'}</span>
            </div>
             <div className="flex justify-between items-start">
              <span className="text-slate-500 dark:text-slate-400">Dauer</span>
              <span className="font-medium text-right text-slate-900 dark:text-white">{selectedCourse ? selectedCourse.duration : '-'}</span>
            </div>
          </div>

          <div className="border-t border-slate-100 dark:border-slate-800 pt-4 mb-6">
            <div className="flex justify-between items-end">
              <span className="font-bold text-slate-900 dark:text-white">Gesamtpreis</span>
              <span className="text-3xl font-bold text-cyan-600 dark:text-cyan-400">
                {selectedCourse ? `${selectedCourse.price}€` : '0€'}
              </span>
            </div>
            <p className="text-xs text-slate-400 text-right mt-1">inkl. MwSt.</p>
          </div>

          {step === 1 && (
            <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg text-sm text-slate-500 dark:text-slate-400 flex gap-2">
              <Sparkles size={16} className="shrink-0 mt-0.5 text-amber-500" />
              Wähle zuerst einen Kurs aus, um fortzufahren.
            </div>
          )}
        </div>
      </div>

    </div>
  );
}

export function BookingForm() {
  return (
    <Suspense fallback={<div className="text-center py-20">Laden...</div>}>
      <BookingContent />
    </Suspense>
  );
}