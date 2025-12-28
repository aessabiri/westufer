import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export default function DatenschutzPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 transition-colors">
      <Navbar variant="page" />
      <div className="container mx-auto px-6 py-32 max-w-3xl">
        <h1 className="text-4xl font-bold mb-8 text-slate-900 dark:text-white">Datenschutzerklärung</h1>
        <div className="prose prose-slate dark:prose-invert">
          
          <h2 className="text-2xl font-bold mt-8 mb-4">1. Datenschutz auf einen Blick</h2>
          <h3 className="text-xl font-bold mt-4 mb-2">Allgemeine Hinweise</h3>
          <p>
            Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
          </p>

          <h3 className="text-xl font-bold mt-4 mb-2">Datenerfassung auf dieser Website</h3>
          <p>
            <strong>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong><br />
            Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum dieser Website entnehmen.
          </p>
          <p>
            <strong>Wie erfassen wir Ihre Daten?</strong><br />
            Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z. B. um Daten handeln, die Sie in ein Kontaktformular eingeben.<br />
            Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z. B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs).
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">2. Hosting</h2>
          <p>
            Wir hosten die Inhalte unserer Website bei folgendem Anbieter:
          </p>
          <h3 className="text-xl font-bold mt-4 mb-2">Vercel</h3>
          <p>
            Anbieter ist die Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA.<br />
            Wenn Sie unsere Website besuchen, erfasst Vercel verschiedene Logfiles inklusive Ihrer IP-Adressen.<br />
            Vercel ist nach dem „EU-US Data Privacy Framework“ (DPF) zertifiziert. Das DPF ist ein Übereinkommen zwischen der Europäischen Union und den USA, das die Einhaltung europäischer Datenschutzstandards bei Datenverarbeitungen in den USA gewährleisten soll.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">3. Allgemeine Hinweise und Pflichtinformationen</h2>
          <h3 className="text-xl font-bold mt-4 mb-2">Datenschutz</h3>
          <p>
            Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.
          </p>

          <h3 className="text-xl font-bold mt-4 mb-2">Hinweis zur verantwortlichen Stelle</h3>
          <p>
            Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:<br />
            Surfschule WestUfer<br />
            Oveneystr. 71<br />
            44797 Bochum<br />
            E-Mail: info@westufer-kemnade.de
          </p>

          <h3 className="text-xl font-bold mt-4 mb-2">Widerruf Ihrer Einwilligung zur Datenverarbeitung</h3>
          <p>
            Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung möglich. Sie können eine bereits erteilte Einwilligung jederzeit widerrufen. Die Rechtmäßigkeit der bis zum Widerruf erfolgten Datenverarbeitung bleibt vom Widerruf unberührt.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">4. Datenerfassung auf dieser Website</h2>
          <h3 className="text-xl font-bold mt-4 mb-2">Kontaktformular / Anfragen</h3>
          <p>
            Wenn Sie uns per Kontaktformular oder E-Mail Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
          </p>
          
          <div className="mt-12 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg text-sm text-yellow-800 dark:text-yellow-200">
             <strong>Hinweis:</strong> Dies ist ein Muster. Wenn Sie Analyse-Tools (Google Analytics) oder Zahlungsanbieter (Stripe) nutzen, müssen hier weitere Abschnitte hinzugefügt werden.
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
