'use client';

import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { BookingWizard, BookingItem } from '@/components/features/BookingWizard';
import { Wind, Waves, MapPin } from 'lucide-react';

const courses: BookingItem[] = [
  { 
    id: 'ws-basic', 
    category: 'Windsurf',
    name: 'Windsurf Grundschein', 
    price: 195, 
    duration: '12 Std.',
    icon: Wind,
    color: 'text-blue-500',
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    border: 'border-blue-200 dark:border-blue-800'
  },
  { 
    id: 'ws-trial', 
    category: 'Windsurf',
    name: 'Schnupperkurs', 
    price: 80, 
    duration: '4 Std.',
    icon: Wind,
    color: 'text-blue-400',
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    border: 'border-blue-200 dark:border-blue-800'
  },
  { 
    id: 'ws-private', 
    category: 'Windsurf',
    name: 'Privatstunde', 
    price: 'Auf Anfrage', 
    duration: '60 Min.',
    icon: Wind,
    color: 'text-blue-600',
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    border: 'border-blue-200 dark:border-blue-800'
  },
  { 
    id: 'sup-basic', 
    category: 'SUP',
    name: 'SUP Einsteiger', 
    price: 39, 
    duration: '90 Min.',
    icon: Waves,
    color: 'text-cyan-500',
    bg: 'bg-cyan-50 dark:bg-cyan-900/20',
    border: 'border-cyan-200 dark:border-cyan-800'
  },
  { 
    id: 'sup-tour', 
    category: 'SUP',
    name: 'SUP Sunset Tour', 
    price: 29, 
    duration: '2 Std.',
    icon: Waves,
    color: 'text-cyan-400',
    bg: 'bg-cyan-50 dark:bg-cyan-900/20',
    border: 'border-cyan-200 dark:border-cyan-800'
  },
  { 
    id: 'lb-basic', 
    category: 'Longboard',
    name: 'Longboard Basic', 
    price: 25, 
    duration: '90 Min.',
    icon: MapPin,
    color: 'text-emerald-500',
    bg: 'bg-emerald-50 dark:bg-emerald-900/20',
    border: 'border-emerald-200 dark:border-emerald-800'
  },
];

export default function CourseBookingPage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Navbar variant="page" />
      <div className="pt-32 pb-20 container mx-auto px-6">
        <BookingWizard items={courses} type="course" />
      </div>
      <Footer />
    </main>
  );
}
