import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { WindsurfContent } from '@/components/sections/WindsurfContent';
import { Metadata } from 'next';
import { getCourses } from '@/lib/db/queries';
import BookingkitWidget from '@/components/features/BookingkitWidget';

export const metadata: Metadata = {
  title: "Windsurfen lernen Bochum | Westufer Kemnade",
  description: "VDWS Windsurf-Grundschein und Schnupperkurse am Kemnader See. Materialverleih und professionelles Coaching im Ruhrgebiet.",
};

// Revalidate every hour
export const revalidate = 3600;

export default async function WindsurfPage() {
  const courses = await getCourses();
  // Filter for windsurf courses only
  const windsurfCourses = courses.filter(c => c.slug.startsWith('ws-'));

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950">
      <Navbar variant="page" />
      <WindsurfContent courses={windsurfCourses} />

      {/* Dedicated Booking Section */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900/50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Windsurfkurs jetzt buchen
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Wähle deinen passenden Termin und starte dein Abenteuer auf dem Wasser.
            </p>
          </div>
          <BookingkitWidget configId="1253e1a9a19995e6966cf2bf6d4dbd36" />
        </div>
      </section>

      <Footer />
    </main>
  );
}