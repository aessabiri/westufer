import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export default function ImpressumPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 transition-colors">
      <Navbar variant="page" />
      <div className="container mx-auto px-6 py-32 max-w-3xl">
        <h1 className="text-4xl font-bold mb-8 text-slate-900 dark:text-white">Impressum</h1>
        <div className="prose prose-slate dark:prose-invert">
          
          <h2 className="text-xl font-bold mt-6 mb-2 text-slate-900 dark:text-white">Angaben gemäß § 5 TMG</h2>
          <p className="text-slate-600 dark:text-slate-400">
            Surfschule WestUfer<br />
            Bootshallen Gibraltar<br />
            Oveneystraße 71<br />
            44797 Bochum
          </p>

          <h2 className="text-xl font-bold mt-6 mb-2 text-slate-900 dark:text-white">Vertreten durch:</h2>
          <p className="text-slate-600 dark:text-slate-400">
            Sebastian Bücking
          </p>

          <h2 className="text-xl font-bold mt-6 mb-2 text-slate-900 dark:text-white">Kontakt</h2>
          <p className="text-slate-600 dark:text-slate-400">
            E-Mail: info@westufer-kemnade.de
          </p>

          <h2 className="text-xl font-bold mt-6 mb-2 text-slate-900 dark:text-white">EU-Streitschlichtung</h2>
          <p className="text-slate-600 dark:text-slate-400">
            Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-cyan-500 hover:underline">https://ec.europa.eu/consumers/odr/</a>.<br />
            Unsere E-Mail-Adresse finden Sie oben im Impressum.
          </p>

          <h2 className="text-xl font-bold mt-6 mb-2 text-slate-900 dark:text-white">Verbraucherstreitbeilegung / Universalschlichtungsstelle</h2>
          <p className="text-slate-600 dark:text-slate-400">
            Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
          </p>
        </div>
      </div>
      <Footer />
    </main>
  );
}
