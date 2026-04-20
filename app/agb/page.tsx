import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export default function AGBPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 transition-colors">
      <Navbar variant="page" />
      <div className="container mx-auto px-6 py-32 max-w-3xl">
        <h1 className="text-4xl font-bold mb-8 text-slate-900 dark:text-white">Allgemeine Geschäftsbedingungen</h1>
        
        <div className="prose prose-slate dark:prose-invert space-y-6 text-slate-600 dark:text-slate-400">
          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">1. Geltungsbereich</h2>
            <p>
              Diese AGB gelten für alle Kurse, Vermietungen und sonstigen Leistungen der Surfschule WestUfer am Kemnader See.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">2. Teilnahmevoraussetzungen</h2>
            <p>
              Voraussetzung für alle Wassersportkurse ist die Schwimmfähigkeit. Der Teilnehmer bestätigt mit seiner Anmeldung, dass er mindestens 15 Minuten im freien Wasser ohne Hilfsmittel schwimmen kann.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">3. Buchung und Zahlung</h2>
            <p>
              Buchungen erfolgen über unser Online-Buchungssystem Bookingkit. Die Zahlung erfolgt unmittelbar bei der Buchung über die dort angebotenen Zahlungsmethoden.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">4. Rücktritt und Stornierung</h2>
            <p>
              Stornierungen und Umbuchungen richten sich nach den in Bookingkit bei der jeweiligen Leistung angegebenen Bedingungen. Bei witterungsbedingten Absagen durch die Surfschule (z.B. Gewitter) wird ein Ersatztermin vereinbart.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">5. Haftung</h2>
            <p>
              Die Surfschule haftet nur für Schäden, die auf einer vorsätzlichen oder grob fahrlässigen Pflichtverletzung beruhen. Für den Verlust von Wertsachen wird keine Haftung übernommen.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  );
}
