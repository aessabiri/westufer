import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export default function DatenschutzPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar variant="page" />
      <div className="container mx-auto px-6 py-32 max-w-3xl">
        <h1 className="text-4xl font-bold mb-8">Datenschutzerklärung</h1>
        <div className="prose prose-slate">
          <h2 className="text-2xl font-bold mt-8 mb-4">1. Datenschutz auf einen Blick</h2>
          <p>
            Allgemeine Hinweise: Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">2. Hosting</h2>
          <p>
            Wir hosten die Inhalte unserer Website bei folgendem Anbieter: [Anbieter einfügen].
          </p>
          
          <p className="mt-8 text-sm text-slate-500">
            Dies ist ein Platzhalter. Eine vollständige Datenschutzerklärung ist gesetzlich vorgeschrieben.
          </p>
        </div>
      </div>
      <Footer />
    </main>
  );
}
