import React, { useState, useEffect } from 'react';
import { attendanceStorage, AttendanceRecord } from '../utils/attendanceStorage';
import { Download, Trash2, Users, UserCheck, UserX, RefreshCw, LogOut, Heart } from 'lucide-react';

interface AttendanceAdminProps {
  onLogout: () => void;
}

export function AttendanceAdmin({ onLogout }: AttendanceAdminProps) {
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [stats, setStats] = useState({ total: 0, attending: 0, notAttending: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [clearingAll, setClearingAll] = useState(false);

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
    if (!confirm('Are you sure you want to delete this record?')) return;
    try {
      setDeletingId(id);
      await attendanceStorage.deleteRecord(id);
      await loadRecords();
    } catch (err) {
      alert('Failed to delete record. Please try again.');
      console.error('Error deleting record:', err);
    } finally {
      setDeletingId(null);
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
    if (!confirm('Are you sure you want to delete ALL records? This cannot be undone.')) return;
    try {
      setClearingAll(true);
      await attendanceStorage.clearAllRecords();
      await loadRecords();
    } catch (err) {
      alert('Failed to clear records. Please try again.');
      console.error('Error clearing records:', err);
    } finally {
      setClearingAll(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafaf9] py-12 px-6 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-[#f5f0eb]/30 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-[#faf5f0]/40 to-transparent rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-[#f5f0eb]/20 to-[#faf5f0]/20 rounded-full blur-3xl" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <svg width="80" height="20" viewBox="0 0 80 20" fill="none">
              <path d="M0 10 Q 20 5, 40 10 T 80 10" stroke="rgb(var(--color-accent))" strokeWidth="0.5" fill="none" opacity="0.4"/>
              <circle cx="40" cy="10" r="2" fill="rgb(var(--color-accent))" opacity="0.5"/>
            </svg>
          </div>
          <h1 className="text-5xl mb-4" style={{ fontFamily: 'Tangerine, cursive' }}>
            Attendance Records
          </h1>
          <p className="text-sm text-[rgb(var(--color-text-secondary))] mb-6">
            Manage and view all RSVP responses
          </p>
          <button
            onClick={onLogout}
            className="px-4 py-2 text-sm text-[rgb(var(--color-text-secondary))] hover:text-[rgb(var(--color-accent))] transition-colors flex items-center gap-2 mx-auto"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white/60 backdrop-blur-sm rounded-[2rem] p-8 shadow-lg shadow-black/5 border border-white/80 text-center">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Users className="w-6 h-6 text-[rgb(var(--color-accent))]" />
            </div>
            <p className="text-4xl font-semibold mb-2" style={{ fontFamily: 'Tangerine, cursive' }}>
              {stats.total}
            </p>
            <p className="text-xs text-[rgb(var(--color-text-secondary))] uppercase tracking-wider">
              Total Responses
            </p>
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-[2rem] p-8 shadow-lg shadow-black/5 border border-white/80 text-center">
            <div className="flex items-center justify-center gap-3 mb-3">
              <UserCheck className="w-6 h-6 text-green-600" />
            </div>
            <p className="text-4xl font-semibold mb-2 text-green-600" style={{ fontFamily: 'Tangerine, cursive' }}>
              {stats.attending}
            </p>
            <p className="text-xs text-[rgb(var(--color-text-secondary))] uppercase tracking-wider">
              Will Attend
            </p>
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-[2rem] p-8 shadow-lg shadow-black/5 border border-white/80 text-center">
            <div className="flex items-center justify-center gap-3 mb-3">
              <UserX className="w-6 h-6 text-red-600" />
            </div>
            <p className="text-4xl font-semibold mb-2 text-red-600" style={{ fontFamily: 'Tangerine, cursive' }}>
              {stats.notAttending}
            </p>
            <p className="text-xs text-[rgb(var(--color-text-secondary))] uppercase tracking-wider">
              Cannot Attend
            </p>
          </div>
        </div>

        {/* Action Buttons - responsive row */}
        <div className="flex flex-nowrap gap-3 sm:gap-4 mb-10 justify-center items-center">
          <button
            onClick={loadRecords}
            disabled={loading}
            className="px-4 sm:px-6 py-3 bg-white/60 backdrop-blur-sm border border-[rgb(var(--color-border))] rounded-full shadow-lg hover:bg-white/80 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px] shrink-0"
            title="Refresh records"
          >
            <RefreshCw className={`w-4 h-4 shrink-0 ${loading ? 'animate-spin' : ''}`} />
            <span className="whitespace-nowrap">Refresh</span>
          </button>
          <button
            onClick={handleExportJSON}
            className="px-4 sm:px-6 py-3 bg-gradient-to-r from-[rgb(var(--color-accent))]/80 to-[rgb(var(--color-accent))]/90 hover:from-[rgb(var(--color-accent))] hover:to-[rgb(var(--color-accent))] text-white rounded-full shadow-lg shadow-[rgb(var(--color-accent))]/20 hover:shadow-xl transition-all flex items-center justify-center gap-2 min-h-[44px] shrink-0"
            title="Export as JSON"
          >
            <Download className="w-4 h-4 shrink-0" />
            <span className="whitespace-nowrap">Export JSON</span>
          </button>
          <button
            onClick={handleExportCSV}
            className="px-4 sm:px-6 py-3 bg-gradient-to-r from-[rgb(var(--color-accent))]/80 to-[rgb(var(--color-accent))]/90 hover:from-[rgb(var(--color-accent))] hover:to-[rgb(var(--color-accent))] text-white rounded-full shadow-lg shadow-[rgb(var(--color-accent))]/20 hover:shadow-xl transition-all flex items-center justify-center gap-2 min-h-[44px] shrink-0"
            title="Export as CSV"
          >
            <Download className="w-4 h-4 shrink-0" />
            <span className="whitespace-nowrap">Export CSV</span>
          </button>
          {records.length > 0 && (
            <button
              onClick={handleClearAll}
              disabled={clearingAll}
              className="px-4 sm:px-6 py-3 bg-red-600/80 hover:bg-red-600 disabled:bg-red-400 text-white rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 min-h-[44px] shrink-0 disabled:opacity-70 disabled:cursor-not-allowed"
              title="Delete all records"
            >
              <Trash2 className={`w-4 h-4 shrink-0 ${clearingAll ? 'animate-pulse' : ''}`} />
              <span className="whitespace-nowrap">{clearingAll ? 'Deleting…' : 'Delete All'}</span>
            </button>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-[2rem] p-6 mb-8 text-center">
            <p className="text-red-600 mb-3">{error}</p>
            <button
              onClick={loadRecords}
              className="px-4 py-2 bg-red-600 text-white rounded-full text-sm hover:bg-red-700 transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        {/* Records List */}
        {loading ? (
          <div className="bg-white/60 backdrop-blur-sm rounded-[2rem] p-12 text-center shadow-lg shadow-black/5 border border-white/80">
            <p className="text-[rgb(var(--color-text-secondary))] text-lg">Loading records...</p>
          </div>
        ) : records.length === 0 ? (
          <div className="bg-white/60 backdrop-blur-sm rounded-[2rem] p-12 text-center shadow-lg shadow-black/5 border border-white/80">
            <Heart className="w-12 h-12 mx-auto mb-4 text-[rgb(var(--color-accent))]/40" />
            <p className="text-[rgb(var(--color-text-secondary))] text-lg">No attendance records yet.</p>
            <p className="text-sm text-[rgb(var(--color-text-secondary))]/60 mt-2">
              RSVP responses will appear here once guests submit their responses.
            </p>
          </div>
        ) : (
          <div className="bg-white/60 backdrop-blur-sm rounded-[2rem] p-8 shadow-lg shadow-black/5 border border-white/80">
            <h2 className="text-2xl mb-6 text-center" style={{ fontFamily: 'Tangerine, cursive' }}>
              Guest Responses
            </h2>
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
              {records.map((record) => (
                <div
                  key={record.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 sm:p-5 rounded-2xl border border-[rgb(var(--color-border))]/30 bg-white/50 hover:bg-white/80 transition-all hover:shadow-md"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-base sm:text-lg mb-2 truncate">{record.name}</p>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-sm text-[rgb(var(--color-text-secondary))]">
                      <span className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-medium shrink-0 ${
                        record.willAttend
                          ? 'bg-green-100 text-green-700 border border-green-200'
                          : 'bg-red-100 text-red-700 border border-red-200'
                      }`}>
                        {record.willAttend ? '✓ Will Attend' : '✗ Cannot Attend'}
                      </span>
                      <span className="text-xs">
                        {new Date(record.submittedAt).toLocaleString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDelete(record.id)}
                    disabled={deletingId === record.id}
                    className="self-end sm:self-center flex items-center gap-2 px-4 py-2.5 text-red-600 hover:bg-red-50 disabled:bg-red-50 disabled:opacity-60 rounded-xl transition-colors shrink-0 min-h-[44px] border border-red-200 hover:border-red-300"
                    title="Delete this record"
                  >
                    {deletingId === record.id ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                    <span className="text-sm font-medium sm:inline">{deletingId === record.id ? 'Deleting…' : 'Delete'}</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Decorative Footer */}
        <div className="flex items-center justify-center mt-12">
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[rgb(var(--color-border))] to-transparent" />
          <Heart className="w-5 h-5 mx-4 text-[rgb(var(--color-accent))]/40 fill-[rgb(var(--color-accent))]/40" />
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[rgb(var(--color-border))] to-transparent" />
        </div>
      </div>
    </div>
  );
}
