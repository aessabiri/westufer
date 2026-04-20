import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { LongboardContent } from '@/components/sections/LongboardContent';
import { Metadata } from 'next';
import { getCourses } from '@/lib/db/queries';
import BookingkitWidget from '@/components/features/BookingkitWidget';

export const metadata: Metadata = {
  title: "Longboard Shop & Verleih Bochum | Westufer Kemnade",
  description: "Longboarden auf dem Rundweg um den Kemnader See. Verleih von Boards und Schutzausrüstung sowie Workshops für Anfänger.",
};

// Revalidate every hour
export const revalidate = 3600;

export default async function LongboardPage() {
  const courses = await getCourses();
  // Filter for Longboard courses/items
  const lbCourses = courses.filter(c => c.slug.startsWith('lb-'));

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950">
      <Navbar variant="page" />
      <LongboardContent courses={lbCourses} />

      {/* Dedicated Booking Section */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900/50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Longboard jetzt buchen
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Reserviere dein Board für die nächste Seerunde oder buche einen Workshop.
            </p>
          </div>
          <BookingkitWidget configId="b6d9d93ab89272e6717a82f6519cd4e1" />
        </div>
      </section>

      <Footer />
    </main>
  );
}