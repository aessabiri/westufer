import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { TeamSection } from '@/components/sections/TeamSection';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Unser Team | Westufer Kemnade",
  description: "Lerne die Crew hinter Westufer Kemnade kennen. Erfahrene VDWS-Instruktoren und Wassersport-Liebhaber.",
};

export default function TeamPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-slate-950">
      <Navbar variant="page" />
      <div className="pt-20">
        <TeamSection />
      </div>
      <Footer />
    </main>
  );
}
