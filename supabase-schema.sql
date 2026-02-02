-- Create attendance_records table
CREATE TABLE IF NOT EXISTS attendance_records (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  will_attend BOOLEAN NOT NULL,
  submitted_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_attendance_records_will_attend ON attendance_records(will_attend);
CREATE INDEX IF NOT EXISTS idx_attendance_records_submitted_at ON attendance_records(submitted_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE attendance_records ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anyone to insert records (for RSVP submissions)
CREATE POLICY "Allow public insert" ON attendance_records
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Policy: Allow anyone to read records (for viewing responses)
-- If you want to restrict this, you can add authentication checks
CREATE POLICY "Allow public read" ON attendance_records
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Policy: Allow authenticated users to delete records (for admin)
-- Adjust this based on your authentication needs
CREATE POLICY "Allow authenticated delete" ON attendance_records
  FOR DELETE
  TO authenticated
  USING (true);

-- Optional: If you want to allow updates
CREATE POLICY "Allow authenticated update" ON attendance_records
  FOR UPDATE
  TO authenticated
  USING (true);

