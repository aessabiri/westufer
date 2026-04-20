import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export default function DatenschutzPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 transition-colors">
      <Navbar variant="page" />
      <div className="container mx-auto px-6 py-32 max-w-3xl">
        <h1 className="text-4xl font-bold mb-8 text-slate-900 dark:text-white">Datenschutzerklärung</h1>
        
        <div className="prose prose-slate dark:prose-invert space-y-6 text-slate-600 dark:text-slate-400">
          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">1. Datenschutz auf einen Blick</h2>
            <p>
              Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">2. Datenerfassung auf unserer Website</h2>
            <h3 className="font-bold text-slate-800 dark:text-slate-200">Cookies</h3>
            <p>
              Unsere Internetseiten verwenden teilweise so genannte Cookies. Cookies richten auf Ihrem Rechner keinen Schaden an und enthalten keine Viren. Cookies dienen dazu, unser Angebot nutzerfreundlicher, effektiver und sicherer zu machen.
            </p>
            <h3 className="font-bold text-slate-800 dark:text-slate-200">Server-Log-Dateien</h3>
            <p>
              Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">3. Buchungssystem (Bookingkit)</h2>
            <p>
              Für die Buchung unserer Kurse und den Gutscheinverkauf nutzen wir das Widget von Bookingkit (bookingkit GmbH, Sonnenallee 223, 12059 Berlin). Wenn Sie das Widget nutzen, werden Ihre Daten zur Abwicklung der Buchung an Bookingkit übertragen. Details finden Sie in der Datenschutzerklärung von Bookingkit.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">4. Ihre Rechte</h2>
            <p>
              Sie haben jederzeit das Recht unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  );
}
