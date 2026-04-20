import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import BookingkitWidget from '@/components/features/BookingkitWidget';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Longboard Verleih Kemnader See | Boards mieten",
  description: "Miete Longboards und Schutzausrüstung für den Rundweg am Kemnader See.",
};

export default function LongboardRentalPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-slate-950">
      <Navbar variant="page" />
      
      <div className="pt-32 pb-20 container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Longboard Verleih
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Cruisen am Uferweg. Boards für Anfänger und Fortgeschrittene inkl. Schutzausrüstung.
          </p>
        </div>

        <BookingkitWidget configId="b6d9d93ab89272e6717a82f6519cd4e1" />
      </div>

      <Footer />
    </main>
  );
}
