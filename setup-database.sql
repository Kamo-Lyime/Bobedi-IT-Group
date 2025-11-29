-- ========================================
-- Bobedi IT Group - Contact Submissions Table
-- Run this in Supabase SQL Editor
-- ========================================

-- Create the contact_submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    service TEXT NOT NULL,
    message TEXT,
    submitted_at TIMESTAMPTZ DEFAULT NOW(),
    status TEXT DEFAULT 'new',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_submitted_at ON contact_submissions(submitted_at DESC);
CREATE INDEX IF NOT EXISTS idx_status ON contact_submissions(status);
CREATE INDEX IF NOT EXISTS idx_email ON contact_submissions(email);

-- Enable Row Level Security (RLS)
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public inserts" ON contact_submissions;
DROP POLICY IF EXISTS "Allow authenticated reads" ON contact_submissions;
DROP POLICY IF EXISTS "Allow authenticated updates" ON contact_submissions;

-- Create policy to allow anyone to insert (submit forms)
CREATE POLICY "Allow public inserts" ON contact_submissions
    FOR INSERT
    TO anon
    WITH CHECK (true);

-- Create policy to allow authenticated users to read all submissions
CREATE POLICY "Allow authenticated reads" ON contact_submissions
    FOR SELECT
    TO authenticated
    USING (true);

-- Create policy to allow authenticated users to update submissions
CREATE POLICY "Allow authenticated updates" ON contact_submissions
    FOR UPDATE
    TO authenticated
    USING (true);

-- Create policy to allow service role to do everything (for admin operations)
CREATE POLICY "Allow service role all" ON contact_submissions
    FOR ALL
    TO service_role
    USING (true);

-- Verify the table was created
SELECT 'Table created successfully!' as message;

-- Show table structure
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'contact_submissions'
ORDER BY ordinal_position;