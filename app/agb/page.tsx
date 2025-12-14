import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export default function AgbPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar variant="page" />
      <div className="container mx-auto px-6 py-32 max-w-3xl">
        <h1 className="text-4xl font-bold mb-8">Allgemeine Geschäftsbedingungen (AGB)</h1>
        <div className="prose prose-slate">
          <h2 className="text-2xl font-bold mt-8 mb-4">1. Geltungsbereich</h2>
          <p>
            Diese Allgemeinen Geschäftsbedingungen gelten für alle Kurse, Vermietungen und Veranstaltungen der Surfschule WestUfer.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">2. Anmeldung und Vertragsschluss</h2>
          <p>
            Die Anmeldung zu Kursen kann schriftlich, mündlich oder online erfolgen.
          </p>
          
          <p className="mt-8 text-sm text-slate-500">
            Dies ist ein Platzhalter. Bitte fügen Sie Ihre rechtssicheren AGBs hier ein.
          </p>
        </div>
      </div>
      <Footer />
    </main>
  );
}
