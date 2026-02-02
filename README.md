
  # Romantic Wedding Invitation Website

  This is a code bundle for Romantic Wedding Invitation Website. The original project is available at https://www.figma.com/design/C1itaOySFNBeDtxZXGuV4k/Romantic-Wedding-Invitation-Website.

  ## Setup

  ### 1. Install Dependencies

  Run `npm i` to install the dependencies.

  ### 2. Configure Supabase

  1. Create a new project at [Supabase](https://app.supabase.com)
  2. Go to Project Settings > API
  3. Copy your Project URL and anon/public key
  4. Create a `.env` file in the root directory:**(make sure your .env variable names start with VITE_**)

  ```env
  VITE_SUPABASE_URL=your_supabase_project_url
  VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
  ```

  5. Run the SQL schema in your Supabase SQL Editor (see `supabase-schema.sql`):
     - Go to SQL Editor in your Supabase dashboard
     - Copy and paste the contents of `supabase-schema.sql`
     - Execute the SQL to create the `attendance_records` table

  ### 3. Run the Development Server

  Run `npm run dev` to start the development server.

  ## Database Schema

  The application uses a Supabase table called `attendance_records` with the following structure:
  - `id` (UUID, primary key)
  - `name` (TEXT, required)
  - `will_attend` (BOOLEAN, required)
  - `submitted_at` (TIMESTAMPTZ, auto-generated)
  - `created_at` (TIMESTAMPTZ, auto-generated)

  See `supabase-schema.sql` for the complete schema and Row Level Security policies.
  