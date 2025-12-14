import { Navbar } from '@/components/layout/Navbar';
import { Hero } from '@/components/sections/Hero';
import { Activities } from '@/components/sections/Activities';
import { Groups } from '@/components/sections/Groups';
import { InfoHub } from '@/components/sections/InfoHub';
import { Footer } from '@/components/layout/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-slate-950">
      <Navbar />
      <Hero />
      <Activities />
      <Groups />
      <InfoHub />
      <Footer />
    </main>
  );
}