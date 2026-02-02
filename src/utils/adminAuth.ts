import { supabase } from '../lib/supabase';

const TABLE_NAME = 'admin_credentials';

/**
 * Hash a password using Web Crypto API
 */
async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export const adminAuth = {
  /**
   * Verify admin credentials
   */
  async verifyCredentials(password: string): Promise<boolean> {
    try {
      const hashedPassword = await hashPassword(password);
      
      const { data, error } = await supabase
        .from(TABLE_NAME)
        .select('id')
        .eq('password_hash', hashedPassword)
        .eq('is_active', true)
        .single();

      if (error || !data) {
        return false;
      }

      return true;
    } catch (err) {
      console.error('Error verifying credentials:', err);
      return false;
    }
  },

  /**
   * Create a new admin credential (for initial setup)
   * This should be run once to create the admin account
   */
  async createAdmin(password: string): Promise<boolean> {
    try {
      const hashedPassword = await hashPassword(password);
      
      const { data, error } = await supabase
        .from(TABLE_NAME)
        .insert({
          password_hash: hashedPassword,
          is_active: true,
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating admin:', error);
        return false;
      }

      return true;
    } catch (err) {
      console.error('Error creating admin:', err);
      return false;
    }
  },

  /**
   * Update admin password
   */
  async updatePassword(oldPassword: string, newPassword: string): Promise<boolean> {
    try {
      const oldHashed = await hashPassword(oldPassword);
      const newHashed = await hashPassword(newPassword);

      // Verify old password first
      const { data: verifyData } = await supabase
        .from(TABLE_NAME)
        .select('id')
        .eq('password_hash', oldHashed)
        .eq('is_active', true)
        .single();

      if (!verifyData) {
        return false;
      }

      // Update to new password
      const { error } = await supabase
        .from(TABLE_NAME)
        .update({ password_hash: newHashed })
        .eq('id', verifyData.id);

      if (error) {
        console.error('Error updating password:', error);
        return false;
      }

      return true;
    } catch (err) {
      console.error('Error updating password:', err);
      return false;
    }
  },
};

