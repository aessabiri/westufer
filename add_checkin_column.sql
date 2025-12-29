-- Migration: Add Check-in functionality (Fixed Version)
-- 1. Add checked_in column to bookings
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS checked_in BOOLEAN DEFAULT FALSE;

-- 2. Drop the old view first to avoid column rename errors
DROP VIEW IF EXISTS view_all_bookings;

-- 3. Create the updated view with the new column order
CREATE OR REPLACE VIEW view_all_bookings with (security_invoker = on) as
SELECT 
  b.id,
  b.customer_name,
  b.customer_email,
  b.customer_phone,
  COALESCE(c.title, r.name) as booked_item,
  COALESCE(s.start_time::text, b.rental_date::text) as appointment_time,
  (b.amount_total_cents / 100.0) as price_euro,
  b.status,
  b.checked_in,
  b.created_at
FROM bookings b
LEFT JOIN course_slots s ON b.slot_id = s.id
LEFT JOIN courses c ON s.course_id = c.id
LEFT JOIN rental_items r ON b.rental_item_id = r.id;