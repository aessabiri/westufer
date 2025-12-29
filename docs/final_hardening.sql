-- SQL to prevent race conditions and handle atomic increments
-- 1. Add a constraint to course_slots to prevent booked_count > max_capacity
ALTER TABLE course_slots 
ADD CONSTRAINT capacity_check 
CHECK (booked_count <= max_capacity);

-- 2. Prevent deleting equipment/slots that have active bookings
ALTER TABLE bookings 
DROP CONSTRAINT IF EXISTS bookings_slot_id_fkey,
ADD CONSTRAINT bookings_slot_id_fkey 
  FOREIGN KEY (slot_id) 
  REFERENCES course_slots(id) 
  ON DELETE RESTRICT;

ALTER TABLE bookings 
DROP CONSTRAINT IF EXISTS bookings_rental_item_id_fkey,
ADD CONSTRAINT bookings_rental_item_id_fkey 
  FOREIGN KEY (rental_item_id) 
  REFERENCES rental_items(id) 
  ON DELETE RESTRICT;
