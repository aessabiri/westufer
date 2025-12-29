# Bericht: Buchungssystem-Strategie für Westufer Kemnade

**Datum:** 28. Dezember 2025
**Thema:** Kaufen (Bookingkit) vs. Bauen (Eigene Stripe-Integration)

---

## 1. Zusammenfassung (Executive Summary)

Für **Westufer Kemnade** ist eine maßgeschneiderte Lösung mit **Stripe** die überlegene Wahl.

Während **Bookingkit** eine mächtige "Out-of-the-box"-Suite bietet, stehen die generische Benutzeroberfläche und die hohen laufenden Kosten im Widerspruch zu Ihren Projektzielen: einem einzigartigen, hochwertigen "Surfer-Vibe" und einem schlanken Betrieb. Da Ihr eigenes Frontend (`BookingWizard`) bereits zu 80% fertiggestellt ist, würde das Verwerfen zugunsten eines standardisierten Widgets die einzigartige User Experience (UX), die Sie aufgebaut haben, zerstören.

**Empfehlung:** Setzen Sie die **Eigene Stripe-Integration** um.

---

## 2. Option A: Bookingkit (Die "SaaS"-Route)

Bookingkit ist ein Marktführer für Erlebnisbuchungen in Deutschland. Es bietet ein komplettes Backend für die Verwaltung von Kalendern, Ressourcen und Personal.

### ✅ Vorteile
*   **OTA-Integration:** Listet Kurse automatisch auf TripAdvisor, GetYourGuide, Jochen Schweizer.
*   **Ressourcenmanagement:** Verhindert automatisch Überbuchungen (z.B. bei 20 Boards und 3 Lehrern).
*   **Recht/Admin:** Automatisierte Rechnungsstellung, Stornierungen und Dienstpläne.

### ❌ Nachteile
*   **Hohe Kosten:**
    *   **Monatlich:** ~50€ - 100€ (Starter/Business).
    *   **Pro Ticket:** ~0,60€ Fixgebühr.
    *   **Zahlungsgebühr:** ~3% (zusätzlich zu den oben genannten).
    *   *Beispiel:* Ein 50€ Kurs könnte Sie ~3-4€ an Gesamtgebühren kosten vs. ~0,90€ direkt bei Stripe.
*   **Generische UX:** Sie müssten wahrscheinlich ein `<iframe>`-Widget einbinden. Dies bricht Ihr "Glassmorphismus"-Design, die Dark-Mode-Unterstützung und das nahtlose "Wizard"-Gefühl. Der Kunde verlässt Ihre Markenwelt im kritischsten Moment (Bezahlung).
*   **Overkill:** Für eine Surfschule mit festen Zeitfenstern und begrenzter Ausrüstung ist der komplexe Funktionsumfang von Bookingkit (Schichtpläne, OTA-Sync) möglicherweise unnötiger Ballast.

---

## 3. Option B: Eigene Stripe-Lösung (Die "Westufer"-Route)

Dieser Ansatz nutzt Ihre bestehende Next.js-Anwendung, um direkt mit Stripe zu kommunizieren. Sie behalten die volle Kontrolle über Design und Daten.

### ✅ Vorteile
*   **Perfekte UX:** Der Buchungsprozess bleibt komplett in Ihrer "Glassy"-App. Keine Weiterleitungen, keine hässlichen Widgets.
*   **Geringere Kosten:** Keine monatliche Grundgebühr. Sie zahlen nur die Stripe-Transaktionsgebühr (1,5% + 0,25€ für Standard-EU-Karten).
*   **Flexibilität:** Wir können genau das bauen, was Sie brauchen (z.B. "Neoprenanzug dazu buchen"-Upsell), ohne gegen ein starres System kämpfen zu müssen.

### ❌ Herausforderungen (Und Lösungen)
*   **Verfügbarkeits-Logik:** Stripe weiß nicht, ob Sie noch "freie Plätze" haben.
    *   *Lösung:* Wir implementieren einen einfachen "Slot-Zähler" in einer leichten Datenbank (z.B. Supabase oder Vercel KV).
*   **E-Mail-Automatisierung:** Stripe sendet Belege, aber keine "Kursdetails".
    *   *Lösung:* Wir nutzen **Resend** (großzügiger kostenloser Tarif), ausgelöst durch einen Stripe-Webhook, um gebrandete HTML-E-Mails zu versenden.

---

## 4. Technische Architektur für die eigene Lösung

Wir können die eigene Lösung mit Ihrem aktuellen Tech-Stack ohne große Änderungen umsetzen.

### Der Ablauf
1.  **Frontend (`BookingWizard`):**
    *   Nutzer wählt Kurs + Datum + Ausrüstung.
    *   App prüft Verfügbarkeit über eine interne API (`/api/check-availability`).
2.  **Checkout:**
    *   App sendet Buchungsdetails an `/api/checkout`.
    *   Server erstellt eine **Stripe Checkout Session** (gehostet von Stripe, aber mit Ihrem Logo).
    *   Nutzer bezahlt (PayPal/SEPA/Kreditkarte).
3.  **Erfüllung (Webhook):**
    *   Stripe benachrichtigt Ihren Server (`/api/webhooks/stripe`), dass die Zahlung erfolgreich war.
    *   Server:
        1.  Verringert verfügbare Plätze in der Datenbank.
        2.  Sendet "Buchungsbestätigung" per E-Mail an den Kunden via **Resend**.
        3.  Sendet "Neue Buchung"-Benachrichtigung an Sie.

---

## 5. Sicherheitsbewertung (Security Assessment)

Ein kritischer Vergleich der Sicherheitsimplikationen zwischen einer Eigenentwicklung und einer SaaS-Lösung.

### A. Eigene Stripe-Lösung (Custom)

**Status:** Sie sind teilweise verantwortlich ("Shared Responsibility Model").

*   **💳 Zahlungssicherheit (PCI-DSS):** **Hoch.**
    *   Da wir *Stripe Checkout* verwenden, berühren Kartendaten niemals Ihren Server. Die Eingabe erfolgt auf einer von Stripe gehosteten, hochsicheren Seite. Sie müssen sich *nicht* um PCI-Compliance-Audits kümmern.
*   **🛡️ Datenschutz (DSGVO/GDPR):** **Mittel (Ihre Verantwortung).**
    *   Sie speichern Kundendaten (Name, E-Mail) in Ihrer Datenbank.
    *   *Risiko:* Wenn Ihre Datenbank (z.B. Supabase) schlecht konfiguriert ist, könnten Daten lecken.
    *   *Mitigation:* Nutzung von Row Level Security (RLS) in der Datenbank und minimale Datenspeicherung (Datensparsamkeit).
*   **🔒 Geschäftslogik-Sicherheit:** **Mittel.**
    *   *Risiko:* Ein Angreifer könnte versuchen, die API zu manipulieren (z.B. Preis im Request ändern).
    *   *Mitigation:* Preise **niemals** vom Frontend akzeptieren. Der Server muss den Preis anhand der `price_id` von Stripe abrufen. Validierung aller Eingaben auf dem Server ist Pflicht.

### B. Bookingkit (SaaS)

**Status:** Der Anbieter ist fast vollständig verantwortlich.

*   **💳 Zahlungssicherheit:** **Hoch.**
    *   Bookingkit übernimmt die komplette Abwicklung und Haftung.
*   **🛡️ Datenschutz:** **Hoch.**
    *   Daten liegen auf den Servern von Bookingkit. Sie agieren als Auftragsverarbeiter. Das Risiko eines Datenlecks durch *Ihre* Fehlkonfiguration ist nahezu null.
*   **🔒 Geschäftslogik-Sicherheit:** **Hoch.**
    *   Bookingkit hat jahrelang getestete Logik gegen Betrug, Überbuchung und Manipulation.

### Fazit zur Sicherheit

Die eigene Lösung mit Stripe ist **sehr sicher**, solange man zwei goldene Regeln beachtet:
1.  **Niemals Kreditkartendaten selbst anfassen** (wir nutzen Stripe Checkout).
2.  **Preise immer serverseitig bestimmen** (Frontend sendet nur "Kurs A", Server sagt "Das kostet 50€").

Wenn diese Regeln befolgt werden, ist das Sicherheitsrisiko für ein kleines Unternehmen wie Westufer Kemnade absolut vertretbar und handhabbar.

---

## 6. Fazit & Nächste Schritte

**Bleiben Sie beim Plan.** Sie haben einen Ferrari gebaut (Ihre Next.js Seite); hängen Sie keinen Anhänger (Bookingkit Widget) dran.

**Aktionsplan:**
1.  **Stripe einrichten:** API-Schlüssel besorgen.
2.  **Datenbank aufsetzen:** Einfache Tabelle für "Buchungen" erstellen (Empfehlung: **Supabase**).
3.  **Wizard verbinden:** `BookingWizard.tsx` anpassen, um Daten an die API zu senden.

Dieser Ansatz bewahrt das Premium-Gefühl von **Westufer Kemnade** und maximiert Ihre Gewinnmarge.
