-- Enable Row Level Security (RLS) on all tables
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE rental_items ENABLE ROW LEVEL SECURITY;

-- 1. Policies for 'courses'
-- Public can read all courses
CREATE POLICY "Public can view courses" 
ON courses FOR SELECT 
TO anon, authenticated 
USING (true);

-- 2. Policies for 'course_slots'
-- Public can read all slots
CREATE POLICY "Public can view slots" 
ON course_slots FOR SELECT 
TO anon, authenticated 
USING (true);

-- 3. Policies for 'rental_items'
-- Public can read all rental items
CREATE POLICY "Public can view rental items" 
ON rental_items FOR SELECT 
TO anon, authenticated 
USING (true);

-- 4. Policies for 'bookings'
-- Public (Anonymous) can INSERT a booking (so they can pay)
CREATE POLICY "Public can create bookings" 
ON bookings FOR INSERT 
TO anon, authenticated 
WITH CHECK (true);

-- CRITICAL: Public CANNOT read bookings (to protect PII)
-- Only service_role (backend) can read/update bookings
-- No SELECT policy for anon means they get an empty array or error, which is safe.
