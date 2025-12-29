'use client';

import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { BookingWizard, BookingItem } from '@/components/features/BookingWizard';

const rentals: BookingItem[] = [
  // Windsurf
  { id: 'ws-rent-board', category: 'Windsurf', name: 'Einsteiger Board', price: 15, duration: '1 Std', iconName: 'wind', color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20', border: 'border-blue-200 dark:border-blue-800' },
  { id: 'ws-rent-pro', category: 'Windsurf', name: 'Funboard / Pro', price: 20, duration: '1 Std', iconName: 'wind', color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/20', border: 'border-blue-200 dark:border-blue-800' },
  { id: 'ws-rent-rigg', category: 'Windsurf', name: 'Rigg komplett', price: 15, duration: '1 Std', iconName: 'wind', color: 'text-blue-400', bg: 'bg-blue-50 dark:bg-blue-900/20', border: 'border-blue-200 dark:border-blue-800' },
  
  // SUP
  { id: 'sup-rent-1h', category: 'SUP', name: 'SUP Board (1 Std)', price: 15, duration: '1 Std', iconName: 'waves', color: 'text-cyan-500', bg: 'bg-cyan-50 dark:bg-cyan-900/20', border: 'border-cyan-200 dark:border-cyan-800' },
  { id: 'sup-rent-2h', category: 'SUP', name: 'SUP Board (2 Std)', price: 25, duration: '2 Std', iconName: 'waves', color: 'text-cyan-600', bg: 'bg-cyan-50 dark:bg-cyan-900/20', border: 'border-cyan-200 dark:border-cyan-800' },
  { id: 'sup-rent-big', category: 'SUP', name: 'Big SUP (Gruppe)', price: 80, duration: '1 Std', iconName: 'waves', color: 'text-cyan-700', bg: 'bg-cyan-50 dark:bg-cyan-900/20', border: 'border-cyan-200 dark:border-cyan-800' },

  // Longboard
  { id: 'lb-rent-1h', category: 'Longboard', name: 'Longboard (1 Std)', price: 8, duration: '1 Std', iconName: 'map-pin', color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-900/20', border: 'border-emerald-200 dark:border-emerald-800' },
  { id: 'lb-rent-day', category: 'Longboard', name: 'Tagesmiete', price: 25, duration: 'Tag', iconName: 'map-pin', color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-900/20', border: 'border-emerald-200 dark:border-emerald-800' },
  
  // Other
  { id: 'wetsuit', category: 'Zubehör', name: 'Neoprenanzug', price: 5, duration: 'pro Miete', iconName: 'shopping-bag', color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-900/20', border: 'border-purple-200 dark:border-purple-800' },
];

export default function RentalBookingPage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Navbar variant="page" />
      <div className="pt-32 pb-20 container mx-auto px-6">
        <BookingWizard items={rentals} type="rental" />
      </div>
      <Footer />
    </main>
  );
}