import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { ChevronLeft, User, Calendar, Mail, Euro } from 'lucide-react'

export default async function BookingsAdminPage() {
  const supabase = await createClient()
  
  // Fetch from the human-readable view we created earlier
  const { data: bookings, error } = await supabase
    .from('view_all_bookings')
    .select('*')
    .order('appointment_time', { ascending: false })

  if (error) {
    console.error('Fetch Error:', error)
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin" className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors">
          <ChevronLeft size={24} />
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Buchungen</h1>
          <p className="text-slate-500 text-sm">Alle Kurs- und Verleih-Reservierungen im Überblick.</p>
        </div>
      </div>

      <div className="glass-panel rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900/5 dark:bg-white/5 border-b dark:border-white/10 text-xs font-bold uppercase tracking-wider text-slate-500">
                <th className="px-6 py-4">Kunde</th>
                <th className="px-6 py-4">Produkt</th>
                <th className="px-6 py-4">Termin</th>
                <th className="px-6 py-4 text-right">Preis</th>
                <th className="px-6 py-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y dark:divide-white/10">
              {bookings?.map((booking) => (
                <tr key={booking.id} className="hover:bg-cyan-500/5 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <User size={14} className="text-cyan-500" /> {booking.customer_name}
                      </span>
                      <span className="text-xs text-slate-500 flex items-center gap-2">
                        <Mail size={12} /> {booking.customer_email}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium">
                    {booking.booked_item}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col text-sm">
                      <span className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                        <Calendar size={14} className="text-blue-500" />
                        {new Date(booking.appointment_time).toLocaleDateString('de-DE', { 
                          weekday: 'short', day: '2-digit', month: '2-digit', year: 'numeric' 
                        })}
                      </span>
                      <span className="text-xs text-slate-500 ml-5">
                        {booking.appointment_time.includes(' ') 
                          ? booking.appointment_time.split(' ')[1].substring(0, 5) + ' Uhr' 
                          : 'Tagesverleih'}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right font-bold text-cyan-600 dark:text-cyan-400">
                    {typeof booking.price_euro === 'number' 
                      ? `${booking.price_euro.toFixed(2)}€` 
                      : 'N/A'}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                      booking.status === 'paid' 
                        ? 'bg-green-500/10 text-green-500 border border-green-500/20' 
                        : 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20'
                    }`}>
                      {booking.status === 'paid' ? 'Bezahlt' : 'Reserviert'}
                    </span>
                  </td>
                </tr>
              ))}
              {(!bookings || bookings.length === 0) && (
                <tr>
                  <td colSpan={5} className="px-6 py-20 text-center text-slate-500">
                    Bisher keine Buchungen vorhanden.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
