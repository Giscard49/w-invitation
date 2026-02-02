import React, { useState } from 'react';
import { Heart, Lock } from 'lucide-react';
import { adminAuth } from '../utils/adminAuth';

interface AdminLoginProps {
  onLogin: () => void;
}

export function AdminLogin({ onLogin }: AdminLoginProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const isValid = await adminAuth.verifyCredentials(password);
      
      if (isValid) {
        localStorage.setItem('admin_authenticated', 'true');
        localStorage.setItem('admin_authenticated_at', new Date().toISOString());
        onLogin();
      } else {
        setError('Incorrect password. Please try again.');
        setPassword('');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error('Login error:', err);
      setPassword('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafaf9] flex items-center justify-center px-6 py-16 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-[#f5f0eb]/30 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-[#faf5f0]/40 to-transparent rounded-full blur-3xl" />

      <div className="relative z-10 w-full max-w-md">
        {/* Decorative Top Ornament */}
        <div className="flex justify-center mb-8">
          <svg width="80" height="20" viewBox="0 0 80 20" fill="none">
            <path d="M0 10 Q 20 5, 40 10 T 80 10" stroke="rgb(var(--color-accent))" strokeWidth="0.5" fill="none" opacity="0.4"/>
            <circle cx="40" cy="10" r="2" fill="rgb(var(--color-accent))" opacity="0.5"/>
          </svg>
        </div>

        {/* Login Card */}
        <div className="bg-white/60 backdrop-blur-sm rounded-[2rem] p-10 shadow-xl shadow-black/5 border border-white/80">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[rgb(var(--color-dusty-beige))]/10 mb-4">
              <Lock className="w-8 h-8 text-[rgb(var(--color-accent))]" strokeWidth={1.5} />
            </div>
            <h1 className="text-4xl mb-2" style={{ fontFamily: 'Tangerine, cursive' }}>
              Admin Access
            </h1>
            <p className="text-sm text-[rgb(var(--color-text-secondary))]">
              Enter password to view attendance records
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm mb-2 text-[rgb(var(--color-text-secondary))] uppercase tracking-wider">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                placeholder="Enter admin password"
                className="w-full border-b-2 border-[rgb(var(--color-border))] py-3 px-2 focus:outline-none focus:border-[rgb(var(--color-accent))] transition-colors bg-transparent placeholder:text-[rgb(var(--color-text-secondary))]/30"
                autoFocus
                disabled={loading}
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-600 text-center">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={!password || loading}
              className="w-full bg-gradient-to-r from-[rgb(var(--color-accent))]/80 to-[rgb(var(--color-accent))]/90 hover:from-[rgb(var(--color-accent))] hover:to-[rgb(var(--color-accent))] disabled:from-gray-300 disabled:to-gray-300 text-white py-4 rounded-full text-sm uppercase tracking-widest transition-all duration-300 shadow-lg shadow-[rgb(var(--color-accent))]/20 hover:shadow-xl hover:shadow-[rgb(var(--color-accent))]/30 disabled:shadow-none disabled:cursor-not-allowed"
            >
              {loading ? 'Verifying...' : 'Access Admin'}
            </button>
          </form>

          {/* Decorative Divider */}
          <div className="flex items-center justify-center my-8">
            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-[rgb(var(--color-border))] to-transparent" />
            <Heart className="w-4 h-4 mx-3 text-[rgb(var(--color-accent))]/40 fill-[rgb(var(--color-accent))]/40" />
            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-[rgb(var(--color-border))] to-transparent" />
          </div>

          <p className="text-xs text-center text-[rgb(var(--color-text-secondary))]/60">
            Protected area • Wedding Administration
          </p>
        </div>
      </div>
    </div>
  );
}

