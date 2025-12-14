import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { VerleihContent } from '@/components/sections/VerleihContent';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Materialverleih Wassersport | Preise Westufer Kemnade",
  description: "Preise für Windsurf-Equipment, SUP-Boards und Longboards. Stunden- und Tagesmiete direkt am See.",
};

export default function VerleihPage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Navbar variant="page" />
      <div className="pt-32 pb-20 container mx-auto px-6">
        <VerleihContent />
      </div>
      <Footer />
    </main>
  );
}