import { logout } from '@/app/login/actions';
import { getInquiries } from '@/app/actions/inquiry';
import { AdminInquiries } from '@/components/admin/AdminInquiries';

export default async function AdminDashboard() {
  const inquiries = await getInquiries();
  
  return (
    <div className="max-w-6xl mx-auto pb-20">
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-4xl font-bold mb-2 text-gradient">Admin Dashboard</h1>
          <p className="text-slate-500">Verwaltung von Gruppen- und Eventanfragen.</p>
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

      <div className="bg-white/40 dark:bg-white/5 backdrop-blur-xl rounded-3xl border border-white/20 dark:border-white/10 shadow-xl overflow-hidden">
        <div className="p-6 border-b border-white/20 dark:border-white/10 bg-slate-50/50 dark:bg-slate-900/50">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Aktuelle Anfragen</h2>
        </div>
        
        <div className="p-6">
          <AdminInquiries initialInquiries={inquiries} />
        </div>
      </div>
    </div>
  );
}
