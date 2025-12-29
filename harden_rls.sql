-- HARDEN BOOKINGS RLS
-- Run this in your Supabase SQL Editor

-- 1. Drop the old permissive policy
DROP POLICY IF EXISTS "Public can create bookings" ON bookings;

-- 2. Create a new, restricted policy
-- This ensures that anonymous users can ONLY insert a booking if:
-- - The status is 'pending' (they can't fake a 'paid' status)
-- - The stripe fields are NULL (they can't fake a payment session)
CREATE POLICY "Public can create bookings" 
ON bookings FOR INSERT 
TO anon, authenticated 
WITH CHECK (
  status = 'pending' AND 
  stripe_session_id IS NULL AND 
  payment_intent_id IS NULL
);

-- Note: SELECT policy remains empty (Correct: Users should not see other people's bookings)
