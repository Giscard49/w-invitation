
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

  5. Run the SQL schema in your Supabase SQL Editor:
     - Go to SQL Editor in your Supabase dashboard
     - Copy and paste the contents of `supabase-schema.sql`
     - Execute the SQL to create the `attendance_records` and `admin_credentials` tables

  6. Set up Admin Password:
     - Generate a SHA-256 hash of your desired admin password using:
       - Browser console: `await crypto.subtle.digest('SHA-256', new TextEncoder().encode('your_password')).then(h => Array.from(new Uint8Array(h)).map(b => b.toString(16).padStart(2, '0')).join('')).then(console.log)`
       - Or use an online tool: https://emn178.github.io/online-tools/sha256.html
     - Run the `setup-admin.sql` script in Supabase SQL Editor, replacing `YOUR_HASHED_PASSWORD_HERE` with your generated hash
     - Or manually insert: `INSERT INTO admin_credentials (password_hash, is_active) VALUES ('your_sha256_hash_here', true);`

  ### 3. Run the Development Server

  Run `npm run dev` to start the development server.
  acces the admin page at '/#admin'

  ## Database Schema

  The application uses two Supabase tables:

  ### `attendance_records`
  - `id` (UUID, primary key)
  - `name` (TEXT, required)
  - `will_attend` (BOOLEAN, required)
  - `submitted_at` (TIMESTAMPTZ, auto-generated)
  - `created_at` (TIMESTAMPTZ, auto-generated)

  ### `admin_credentials`
  - `id` (UUID, primary key)
  - `password_hash` (TEXT, required) - SHA-256 hashed password
  - `is_active` (BOOLEAN, default: true)
  - `created_at` (TIMESTAMPTZ, auto-generated)
  - `updated_at` (TIMESTAMPTZ, auto-generated)

  See `supabase-schema.sql` for the complete schema and Row Level Security policies.
  