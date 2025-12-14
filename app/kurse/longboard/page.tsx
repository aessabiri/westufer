import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { LongboardContent } from '@/components/sections/LongboardContent';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Longboard Shop & Verleih Bochum | Westufer Kemnade",
  description: "Longboarden auf dem Rundweg um den Kemnader See. Verleih von Boards und Schutzausrüstung sowie Workshops für Anfänger.",
};

export default function LongboardPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-slate-950">
      <Navbar />
      <LongboardContent />
      <Footer />
    </main>
  );
}