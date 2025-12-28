# Report: SEO & AI-Readiness Assessment

**Date:** December 28, 2025
**Project:** Westufer Kemnade

---

## 1. Supabase Setup Advice
You are about to create your database account. Here is your cheat sheet:
*   **Region:** Choose **Frankfurt (eu-central-1)**. This is crucial for GDPR (Datenschutz) compliance and ensures the lowest latency for your German customers.
*   **Password:** Generate a strong password and **save it in your password manager immediately**. You cannot view it again later.
*   **Organization Name:** "Westufer Kemnade".
*   **Pricing:** The "Free Tier" is perfectly fine. It supports up to 500MB of data (enough for ~1 million bookings).

---

## 2. SEO Audit (Current Status: Very Good)
Your site is technically well-optimized for Google.

### ✅ What is working well:
*   **Server-Side Rendering (SSR):** Next.js delivers full HTML to Googlebots.
*   **Metadata:**
    *   `app/layout.tsx` defines a strong default title (`%s | Westufer Kemnade`) and relevant keywords.
    *   Specific pages (e.g., `/kurse/windsurf`) have unique titles ("Windsurfen lernen Bochum").
*   **Structured Data (JSON-LD):** You have a correct `SportsActivityLocation` schema in the root layout with opening hours and geo-coordinates. This helps you appear in Google Maps results.
*   **Performance:** We just upgraded images to `next/image`, which fixes the biggest speed bottleneck.

### ⚠️ Minor Improvements Possible:
*   **Canonical URLs:** Explicitly adding canonical tags prevents "duplicate content" issues if the site is accessed via multiple URLs (e.g., `www.westufer...` vs `westufer...`).
*   **Image Alt Text:** Ensure all images in the content have descriptive German Alt-Text (e.g., "Anfänger beim Windsurfen auf dem Kemnader See" instead of just "Windsurf").

---

## 3. AI-Friendliness (LLM Optimization)
"AI Optimization" means making your site easy for ChatGPT, Perplexity, and Gemini to read, so when someone asks "Where can I windsurf in Bochum?", your school is the answer.

### ✅ Action Taken: Created `public/llms.txt`
I have added a special file at `/llms.txt`.
*   **What is it?** A text file strictly formatted for AI robots.
*   **Why?** Web pages have a lot of HTML "noise" (`<div>`, `className`). This file gives pure facts: Prices, Opening Hours, Address.
*   **Result:** AI bots prefer reading this file, increasing the chance your correct pricing is cited in chat answers.

### 🚀 Further Steps for AI Dominance:
1.  **Semantic HTML:** Continue using `<article>`, `<section>`, and `<h3>` correctly. (The current codebase does this well).
2.  **Q&A Section (FAQ):** Adding an FAQ section to course pages with questions like "How much is a windsurfing course?" helps AIs extract direct "Question-Answer" pairs.

---

## 4. Next Steps
1.  **Create Supabase Project** (in Frankfurt).
2.  **Paste SQL:** Go to the "SQL Editor" in Supabase and paste the content of `lib/db/schema.sql`.
3.  **Get Keys:** Copy the `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` to your local `.env` file.
