import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

export default function ProtectedRoute({ children, requiredRole }) {
  const { user, profile, loading, isAdmin } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center font-sans">
        <div className="text-zinc-400 text-sm font-light tracking-widest animate-pulse">Memeriksa sesi...</div>
      </div>
    );
  }

  // Not logged in — redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Need admin but user is not admin
  if (requiredRole === 'admin' && !isAdmin) {
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center font-sans gap-4">
        <div className="text-red-400 text-lg font-bold">⛔ Akses Ditolak</div>
        <p className="text-zinc-500 text-sm">Halaman ini hanya untuk admin.</p>
        <a href="/" className="text-blue-400 text-sm underline">Kembali ke Beranda</a>
      </div>
    );
  }

  return children;
}
