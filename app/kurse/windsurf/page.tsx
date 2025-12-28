import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { WindsurfContent } from '@/components/sections/WindsurfContent';
import { Metadata } from 'next';
import { getCourses } from '@/lib/db/queries';

export const metadata: Metadata = {
  title: "Windsurfen lernen Bochum | Westufer Kemnade",
  description: "VDWS Windsurf-Grundschein und Schnupperkurse am Kemnader See. Materialverleih und professionelles Coaching im Ruhrgebiet.",
};

// Revalidate every hour
export const revalidate = 3600;

export default async function WindsurfPage() {
  const courses = await getCourses();
  // Filter for windsurf courses only
  const windsurfCourses = courses.filter(c => c.slug.includes('windsurf'));

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950">
      <Navbar />
      <WindsurfContent courses={windsurfCourses} />
      <Footer />
    </main>
  );
}