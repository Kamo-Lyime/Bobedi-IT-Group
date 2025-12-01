-- ========================================
-- ULTIMATE FIX: Disable RLS or Create Permissive Policy
-- Run this in Supabase SQL Editor
-- ========================================

-- OPTION 1: Temporarily disable RLS (easiest for testing)
ALTER TABLE contact_submissions DISABLE ROW LEVEL SECURITY;

-- If you prefer to keep RLS enabled, comment out the line above and use OPTION 2 below:

/*
-- OPTION 2: Keep RLS but make it fully permissive
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Drop all existing policies
DROP POLICY IF EXISTS "Allow public inserts" ON contact_submissions;
DROP POLICY IF EXISTS "Enable insert for anon users" ON contact_submissions;
DROP POLICY IF EXISTS "Allow authenticated reads" ON contact_submissions;
DROP POLICY IF EXISTS "Enable read for authenticated users" ON contact_submissions;
DROP POLICY IF EXISTS "Allow authenticated updates" ON contact_submissions;
DROP POLICY IF EXISTS "Allow service role all" ON contact_submissions;

-- Create a single permissive policy for all operations
CREATE POLICY "Allow all operations"
ON contact_submissions
FOR ALL
USING (true)
WITH CHECK (true);
*/

-- Verify current RLS status
SELECT 
    tablename,
    rowsecurity as rls_enabled
FROM pg_tables 
WHERE tablename = 'contact_submissions';

-- Test insert (this should work after running the fix)
-- INSERT INTO contact_submissions (name, email, service, message) 
-- VALUES ('Test User', 'test@example.com', 'web-development', 'Test message');

SELECT 'RLS disabled successfully! Your form should work now.' as message;