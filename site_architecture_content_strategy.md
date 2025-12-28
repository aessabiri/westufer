# Site Architecture & Content Strategy: Westufer Kemnade

**Version:** 1.0 (Final)
**Date:** December 28, 2025

---

## 1. Core Objectives
The digital presence of Westufer Kemnade is designed to serve two primary goals:
1.  **Emotional Connection:** Convey the "holiday feeling" of the Kemnader See to attract visitors from the Ruhrgebiet.
2.  **Conversion Efficiency:** Streamline the path from "interest" to "booked course/rental" with minimal friction.

## 2. Information Architecture (IA)
The site structure is flat and action-oriented, minimizing the number of clicks required to reach a booking goal.

### 2.1. Sitemap Structure
*   **Home (`/`)**: High-impact visual entry point. Aggregates all offerings.
    *   *Key Sections:* Hero Video/Image, Activity Grid, Testimonials, Map.
*   **Activity Hubs (`/kurse/[type]`)**: Dedicated landing pages for each sport.
    *   `/kurse/windsurf`: Pricing, FAQ, "Zero-to-Hero" path.
    *   `/kurse/sup`: Focus on relaxation, fitness, and groups.
    *   `/kurse/longboard`: Focus on the lifestyle and the circular track.
*   **Rental Hub (`/verleih`)**: A digital catalog of available equipment with clear hourly/daily pricing.
*   **Booking Engine (`/booking`)**: A standalone application flow.
    *   `/booking/kurse`: Wizard for class selection.
    *   `/booking/verleih`: E-commerce style cart for equipment.
*   **Legal & Trust (`/impressum`, `/datenschutz`, `/agb`)**: Mandatory compliance pages located in the footer.

### 2.2. Navigation Strategy
*   **Primary Navbar:** Sticky, transparent-to-solid transition. Focuses on the "Big Three" (Windsurf, SUP, Longboard) + "Book Now" CTA.
*   **Mobile Menu:** Full-screen overlay for easy thumb interaction.

---

## 3. Content Strategy

### 3.1. Tone of Voice
*   **Vibe:** Relaxed, authentic, encouraging, "Ruhrpot-Cordiality".
*   **Keywords:** "Urlaub vor der Haustür", "Abschalten", "Action", "Einfach machen".
*   **Addressing the User:** Direct "Du" (You). "Buche deinen Kurs", not "Kurs buchen".

### 3.2. Key Content Areas & Requirements
1.  **Hero Sections:** High-quality imagery (no generic ocean stock photos; local lake imagery). Text must be punchy and value-driven.
2.  **Pricing Cards:** Transparent. No hidden fees. Clearly labeled "Best Value" options to guide decision-making (Decoy Effect).
3.  **Trust Signals:** VDWS certification logos, Google Review snippets, "Licensed Instructors" badges.
4.  **SEO Content:**
    *   **Local SEO:** "Windsurfen Bochum", "SUP Verleih Witten".
    *   **FAQ Schemas:** Structured data questions on every course page to capture Google's "People Also Ask" boxes.

---

## 4. Technical Strategy for Content
*   **Dynamic Data:** Prices and availability are **not** hardcoded in the HTML. They are fetched from **Supabase** at build time (ISR) or request time. This ensures the marketing team can update prices without a developer.
*   **AI Optimization:** A `/llms.txt` file exists to feed structured data to AI search engines (SearchGPT, Gemini), ensuring they quote correct prices.
*   **Visual Performance:** All heavy assets use `next/image` with WebP conversion to ensure LCP (Largest Contentful Paint) stays under 2.5s.

---

## 5. Booking Flow Strategy
*   **The "Wizard" Approach:** Instead of a long intimidating form, break the process into bite-sized steps:
    1.  *What* do you want to do?
    2.  *When* do you want to do it?
    3.  *Who* are you?
*   **Real-Time Feedback:** The price summary updates instantly as users add extras (wetsuits, insurance).
*   **No Account Required:** Guest checkout is the default to reduce drop-off.
