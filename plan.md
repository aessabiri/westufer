# Deployment and Payment Integration Plan

This document outlines the steps to deploy the Westufer Kemnade website online using Vercel and implement a robust payment system using Stripe, tailored for the German market.

---

## Part 1: Connecting Your Existing Domain (`westufer-kemnade.de`)

**Goal:** Point the existing domain to the Vercel-hosted website without disrupting existing email services.

**Key Principle:** Avoid changing nameservers if email is hosted with your domain registrar. Only modify A Records and CNAMEs.

**Steps:**

1.  **In Vercel (after deployment of the project):**
    *   Navigate to your Project Dashboard.
    *   Go to **Settings** -> **Domains**.
    *   Enter `westufer-kemnade.de` and click **Add**.
    *   Vercel will provide specific **A Record** (IP Address) and **CNAME** values. Make a note of these.

2.  **In Your Domain Registrar (e.g., Strato, IONOS, United Domains):**
    *   Log in to your domain registrar's control panel.
    *   Locate the **DNS Settings** or **DNS-Verwaltung** section.
    *   **Modify the A Record for the Root Domain (`@` or your bare domain):**
        *   Change the existing A Record value to the IP Address provided by Vercel (typically `76.76.21.21`).
    *   **Modify the CNAME Record for the `www` Subdomain:**
        *   Change the existing CNAME value for `www` to `cname.vercel-dns.com`.
    *   **Save** the changes.

3.  **Propagation Time:**
    *   DNS changes can take anywhere from a few minutes to up to 24 hours to propagate across the internet. Vercel will automatically detect the change and issue a free SSL certificate (HTTPS) once the domain is correctly pointed.

---

## Part 2: Implementing the Payment System (Stripe)

**Goal:** Integrate a secure, German-standard payment system for booking courses and rentals.

**Recommended Solution:** Stripe.

**Why Stripe for Germany?**
*   **Comprehensive Payment Methods:** Supports major credit cards (Visa, Mastercard), PayPal, SEPA Lastschrift, Giropay, and Sofort (Klarna) – all crucial for the German market.
*   **Compliance:** Aids in handling German tax requirements (MwSt) and invoicing.
*   **Security:** Offloads PCI compliance burden as Stripe handles sensitive payment information securely.

**Implementation Plan:**

1.  **Stripe Account Setup:**
    *   Create a free Stripe account at [stripe.com](https://stripe.com).
    *   From the Stripe Dashboard, navigate to **Settings -> Payment Methods**.
    *   Enable all relevant German payment methods: **PayPal**, **SEPA Direct Debit**, **Giropay**, and **Sofort**.

2.  **Install Necessary Libraries:**
    *   Add the Stripe SDKs to the project:
        ```bash
        npm install stripe @stripe/stripe-js
        ```

3.  **Backend Integration (Next.js API Route):**
    *   Create a server-side API endpoint, for example, `app/api/checkout/route.ts`.
    *   This API route will:
        *   Receive detailed booking information (e.g., selected courses/rentals, total price, customer details) from the frontend.
        *   Use the Stripe Node.js library to create a **Stripe Checkout Session**. This session is a temporary, secure page hosted by Stripe.
        *   Return the URL of this Stripe Checkout Session to the frontend.

4.  **Frontend Integration (in `BookingWizard`):**
    *   Modify the `handleSubmit` function in the `BookingWizard` component.
    *   When the user clicks "Kostenpflichtig buchen":
        *   Send the collected booking data (items, price, etc.) to the `app/api/checkout` API route.
        *   Upon receiving the Stripe Checkout Session URL, redirect the user's browser to this URL.

5.  **Payment Confirmation and Redirect:**
    *   After successful payment on Stripe's secure page, Stripe will redirect the user back to a pre-defined URL on your website (e.g., `/booking/success`).
    *   Create a simple `/booking/success/page.tsx` to display a thank-you message.

6.  **Payment Verification (Stripe Webhooks):**
    *   This is a crucial security step. Create another API route, e.g., `app/api/stripe-webhook/route.ts`.
    *   Configure a webhook in your Stripe Dashboard to send notifications to this API route when payment-related events occur (e.g., `checkout.session.completed`).
    *   This webhook handler will:
        *   Verify the webhook's authenticity.
        *   Process the `checkout.session.completed` event.
        *   Update your internal records (e.g., mark booking as paid).
        *   **Send the final booking confirmation email to the customer.** This ensures emails are only sent for confirmed payments.

---

## Next Steps for Implementation:

I am ready to proceed with implementing the **Stripe Code skeleton**. This would involve:
1.  Installing the Stripe npm packages.
2.  Creating the `app/api/checkout/route.ts` API endpoint.
3.  Modifying the `BookingWizard.tsx` to call this API and handle the redirect.
4.  Creating a placeholder `app/booking/success/page.tsx`.
5.  Setting up the basic structure for the `app/api/stripe-webhook/route.ts`.

You will need to add your **Stripe API Keys** (Publishable Key for frontend, Secret Key for backend) to your `.env` file and later to Vercel's environment variables.
