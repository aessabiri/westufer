import { login } from './actions'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="glass-panel w-full max-w-md p-8 rounded-3xl">
        <h1 className="text-3xl font-bold text-center mb-2">Admin Login</h1>
        <p className="text-slate-500 dark:text-slate-400 text-center mb-8">
          Westufer Kemnade Management
        </p>
        
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input 
              name="email" 
              type="email" 
              required 
              className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-950/50 outline-none focus:ring-2 focus:ring-cyan-500"
              placeholder="admin@westufer.de"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <input 
              name="password" 
              type="password" 
              required 
              className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-950/50 outline-none focus:ring-2 focus:ring-cyan-500"
              placeholder="••••••••"
            />
          </div>

          <button 
            formAction={login}
            className="w-full py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-bold rounded-xl transition-colors shadow-lg shadow-cyan-500/20"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  )
}
