import { logout } from '@/app/login/actions'
import Link from 'next/link'

export default function AdminDashboard() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2 text-gradient">Admin Dashboard</h1>
          <p className="text-slate-500">Willkommen im Management-Bereich.</p>
        </div>
        <form>
          <button 
            formAction={logout}
            className="px-4 py-2 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-all"
          >
            Abmelden
          </button>
        </form>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="glass-panel p-6 rounded-2xl border-2 border-transparent hover:border-cyan-500/50 transition-all">
          <h2 className="text-xl font-bold mb-4 text-gradient-primary">Kurse</h2>
          <p className="text-sm text-slate-500 mb-6">Schedules und Termine verwalten.</p>
          <Link 
            href="/admin/kurse"
            className="w-full py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg font-medium transition-colors block text-center"
          >
            Planen
          </Link>
        </div>

        <div className="glass-panel p-6 rounded-2xl border-2 border-transparent hover:border-cyan-500/50 transition-all">
          <h2 className="text-xl font-bold mb-4 text-gradient-primary">Equipment</h2>
          <p className="text-sm text-slate-500 mb-6">Bestand und Verfügbarkeit anpassen.</p>
          <Link 
            href="/admin/equipment"
            className="w-full py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg font-medium transition-colors block text-center"
          >
            Verwalten
          </Link>
        </div>

        <div className="glass-panel p-6 rounded-2xl border-2 border-transparent hover:border-blue-500/50 transition-all">
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
