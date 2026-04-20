import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import BookingkitWidget from '@/components/features/BookingkitWidget';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "SUP Verleih Kemnader See | Material mieten",
  description: "Miete Stand Up Paddling Boards und Paddel direkt am Kemnader See. Stunden- oder Tagesmiete möglich.",
};

export default function SupRentalPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-slate-950">
      <Navbar variant="page" />
      
      <div className="pt-32 pb-20 container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            SUP Verleih
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Hochwertige Boards von Fanatic & Starboard. Einfach reservieren und ab aufs Wasser.
          </p>
        </div>

        <BookingkitWidget configId="7c5de4913df06914b1822818f8b69afd" />
      </div>

      <Footer />
    </main>
  );
}
