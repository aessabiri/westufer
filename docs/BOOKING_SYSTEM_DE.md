# Architektur des Westufer Buchungssystems

Dieses Dokument erklärt die interne Logik und das Design des maßgeschneiderten Buchungssystems für das Westufer Kemnade.

## 1. Kernlogik: Kurse vs. Verleih
Das System ist darauf ausgelegt, zwei grundlegend unterschiedliche Geschäftsmodelle in einer einheitlichen Datenbank zu verarbeiten:

### A. Kurse (Zeitfenster-basiert)
- **Modell:** Feste Zeitpläne (z.B. Windsurf Grundkurs, Samstag 14:00 Uhr).
- **Kapazität:** Die Verfügbarkeit ist an einen spezifischen "Slot" gebunden.
- **Validierung:** Bei einer Buchung prüft das System den `booked_count` dieses speziellen Slots. Wird die `max_capacity` erreicht, wird der Slot automatisch geschlossen.

### B. Verleih (Inventar-basiert)
- **Modell:** Flexible tägliche Nutzung (z.B. SUP-Board für 1 Stunde).
- **Kapazität:** Die Nachverfolgung basiert auf der Gesamtzahl der physischen Einheiten (z.B. wir besitzen 20 SUPs).
- **Validierung:** Das System zählt dynamisch, wie viele Gegenstände dieses Typs bereits für das gewählte Datum gebucht sind. Wenn `Gebucht < Gesamtbesitz`, ist die Reservierung zulässig.

## 2. Das Admin-Cockpit
Um manuelle Datenbankänderungen zu vermeiden, haben wir eine maßgeschneiderte Benutzeroberfläche entwickelt:
- **Bulk-Slot-Generator:** Ermöglicht dem Inhaber, eine komplette Saison in Sekunden zu planen, indem Zeiträume und wiederkehrende Wochentage ausgewählt werden.
- **Inventar-Manager:** Echtzeit-Kontrolle über Gerätemengen und Preise.
- **Check-in-Terminal:** Eine Live-Such- und Filteroberfläche für das Personal, um Ankünfte zu verwalten und Gäste als anwesend zu markieren.

## 3. Sicherheit & Zuverlässigkeit
- **Atomare Transaktionen:** Nutzt serverseitige Logik, um Überbuchungen in Momenten mit hohem Traffic zu verhindern.
- **Zero-Trust-Daten:** Row Level Security (RLS) stellt sicher, dass anonyme Nutzer niemals private Kundendaten einsehen können.
- **Resilienz:** Statische Seiten werden zwischengespeichert (ISR), sodass die Website online bleibt, selbst wenn die Datenbank gewartet wird.

---

## 4. Vergleich: Eigenes System vs. BookingKit

| Feature | Eigenes System (Westufer) | BookingKit (SaaS) |
| :--- | :--- | :--- |
| **Kosten** | **Keine Transaktionsgebühren.** Keine monatlichen Abos. | Hohe Gebühren pro Buchung + monatliche Fixkosten. |
| **Design** | **100% Markenidentität.** Integrierter "Glassmorphism"-Look. | Standardisiertes "Widget"-Design. Wirkt oft wie ein Fremdkörper. |
| **Datenhoheit** | Die Datenbank gehört Ihnen. Volle Kontrolle über Kundenlisten. | Daten liegen bei einem Drittanbieter. Eingeschränkter Zugriff. |
| **Flexibilität** | Genau auf Ihre Bedürfnisse zugeschnitten (z.B. Verleih-Logik). | Man muss sich den vorgegebenen Abläufen anpassen. |
| **Wartung** | Code erfordert bei großen Änderungen einen Entwickler. | Updates und Bugfixes werden automatisch vom Anbieter erledigt. |


