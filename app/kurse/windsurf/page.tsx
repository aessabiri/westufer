import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { WindsurfContent } from '@/components/sections/WindsurfContent';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Windsurfen lernen Bochum | Westufer Kemnade",
  description: "VDWS Windsurf-Grundschein und Schnupperkurse am Kemnader See. Materialverleih und professionelles Coaching im Ruhrgebiet.",
};

export default function WindsurfPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-slate-950">
      <Navbar />
      <WindsurfContent />
      <Footer />
    </main>
  );
}