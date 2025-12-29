-- Migration: Make bookings flexible for Rentals
-- 1. Make slot_id optional
ALTER TABLE bookings ALTER COLUMN slot_id DROP NOT NULL;

-- 2. Add Rental columns
ALTER TABLE bookings ADD COLUMN rental_item_id INT REFERENCES rental_items(id);
ALTER TABLE bookings ADD COLUMN rental_date DATE; -- We use DATE for daily inventory tracking

-- 3. Add a constraint to ensure integrity
-- A booking must have EITHER a slot_id (course) OR a rental_item_id (rental)
ALTER TABLE bookings ADD CONSTRAINT booking_type_check 
CHECK (
  (slot_id IS NOT NULL AND rental_item_id IS NULL AND rental_date IS NULL) OR 
  (slot_id IS NULL AND rental_item_id IS NOT NULL AND rental_date IS NOT NULL)
);

-- 4. Enable RLS for the new columns (implicit via table RLS, but good to note)
-- Note: Your existing 'Public can create bookings' policy will still work.
