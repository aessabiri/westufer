import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import BookingkitWidget from '@/components/features/BookingkitWidget';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Windsurf Materialverleih | Westufer Kemnade",
  description: "Miete Windsurf-Boards und Riggs für Einsteiger und Fortgeschrittene am Kemnader See.",
};

export default function WindsurfRentalPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-slate-950">
      <Navbar variant="page" />
      
      <div className="pt-32 pb-20 container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Windsurf Verleih
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Alles für deine Session. Riggs und Boards für jedes Windlevel.
          </p>
        </div>

        <BookingkitWidget configId="1253e1a9a19995e6966cf2bf6d4dbd36" />
      </div>

      <Footer />
    </main>
  );
}
