import { supabase } from '../lib/supabase';

export interface AttendanceRecord {
  id: string;
  name: string;
  willAttend: boolean;
  submittedAt: string;
}

const TABLE_NAME = 'attendance_records';

export const attendanceStorage = {
  /**
   * Save an attendance record
   */
  async saveRecord(record: Omit<AttendanceRecord, 'id' | 'submittedAt'>): Promise<AttendanceRecord> {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .insert({
        name: record.name.trim(),
        will_attend: record.willAttend,
        submitted_at: new Date().toISOString(),
      })
      .select()
      .single(); 
   
    if (error) {
      throw new Error(`Failed to save record: ${error.message}`);
    }

    return {
      id: data.id,
      name: data.name,
      willAttend: data.will_attend,
      submittedAt: data.submitted_at,
    };
  },

  /**
   * Get all attendance records
   */
  async getAllRecords(): Promise<AttendanceRecord[]> {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select('*')
      .order('submitted_at', { ascending: false });

    if (error) {
      console.error('Error fetching records:', error);
      throw new Error(`Failed to fetch records: ${error.message}`);
    }

    return (data || []).map((record) => ({
      id: record.id,
      name: record.name,
      willAttend: record.will_attend,
      submittedAt: record.submitted_at,
    }));
  },

  /**
   * Get records filtered by attendance status
   */
  async getRecordsByStatus(willAttend: boolean): Promise<AttendanceRecord[]> {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select('*')
      .eq('will_attend', willAttend)
      .order('submitted_at', { ascending: false });

    if (error) {
      console.error('Error fetching records by status:', error);
      throw new Error(`Failed to fetch records: ${error.message}`);
    }

    return (data || []).map((record) => ({
      id: record.id,
      name: record.name,
      willAttend: record.will_attend,
      submittedAt: record.submitted_at,
    }));
  },

  /**
   * Get statistics
   */
  async getStatistics() {
    const records = await this.getAllRecords();
    const attending = records.filter((r) => r.willAttend).length;
    const notAttending = records.filter((r) => !r.willAttend).length;

    return {
      total: records.length,
      attending,
      notAttending,
    };
  },

  /**
   * Delete a record by ID
   */
  async deleteRecord(id: string): Promise<boolean> {
    const { error } = await supabase.from(TABLE_NAME).delete().eq('id', id);

    if (error) {
      console.error('Error deleting record:', error);
      throw new Error(`Failed to delete record: ${error.message}`);
    }

    return true;
  },

  /**
   * Clear all records
   */
  async clearAllRecords(): Promise<void> {
    // Delete all records - this requires proper RLS policies
    const { error } = await supabase.from(TABLE_NAME).delete().gte('created_at', '1970-01-01');

    if (error) {
      console.error('Error clearing records:', error);
      throw new Error(`Failed to clear records: ${error.message}`);
    }
  },

  /**
   * Export records as JSON
   */
  async exportRecords(): Promise<string> {
    const records = await this.getAllRecords();
    return JSON.stringify(records, null, 2);
  },

  /**
   * Export records as CSV
   */
  async exportRecordsAsCSV(): Promise<string> {
    const records = await this.getAllRecords();
    const headers = ['Name', 'Will Attend', 'Submitted At'];
    const rows = records.map((r) => [
      r.name,
      r.willAttend ? 'Yes' : 'No',
      new Date(r.submittedAt).toLocaleString(),
    ]);

    return [headers, ...rows].map((row) => row.map((cell) => `"${cell}"`).join(',')).join('\n');
  },
};
