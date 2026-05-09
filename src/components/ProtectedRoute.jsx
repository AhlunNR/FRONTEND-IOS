import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

export default function ProtectedRoute({ children, requiredRole }) {
  const { user, profile, loading, isAdmin } = useAuth();

  // Still loading session
  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center font-sans">
        <div className="text-zinc-400 text-sm font-light tracking-widest animate-pulse">Memeriksa sesi...</div>
      </div>
    );
  }

  // Not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Requires admin but user is not admin
  if (requiredRole === 'admin' && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
}
