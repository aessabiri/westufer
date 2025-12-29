-- SQL to create a human-readable view of all bookings
-- Run this in the Supabase SQL Editor

CREATE OR REPLACE VIEW view_all_bookings AS
SELECT 
  b.id,
  b.customer_name,
  b.customer_email,
  b.customer_phone,
  COALESCE(c.title, r.name) as booked_item,
  COALESCE(s.start_time::text, b.rental_date::text) as appointment_time,
  (b.amount_total_cents / 100.0) as price_euro,
  b.status,
  b.created_at
FROM bookings b
LEFT JOIN course_slots s ON b.slot_id = s.id
LEFT JOIN courses c ON s.course_id = c.id
LEFT JOIN rental_items r ON b.rental_item_id = r.id;
