'use client';

import { useState } from 'react';
import { Inquiry, updateInquiryStatus } from '@/app/actions/inquiry';
import { Mail, Phone, Calendar, Users, MessageSquare, CheckCircle, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

export function AdminInquiries({ initialInquiries }: { initialInquiries: Inquiry[] }) {
  const [inquiries, setInquiries] = useState(initialInquiries);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleStatusChange = async (id: string, newStatus: Inquiry['status']) => {
    setLoadingId(id);
    const res = await updateInquiryStatus(id, newStatus);
    if (res.success) {
      setInquiries(prev => prev.map(inq => inq.id === id ? { ...inq, status: newStatus } : inq));
    }
    setLoadingId(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400';
      case 'contacted': return 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'resolved': return 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400';
      default: return 'bg-slate-100 text-slate-600';
    }
  };

  if (inquiries.length === 0) {
    return (
      <div className="text-center py-12 text-slate-500">
        Keine Anfragen vorhanden.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {inquiries.map((inq) => (
        <div key={inq.id} className={cn(
          "bg-white dark:bg-slate-900 rounded-2xl border transition-all p-6",
          inq.status === 'new' ? "border-red-200 dark:border-red-900/50 shadow-md" : "border-slate-100 dark:border-slate-800"
        )}>
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{inq.name}</h3>
                <span className={cn("px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider", getStatusColor(inq.status))}>
                  {inq.status === 'new' ? 'Neu' : inq.status === 'contacted' ? 'In Kontakt' : 'Erledigt'}
                </span>
                <span className="text-xs font-bold uppercase tracking-widest text-slate-400 border px-2 py-0.5 rounded-md">
                  {inq.type}
                </span>
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-slate-600 dark:text-slate-400">
                <span className="flex items-center gap-1"><Mail size={16}/> {inq.email}</span>
                <span className="flex items-center gap-1"><Phone size={16}/> {inq.phone}</span>
                <span className="flex items-center gap-1"><Calendar size={16}/> {inq.date}</span>
                <span className="flex items-center gap-1"><Users size={16}/> {inq.participants} Personen</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <select 
                value={inq.status}
                onChange={(e) => handleStatusChange(inq.id, e.target.value as Inquiry['status'])}
                disabled={loadingId === inq.id}
                className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm rounded-lg p-2 outline-none focus:ring-2 focus:ring-cyan-500 transition-all disabled:opacity-50"
              >
                <option value="new">Neu</option>
                <option value="contacted">In Kontakt</option>
                <option value="resolved">Erledigt</option>
              </select>
            </div>
          </div>

          {inq.message && (
            <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl text-slate-700 dark:text-slate-300 text-sm">
              <div className="flex gap-2 mb-2 text-slate-400">
                <MessageSquare size={16} /> <span className="font-semibold text-xs uppercase tracking-wider">Nachricht / Wünsche</span>
              </div>
              <p className="whitespace-pre-wrap">{inq.message}</p>
            </div>
          )}

          <div className="mt-4 text-xs text-slate-400 flex items-center gap-1">
            <Clock size={14} /> Eingegangen: {new Date(inq.createdAt).toLocaleString('de-DE')}
          </div>
        </div>
      ))}
    </div>
  );
}
