# Master-Projektplan: Westufer Kemnade

Dieses Dokument skizziert den Fahrplan für Deployment, Zahlungsintegration und technische Optimierung.

---

## Phase 0: Grundlagen (Muss vor dem Livegang stehen)

**Ziel:** Sicherstellen, dass die Seite rechtssicher und funktional ist (kein reiner Prototyp).

1.  **📧 Echtes E-Mail-System:**
    *   **Problem:** Formulare zeigen nur "Erfolg" an, senden aber keine E-Mails.
    *   **Lösung:** Integration von **Resend** oder **Nodemailer**, damit Anfragen und Bestätigungen bei `info@westufer...` ankommen.
2.  **📅 Dynamischer Kalender:**
    *   **Problem:** Buchungsdaten sind aktuell fest programmierte Dummy-Daten.
    *   **Lösung:** Auslagerung der Daten in eine Config-Datei oder ein CMS, um Verfügbarkeiten zu verwalten.
3.  **⚖️ Rechtssicherheit (Deutschland):**
    *   **Problem:** Impressum & Datenschutz enthalten Platzhaltertexte.
    *   **Lösung:** Ersetzen durch gültige Rechtstexte (Abmahngefahr vermeiden!).
4.  **🍪 Cookie Consent:**
    *   **Problem:** Analysetools/Maps benötigen in der EU eine Einwilligung.
    *   **Lösung:** Implementierung eines DSGVO-konformen Cookie-Banners.

---

## Phase 1: Deployment (Livegang auf Vercel)

**Ziel:** Die bestehende Domain (`westufer-kemnade.de`) auf die neue Vercel-Website leiten, ohne den E-Mail-Empfang zu stören.

**Wichtig:** Nameserver beim alten Anbieter (Strato, IONOS) belassen! Nur A-Record und CNAME ändern.

**Schritte:**
1.  **In Vercel:** Domain `westufer-kemnade.de` hinzufügen. **A-Record** notieren (z.B. `76.76.21.21`).
2.  **Beim Registrar (Strato/IONOS):**
    *   **A-Record** (@) auf die Vercel-IP ändern.
    *   **CNAME** (www) auf `cname.vercel-dns.com` ändern.
3.  **Ergebnis:** E-Mails bleiben sicher beim alten Hoster; Website-Traffic geht zur schnellen Vercel-App.

---

## Phase 2: Zahlungsintegration (Stripe)

**Ziel:** Ein sicheres Zahlungssystem für PayPal, SEPA-Lastschrift und Kreditkarten (Deutscher Standard).

**Implementierungsplan:**
1.  **Stripe Setup:** PayPal, SEPA, Giropay und Sofort im Dashboard aktivieren.
2.  **SDK Installation:** `npm install stripe @stripe/stripe-js`
3.  **Backend (API Route):**
    *   Erstelle `app/api/checkout/route.ts`.
    *   Nimmt Buchungsdaten entgegen (Artikel, Preis).
    *   Erstellt eine **Stripe Checkout Session** und gibt die URL zurück.
4.  **Frontend (BookingWizard):**
    *   Ruft `/api/checkout` beim Absenden auf.
    *   Leitet den Nutzer zur Stripe-Zahlungsseite weiter.
5.  **Verifizierung (Webhooks):**
    *   Erstelle `app/api/stripe-webhook/route.ts`.
    *   Hört auf `checkout.session.completed`.
    *   **Aktion:** Sendet Buchungsbestätigung erst nach verifizierter Zahlung.

---

## Phase 3: Technische Optimierung (Der Feinschliff)

**Ziel:** 100/100 Google Lighthouse Score und maximale Sichtbarkeit.

### 1. 🚀 Performance: Migration zu `next/image`
**Problem:** Aktuelle Hintergrundbilder laden in voller Auflösung (langsam auf Handys).
**Lösung:** Umbau von `Hero`, `Activities` und Detailseiten auf die `<Image />` Komponente.
*   **Vorteil:** Automatische Konvertierung in WebP/AVIF, Lazy-Loading und Anpassung der Größe für Mobilgeräte.

### 2. 🖼️ Visual SEO: Dynamische Open Graph Bilder
**Problem:** Links in WhatsApp/LinkedIn zeigen keine Vorschau.
**Lösung:** Nutzung von `@vercel/og` zur Generierung dynamischer Vorschaubilder.
*   **Feature:** Automatische Erstellung von Bildern mit Kurstitel und Preis für soziale Medien.

### 3. 🧠 Rich SEO: FAQ Schema (JSON-LD)
**Problem:** Google sieht Text, versteht aber keine "Antworten".
**Lösung:** Hinzufügen einer FAQ-Sektion auf Kursseiten.
*   **Implementierung:** Einbettung in `application/ld+json` Schema.
*   **Vorteil:** Fragen erscheinen direkt in den Google-Suchergebnissen (höhere Klickrate).