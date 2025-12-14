'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, PartyPopper, Users, Calendar, User, Mail, Phone, MessageSquare, Check, ChevronRight, Send } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const eventTypes = [
  { id: 'school', label: 'Schulklasse', icon: GraduationCap, color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' },
  { id: 'birthday', label: 'Kindergeburtstag', icon: PartyPopper, color: 'bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400' },
  { id: 'company', label: 'Firmen-Event', icon: Users, color: 'bg-cyan-100 text-cyan-600 dark:bg-cyan-900/30 dark:text-cyan-400' },
];

function InquiryFormContent() {
  const searchParams = useSearchParams();
  const initialType = searchParams.get('type');

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    type: initialType || '',
    participants: '',
    date: '',
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSuccess, setIsSuccess] = useState(false);

  const handleNext = () => setStep(prev => Math.min(prev + 1, 3));
  const handleBack = () => setStep(prev => Math.max(prev - 1, 1));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
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
            <Check className="text-green-600 dark:text-green-400" size={40} />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Anfrage gesendet!</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-8">
            Vielen Dank, {formData.name}! Wir haben deine Anfrage erhalten und melden uns in Kürze bei dir.
          </p>
          <Link href="/" className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-8 py-3 rounded-full font-bold hover:opacity-90 transition-opacity">
            Zurück zur Startseite
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800 overflow-hidden">
        
        {/* Progress Header */}
        <div className="bg-slate-50 dark:bg-slate-950/50 p-6 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between max-w-2xl mx-auto relative">
            {['Event-Typ', 'Details', 'Kontakt'].map((label, idx) => {
              const stepNum = idx + 1;
              const isActive = step >= stepNum;
              return (
                <div key={label} className="flex flex-col items-center relative z-10">
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 border-2",
                    isActive ? "bg-blue-600 border-blue-600 text-white" : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400"
                  )}>
                    {step > stepNum ? <Check size={20} /> : stepNum}
                  </div>
                  <span className={cn("text-xs font-medium mt-2", isActive ? "text-blue-600 dark:text-blue-400" : "text-slate-400")}>{label}</span>
                </div>
              );
            })}
            <div className="absolute top-5 left-0 w-full h-0.5 bg-slate-200 dark:bg-slate-800 -z-0" />
            <div 
              className="absolute top-5 left-0 h-0.5 bg-blue-600 transition-all duration-500 -z-0" 
              style={{ width: `${((step - 1) / 2) * 100}%` }}
            />
          </div>
        </div>

        <div className="p-8 md:p-12">
          <AnimatePresence mode="wait">
            
            {/* Step 1: Event Type */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Was plant ihr?</h2>
                  <p className="text-slate-600 dark:text-slate-400">Wähle die Art deines Events aus.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  {eventTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setFormData({ ...formData, type: type.id })}
                      className={cn(
                        "p-6 rounded-2xl border-2 text-center transition-all hover:shadow-lg group",
                        formData.type === type.id
                          ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 ring-1 ring-blue-500"
                          : "border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-200"
                      )}
                    >
                      <div className={cn("w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-transform group-hover:scale-110", type.color)}>
                        <type.icon size={32} />
                      </div>
                      <h3 className="font-bold text-slate-900 dark:text-white">{type.label}</h3>
                    </button>
                  ))}
                </div>

                <div className="flex justify-end">
                  <button 
                    disabled={!formData.type}
                    onClick={handleNext}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-bold flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    Weiter <ChevronRight size={20} />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 2: Details */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Eckdaten</h2>
                  <p className="text-slate-600 dark:text-slate-400">Wann und mit wie vielen Personen wollt ihr kommen?</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Anzahl Personen (ca.)</label>
                    <div className="relative">
                      <Users className="absolute left-3 top-3 text-slate-400" size={20} />
                      <input 
                        type="number"
                        value={formData.participants}
                        onChange={(e) => setFormData({...formData, participants: e.target.value})}
                        className="w-full pl-10 p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 outline-none focus:border-blue-500 transition-colors"
                        placeholder="z.B. 25"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Wunschtermin</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 text-slate-400" size={20} />
                      <input 
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({...formData, date: e.target.value})}
                        className="w-full pl-10 p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Nachricht / Wünsche</label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 text-slate-400" size={20} />
                    <textarea 
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full pl-10 p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 outline-none focus:border-blue-500 transition-colors h-32 resize-none"
                      placeholder="Erzähl uns mehr über deine Pläne..."
                    />
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <button onClick={handleBack} className="text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white font-medium">Zurück</button>
                  <button 
                    disabled={!formData.participants || !formData.date}
                    onClick={handleNext}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-bold flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    Weiter <ChevronRight size={20} />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Contact */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Kontaktdaten</h2>
                  <p className="text-slate-600 dark:text-slate-400">Wie können wir dich erreichen?</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Name / Ansprechpartner</label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 text-slate-400" size={20} />
                        <input 
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="w-full pl-10 p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 outline-none focus:border-blue-500 transition-colors"
                          placeholder="Max Mustermann"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Telefon</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 text-slate-400" size={20} />
                        <input 
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          className="w-full pl-10 p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 outline-none focus:border-blue-500 transition-colors"
                          placeholder="+49 123 456789"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">E-Mail</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 text-slate-400" size={20} />
                      <input 
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full pl-10 p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 outline-none focus:border-blue-500 transition-colors"
                        placeholder="max@schule.de"
                      />
                    </div>
                  </div>

                  <div className="flex justify-between pt-8 items-center">
                    <button type="button" onClick={handleBack} className="text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white font-medium">Zurück</button>
                    <button 
                      type="submit"
                      className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full font-bold flex items-center gap-2 shadow-lg shadow-green-600/20 hover:shadow-xl hover:shadow-green-600/30 transition-all"
                    >
                      Anfrage absenden <Send size={20} />
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export function GroupInquiryForm() {
  return (
    <Suspense fallback={<div className="text-center py-20">Laden...</div>}>
      <InquiryFormContent />
    </Suspense>
  );
}
