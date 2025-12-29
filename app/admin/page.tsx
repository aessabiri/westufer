import { logout } from '@/app/login/actions'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { TrendingUp, Users, Calendar, Euro } from 'lucide-react'

export default async function AdminDashboard() {
  const supabase = await createClient()
  
  // Fetch stats from our view
  const { data: bookings } = await supabase.from('view_all_bookings').select('*')
  
  // Calculate analytics
  const totalRevenue = bookings?.reduce((sum, b) => sum + (b.price_euro || 0), 0) || 0
  const totalCount = bookings?.length || 0
  
  const next7Days = new Date()
  next7Days.setDate(next7Days.getDate() + 7)
  const upcomingCount = bookings?.filter(b => new Date(b.appointment_time) <= next7Days && new Date(b.appointment_time) >= new Date()).length || 0

  return (
    <div className="max-w-6xl mx-auto pb-20">
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-4xl font-bold mb-2 text-gradient">Admin Dashboard</h1>
          <p className="text-slate-500">Willkommen im Management-Bereich.</p>
        </div>
        <form>
          <button 
            formAction={logout}
            className="px-4 py-2 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-all font-bold text-sm"
          >
            Abmelden
          </button>
        </form>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white/40 dark:bg-white/5 backdrop-blur-xl p-6 rounded-3xl border border-white/20 dark:border-white/10 border-l-4 border-l-cyan-500 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-cyan-500/10 text-cyan-500 rounded-2xl">
              <Euro size={24} />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Gesamtumsatz</p>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">{totalRevenue.toFixed(2)}€</h2>
            </div>
          </div>
        </div>

        <div className="bg-white/40 dark:bg-white/5 backdrop-blur-xl p-6 rounded-3xl border border-white/20 dark:border-white/10 border-l-4 border-l-blue-500 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-500/10 text-blue-500 rounded-2xl">
              <Users size={24} />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Buchungen Gesamt</p>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">{totalCount}</h2>
            </div>
          </div>
        </div>

        <div className="bg-white/40 dark:bg-white/5 backdrop-blur-xl p-6 rounded-3xl border border-white/20 dark:border-white/10 border-l-4 border-l-purple-500 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-500/10 text-purple-500 rounded-2xl">
              <Calendar size={24} />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Nächste 7 Tage</p>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">{upcomingCount} Personen</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white/40 dark:bg-white/5 backdrop-blur-xl p-6 rounded-3xl border border-white/20 dark:border-white/10 border-2 border-transparent hover:border-cyan-500/50 transition-all shadow-xl">
          <h2 className="text-xl font-bold mb-4 text-gradient-primary">Kurse</h2>
          <p className="text-sm text-slate-500 mb-6">Schedules und Termine verwalten.</p>
          <Link 
            href="/admin/kurse"
            className="w-full py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg font-medium transition-colors block text-center"
          >
            Planen
          </Link>
        </div>

        <div className="bg-white/40 dark:bg-white/5 backdrop-blur-xl p-6 rounded-3xl border border-white/20 dark:border-white/10 border-2 border-transparent hover:border-cyan-500/50 transition-all shadow-xl">
          <h2 className="text-xl font-bold mb-4 text-gradient-primary">Equipment</h2>
          <p className="text-sm text-slate-500 mb-6">Bestand und Verfügbarkeit anpassen.</p>
          <Link 
            href="/admin/equipment"
            className="w-full py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg font-medium transition-colors block text-center"
          >
            Verwalten
          </Link>
        </div>

        <div className="bg-white/40 dark:bg-white/5 backdrop-blur-xl p-6 rounded-3xl border border-white/20 dark:border-white/10 border-2 border-transparent hover:border-blue-500/50 transition-all shadow-xl">
          <h2 className="text-xl font-bold mb-4 text-gradient-primary">Buchungen</h2>
          <p className="text-sm text-slate-500 mb-6">Alle Reservierungen einsehen.</p>
          <Link 
            href="/admin/bookings"
            className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors block text-center"
          >
            Ansehen
          </Link>
        </div>
      </div>
    </div>
  )
}
