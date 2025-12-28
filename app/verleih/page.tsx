import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { VerleihContent } from '@/components/sections/VerleihContent';
import { Metadata } from 'next';
import { getRentalItems } from '@/lib/db/queries';

export const metadata: Metadata = {
  title: "Materialverleih Wassersport | Preise Westufer Kemnade",
  description: "Preise für Windsurf-Equipment, SUP-Boards und Longboards. Stunden- und Tagesmiete direkt am See.",
};

// Revalidate every hour
export const revalidate = 3600;

export default async function VerleihPage() {
  const rentalItems = await getRentalItems();

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Navbar variant="page" />
      <div className="pt-32 pb-20 container mx-auto px-6">
        <VerleihContent rentalItems={rentalItems} />
      </div>
      <Footer />
    </main>
  );
}