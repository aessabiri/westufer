# Rental System Implementation Report - Dec 28, 2025

This document details the successful implementation of the "Verleih" (Rental) booking system, integrating it with the existing Course booking architecture while introducing inventory management capabilities.

## 1. Architectural Changes

### Database Schema Migration
We transitioned from a strict "Course-Only" model to a flexible "Hybrid" model capable of handling both fixed-time courses and daily rentals.

*   **Modified `bookings` Table:**
    *   Made `slot_id` optional (nullable).
    *   Added `rental_item_id` (Foreign Key to `rental_items`).
    *   Added `rental_date` (Date type) for daily inventory tracking.
    *   **Constraint:** Added a check to ensure a booking row is *either* a Course Booking (has `slot_id`) *or* a Rental Booking (has `rental_item_id` + `rental_date`).

### Inventory Management Strategy
Instead of a complex "Cart" system with separate order tables, we adopted a robust **"One Row Per Item"** strategy.
*   **Booking Multiples:** If a user books 3 SUP boards, the system creates **3 separate rows** in the `bookings` table.
*   **Inventory Check:** Availability is calculated dynamically by counting existing rows:
    > `Available = Total Inventory (from rental_items) - Count(bookings for this item on this date)`

## 2. Component Refactoring

### Server Action (`app/actions/createBooking.ts`)
The core logic was rewritten to handle two distinct flows:
1.  **Course Flow:** Checks `course_slots` capacity -> Inserts 1 row -> Updates `booked_count`.
2.  **Rental Flow:** 
    *   Accepts a list of items + quantity.
    *   Loops through each item.
    *   **Atomic Inventory Check:** Verifies availability against the database count for that specific date.
    *   **Batch Insert:** Creates multiple rows for the requested quantity.

### Frontend Wizard (`components/features/BookingWizard.tsx`)
*   **Dual Mode:** The wizard now detects `type="rental"` vs `type="course"`.
*   **Step 2 (Date Selection):** 
    *   *Courses:* Shows specific time slots (e.g., "Sat 14:00").
    *   *Rentals:* Shows a clean 14-day date picker (e.g., "Tomorrow").
*   **Submission:** Bundles the selected items and quantity into the new payload format expected by the server action.

## 3. Data & Seeding

*   **Seed Script (`seed_rentals.sql`):** Created a script to populate the `rental_items` table with initial inventory (e.g., 20 SUP Boards, 10 Windsurf Boards, 30 Wetsuits).
*   **Frontend Mapping (`app/booking/verleih/page.tsx`):** Updated the hardcoded rental list to use the **numeric IDs** from the seed script, ensuring frontend selections map correctly to database records.

## 4. Verification & Testing

*   **Security:** The system prevents overbooking. If a user tries to book 21 SUPs (when only 20 exist), the transaction is rejected on the server.
*   **Stability:** Typescript interfaces (`Booking`, `BookingRequest`) were updated to enforce the new schema, ensuring type safety across the stack.

## 5. Future Recommendations
*   **Admin Dashboard:** Create a view to see "Today's Rentals" by querying the `rental_date` column.
*   **Hourly Rentals:** The current schema supports `rental_date` (Daily). For hourly tracking, we would need to add `start_time` / `end_time` columns to the rental flow.
