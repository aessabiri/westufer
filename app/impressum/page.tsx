import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export default function ImpressumPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar variant="page" />
      <div className="container mx-auto px-6 py-32 max-w-3xl">
        <h1 className="text-4xl font-bold mb-8">Impressum</h1>
        <div className="prose prose-slate">
          <p>Angaben gemäß § 5 TMG</p>
          
          <h3 className="text-xl font-bold mt-6 mb-2">Betreiber</h3>
          <p>
            Surfschule WestUfer Kuhne-Isselstein GbR<br />
            Oveneystr. 71<br />
            44797 Bochum
          </p>

          <h3 className="text-xl font-bold mt-6 mb-2">Kontakt</h3>
          <p>
            Telefon: +49 123 4567890<br />
            E-Mail: info@westufer-kemnade.de
          </p>

          <h3 className="text-xl font-bold mt-6 mb-2">Vertretungsberechtigte Gesellschafter</h3>
          <p>Max Mustermann, Erika Musterfrau</p>
          
          <p className="mt-8 text-sm text-slate-500">
            Dies ist ein Platzhalter-Impressum. Bitte ersetzen Sie diese Angaben durch Ihre echten Daten.
          </p>
        </div>
      </div>
      <Footer />
    </main>
  );
}
