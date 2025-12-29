import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { LongboardContent } from '@/components/sections/LongboardContent';
import { Metadata } from 'next';
import { getCourses } from '@/lib/db/queries';

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
      <Navbar />
      <LongboardContent courses={lbCourses} />
      <Footer />
    </main>
  );
}