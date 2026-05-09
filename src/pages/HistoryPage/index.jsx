import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchMyHistory } from '@/services/api';
import { useAuth } from '@/contexts/AuthContext';
import { ArrowLeft, History, CheckCircle2, XCircle, Timer, Clock } from 'lucide-react';
import { formatTime } from '@/utils/formatTime';

const CHAPTER_TITLES = {
  1: 'PENGERTIAN, SIFAT, FUNGSI',
  3: 'BIOGRAFI BADEN-POWELL',
  5: 'SCOUTING FOR BOYS',
  9: 'BERKEMAH (HIDUP DI ALAM BEBAS)',
  12: 'MORSE',
  15: 'MEMBACA PETA (NAVIGASI)',
  20: 'SANDI PRAMUKA',
  24: 'P3K dan KESEHATAN',
  99: 'SOAL GABUNGAN',
};

const getGradeInfo = (grade) => {
  if (grade === 'A') return { grade: 'A', color: 'text-green-400', bg: 'bg-green-400/10 border-green-400/20' };
  if (grade === 'B') return { grade: 'B', color: 'text-blue-400', bg: 'bg-blue-400/10 border-blue-400/20' };
  if (grade === 'C') return { grade: 'C', color: 'text-orange-400', bg: 'bg-orange-400/10 border-orange-400/20' };
  return { grade: 'D', color: 'text-red-400', bg: 'bg-red-400/10 border-red-400/20' };
};

export default function HistoryPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchMyHistory();
        setHistory(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-300 flex flex-col font-sans relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="p-6 pt-16 relative z-10 flex-grow">
        <div className="flex items-center gap-3 mb-6">
          <button 
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center active:bg-zinc-800 flex-shrink-0"
          >
            <ArrowLeft size={20} className="text-zinc-400" />
          </button>
          <div className="flex-1">
            <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
              <History className="text-blue-500" size={24} />
              Riwayat Kuis
            </h1>
            <p className="text-zinc-500 mt-0.5 text-xs font-light leading-relaxed">
              Catatan nilai kuis yang tersimpan di akun Anda.
            </p>
          </div>
        </div>

        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="text-zinc-400 text-sm animate-pulse">Memuat riwayat...</div>
          </div>
        )}

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4 text-center">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        {!loading && !error && history.length === 0 && (
          <div className="flex flex-col items-center justify-center mt-20 text-center">
            <div className="w-24 h-24 bg-zinc-900/50 rounded-full flex items-center justify-center mb-4 border border-zinc-800 shadow-xl">
              <History size={40} className="text-zinc-600" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Belum ada riwayat</h3>
            <p className="text-zinc-500 text-sm max-w-[250px] leading-relaxed">
              Selesaikan kuis di menu simulasi untuk melihat hasilnya di sini.
            </p>
            <button 
              onClick={() => navigate('/simulasi')}
              className="mt-8 px-6 py-3 bg-blue-600/10 text-blue-400 border border-blue-600/30 rounded-full font-bold active:bg-blue-600/20"
            >
              Mulai Simulasi
            </button>
          </div>
        )}

        {!loading && !error && history.length > 0 && (
          <div className="flex flex-col gap-4 pb-20">
            {history.map((item) => {
              const gradeInfo = getGradeInfo(item.grade);
              const dateObj = new Date(item.created_at);
              const formattedDate = dateObj.toLocaleDateString('id-ID', {
                day: 'numeric', month: 'short', year: 'numeric'
              });
              const formattedTime = dateObj.toLocaleTimeString('id-ID', {
                hour: '2-digit', minute: '2-digit'
              });

              return (
                <div key={item.id} className="bg-zinc-900/40 backdrop-blur-xl p-5 rounded-3xl border border-zinc-800/50 shadow-lg relative overflow-hidden">
                  <div className={`absolute top-0 right-0 w-24 h-24 blur-[40px] opacity-20 pointer-events-none ${gradeInfo.bg.split(' ')[0]}`}></div>
                  
                  <div className="flex justify-between items-start mb-4 relative z-10">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${gradeInfo.bg} ${gradeInfo.color}`}>
                          Grade {gradeInfo.grade}
                        </span>
                        <span className="bg-zinc-800 border border-zinc-700 text-zinc-300 text-[10px] px-2 py-0.5 rounded-full font-bold">
                          {item.chapter === 99 ? 'Gabungan' : `Bab ${item.chapter}`}
                        </span>
                      </div>
                      <h3 className="text-sm font-bold text-white line-clamp-1 mb-1">
                        {CHAPTER_TITLES[item.chapter] || `Materi Bab ${item.chapter}`}
                      </h3>
                      <p className="text-xs text-zinc-500 flex items-center gap-1 font-medium">
                        <Clock size={12} />
                        {formattedDate} • {formattedTime}
                      </p>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                      <span className={`text-3xl font-black tracking-tighter ${gradeInfo.color}`}>{item.score}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-zinc-800/50 relative z-10">
                    <div className="flex flex-col items-center p-2 rounded-xl bg-zinc-900/50 border border-zinc-800/30">
                      <CheckCircle2 size={16} className="text-green-500 mb-1" />
                      <span className="text-[10px] text-zinc-500 font-medium uppercase tracking-wider mb-0.5">Benar</span>
                      <span className="text-sm font-bold text-white">{item.correct_count}</span>
                    </div>
                    <div className="flex flex-col items-center p-2 rounded-xl bg-zinc-900/50 border border-zinc-800/30">
                      <XCircle size={16} className="text-red-500 mb-1" />
                      <span className="text-[10px] text-zinc-500 font-medium uppercase tracking-wider mb-0.5">Salah</span>
                      <span className="text-sm font-bold text-white">{item.wrong_count}</span>
                    </div>
                    <div className="flex flex-col items-center p-2 rounded-xl bg-zinc-900/50 border border-zinc-800/30">
                      <Timer size={16} className="text-blue-500 mb-1" />
                      <span className="text-[10px] text-zinc-500 font-medium uppercase tracking-wider mb-0.5">Waktu</span>
                      <span className="text-sm font-bold text-white">{formatTime(item.time_spent || 0)}</span>
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
