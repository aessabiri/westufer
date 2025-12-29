import { createClient } from '@/lib/supabase/server'
import { updateEquipment } from './actions'
import Link from 'next/link'
import { ChevronLeft, Save, Package } from 'lucide-react'

export default async function EquipmentAdminPage() {
  const supabase = await createClient()
  const { data: items } = await supabase
    .from('rental_items')
    .select('*')
    .order('id', { ascending: true })

  // Wrapper to fix TS error: ensure action returns void
  async function handleUpdate(formData: FormData) {
    'use server'
    await updateEquipment(formData)
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin" className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors">
          <ChevronLeft size={24} />
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Equipment Manager</h1>
          <p className="text-slate-500 text-sm">Bestand und Preise für den Verleih steuern.</p>
        </div>
      </div>

      <div className="grid gap-4">
        {items?.map((item) => (
          <form key={item.id} action={handleUpdate} className="glass-card p-6 rounded-2xl flex flex-wrap items-center gap-6">
            <input type="hidden" name="id" value={item.id} />
            
            <div className="flex items-center gap-4 flex-1 min-w-[200px]">
              <div className="p-3 bg-cyan-500/10 text-cyan-500 rounded-xl">
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
                className="p-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl hover:opacity-80 transition-all flex items-center gap-2 font-bold text-sm mt-5"
              >
                <Save size={18} /> Speichern
              </button>
            </div>
          </form>
        ))}
      </div>
    </div>
  )
}