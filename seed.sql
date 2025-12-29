-- SEED DATA FOR WESTUFER KEMNADE
-- Copy and paste this into your Supabase SQL Editor to populate your database.

-- 1. Clean up existing data (optional, prevents duplicates if run multiple times)
TRUNCATE TABLE course_slots CASCADE;
TRUNCATE TABLE courses CASCADE;

-- 2. Insert Courses (Matching your Frontend)
INSERT INTO courses (slug, title, description, duration_minutes, price_cents) VALUES
('ws-basic',   'Windsurf Grundschein', 'Der komplette Einsteigerkurs mit VDWS-Lizenz Option.', 720, 19500),
('ws-trial',   'Schnupperkurs',        'Erste Schritte auf dem Board und Segel.', 240, 8000),
('ws-private', 'Privatstunde',         'Individuelles Training für maximalen Lernerfolg.', 60, 0),
('sup-basic',  'SUP Einsteiger',       'Grundlagen des Stand Up Paddling sicher erlernen.', 90, 3900),
('sup-tour',   'SUP Sunset Tour',      'Entspannte Tour in den Sonnenuntergang.', 120, 2900),
('lb-basic',   'Longboard Basic',      'Die Basics des Longboardens: Pushen, Bremsen, Lenken.', 90, 2500);

-- 3. Insert Slots (Example: Every Saturday/Sunday at 10:00 and 14:00 for the next few weeks)
-- We use a CTE to generate dates dynamically so this script works whenever you run it.

WITH future_dates AS (
  SELECT generate_series(
    CURRENT_DATE + INTERVAL '1 day', -- Start tomorrow
    CURRENT_DATE + INTERVAL '14 days', -- Go for 2 weeks
    '1 day'::interval
  ) as date_val
)
INSERT INTO course_slots (course_id, start_time, max_capacity)
SELECT 
  c.id, 
  (fd.date_val + t.time_val)::timestamptz,
  8 -- Default capacity
FROM 
  courses c,
  future_dates fd,
  (VALUES (TIME '10:00:00'), (TIME '14:00:00')) as t(time_val)
WHERE 
  -- Only create slots for weekends (Saturday=6, Sunday=0 in some dialects, but ISO is 7,1... let's just do all days for testing)
  -- Or just simplify: Create slots for ALL courses on ALL days for the next 2 weeks to guarantee availability during testing.
  true;

-- 4. Verify the data
SELECT count(*) as courses_count FROM courses;
SELECT count(*) as slots_count FROM course_slots;
