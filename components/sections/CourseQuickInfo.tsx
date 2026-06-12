'use client';

import { Check, Info, Package, Backpack } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuickInfoProps {
  included: string[];
  toBring: string[];
}

export function CourseQuickInfo({ included, toBring }: QuickInfoProps) {
  return (
    <section className="py-24 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Included */}
          <div className="bg-slate-50 dark:bg-slate-900/50 rounded-[2.5rem] p-8 md:p-12 border border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-2xl flex items-center justify-center">
                <Package size={24} />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Das ist inklusive</h2>
            </div>
            <ul className="space-y-4">
              {included.map((item) => (
                <li key={item} className="flex items-start gap-3 text-slate-700 dark:text-slate-300 font-medium">
                  <div className="mt-1 shrink-0 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <Check className="text-white" size={14} />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* To Bring */}
          <div className="bg-slate-50 dark:bg-slate-900/50 rounded-[2.5rem] p-8 md:p-12 border border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center">
                <Backpack size={24} />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Mitzubringen</h2>
            </div>
            <ul className="space-y-4">
              {toBring.map((item) => (
                <li key={item} className="flex items-start gap-3 text-slate-700 dark:text-slate-300 font-medium">
                  <div className="mt-1 shrink-0 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                    <Info className="text-white" size={14} />
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
