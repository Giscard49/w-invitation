# Admin Password Setup Guide

## Overview
Admin credentials are stored securely in Supabase using SHA-256 hashed passwords. This ensures passwords are never stored in plain text.

## Setting Up Admin Password

### Method 1: Using Browser Console (Recommended)

1. Open your browser's developer console (F12)
2. Run this JavaScript code, replacing `'your_password'` with your desired password:

```javascript
async function generateHash() {
  const password = 'your_password'; // Replace with your password
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  console.log('Password Hash:', hashHex);
  return hashHex;
}
generateHash();
```

3. Copy the generated hash from the console
4. Go to Supabase SQL Editor and run:

```sql
INSERT INTO admin_credentials (password_hash, is_active)
VALUES ('4da3376323046a3bb6759f0a3f4ae7100a0567950c53ee42d2e19201baaa6dfc', true);
```

### Method 2: Using Online Tool

1. Visit https://emn178.github.io/online-tools/sha256.html
2. Enter your password
3. Copy the SHA-256 hash
4. Insert into Supabase as shown in Method 1

### Method 3: Using setup-admin.sql

1. Generate your password hash using Method 1 or 2
2. Open `setup-admin.sql`
3. Replace `YOUR_HASHED_PASSWORD_HERE` with your generated hash
4. Run the script in Supabase SQL Editor

## Security Notes

- **Never commit passwords to version control**
- **Use a strong password** (minimum 12 characters, mix of letters, numbers, symbols)
- **Change password regularly** for better security
- Passwords are hashed using SHA-256 before storage
- Session expires after 24 hours for security

## Changing Admin Password

To change the admin password:

1. Generate a new hash for your new password (using Method 1 or 2 above)
2. Update in Supabase SQL Editor:

```sql
UPDATE admin_credentials 
SET password_hash = 'new_hash_here', updated_at = NOW()
WHERE is_active = true;
```

## Multiple Admin Accounts

You can create multiple admin accounts by inserting additional rows:

```sql
INSERT INTO admin_credentials (password_hash, is_active)
VALUES ('hash_for_admin_2', true);
```

## Troubleshooting

- **Can't login?** Verify the hash in Supabase matches the password you're using
- **Hash not working?** Make sure you're using SHA-256, not MD5 or other algorithms
- **Session expired?** Log in again - sessions last 24 hours

