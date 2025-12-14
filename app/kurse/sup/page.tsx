import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SupContent } from '@/components/sections/SupContent';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "SUP Verleih & Kurse Kemnader See | Stand Up Paddling",
  description: "Stand Up Paddling (SUP) in Bochum und Witten. Verleih, Einsteigerkurse, Yoga auf dem Wasser und geführte Touren.",
};

export default function SupPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-slate-950">
      <Navbar />
      <SupContent />
      <Footer />
    </main>
  );
}