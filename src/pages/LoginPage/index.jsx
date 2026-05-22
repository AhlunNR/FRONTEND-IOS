import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Shield } from 'lucide-react';

export default function LoginPage() {
  const { user, loading, signInWithGoogle } = useAuth();
  const [signingIn, setSigningIn] = useState(false);
  const [error, setError] = useState(null);

  // Already logged in → redirect
  if (!loading && user) {
    return <Navigate to="/simulasi" replace />;
  }

  const handleLogin = async () => {
    setSigningIn(true);
    setError(null);
    try {
      await signInWithGoogle();
    } catch (err) {
      setError(err.message);
      setSigningIn(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 font-sans relative">
      <div className="bg-zinc-900/30 border border-zinc-850 rounded-xl p-8 w-full max-w-sm shadow-sm relative overflow-hidden">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8 relative z-10">
          <div className="w-12 h-12 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-4 text-zinc-400">
            <Shield size={24} />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Boyman Quiz</h1>
          <p className="text-zinc-500 text-xs mt-1.5 leading-relaxed font-normal">Masuk untuk mulai latihan</p>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-rose-500/5 border border-rose-500/10 rounded-lg p-3 mb-5 text-center relative z-10">
            <p className="text-rose-400 text-xs font-medium">{error}</p>
          </div>
        )}

        {/* Google Login Button */}
        <button
          onClick={handleLogin}
          disabled={signingIn || loading}
          className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-white text-zinc-950 hover:bg-zinc-200 disabled:hover:bg-white font-semibold text-sm rounded-lg transition-colors duration-250 shadow-sm disabled:opacity-50 relative z-10"
        >
          {signingIn ? (
            <div className="w-4 h-4 border-2 border-zinc-400 border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" className="flex-shrink-0">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
          )}
          {signingIn ? 'Memproses...' : 'Masuk dengan Google'}
        </button>

        <p className="text-center text-[10px] text-zinc-500 mt-6 relative z-10 leading-relaxed font-normal">
          Data kuis Anda akan tersimpan secara terstruktur dan aman di akun Google Anda.
        </p>
      </div>
    </div>
  );
}
