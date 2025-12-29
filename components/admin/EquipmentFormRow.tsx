'use client';

import { useState } from 'react';
import { updateEquipment } from '@/app/admin/equipment/actions';
import { Save, Package, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EquipmentFormRowProps {
  item: {
    id: number;
    name: string;
    category: string;
    total_quantity: number;
    price_per_hour_cents: number;
  };
}

export function EquipmentFormRow({ item }: EquipmentFormRowProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(formData: FormData) {
    setStatus('loading');
    setErrorMessage('');
    
    try {
      const result = await updateEquipment(formData);
      
      if (result.success) {
        setStatus('success');
        setTimeout(() => setStatus('idle'), 3000); // Reset after 3s
      } else {
        setStatus('error');
        setErrorMessage(result.error || 'Fehler');
      }
    } catch (err) {
      setStatus('error');
      setErrorMessage('Verbindungsfehler');
    }
  }

  return (
    <form action={handleSubmit} className={cn(
      "glass-card p-6 rounded-2xl flex flex-wrap items-center gap-6 border-2 transition-all duration-500",
      status === 'success' ? "border-green-500/50 bg-green-500/5" : 
      status === 'error' ? "border-red-500/50 bg-red-500/5" : "border-transparent"
    )}>
      <input type="hidden" name="id" value={item.id} />
      
      <div className="flex items-center gap-4 flex-1 min-w-[200px]">
        <div className={cn(
          "p-3 rounded-xl transition-colors",
          status === 'success' ? "bg-green-500/20 text-green-500" : "bg-cyan-500/10 text-cyan-500"
        )}>
          <Package size={24} />
        </div>
        <div>
          <h3 className="font-bold text-lg">{item.name}</h3>
          <span className="text-xs uppercase tracking-wider text-slate-400 font-bold">{item.category}</span>
        </div>
      </div>

      <div className="flex gap-6 items-center">
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-400 uppercase">Bestand</label>
          <input 
            type="number" 
            name="quantity" 
            defaultValue={item.total_quantity}
            className="w-20 p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-950/50 outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-400 uppercase">Preis (€/Std)</label>
          <input 
            type="number" 
            step="0.50"
            name="price" 
            defaultValue={item.price_per_hour_cents / 100}
            className="w-24 p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-950/50 outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        <button 
          type="submit"
          disabled={status === 'loading'}
          className={cn(
            "p-3 rounded-xl transition-all flex items-center gap-2 font-bold text-sm mt-5 min-w-[120px] justify-center",
            status === 'success' ? "bg-green-500 text-white shadow-lg shadow-green-500/20" :
            status === 'error' ? "bg-red-500 text-white" :
            "bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:opacity-80"
          )}
        >
          {status === 'loading' ? <Loader2 size={18} className="animate-spin" /> :
           status === 'success' ? <><CheckCircle2 size={18} /> Gespeichert</> :
           status === 'error' ? <><AlertCircle size={18} /> Error</> :
           <><Save size={18} /> Speichern</>}
        </button>
      </div>
      
      {status === 'error' && (
        <p className="w-full text-xs text-red-500 font-bold mt-2 flex items-center gap-1">
          <AlertCircle size={12} /> {errorMessage}
        </p>
      )}
    </form>
  );
}
