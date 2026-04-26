import React, { useEffect, useState } from 'react';
import { fetchAllHistory } from '@/services/api';
import { formatTime } from '@/utils/formatTime';
import { Shield, RefreshCcw, Users, BarChart3, Clock, CheckCircle2, XCircle, Timer } from 'lucide-react';

const CHAPTER_TITLES = {
  1: 'PENGERTIAN, SIFAT, FUNGSI',
  3: 'BIOGRAFI BADEN-POWELL',
  5: 'SCOUTING FOR BOYS',
  9: 'BERKEMAH (HIDUP DI ALAM BEBAS)',
  12: 'MORSE',
  15: 'MEMBACA PETA (NAVIGASI)',
  20: 'SANDI PRAMUKA',
  24: 'P3K dan KESEHATAN',
};

const getGradeInfo = (grade) => {
  switch (grade) {
    case 'A': return { color: 'text-green-400', bg: 'bg-green-400/10 border-green-400/20', ringColor: 'ring-green-400/30' };
    case 'B': return { color: 'text-blue-400', bg: 'bg-blue-400/10 border-blue-400/20', ringColor: 'ring-blue-400/30' };
    case 'C': return { color: 'text-orange-400', bg: 'bg-orange-400/10 border-orange-400/20', ringColor: 'ring-orange-400/30' };
    default: return { color: 'text-red-400', bg: 'bg-red-400/10 border-red-400/20', ringColor: 'ring-red-400/30' };
  }
};

export default function AdminPage() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadHistory = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchAllHistory();
      setHistory(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  // Stats
  const totalAttempts = history.length;
  const uniqueDevices = new Set(history.map(h => h.device_id)).size;
  const avgScore = totalAttempts > 0
    ? Math.round(history.reduce((sum, h) => sum + h.score, 0) / totalAttempts)
    : 0;

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-300 font-sans relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-[-5%] left-[-5%] w-80 h-80 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-96 h-96 bg-blue-600/8 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="p-5 md:p-8 relative z-10 max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
              <Shield size={24} className="text-purple-400" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">Admin Panel</h1>
              <p className="text-xs text-zinc-500 font-medium">Monitoring Riwayat Kuis</p>
            </div>
          </div>
          <button
            onClick={loadHistory}
            disabled={loading}
            className="px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-400 active:bg-zinc-800 flex items-center gap-2 text-sm font-bold disabled:opacity-50"
          >
            <RefreshCcw size={16} className={loading ? 'animate-spin' : ''} />
            Refresh
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          <div className="bg-zinc-900/40 backdrop-blur-xl rounded-2xl border border-zinc-800/50 p-4 flex flex-col items-center">
            <BarChart3 size={20} className="text-blue-400 mb-2" />
            <span className="text-2xl font-black text-white">{totalAttempts}</span>
            <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider mt-1">Total Kuis</span>
          </div>
          <div className="bg-zinc-900/40 backdrop-blur-xl rounded-2xl border border-zinc-800/50 p-4 flex flex-col items-center">
            <Users size={20} className="text-purple-400 mb-2" />
            <span className="text-2xl font-black text-white">{uniqueDevices}</span>
            <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider mt-1">Perangkat</span>
          </div>
          <div className="bg-zinc-900/40 backdrop-blur-xl rounded-2xl border border-zinc-800/50 p-4 flex flex-col items-center">
            <BarChart3 size={20} className="text-green-400 mb-2" />
            <span className="text-2xl font-black text-white">{avgScore}</span>
            <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider mt-1">Rata-rata</span>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4 mb-6 text-center">
            <p className="text-red-400 text-sm font-medium">{error}</p>
            <button onClick={loadHistory} className="text-red-300 underline text-xs mt-2">Coba lagi</button>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="text-zinc-400 text-base font-light tracking-widest animate-pulse">Memuat data...</div>
          </div>
        )}

        {/* Data Table */}
        {!loading && !error && history.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Shield size={48} className="text-zinc-700 mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">Belum ada data</h3>
            <p className="text-zinc-500 text-sm">Belum ada kuis yang dikerjakan oleh client.</p>
          </div>
        )}

        {!loading && !error && history.length > 0 && (
          <div className="flex flex-col gap-3 pb-20">
            {history.map((item) => {
              const gradeInfo = getGradeInfo(item.grade);
              const dateObj = new Date(item.created_at);
              const formattedDate = dateObj.toLocaleDateString('id-ID', {
                day: 'numeric', month: 'short', year: 'numeric'
              });
              const formattedTime = dateObj.toLocaleTimeString('id-ID', {
                hour: '2-digit', minute: '2-digit'
              });
              const shortDeviceId = item.device_id?.substring(0, 16) + '...';

              return (
                <div key={item.id} className={`bg-zinc-900/40 backdrop-blur-xl p-5 rounded-2xl border border-zinc-800/50 shadow-lg relative overflow-hidden`}>
                  {/* Subtle glow */}
                  <div className={`absolute top-0 right-0 w-20 h-20 blur-[30px] opacity-20 pointer-events-none ${gradeInfo.bg.split(' ')[0]}`}></div>

                  <div className="flex justify-between items-start mb-3 relative z-10">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${gradeInfo.bg} ${gradeInfo.color}`}>
                          {item.grade}
                        </span>
                        <span className="bg-zinc-800 border border-zinc-700 text-zinc-300 text-[10px] px-2 py-0.5 rounded-full font-bold">
                          Bab {item.chapter}
                        </span>
                      </div>
                      <h3 className="text-sm font-bold text-white truncate">
                        {CHAPTER_TITLES[item.chapter] || `Materi Bab ${item.chapter}`}
                      </h3>
                      <p className="text-[10px] text-zinc-500 mt-1 flex items-center gap-1 font-medium">
                        <Clock size={10} />
                        {formattedDate} • {formattedTime}
                      </p>
                      <p className="text-[10px] text-zinc-600 mt-0.5 font-mono truncate" title={item.device_id}>
                        📱 {shortDeviceId}
                      </p>
                    </div>
                    <div className="flex flex-col items-center ml-4 flex-shrink-0">
                      <span className={`text-3xl font-black tracking-tighter ${gradeInfo.color}`}>{item.score}</span>
                      <span className="text-[9px] text-zinc-600 font-bold">/100</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-3 border-t border-zinc-800/50 relative z-10">
                    <div className="flex flex-col items-center p-1.5 rounded-lg bg-zinc-900/50 border border-zinc-800/30">
                      <CheckCircle2 size={14} className="text-green-500 mb-0.5" />
                      <span className="text-[9px] text-zinc-500 font-medium">Benar</span>
                      <span className="text-xs font-bold text-white">{item.correct_count}</span>
                    </div>
                    <div className="flex flex-col items-center p-1.5 rounded-lg bg-zinc-900/50 border border-zinc-800/30">
                      <XCircle size={14} className="text-red-500 mb-0.5" />
                      <span className="text-[9px] text-zinc-500 font-medium">Salah</span>
                      <span className="text-xs font-bold text-white">{item.wrong_count}</span>
                    </div>
                    <div className="flex flex-col items-center p-1.5 rounded-lg bg-zinc-900/50 border border-zinc-800/30">
                      <Timer size={14} className="text-blue-500 mb-0.5" />
                      <span className="text-[9px] text-zinc-500 font-medium">Waktu</span>
                      <span className="text-xs font-bold text-white">{formatTime(item.time_spent || 0)}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
