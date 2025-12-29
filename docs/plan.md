# Master Project Plan: Westufer Kemnade

This document outlines the roadmap for Deployment, Payment Integration, and Technical Optimization.

---

## Phase 0: Essentials (Must-Have Before Launch)

**Goal:** Ensure the site is legally compliant and functionally operational (not just a prototype).

1.  **📧 Real Email System:**
    *   **Problem:** Forms currently only show a "Success" message but don't send emails.
    *   **Solution:** Integrate **Resend** or **Nodemailer** to deliver inquiries and confirmations to `info@westufer...`.
2.  **📅 Dynamic Calendar:**
    *   **Problem:** Booking dates are currently hardcoded mock data.
    *   **Solution:** Move dates to a config file or CMS so availability can be managed.
3.  **⚖️ Legal Compliance (Germany):**
    *   **Problem:** Impressum & Datenschutz contain placeholder text.
    *   **Solution:** Replace placeholders with valid legal texts to avoid *Abmahnung*.
4.  **🍪 Cookie Consent:**
    *   **Problem:** Analytics/Maps require consent in the EU.
    *   **Solution:** Implement a compliant Cookie Banner.

---

## Phase 1: Deployment (Live on Vercel)

**Goal:** Point the existing domain (`westufer-kemnade.de`) to the Vercel-hosted website without disrupting existing email services.

**Key Principle:** Avoid changing nameservers if email is hosted with your domain registrar (Strato, IONOS, etc.). Only modify A Records and CNAMEs.

**Steps:**
1.  **In Vercel:** Add `westufer-kemnade.de` to Project Settings -> Domains. Note the **A Record** (e.g., `76.76.21.21`).
2.  **In Registrar (Strato/IONOS):**
    *   Set **A Record** (@) to Vercel's IP.
    *   Set **CNAME** (www) to `cname.vercel-dns.com`.
3.  **Result:** Emails stay with the old host; Website traffic goes to the new Vercel app.

---

## Phase 2: Payment Integration (Stripe)

**Goal:** Integrate a secure payment system supporting PayPal, SEPA, and Credit Cards (German Standard).

**Implementation Plan:**
1.  **Stripe Setup:** Enable PayPal, SEPA, Giropay, and Sofort in the Stripe Dashboard.
2.  **Install SDK:** `npm install stripe @stripe/stripe-js`
3.  **Backend (API Route):**
    *   Create `app/api/checkout/route.ts`.
    *   Accept booking data (Items, Price).
    *   Create a **Stripe Checkout Session** and return the URL.
4.  **Frontend (BookingWizard):**
    *   Call `/api/checkout` on submit.
    *   Redirect user to the Stripe URL.
5.  **Verification (Webhooks):**
    *   Create `app/api/stripe-webhook/route.ts`.
    *   Listen for `checkout.session.completed`.
    *   **Action:** Send confirmation email to customer only after verified payment.

---

## Phase 3: Technical Optimization (The "Polish")

**Goal:** Achieve 100/100 Google Lighthouse score and improve SEO visibility.

### 1. 🚀 Performance: `next/image` Migration
**Problem:** Current CSS background images load at full resolution on all devices (slow LCP).
**Solution:** Refactor `Hero`, `Activities`, and Detail pages to use the `<Image />` component.
*   **Benefit:** Automatic WebP/AVIF conversion, lazy-loading, and mobile resizing.

### 2. 🖼️ Visual SEO: Dynamic Open Graph (Social Cards)
**Problem:** Sharing the link on WhatsApp/LinkedIn shows no preview.
**Solution:** Use `@vercel/og` to generate dynamic preview cards.
*   **Feature:** Create a generic card for the homepage and specific cards for courses (e.g., displaying the specific course title and price on the image).

### 3. 🧠 Rich SEO: FAQ Schema (JSON-LD)
**Problem:** Google sees text but not "answers".
**Solution:** Add a structured FAQ section to Course pages.
*   **Implementation:** Wrap questions (e.g., "Do I need a wetsuit?") in `application/ld+json` Schema.
*   **Benefit:** Questions appear directly in Google Search results, increasing click-through rate.
