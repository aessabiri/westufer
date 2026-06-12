import { Navbar } from '@/components/layout/Navbar';
import { Hero } from '@/components/sections/Hero';
import { CourseHighlights } from '@/components/sections/CourseHighlights';
import { CommunityVibe } from '@/components/sections/CommunityVibe';
import { AdventureCarousel } from '@/components/sections/AdventureCarousel';
import { Groups } from '@/components/sections/Groups';
import { InfoHub } from '@/components/sections/InfoHub';
import { Footer } from '@/components/layout/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-slate-950">
      <Navbar />
      <Hero />
      <CourseHighlights />
      <CommunityVibe />
      <AdventureCarousel />
      <Groups />
      <InfoHub />
      <Footer />
    </main>
  );
}