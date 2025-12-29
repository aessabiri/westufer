-- SQL to fix Admin Permissions for Equipment
-- Copy these commands into your Supabase SQL Editor and click RUN

-- 1. Allow authenticated admins to UPDATE rental items
DROP POLICY IF EXISTS "Admins can update rental items" ON rental_items;
CREATE POLICY "Admins can update rental items" 
ON rental_items FOR UPDATE 
TO authenticated 
USING (true)
WITH CHECK (true);

-- 2. Allow authenticated admins to INSERT rental items
DROP POLICY IF EXISTS "Admins can insert rental items" ON rental_items;
CREATE POLICY "Admins can insert rental items" 
ON rental_items FOR INSERT 
TO authenticated 
WITH CHECK (true);

-- 3. Allow authenticated admins to DELETE rental items
DROP POLICY IF EXISTS "Admins can delete rental items" ON rental_items;
CREATE POLICY "Admins can delete rental items" 
ON rental_items FOR DELETE 
TO authenticated 
USING (true);
