-- Setup script to create initial admin password
-- Run this in Supabase SQL Editor after creating the admin_credentials table
-- 
-- To generate a password hash, you can use this JavaScript in browser console:
-- async function hashPassword(pwd) {
--   const encoder = new TextEncoder();
--   const data = encoder.encode(pwd);
--   const hashBuffer = await crypto.subtle.digest('SHA-256', data);
--   const hashArray = Array.from(new Uint8Array(hashBuffer));
--   return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
-- }
-- hashPassword('your_password_here').then(console.log);
--
-- Or use an online SHA-256 hash generator: https://emn178.github.io/online-tools/sha256.html
--
-- Replace 'YOUR_HASHED_PASSWORD_HERE' with the SHA-256 hash of your desired password

INSERT INTO admin_credentials (password_hash, is_active)
VALUES (
  '4da3376323046a3bb6759f0a3f4ae7100a0567950c53ee42d2e19201baaa6dfc',  -- Replace with SHA-256 hash of your password
  true
)
ON CONFLICT DO NOTHING;

-- Example: If your password is 'wedding2026', the hash would be:
-- 'a1b2c3d4e5f6...' (64 character hex string)
-- You can generate this using the JavaScript function above or an online tool

