import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import BookingkitWidget from '@/components/features/BookingkitWidget';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Materialverleih Kemnader See | Westufer Kemnade",
  description: "Miete SUP Boards, Windsurf-Equipment oder Longboards direkt am See.",
};

export default function AllVerleihPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-slate-950">
      <Navbar variant="page" />
      
      <div className="pt-32 pb-20 container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Equipment mieten
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Wir haben alles, was du für deinen Tag am See brauchst. Einfach online reservieren.
          </p>
        </div>

        <BookingkitWidget configId="4b3ab0e8a85a7805e277e2b19583050a" />
      </div>

      <Footer />
    </main>
  );
}
