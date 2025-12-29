import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SupContent } from '@/components/sections/SupContent';
import { Metadata } from 'next';
import { getCourses } from '@/lib/db/queries';

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
      <Navbar />
      <SupContent courses={supCourses} />
      <Footer />
    </main>
  );
}