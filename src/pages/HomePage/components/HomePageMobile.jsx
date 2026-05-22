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

export default function HomePageMobile() {
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
        <div className="absolute top-[30%] left-[30%] w-[200px] h-[200px] bg-blue-600/10 rounded-full blur-[80px] pointer-events-none"></div>
        <div className="relative z-10 flex flex-col items-center gap-4">
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 border-4 border-zinc-800 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-t-blue-500 rounded-full animate-spin"></div>
          </div>
          <p className="text-zinc-400 text-xs font-medium tracking-wide animate-pulse">Menyiapkan Simulasi Boyman...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#030303] flex flex-col items-center justify-center p-6 font-sans relative overflow-hidden">
        <div className="absolute top-[30%] left-[30%] w-[200px] h-[200px] bg-red-600/5 rounded-full blur-[80px] pointer-events-none"></div>
        <div className="relative z-10 w-full max-w-sm bg-zinc-950/40 backdrop-blur-xl border border-zinc-900/80 rounded-3xl p-6 text-center shadow-xl">
          <div className="w-14 h-14 bg-red-500/10 border border-red-500/20 text-red-500 rounded-full flex items-center justify-center mx-auto mb-5">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Terjadi Kesalahan</h3>
          <p className="text-zinc-400 text-xs mb-5 leading-relaxed">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="w-full py-2.5 bg-zinc-900 hover:bg-zinc-805 text-white border border-zinc-800 rounded-xl font-semibold text-sm transition-all duration-300"
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
      <div className="absolute inset-0 bg-[radial-gradient(#1f2937_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none"></div>

      {/* Subtle Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[80px] pointer-events-none"></div>

      <div className="flex-grow p-6 mt-8 relative z-10">
        
        {/* Header */}
        <div className="mb-8 border-b border-zinc-800/40 pb-5 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-semibold uppercase tracking-wider mb-2">
            <span>Dashboard Kuis</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight leading-tight">Pilih Simulasi</h1>
          <p className="text-zinc-400 mt-1.5 text-xs font-light leading-relaxed">Pilih bab spesifik Buku Boyman untuk menguji kesiapan Anda.</p>
        </div>

        {/* === SOAL GABUNGAN (SPESIAL) === */}
        {gabunganChapter && (
          <div className="mb-6 relative z-10">
            <button
              onClick={() => navigate(`/chapter/${gabunganChapter.chapter}`)}
              className="w-full bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-red-500/10 backdrop-blur-xl p-5.5 rounded-3xl border border-amber-500/30 flex flex-col items-start gap-3 active:bg-amber-500/15 transition-all text-left shadow-lg relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-[40px] pointer-events-none"></div>
              <div className="flex items-center justify-between w-full relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center border border-amber-500/30">
                    <Zap size={18} className="text-amber-400 animate-pulse" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-white tracking-wide">Soal Gabungan</h3>
                      <span className="inline-flex items-center gap-1 text-[8px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full font-bold border border-amber-500/30 uppercase tracking-wider">
                        <span className="w-1 h-1 rounded-full bg-amber-400 animate-ping"></span>
                        <span>Ujian</span>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full border border-zinc-850 bg-zinc-950/50 flex items-center justify-center text-zinc-400">
                  <ArrowRight size={14} />
                </div>
              </div>
              
              <p className="text-xs text-amber-200/60 font-light leading-relaxed relative z-10">
                Campuran soal acak dari seluruh bab Buku Boyman. Uji kesiapan materi secara menyeluruh.
              </p>

              <div className="mt-2 pt-3 border-t border-amber-500/25 w-full flex justify-between items-center relative z-10 text-[10px]">
                <div className="flex items-center gap-1.5 text-amber-400/80">
                  <Target size={12} />
                  <span className="font-semibold">{gabunganChapter.questionCount} Soal</span>
                </div>
                <div className="flex items-center gap-1.5 text-amber-400/80">
                  <Timer size={12} />
                  <span className="font-semibold">10 Menit</span>
                </div>
              </div>
            </button>
          </div>
        )}

        {/* === SEPARATOR === */}
        <div className="flex items-center gap-3 mb-6 relative z-10">
          <div className="h-px flex-1 bg-zinc-900/50"></div>
          <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest px-1">Simulasi Per Bab</span>
          <div className="h-px flex-1 bg-zinc-900/50"></div>
        </div>

        {/* === BAB-BAB REGULER === */}
        <div className="flex flex-col gap-4 relative z-10 mb-16">
          {regularChapters.map((ch) => (
            <button
              key={ch.chapter}
              onClick={() => navigate(`/chapter/${ch.chapter}`)}
              className="bg-zinc-950/40 backdrop-blur-xl p-5 rounded-2xl border border-zinc-850/80 flex items-center justify-between hover:bg-zinc-900/40 active:scale-[0.99] transition-all text-left shadow-md group relative overflow-hidden"
            >
              {/* Circle badge and titles */}
              <div className="flex items-center gap-4 relative z-10 flex-1">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-500/10 to-indigo-500/15 border border-zinc-800 text-blue-400 font-extrabold text-base flex items-center justify-center">
                  {ch.chapter}
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-white tracking-wide">
                    Bab {ch.chapter}
                  </h3>
                  <p className="text-[11px] text-zinc-400 font-normal leading-relaxed mt-0.5 max-w-[200px] truncate">
                    {CHAPTER_TITLES[ch.chapter] ? formatTitle(CHAPTER_TITLES[ch.chapter]) : `Materi Kepramukaan Bab ${ch.chapter}`}
                  </p>
                </div>
              </div>
              
              {/* Question count and navigate icon */}
              <div className="flex items-center gap-4 relative z-10">
                <div className="flex flex-col items-end gap-1.5 text-[10px] text-zinc-500">
                  <span className="font-semibold text-indigo-400/80 bg-zinc-900/40 px-2 py-0.5 rounded-md border border-zinc-800/60">{ch.questionCount} Soal</span>
                </div>
                <div className="w-7 h-7 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-blue-400">
                  <ArrowRight size={12} />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
