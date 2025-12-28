import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export default function ImpressumPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 transition-colors">
      <Navbar variant="page" />
      <div className="container mx-auto px-6 py-32 max-w-3xl">
        <h1 className="text-4xl font-bold mb-8 text-slate-900 dark:text-white">Impressum</h1>
        <div className="prose prose-slate dark:prose-invert">
          
          <h2 className="text-xl font-bold mt-6 mb-2">Angaben gemäß § 5 TMG</h2>
          <p>
            Surfschule WestUfer Kuhne-Isselstein GbR<br />
            Oveneystr. 71<br />
            44797 Bochum
          </p>

          <h2 className="text-xl font-bold mt-6 mb-2">Vertreten durch:</h2>
          <p>
            Max Mustermann<br />
            Erika Musterfrau
          </p>

          <h2 className="text-xl font-bold mt-6 mb-2">Kontakt</h2>
          <p>
            Telefon: +49 123 4567890<br />
            E-Mail: info@westufer-kemnade.de
          </p>

          <h2 className="text-xl font-bold mt-6 mb-2">Umsatzsteuer-ID</h2>
          <p>
            Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
            [DE 123 456 789]
          </p>

          <h2 className="text-xl font-bold mt-6 mb-2">Redaktionell verantwortlich</h2>
          <p>
            Max Mustermann<br />
            Oveneystr. 71<br />
            44797 Bochum
          </p>

          <h2 className="text-xl font-bold mt-6 mb-2">EU-Streitschlichtung</h2>
          <p>
            Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer">https://ec.europa.eu/consumers/odr/</a>.<br />
            Unsere E-Mail-Adresse finden Sie oben im Impressum.
          </p>

          <h2 className="text-xl font-bold mt-6 mb-2">Verbraucherstreitbeilegung / Universalschlichtungsstelle</h2>
          <p>
            Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
          </p>
          
          <div className="mt-12 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg text-sm text-yellow-800 dark:text-yellow-200">
            <strong>Hinweis für den Betreiber:</strong> Bitte prüfen Sie alle Angaben (insbesondere Namen und Steuernummern) und entfernen Sie die Platzhalter in eckigen Klammern vor der Veröffentlichung.
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
