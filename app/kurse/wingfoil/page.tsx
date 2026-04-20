import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import BookingkitWidget from '@/components/features/BookingkitWidget';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Wing-Foilen lernen | Westufer Kemnade",
  description: "Erlebe das Fliegen über dem Wasser. Wing-Foil Kurse und Workshops am Kemnader See.",
};

export default function WingFoilPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-slate-950">
      <Navbar variant="page" />
      
      <div className="pt-32 pb-20 container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Wing-Foilen
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Der neue Trendsport. Lerne mit uns sicher und professionell das "Fliegen" auf dem Foil.
          </p>
        </div>

        <BookingkitWidget configId="19dcbc42fbc01b0eb7ff50cb207fb257" />
      </div>

      <Footer />
    </main>
  );
}
