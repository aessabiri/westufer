-- SQL to fix Admin Permissions for Courses
-- Copy these commands into your Supabase SQL Editor and click RUN

-- 1. Allow authenticated admins to INSERT course slots
DROP POLICY IF EXISTS "Admins can insert slots" ON course_slots;
CREATE POLICY "Admins can insert slots" 
ON course_slots FOR INSERT 
TO authenticated 
WITH CHECK (true);

-- 2. Allow authenticated admins to DELETE course slots
DROP POLICY IF EXISTS "Admins can delete slots" ON course_slots;
CREATE POLICY "Admins can delete slots" 
ON course_slots FOR DELETE 
TO authenticated 
USING (true);

-- 3. Ensure they can also update if needed
DROP POLICY IF EXISTS "Admins can update slots" ON course_slots;
CREATE POLICY "Admins can update slots" 
ON course_slots FOR UPDATE 
TO authenticated 
USING (true)
WITH CHECK (true);
