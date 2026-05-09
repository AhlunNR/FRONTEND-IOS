import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { ArrowLeft, User, Mail, Shield, Camera, Check, Loader2 } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function ProfilePage() {
  const navigate = useNavigate();
  const { user, profile, getAccessToken } = useAuth();
  const [fullName, setFullName] = useState('');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name || '');
    }
  }, [profile]);

  const handleSave = async () => {
    if (!fullName.trim()) {
      setMessage({ type: 'error', text: 'Nama tidak boleh kosong' });
      return;
    }

    setSaving(true);
    setMessage(null);

    try {
      const token = await getAccessToken();
      const res = await fetch(`${API_URL}/auth/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ fullName: fullName.trim() }),
      });

      const json = await res.json();

      if (json.success) {
        setMessage({ type: 'success', text: 'Profil berhasil diperbarui!' });
        // Refresh the page after 1.5s to update the profile in context
        setTimeout(() => window.location.reload(), 1500);
      } else {
        setMessage({ type: 'error', text: json.message || 'Gagal menyimpan' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Terjadi kesalahan jaringan' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-[#050505]/90 backdrop-blur-xl border-b border-zinc-800/50">
        <div className="max-w-lg mx-auto px-4 py-4 flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 rounded-xl bg-zinc-800/60 flex items-center justify-center hover:bg-zinc-700/60 transition-colors"
          >
            <ArrowLeft size={16} />
          </button>
          <h1 className="text-lg font-extrabold tracking-tight">Profil Saya</h1>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-8 space-y-6">
        {/* Avatar Section */}
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            {profile?.avatar_url ? (
              <img
                src={profile.avatar_url}
                alt="Avatar"
                className="w-24 h-24 rounded-full border-2 border-zinc-700 object-cover"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center border-2 border-zinc-700">
                <User size={36} className="text-white" />
              </div>
            )}
          </div>
          <div className="text-center">
            <p className="text-sm text-zinc-400">{profile?.email || user?.email}</p>
            <div className="flex items-center gap-1.5 justify-center mt-1">
              <Shield size={12} className={profile?.role === 'admin' ? 'text-amber-400' : 'text-zinc-600'} />
              <span className={`text-xs font-medium ${profile?.role === 'admin' ? 'text-amber-400' : 'text-zinc-500'}`}>
                {profile?.role === 'admin' ? 'Admin' : 'User'}
              </span>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="space-y-4">
          {/* Nama */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-2">
              <User size={12} />
              Nama Tampilan
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              maxLength={50}
              placeholder="Masukkan nama kamu..."
              className="w-full bg-zinc-900/60 border border-zinc-800/60 rounded-xl px-4 py-3 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all"
            />
            <p className="text-[10px] text-zinc-600">
              Nama ini akan ditampilkan di history dan admin panel. Max 50 karakter.
            </p>
          </div>

          {/* Email (read-only) */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-2">
              <Mail size={12} />
              Email
            </label>
            <input
              type="email"
              value={profile?.email || user?.email || ''}
              disabled
              className="w-full bg-zinc-900/30 border border-zinc-800/30 rounded-xl px-4 py-3 text-zinc-500 text-sm cursor-not-allowed"
            />
            <p className="text-[10px] text-zinc-600">
              Email dari Google. Tidak bisa diubah.
            </p>
          </div>

          {/* Message */}
          {message && (
            <div className={`rounded-xl px-4 py-3 text-sm font-medium border ${
              message.type === 'success'
                ? 'bg-green-500/10 border-green-500/20 text-green-400'
                : 'bg-red-500/10 border-red-500/20 text-red-400'
            }`}>
              {message.text}
            </div>
          )}

          {/* Save Button */}
          <button
            onClick={handleSave}
            disabled={saving || !fullName.trim()}
            className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition-all active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {saving ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Menyimpan...
              </>
            ) : (
              <>
                <Check size={16} />
                Simpan Perubahan
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
