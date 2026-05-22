import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchChapters } from '@/services/api';
import Footer from '@/components/Footer';
import { Target, Timer, Zap, ArrowRight, Sparkles } from 'lucide-react';

const CHAPTER_TITLES = {
  1: 'PENGERTIAN, SIFAT, DAN FUNGSI',
  3: 'BIOGRAFI BADEN-POWELL',
  5: 'SCOUTING FOR BOYS',
  9: 'BERKEMAH (HIDUP DI ALAM BEBAS)',
  12: 'MORSE',
  15: 'MEMBACA PETA (NAVIGASI)',
  20: 'SANDI PRAMUKA',
  24: 'P3K DAN KESEHATAN',
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

export default function HomePageDesktop() {
  const navigate = useNavigate();
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadChapters = async () => {
      try {
        const data = await fetchChapters();
        setChapters(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadChapters();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#030303] flex flex-col items-center justify-center font-sans relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-[30%] left-[30%] w-[300px] h-[300px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="relative z-10 flex flex-col items-center gap-4">
          <div className="relative w-14 h-14">
            <div className="absolute inset-0 border-4 border-zinc-800 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-t-blue-500 rounded-full animate-spin"></div>
          </div>
          <p className="text-zinc-400 text-sm font-medium tracking-wide animate-pulse">Menyiapkan Simulasi Boyman...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#030303] flex flex-col items-center justify-center p-8 font-sans relative overflow-hidden">
        <div className="absolute top-[30%] left-[30%] w-[300px] h-[300px] bg-red-600/5 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="relative z-10 max-w-md w-full bg-zinc-950/40 backdrop-blur-xl border border-zinc-900/80 rounded-3xl p-8 text-center shadow-2xl">
          <div className="w-16 h-16 bg-red-500/10 border border-red-500/20 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Terjadi Kesalahan</h3>
          <p className="text-zinc-400 text-sm mb-6 leading-relaxed">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="w-full py-3 bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-800 rounded-xl font-semibold transition-all duration-300"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  const regularChapters = chapters.filter(ch => ch.chapter !== 99);
  const gabunganChapter = chapters.find(ch => ch.chapter === 99);

  return (
    <div className="min-h-screen bg-[#030303] text-zinc-300 flex flex-col font-sans relative overflow-hidden">
      {/* Premium Background Dotted Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#1f2937_1px,transparent_1px)] [background-size:32px_32px] opacity-20 pointer-events-none"></div>

      {/* Layered Background Glows */}
      <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[130px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-15%] w-[650px] h-[650px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="flex-grow p-8 mt-16 relative z-10">
        <div className="max-w-5xl mx-auto mb-24">
          
          {/* Header */}
          <div className="mb-12 border-b border-zinc-800/40 pb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-4">
              <span>Dashboard Kuis</span>
            </div>
            <h1 className="text-5xl font-extrabold text-white tracking-tight leading-tight">Pilih Simulasi</h1>
            <p className="text-zinc-400 mt-2 text-base font-light">Pilih bab spesifik Buku Boyman untuk menguji kesiapan Anda.</p>
          </div>

          {/* === SOAL GABUNGAN (SPESIAL) === */}
          {gabunganChapter && (
            <div className="mb-10">
              <button
                onClick={() => navigate(`/chapter/${gabunganChapter.chapter}`)}
                className="w-full bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-red-500/10 backdrop-blur-xl p-8 rounded-3xl border border-amber-500/30 flex items-center gap-8 hover:border-amber-400/60 hover:bg-amber-500/15 hover:shadow-[0_10px_40px_rgba(245,158,11,0.1)] transition-all duration-350 hover:-translate-y-1 text-left relative overflow-hidden group"
              >
                {/* Glow aura on hover */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-[70px] pointer-events-none group-hover:scale-110 transition-transform duration-500"></div>
                
                <div className="w-16 h-16 rounded-2xl bg-amber-500/10 flex items-center justify-center border border-amber-500/30 flex-shrink-0 group-hover:bg-amber-500/20 transition-all duration-300 relative z-10 group-hover:scale-105">
                  <Zap size={28} className="text-amber-400 animate-pulse" />
                </div>
                
                <div className="flex-1 relative z-10">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-2xl font-bold text-white tracking-wide group-hover:text-amber-300 transition-colors">Soal Gabungan</h3>
                    <span className="inline-flex items-center gap-1.5 text-[10px] bg-amber-500/20 text-amber-300 px-2.5 py-0.5 rounded-full font-bold border border-amber-500/30 uppercase tracking-wider">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping"></span>
                      <span>Ujian</span>
                    </span>
                  </div>
                  <p className="text-sm text-amber-200/60 font-light leading-relaxed max-w-xl">
                    Campuran soal acak dari seluruh bab Buku Boyman. Simulasi terbaik untuk menguji kesiapan materi secara menyeluruh.
                  </p>
                </div>
                
                <div className="flex items-center gap-6 relative z-10 flex-shrink-0 pr-4">
                  <div className="flex flex-col gap-2.5 items-end text-zinc-400">
                    <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-zinc-950/50 border border-zinc-800/80 text-amber-400/80 text-xs">
                      <Target size={13} />
                      <span className="font-semibold">{gabunganChapter.questionCount} Soal</span>
                    </div>
                    <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-zinc-950/50 border border-zinc-800/80 text-amber-400/80 text-xs">
                      <Timer size={13} />
                      <span className="font-semibold">10 Menit</span>
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-full border border-zinc-850 bg-zinc-950/50 flex items-center justify-center text-zinc-400 group-hover:text-white group-hover:border-amber-400/40 group-hover:translate-x-1 transition-all duration-300">
                    <ArrowRight size={18} />
                  </div>
                </div>
              </button>
            </div>
          )}

          {/* === SEPARATOR === */}
          <div className="flex items-center gap-4 mb-10">
            <div className="h-px flex-1 bg-zinc-900/50"></div>
            <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest px-2">Simulasi Per Bab</span>
            <div className="h-px flex-1 bg-zinc-900/50"></div>
          </div>

          {/* === BAB-BAB REGULER === */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
            {regularChapters.map((ch) => (
              <button
                key={ch.chapter}
                onClick={() => navigate(`/chapter/${ch.chapter}`)}
                className="bg-zinc-950/40 backdrop-blur-xl p-7 rounded-3xl border border-zinc-850/80 flex flex-col justify-between hover:border-blue-500/30 hover:bg-zinc-900/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_35px_rgba(0,0,0,0.5)] text-left group relative overflow-hidden min-h-[220px]"
              >
                {/* Subtle top corner glow */}
                <div className="absolute -top-12 -right-12 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl group-hover:bg-blue-500/10 transition-all duration-350"></div>
                
                <div>
                  <div className="flex items-center justify-between w-full mb-5">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500/5 to-indigo-500/15 border border-zinc-800 text-blue-400 font-extrabold text-lg flex items-center justify-center group-hover:scale-110 group-hover:border-blue-400/30 group-hover:bg-blue-500/10 transition-all duration-300">
                      {ch.chapter}
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-2 w-7 h-7 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-blue-400 transition-all duration-300">
                      <ArrowRight size={14} />
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-bold text-white tracking-wide group-hover:text-blue-400 transition-colors mb-2">
                    Bab {ch.chapter}
                  </h3>
                  
                  <p className="text-xs text-zinc-400 font-normal leading-relaxed min-h-[36px]">
                    {CHAPTER_TITLES[ch.chapter] ? formatTitle(CHAPTER_TITLES[ch.chapter]) : `Materi Kepramukaan Bab ${ch.chapter}`}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-zinc-900/80 w-full flex justify-between items-center text-xs">
                  <div className="flex items-center gap-1.5 text-zinc-400 bg-zinc-900/40 px-2.5 py-1 rounded-lg border border-zinc-800/60">
                    <Target size={13} className="text-indigo-400/80" />
                    <span className="font-medium">{ch.questionCount} Soal</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-zinc-400 bg-zinc-900/40 px-2.5 py-1 rounded-lg border border-zinc-800/60">
                    <Timer size={13} className="text-blue-400/80" />
                    <span className="font-medium">10 Menit</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
