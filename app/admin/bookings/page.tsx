'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { toggleCheckIn } from './actions';
import Link from 'next/link';
import { ChevronLeft, User, Calendar, Mail, Search, CheckCircle2, Circle, Loader2, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function BookingsAdminPage() {
  const supabase = createClient();
  const [bookings, setBookings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'pending' | 'checked_in'>('all');
  const [processingId, setIsProcessingId] = useState<string | null>(null);

  const fetchData = async () => {
    const { data, error } = await supabase
      .from('view_all_bookings')
      .select('*')
      .order('appointment_time', { ascending: false });
    
    if (error) {
      console.error('Terminal Fetch Error:', error);
    }
    
    setBookings(data || []);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleToggle = async (id: string, status: boolean) => {
    setIsProcessingId(id);
    const result = await toggleCheckIn(id, status);
    if (result.success) {
      await fetchData();
    }
    setIsProcessingId(null);
  };

  const filteredBookings = bookings.filter(b => {
    const matchesSearch = 
      b.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      b.customer_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.booked_item.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === 'checked_in') return matchesSearch && b.checked_in;
    if (filter === 'pending') return matchesSearch && !b.checked_in;
    return matchesSearch;
  });

  if (isLoading) return <div className="p-20 text-center">Laden...</div>;

  return (
    <div className="max-w-6xl mx-auto pb-20">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <Link href="/admin" className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors">
            <ChevronLeft size={24} />
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Check-in Terminal</h1>
            <p className="text-slate-500 text-sm">Gäste vor Ort verwalten und einchecken.</p>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-1 max-w-md items-center gap-2 bg-white/50 dark:bg-slate-900/50 p-2 rounded-2xl border dark:border-white/10 backdrop-blur-md">
          <Search size={18} className="ml-2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Name oder E-Mail suchen..."
            className="bg-transparent border-none outline-none flex-1 text-sm p-1"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="h-6 w-[1px] bg-slate-200 dark:bg-slate-800" />
          <select 
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="bg-transparent text-xs font-bold uppercase tracking-widest outline-none px-2 cursor-pointer"
          >
            <option value="all">Alle</option>
            <option value="pending">Offen</option>
            <option value="checked_in">Checked-in</option>
          </select>
        </div>
      </div>

      <div className="glass-panel rounded-3xl overflow-hidden shadow-xl border dark:border-white/5">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900/5 dark:bg-white/5 border-b dark:border-white/10 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                <th className="px-6 py-5">Kunde</th>
                <th className="px-6 py-5">Produkt</th>
                <th className="px-6 py-5">Termin</th>
                <th className="px-6 py-5 text-right">Preis</th>
                <th className="px-6 py-5 text-center w-20">Check-in</th>
              </tr>
            </thead>
            <tbody className="divide-y dark:divide-white/10">
              {filteredBookings.map((booking) => (
                <tr key={booking.id} className={cn(
                  "group transition-all duration-300",
                  booking.checked_in ? "bg-green-500/[0.02] opacity-70" : "hover:bg-cyan-500/[0.03]"
                )}>
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
                  <td className="px-6 py-4 font-medium text-sm">
                    {booking.booked_item}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col text-sm">
                      <span className="flex items-center gap-2 font-bold text-slate-700 dark:text-slate-300">
                        {new Date(booking.appointment_time).toLocaleDateString('de-DE', { 
                          weekday: 'short', day: '2-digit', month: '2-digit'
                        })}
                      </span>
                      <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">
                        {booking.appointment_time.includes(' ') 
                          ? booking.appointment_time.split(' ')[1].substring(0, 5) + ' Uhr' 
                          : 'Tagesverleih'}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right font-black text-slate-900 dark:text-white">
                    {typeof booking.price_euro === 'number' ? `${booking.price_euro.toFixed(2)}€` : 'N/A'}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button 
                      onClick={() => handleToggle(booking.id, booking.checked_in)}
                      disabled={processingId === booking.id}
                      className={cn(
                        "p-3 rounded-2xl transition-all active:scale-90",
                        booking.checked_in 
                          ? "bg-green-500 text-white shadow-lg shadow-green-500/20" 
                          : "bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-cyan-500 hover:bg-cyan-500/10"
                      )}
                    >
                      {processingId === booking.id ? (
                        <Loader2 size={20} className="animate-spin" />
                      ) : booking.checked_in ? (
                        <CheckCircle2 size={20} />
                      ) : (
                        <Circle size={20} />
                      )}
                    </button>
                  </td>
                </tr>
              ))}
              {filteredBookings.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-32 text-center">
                    <div className="flex flex-col items-center gap-4 opacity-20">
                      <Search size={48} />
                      <p className="font-bold uppercase tracking-widest text-xs">Keine Treffer</p>
                    </div>
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
