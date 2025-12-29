'use client';

import { useState, useEffect } from 'react';
import { generateSlots, deleteSlot } from './actions';
import Link from 'next/link';
import { ChevronLeft, Plus, Trash2, Calendar, Check, Clock, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { cn } from '@/lib/utils';

const days = [
  { label: 'Mo', value: 1 },
  { label: 'Di', value: 2 },
  { label: 'Mi', value: 3 },
  { label: 'Do', value: 4 },
  { label: 'Fr', value: 5 },
  { label: 'Sa', value: 6 },
  { label: 'So', value: 0 },
];

export default function KurseAdminPage() {
  const [courses, setCourses] = useState<any[]>([]);
  const [slots, setSlots] = useState<any[]>([]);
  const [mode, setMode] = useState<'single' | 'range'>('range');
  const [selectedDays, setSelectedDays] = useState<number[]>([6, 0]); // Default Sat/Sun
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const refreshData = async () => {
    const { data: coursesData } = await supabase.from('courses').select('*').order('title');
    const { data: slotsData } = await supabase
      .from('course_slots')
      .select('*, courses(title)')
      .gt('start_time', new Date().toISOString())
      .order('start_time', { ascending: true });
    
    setCourses(coursesData || []);
    setSlots(slotsData || []);
  };

  useEffect(() => {
    refreshData().then(() => setIsLoading(false));
  }, []);

  const toggleDay = (day: number) => {
    setSelectedDays(prev => 
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  async function handleGenerate(formData: FormData) {
    setIsGenerating(true);
    setStatus('idle');
    setErrorMessage('');

    try {
      const result = await generateSlots(formData);
      if (result.success) {
        setStatus('success');
        await refreshData();
        setTimeout(() => setStatus('idle'), 3000);
      } else {
        setStatus('error');
        setErrorMessage(result.error || 'Fehler beim Generieren');
      }
    } catch (err) {
      setStatus('error');
      setErrorMessage('Verbindungsfehler');
    } finally {
      setIsGenerating(false);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm('Termin wirklich löschen?')) return;
    const result = await deleteSlot(id);
    if (result.success) {
      await refreshData();
    }
  }

  if (isLoading) return <div className="p-20 text-center">Laden...</div>;

  return (
    <div className="max-w-6xl mx-auto pb-20">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin" className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors">
          <ChevronLeft size={24} />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gradient">Kurs-Planer</h1>
          <p className="text-slate-500 text-sm">Termine und Verfügbarkeiten für Kurse verwalten.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className={cn(
            "glass-panel p-6 rounded-3xl sticky top-8 border-2 transition-all duration-500",
            status === 'success' ? "border-green-500/50" : 
            status === 'error' ? "border-red-500/50" : "border-cyan-500/20"
          )}>
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Plus size={20} className="text-cyan-500" /> Slot-Generator
            </h2>
            
            <form action={handleGenerate} className="space-y-6">
              <input type="hidden" name="mode" value={mode} />
              {selectedDays.map(d => <input key={d} type="hidden" name="days" value={d} />)}

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Modus</label>
                <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                  <button 
                    type="button"
                    onClick={() => setMode('single')}
                    className={cn("flex-1 py-2 text-xs font-bold rounded-lg transition-all", mode === 'single' ? "bg-white dark:bg-slate-700 shadow-sm" : "text-slate-500")}
                  >
                    Einzeltermin
                  </button>
                  <button 
                    type="button"
                    onClick={() => setMode('range')}
                    className={cn("flex-1 py-2 text-xs font-bold rounded-lg transition-all", mode === 'range' ? "bg-white dark:bg-slate-700 shadow-sm" : "text-slate-500")}
                  >
                    Zeitraum
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Kurs</label>
                <select name="courseId" className="w-full p-3 rounded-xl border dark:border-white/10 bg-white dark:bg-slate-900 outline-none focus:ring-2 focus:ring-cyan-500 font-medium">
                  {courses?.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
                </select>
              </div>

              {mode === 'range' && (
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Wochentage</label>
                  <div className="flex flex-wrap gap-2">
                    {days.map(day => (
                      <button
                        key={day.value}
                        type="button"
                        onClick={() => toggleDay(day.value)}
                        className={cn(
                          "w-9 h-9 rounded-lg text-xs font-bold flex items-center justify-center transition-all border",
                          selectedDays.includes(day.value) 
                            ? "bg-cyan-500 border-cyan-500 text-white shadow-lg shadow-cyan-500/20" 
                            : "bg-white dark:bg-slate-900 border-slate-200 dark:border-white/5 text-slate-500 hover:border-cyan-500/50"
                        )}
                      >
                        {day.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className={cn("grid gap-4", mode === 'range' ? "grid-cols-2" : "grid-cols-1")}>
                {mode === 'single' ? (
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Datum</label>
                    <input type="date" name="singleDate" required className="w-full p-3 rounded-xl border dark:border-white/10 bg-white dark:bg-slate-900" />
                  </div>
                ) : (
                  <>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Von</label>
                      <input type="date" name="startDate" required className="w-full p-3 rounded-xl border dark:border-white/10 bg-white dark:bg-slate-900 text-sm" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Bis</label>
                      <input type="date" name="endDate" required className="w-full p-3 rounded-xl border dark:border-white/10 bg-white dark:bg-slate-900 text-sm" />
                    </div>
                  </>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Uhrzeit</label>
                  <div className="relative">
                    <Clock size={14} className="absolute left-3 top-4 text-slate-400" />
                    <input type="time" name="startTime" defaultValue="14:00" className="w-full pl-9 p-3 rounded-xl border dark:border-white/10 bg-white dark:bg-slate-900" />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Kapazität</label>
                  <input type="number" name="capacity" defaultValue="8" className="w-full p-3 rounded-xl border dark:border-white/10 bg-white dark:bg-slate-900 font-bold" />
                </div>
              </div>

              <button 
                disabled={isGenerating}
                className={cn(
                  "w-full py-4 font-black uppercase tracking-widest text-xs rounded-2xl transition-all shadow-xl flex items-center justify-center gap-2",
                  status === 'success' ? "bg-green-500 text-white" :
                  status === 'error' ? "bg-red-500 text-white" :
                  "bg-slate-900 dark:bg-white text-white dark:text-slate-900"
                )}
              >
                {isGenerating ? <Loader2 size={18} className="animate-spin" /> :
                 status === 'success' ? <><CheckCircle2 size={18} /> Erfolgreich!</> :
                 status === 'error' ? <><AlertCircle size={18} /> Fehlgeschlagen</> :
                 "Termine generieren"}
              </button>
              
              {status === 'error' && (
                <p className="text-[10px] text-red-500 font-bold text-center uppercase tracking-tighter mt-2">{errorMessage}</p>
              )}
            </form>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="glass-panel rounded-3xl overflow-hidden shadow-xl border dark:border-white/5">
            <div className="px-6 py-4 bg-slate-900/5 border-b dark:border-white/10 flex justify-between items-center">
              <h2 className="font-bold">Aktiver Kursplan</h2>
              <span className="text-xs text-slate-500 font-bold uppercase tracking-widest">{slots.length} Termine</span>
            </div>
            <div className="divide-y dark:divide-white/10">
              {slots?.map((slot) => (
                <div key={slot.id} className="p-4 flex items-center justify-between hover:bg-cyan-500/5 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-blue-500/10 text-blue-500 rounded-lg">
                      <Calendar size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm">{(slot.courses as any).title}</h3>
                      <p className="text-xs text-slate-500 font-bold">
                        {new Date(slot.start_time).toLocaleDateString('de-DE', { weekday: 'short', day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })} Uhr
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <span className={cn(
                        "text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-md",
                        slot.booked_count >= slot.max_capacity ? 'bg-red-500/10 text-red-500' : 'bg-green-500/10 text-green-500'
                      )}>
                        {slot.booked_count} / {slot.max_capacity} Plätze
                      </span>
                    </div>
                    <button 
                      onClick={() => handleDelete(slot.id)}
                      className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
              {(!slots || slots.length === 0) && (
                <div className="p-20 text-center text-slate-500 flex flex-col items-center gap-4">
                  <Calendar size={48} className="opacity-20" />
                  <p>Keine Termine geplant.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}