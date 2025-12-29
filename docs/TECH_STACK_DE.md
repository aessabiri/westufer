# Technologie-Stack & Begründung

Dieses Projekt nutzt eine moderne, serverlose Architektur, die auf hohe Performance, maximale Sicherheit und schnelle Skalierbarkeit ausgelegt ist. Im Folgenden finden Sie die Kerntechnologien von Westufer Kemnade.

## 🚀 Next.js (Das Framework)
**Was es ist:** Ein auf React basierendes Web-Framework von Vercel.
**Warum wir es gewählt haben:**
- **Hybrides Rendering:** Es ermöglicht die Kombination von statischen Seiten (für Geschwindigkeit) mit serverseitiger Logik (für sichere Buchungen).
- **Turbopack:** Garantiert eine extrem schnelle Entwicklungs- und Build-Erfahrung.
- **Server Actions:** Erlaubt uns die Verarbeitung von Formularen (wie Buchungen) ohne den Aufbau einer separaten Backend-API.

## ⚡ Vercel (Die Infrastruktur)
**Was es ist:** Eine Cloud-Plattform für statische Seiten und Serverless Functions.
**Warum wir es gewählt haben:**
- **Edge Global Network:** Ihre Seite wird von Servern ausgeliefert, die dem Nutzer am nächsten sind, was sie sofort verfügbar macht.
- **Zero-Config Deployment:** Baut und veröffentlicht Ihre Seite automatisch, sobald wir Änderungen zu GitHub pushen.
- **Skalierbarkeit:** Bewältigt Traffic-Spitzen automatisch ohne manuelle Serververwaltung.

## 🛡️ Supabase (Datenbank & Auth)
**Was es ist:** Eine Open-Source-Alternative zu Firebase, basierend auf PostgreSQL.
**Warum wir es gewählt haben:**
- **Relationale Integrität:** PostgreSQL ist ideal für komplexe Buchungssysteme, bei denen Datenbeziehungen (Nutzer -> Slot -> Kurs) entscheidend sind.
- **Row Level Security (RLS):** Erlaubt es uns, Sicherheitsregeln direkt in die Datenbank zu schreiben, um sicherzustellen, dass Kundendaten niemals nach außen dringen.
- **Auth Service:** Bietet ein sicheres, sofort einsatzbereites Login-System für das Admin-Dashboard.

## 💳 Stripe (Das Zahlungs-Gateway)
**Was es ist:** Eine globale Plattform für die Zahlungsabwicklung.
**Warum wir es gewählt haben:**
- **Sicherheit:** Stripe wickelt alle sensiblen Kreditkartendaten ab, sodass Westufer niemals riskante Finanzinformationen speichern muss.
- **Globale Standards:** Unterstützt Apple Pay, Google Pay und alle gängigen europäischen Zahlungsmethoden.
- **Webhooks:** Ermöglicht unserer Website die automatische Bestätigung einer Buchung, sobald die Zahlung erfolgreich war.

---
**Fazit:** Dieser Stack stellt sicher, dass Westufer Kemnade ein professionelles Fundament auf Enterprise-Niveau hat, das praktisch wartungsfrei ist.
