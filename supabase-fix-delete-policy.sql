-- Run this in Supabase SQL Editor to fix delete not actually removing rows
-- (RLS was only allowing "authenticated", but the app uses "anon" key)

-- Remove the old policy that only allowed authenticated users
DROP POLICY IF EXISTS "Allow authenticated delete" ON attendance_records;

-- Allow both anon and authenticated to delete (admin panel uses anon key)
CREATE POLICY "Allow delete attendance records" ON attendance_records
  FOR DELETE
  TO anon, authenticated
  USING (true);
