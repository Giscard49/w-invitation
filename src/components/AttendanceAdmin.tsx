import React, { useState, useEffect } from 'react';
import { attendanceStorage, AttendanceRecord } from '../utils/attendanceStorage';
import { Download, Trash2, Users, UserCheck, UserX } from 'lucide-react';

export function AttendanceAdmin() {
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [stats, setStats] = useState({ total: 0, attending: 0, notAttending: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadRecords();
  }, []);

  const loadRecords = async () => {
    try {
      setLoading(true);
      setError(null);
      const allRecords = await attendanceStorage.getAllRecords();
      setRecords(allRecords);
      const statistics = await attendanceStorage.getStatistics();
      setStats(statistics);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load records');
      console.error('Error loading records:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this record?')) {
      try {
        await attendanceStorage.deleteRecord(id);
        await loadRecords();
      } catch (err) {
        alert('Failed to delete record. Please try again.');
        console.error('Error deleting record:', err);
      }
    }
  };

  const handleExportJSON = async () => {
    try {
      const data = await attendanceStorage.exportRecords();
      const blob = new Blob([data], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `attendance-records-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      alert('Failed to export records. Please try again.');
      console.error('Error exporting JSON:', err);
    }
  };

  const handleExportCSV = async () => {
    try {
      const data = await attendanceStorage.exportRecordsAsCSV();
      const blob = new Blob([data], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `attendance-records-${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      alert('Failed to export records. Please try again.');
      console.error('Error exporting CSV:', err);
    }
  };

  const handleClearAll = async () => {
    if (confirm('Are you sure you want to delete ALL records? This cannot be undone.')) {
      try {
        await attendanceStorage.clearAllRecords();
        await loadRecords();
      } catch (err) {
        alert('Failed to clear records. Please try again.');
        console.error('Error clearing records:', err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#fafaf9] py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl mb-8 text-center" style={{ fontFamily: 'Tangerine, cursive' }}>
          Attendance Records
        </h1>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-[rgb(var(--color-border))]/50">
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-6 h-6 text-[rgb(var(--color-accent))]" />
              <span className="text-sm text-[rgb(var(--color-text-secondary))] uppercase tracking-wider">Total</span>
            </div>
            <p className="text-3xl font-semibold">{stats.total}</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-[rgb(var(--color-border))]/50">
            <div className="flex items-center gap-3 mb-2">
              <UserCheck className="w-6 h-6 text-green-600" />
              <span className="text-sm text-[rgb(var(--color-text-secondary))] uppercase tracking-wider">Attending</span>
            </div>
            <p className="text-3xl font-semibold text-green-600">{stats.attending}</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-[rgb(var(--color-border))]/50">
            <div className="flex items-center gap-3 mb-2">
              <UserX className="w-6 h-6 text-red-600" />
              <span className="text-sm text-[rgb(var(--color-text-secondary))] uppercase tracking-wider">Not Attending</span>
            </div>
            <p className="text-3xl font-semibold text-red-600">{stats.notAttending}</p>
          </div>
        </div>

        {/* Export Buttons */}
        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          <button
            onClick={handleExportJSON}
            className="px-6 py-3 bg-[rgb(var(--color-accent))] text-white rounded-full hover:bg-[rgb(var(--color-accent))]/90 transition-colors flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Export JSON
          </button>
          <button
            onClick={handleExportCSV}
            className="px-6 py-3 bg-[rgb(var(--color-accent))] text-white rounded-full hover:bg-[rgb(var(--color-accent))]/90 transition-colors flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
          {records.length > 0 && (
            <button
              onClick={handleClearAll}
              className="px-6 py-3 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Clear All
            </button>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-8 text-center">
            <p className="text-red-600">{error}</p>
            <button
              onClick={loadRecords}
              className="mt-2 text-red-600 underline hover:text-red-700"
            >
              Retry
            </button>
          </div>
        )}

        {/* Records List */}
        {loading ? (
          <div className="bg-white rounded-2xl p-12 text-center shadow-lg border border-[rgb(var(--color-border))]/50">
            <p className="text-[rgb(var(--color-text-secondary))] text-lg">Loading records...</p>
          </div>
        ) : records.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center shadow-lg border border-[rgb(var(--color-border))]/50">
            <p className="text-[rgb(var(--color-text-secondary))] text-lg">No attendance records yet.</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-[rgb(var(--color-border))]/50">
            <div className="space-y-4">
              {records.map((record) => (
                <div
                  key={record.id}
                  className="flex items-center justify-between p-4 rounded-xl border border-[rgb(var(--color-border))]/30 hover:bg-gray-50/50 transition-colors"
                >
                  <div className="flex-1">
                    <p className="font-semibold text-lg mb-1">{record.name}</p>
                    <div className="flex items-center gap-4 text-sm text-[rgb(var(--color-text-secondary))]">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        record.willAttend
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {record.willAttend ? 'Will Attend' : 'Cannot Attend'}
                      </span>
                      <span>{new Date(record.submittedAt).toLocaleString()}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(record.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete record"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

