# Project Context for Resuming Session

**Project:** Westufer Kemnade Website (Modern Redesign)
**Repository:** https://github.com/aessabiri/westufer
**Last Update:** December 14, 2025

---

## 🟢 Current Status
The website is **fully functional** locally with the following features:
1.  **Tech Stack:** Next.js, Tailwind CSS v4, Framer Motion, Next-Themes.
2.  **Design:** Modern "Glassmorphism" look, fully responsive, working Dark Mode.
3.  **Content:**
    *   Real images (Unsplash) matching the "Lake/Ruhrgebiet" vibe.
    *   Specific pages for Windsurfing, SUP, Longboarding, and Groups.
4.  **Booking System:**
    *   Split into **Courses** (`/booking/kurse`) and **Rentals** (`/booking/verleih`).
    *   Rentals support **multi-selection** (shopping cart style).
    *   Courses support smart pre-selection from detail pages.
    *   Group inquiry form (`/gruppen/anfrage`) with 3-step wizard.
5.  **Documentation:**
    *   `plan.md`: Deployment & Stripe integration plan.
    *   `project_report_de.md`: Full project report in German.

---

## ⏭️ Next Steps (To-Do)
When resuming, the focus should be on **Phase 2: Production Readiness**.

1.  **Payment Integration:**
    *   Install Stripe (`npm install stripe @stripe/stripe-js`).
    *   Implement API Route `/api/checkout` as defined in `plan.md`.
    *   Connect `BookingWizard` to the API.
2.  **Deployment:**
    *   Connect domain `westufer-kemnade.de` via Vercel (A-Records).
3.  **Legal:**
    *   Fill in the placeholders in `/impressum`, `/datenschutz`, `/agb` with real legal text.

---

## 📝 Instruction for AI
*When resuming this project, read this file to understand the architecture and design decisions (especially the 'BookingWizard' component structure and Tailwind v4 dark mode configuration).*
