# Westufer Booking System Architecture

This document explains the internal logic and design of the custom booking system developed for Westufer Kemnade.

## 1. Core Logic: Courses vs. Rentals
The system is built to handle two fundamentally different business models in one unified database:

### A. Courses (Time-Slot Based)
- **Model:** Fixed schedules (e.g., Windsurf Basic, Saturday 14:00).
- **Inventory:** Capacity is tied to a specific "Slot".
- **Validation:** When a user books, the system checks the `booked_count` of that specific slot. If it reaches `max_capacity`, the slot is closed.

### B. Rentals (Inventory Based)
- **Model:** Flexible daily use (e.g., SUP Board for 1 hour).
- **Inventory:** Tracking is based on total physical units (e.g., we own 20 SUPs).
- **Validation:** The system dynamically counts how many of that specific item are already booked for the selected date. If `Booked < Total Owned`, the reservation is allowed.

## 2. The Admin Cockpit
To eliminate the need for manual database editing, we built a custom GUI:
- **Bulk Slot Generator:** Allows the owner to plan an entire season in seconds by selecting date ranges and recurring weekdays.
- **Inventory Manager:** Real-time control over equipment quantities and pricing.
- **Check-in Terminal:** A live search-and-filter interface for staff to manage arrivals and mark guests as present.

## 3. Security & Reliability
- **Atomic Transactions:** Uses server-side logic to prevent overbooking during high-traffic moments.
- **Zero-Trust Data:** Row Level Security (RLS) ensures that anonymous users can never see private customer details.
- **Resilience:** Static pages are cached (ISR), so the site remains online even if the database is undergoing maintenance.

---

## 4. Comparison: Custom System vs. BookingKit

| Feature | Custom System (Ours) | BookingKit (SaaS) |
| :--- | :--- | :--- |
| **Costs** | **No transaction fees.** No monthly subscription. | High transaction fees (per booking) + Monthly fees. |
| **Design** | **100% Brand Identity.** Integrated "Glassmorphism" look. | Standardized "Widget" look. Often feels like a third-party plugin. |
| **Data Ownership** | You own the database. Full control over customer lists. | Your data is stored on their platform. Access can be limited. |
| **Flexibility** | We built exactly what you need (e.g., specific Rental logic). | You must follow their pre-defined workflows. |
| **Maintenance** | Custom code requires a developer for major changes. | They handle all updates and bug fixes automatically. |

**Summary:** While BookingKit is a quick "off-the-shelf" solution, our custom system is a **strategic asset**. It saves thousands of euros in fees annually and provides a superior, seamless user experience that perfectly matches the Westufer brand.
