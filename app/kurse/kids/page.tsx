import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import BookingkitWidget from '@/components/features/BookingkitWidget';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Wassersport für Kids | Westufer Kemnade",
  description: "Feriencamps, Kindergeburtstage und Kurse für Kinder am Kemnader See.",
};

export default function KidsPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-slate-950">
      <Navbar variant="page" />
      
      <div className="pt-32 pb-20 container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Kids & Co
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Spaß und Abenteuer auf dem Wasser für unsere jüngsten Gäste.
          </p>
        </div>

        <BookingkitWidget configId="8e77f4d5432a8f414be964dba3c28901" />
      </div>

      <Footer />
    </main>
  );
}
