'use client';

import { Check, Info, Package, Backpack } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuickInfoProps {
  included: string[];
  toBring: string[];
}

export function CourseQuickInfo({ included, toBring }: QuickInfoProps) {
  return (
    <section className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Included */}
          <div className="bg-white/5 backdrop-blur-2xl rounded-[3.5rem] p-10 md:p-16 border border-white/10 shadow-2xl group hover:border-green-500/20 transition-all duration-500">
            <div className="flex items-center gap-6 mb-12">
              <div className="w-16 h-16 bg-green-500/10 text-green-400 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                <Package size={32} />
              </div>
              <h2 className="text-3xl font-black text-white tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">Das ist <br/>Inklusive</h2>
            </div>
            <ul className="space-y-6">
              {included.map((item) => (
                <li key={item} className="flex items-center gap-4 text-slate-300 font-bold text-sm">
                  <div className="shrink-0 w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center">
                    <Check className="text-green-400" size={14} />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* To Bring */}
          <div className="bg-white/5 backdrop-blur-2xl rounded-[3.5rem] p-10 md:p-16 border border-white/10 shadow-2xl group hover:border-blue-500/20 transition-all duration-500">
            <div className="flex items-center gap-6 mb-12">
              <div className="w-16 h-16 bg-blue-500/10 text-blue-400 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                <Backpack size={32} />
              </div>
              <h2 className="text-3xl font-black text-white tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">Das musst du <br/>Mitbringen</h2>
            </div>
            <ul className="space-y-6">
              {toBring.map((item) => (
                <li key={item} className="flex items-center gap-4 text-slate-300 font-bold text-sm">
                  <div className="shrink-0 w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center">
                    <Info className="text-blue-400" size={14} />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
