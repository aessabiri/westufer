import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SupContent } from '@/components/sections/SupContent';
import { Metadata } from 'next';
import { getCourses } from '@/lib/db/queries';
import BookingkitWidget from '@/components/features/BookingkitWidget';

export const metadata: Metadata = {
  title: "SUP Verleih & Kurse Kemnader See | Stand Up Paddling",
  description: "Stand Up Paddling (SUP) in Bochum und Witten. Verleih, Einsteigerkurse, Yoga auf dem Wasser und geführte Touren.",
};

// Revalidate every hour
export const revalidate = 3600;

export default async function SupPage() {
  const courses = await getCourses();
  // Filter for SUP courses
  const supCourses = courses.filter(c => c.slug.startsWith('sup-'));

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950">
      <Navbar variant="page" />
      <SupContent courses={supCourses} />

      {/* Dedicated Booking Section */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900/50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              SUP jetzt buchen
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Miete ein Board oder buche einen unserer beliebten Kurse direkt online.
            </p>
          </div>
          <BookingkitWidget configId="7c5de4913df06914b1822818f8b69afd" />
        </div>
      </section>

      <Footer />
    </main>
  );
}