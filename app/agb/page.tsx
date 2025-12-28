import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export default function AgbPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 transition-colors">
      <Navbar variant="page" />
      <div className="container mx-auto px-6 py-32 max-w-3xl">
        <h1 className="text-4xl font-bold mb-8 text-slate-900 dark:text-white">Allgemeine Geschäftsbedingungen (AGB)</h1>
        <div className="prose prose-slate dark:prose-invert">
          
          <h2 className="text-2xl font-bold mt-8 mb-4">1. Geltungsbereich</h2>
          <p>
            Diese Allgemeinen Geschäftsbedingungen gelten für die Durchführung von Kursen, Veranstaltungen und die Vermietung von Wassersportgeräten der Surfschule WestUfer (nachfolgend „Veranstalter“ genannt) und den Kunden (nachfolgend „Teilnehmer“ genannt).
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">2. Vertragsabschluss</h2>
          <p>
            Mit der Anmeldung (schriftlich, online oder mündlich) bietet der Teilnehmer dem Veranstalter den Abschluss eines Vertrages verbindlich an. Der Vertrag kommt mit der Annahme durch den Veranstalter zustande (Buchungsbestätigung).
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">3. Zahlungsbedingungen</h2>
          <p>
            Die Kursgebühr ist spätestens [14 Tage] vor Kursbeginn fällig. Bei kurzfristigen Buchungen ist die Gebühr sofort zur Zahlung fällig.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">4. Rücktritt durch den Teilnehmer</h2>
          <p>
            Der Teilnehmer kann jederzeit vor Kursbeginn zurücktreten. Maßgeblich ist der Zugang der Rücktrittserklärung beim Veranstalter.
            Bei Rücktritt fallen folgende Stornogebühren an:
          </p>
          <ul>
            <li>bis [30] Tage vor Kursbeginn: kostenfrei</li>
            <li>bis [14] Tage vor Kursbeginn: [50]% des Kurspreises</li>
            <li>ab [7] Tage vor Kursbeginn: [80]% des Kurspreises</li>
            <li>bei Nichterscheinen: 100% des Kurspreises</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">5. Rücktritt durch den Veranstalter</h2>
          <p>
            Der Veranstalter kann vom Vertrag zurücktreten, wenn die Mindestteilnehmerzahl nicht erreicht wird oder wenn die Wetterbedingungen (z.B. Gewitter, Sturm) eine sichere Durchführung nicht zulassen. In diesem Fall erhält der Teilnehmer die volle Gebühr zurückerstattet oder einen Ersatztermin.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">6. Haftung</h2>
          <p>
            Die Teilnahme erfolgt auf eigene Gefahr. Der Veranstalter haftet nur für Schäden, die auf Vorsatz oder grober Fahrlässigkeit beruhen. Für Schäden an der Gesundheit, dem Körper oder dem Leben gilt die gesetzliche Haftung.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">7. Schwimmfähigkeit & Gesundheit</h2>
          <p>
            Voraussetzung für die Teilnahme an allen Wassersportkursen ist die Fähigkeit, mindestens 15 Minuten im freien Wasser schwimmen zu können. Der Teilnehmer erklärt mit der Anmeldung, dass er gesundheitlich fit ist.
          </p>

          <div className="mt-12 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg text-sm text-yellow-800 dark:text-yellow-200">
            <strong>Hinweis für den Betreiber:</strong> Bitte passen Sie die Fristen und Stornogebühren (in eckigen Klammern) an Ihre tatsächliche Geschäftspraxis an.
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
