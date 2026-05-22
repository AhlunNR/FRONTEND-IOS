import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchMyHistory } from '@/services/api';
import { useAuth } from '@/contexts/AuthContext';
import { ArrowLeft, History, CheckCircle2, XCircle, Timer, Clock } from 'lucide-react';
import { formatTime } from '@/utils/formatTime';
import Footer from '@/components/Footer';

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

// Helper function to format titles cleanly to Title Case
const formatTitle = (title) => {
  if (!title) return '';
  return title
    .toLowerCase()
    .split(' ')
    .map((word) => {
      if (word.startsWith('p3k')) return 'P3K';
      if (word === 'dan' || word === 'di') return word;
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
};

const getGradeInfo = (grade) => {
  if (grade === 'A') return { grade: 'A', color: 'text-emerald-400', bg: 'bg-emerald-500/5 border-emerald-500/20' };
  if (grade === 'B') return { grade: 'B', color: 'text-blue-400', bg: 'bg-blue-500/5 border-blue-500/20' };
  if (grade === 'C') return { grade: 'C', color: 'text-amber-400', bg: 'bg-amber-500/5 border-amber-500/20' };
  return { grade: 'D', color: 'text-rose-400', bg: 'bg-rose-500/5 border-rose-500/20' };
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
    <div className="min-h-screen bg-[#050505] text-zinc-300 flex flex-col font-sans relative">
      <div className="flex-grow p-6 md:p-8 pt-16 md:pt-20 relative z-10 max-w-3xl mx-auto w-full">
        {/* Header */}
        <div className="mb-10 border-b border-zinc-800 pb-6 flex items-start gap-4">
          <button 
            onClick={() => navigate(-1)}
            className="w-9 h-9 md:w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:bg-zinc-800 transition-colors flex items-center justify-center flex-shrink-0 mt-1"
          >
            <ArrowLeft size={18} className="text-zinc-400" />
          </button>
          <div>
            <div className="inline-flex items-center px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <span>Aktivitas Kuis</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white leading-tight">Riwayat Kuis</h1>
            <p className="text-zinc-500 text-xs md:text-sm mt-1 leading-relaxed">Catatan nilai kuis yang tersimpan secara terstruktur di akun Anda.</p>
          </div>
        </div>

        {loading && (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <div className="w-8 h-8 border-2 border-zinc-800 border-t-zinc-400 rounded-full animate-spin"></div>
            <p className="text-zinc-500 text-xs font-medium tracking-wide">Memuat riwayat...</p>
          </div>
        )}

        {error && (
          <div className="bg-rose-500/5 border border-rose-500/10 rounded-xl p-4 text-center">
            <p className="text-rose-400 text-sm font-medium">{error}</p>
          </div>
        )}

        {!loading && !error && history.length === 0 && (
          <div className="flex flex-col items-center justify-center mt-20 text-center">
            <div className="w-20 h-20 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-center mb-5 shadow-sm">
              <History size={32} className="text-zinc-500" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Belum Ada Riwayat</h3>
            <p className="text-zinc-500 text-xs max-w-[280px] leading-relaxed font-normal">
              Selesaikan kuis di menu simulasi terlebih dahulu untuk melihat hasil evaluasi Anda di sini.
            </p>
            <button 
              onClick={() => navigate('/simulasi')}
              className="mt-6 px-5 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 rounded-lg font-semibold text-xs transition-colors shadow-sm"
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
                <div key={item.id} className="bg-zinc-900/30 border border-zinc-850 rounded-xl p-5 hover:border-zinc-700 transition-colors duration-200 flex flex-col justify-between relative overflow-hidden">
                  <div className="flex justify-between items-start mb-4 relative z-10">
                    <div>
                      <div className="flex items-center gap-2 mb-2.5">
                        <span className={`text-[9px] px-2 py-0.5 rounded font-bold border ${gradeInfo.bg} ${gradeInfo.color} uppercase tracking-wider`}>
                          Grade {gradeInfo.grade}
                        </span>
                        <span className="bg-zinc-900 border border-zinc-800 text-zinc-400 text-[9px] px-2 py-0.5 rounded font-semibold uppercase tracking-wider">
                          {item.chapter === 99 ? 'Gabungan' : `Bab ${item.chapter}`}
                        </span>
                      </div>
                      <h3 className="text-sm font-bold text-white line-clamp-1 mb-1.5">
                        {CHAPTER_TITLES[item.chapter] ? formatTitle(CHAPTER_TITLES[item.chapter]) : `Materi Bab ${item.chapter}`}
                      </h3>
                      <p className="text-xs text-zinc-500 flex items-center gap-1.5 font-normal">
                        <Clock size={12} className="text-zinc-400" />
                        {formattedDate} • {formattedTime}
                      </p>
                    </div>
                    <div className="flex flex-col items-center justify-center flex-shrink-0 ml-4">
                      <span className={`text-3xl font-bold tracking-tight ${gradeInfo.color}`}>{item.score}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-zinc-850/80 relative z-10">
                    <div className="flex flex-col items-center p-2 rounded-lg bg-zinc-900/50 border border-zinc-850/40">
                      <CheckCircle2 size={15} className="text-emerald-500 mb-1" />
                      <span className="text-[9px] text-zinc-500 font-semibold uppercase tracking-wider mb-0.5">Benar</span>
                      <span className="text-xs font-bold text-white">{item.correct_count}</span>
                    </div>
                    <div className="flex flex-col items-center p-2 rounded-lg bg-zinc-900/50 border border-zinc-850/40">
                      <XCircle size={15} className="text-rose-500 mb-1" />
                      <span className="text-[9px] text-zinc-500 font-semibold uppercase tracking-wider mb-0.5">Salah</span>
                      <span className="text-xs font-bold text-white">{item.wrong_count}</span>
                    </div>
                    <div className="flex flex-col items-center p-2 rounded-lg bg-zinc-900/50 border border-zinc-850/40">
                      <Timer size={15} className="text-blue-500 mb-1" />
                      <span className="text-[9px] text-zinc-500 font-semibold uppercase tracking-wider mb-0.5">Waktu</span>
                      <span className="text-xs font-bold text-white">{formatTime(item.time_spent || 0)}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
