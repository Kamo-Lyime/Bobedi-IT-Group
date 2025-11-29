-- ========================================
-- QUICK FIX: Row Level Security Policy
-- Run this NOW in Supabase SQL Editor
-- ========================================

-- Drop all existing policies
DROP POLICY IF EXISTS "Allow public inserts" ON contact_submissions;
DROP POLICY IF EXISTS "Enable insert for anon users" ON contact_submissions;
DROP POLICY IF EXISTS "Allow authenticated reads" ON contact_submissions;
DROP POLICY IF EXISTS "Enable read for authenticated users" ON contact_submissions;
DROP POLICY IF EXISTS "Allow authenticated updates" ON contact_submissions;
DROP POLICY IF EXISTS "Allow service role all" ON contact_submissions;

-- Create new policy to allow ANYONE to insert (including anonymous users)
CREATE POLICY "Enable insert for anon users" 
ON contact_submissions
FOR INSERT 
TO public
WITH CHECK (true);

-- Create policy to allow authenticated users to read
CREATE POLICY "Enable read for authenticated users" 
ON contact_submissions
FOR SELECT 
TO authenticated
USING (true);

-- Create policy to allow authenticated users to update
CREATE POLICY "Allow authenticated updates" 
ON contact_submissions
FOR UPDATE 
TO authenticated
USING (true)
WITH CHECK (true);

-- Verify policies were created
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd
FROM pg_policies 
WHERE tablename = 'contact_submissions';

-- Success message
SELECT 'RLS policies updated successfully! Your form should work now.' as message;