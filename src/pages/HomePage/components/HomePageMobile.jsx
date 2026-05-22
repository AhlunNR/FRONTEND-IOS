import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchChapters } from '@/services/api';
import Footer from '@/components/Footer';
import { Target, Timer, Zap, ArrowRight } from 'lucide-react';

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
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center font-sans">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-zinc-800 border-t-zinc-400 rounded-full animate-spin"></div>
          <p className="text-zinc-500 text-[11px] font-medium tracking-wide">Memuat data simulasi...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center p-6 font-sans">
        <div className="w-full max-w-sm bg-zinc-900/50 border border-zinc-800 rounded-xl p-5 text-center shadow-lg">
          <h3 className="text-base font-bold text-white mb-2">Terjadi Kesalahan</h3>
          <p className="text-zinc-400 text-xs mb-5 leading-relaxed">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="w-full py-2 bg-zinc-800 hover:bg-zinc-750 text-white border border-zinc-750 rounded-lg font-semibold text-xs transition-colors"
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
    <div className="min-h-screen bg-[#050505] text-zinc-300 flex flex-col font-sans relative">
      <div className="flex-grow p-6 mt-8 relative z-10 w-full">
        
        {/* Header */}
        <div className="mb-8 border-b border-zinc-800 pb-5">
          <div className="inline-flex items-center px-2.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 text-[10px] font-semibold uppercase tracking-wider mb-2">
            <span>Simulasi Pembelajaran</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white leading-tight">Pilih Kuis Simulasi</h1>
          <p className="text-zinc-500 text-xs mt-1.5 leading-relaxed">Pilih bab Buku Boyman untuk menguji kesiapan pemahaman Anda.</p>
        </div>

        {/* === SOAL GABUNGAN (SPESIAL - ACCENT LEFT BORDER) === */}
        {gabunganChapter && (
          <div className="mb-6">
            <button
              onClick={() => navigate(`/chapter/${gabunganChapter.chapter}`)}
              className="w-full text-left border-l-4 border-l-amber-500 bg-zinc-900/40 border border-zinc-800 rounded-xl p-5 flex flex-col gap-3 shadow-sm active:bg-zinc-900/60 transition-colors"
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-amber-500">
                    <Zap size={18} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-white">Soal Gabungan</h3>
                      <span className="text-[8px] bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded font-semibold uppercase tracking-wider">
                        Ujian
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-zinc-400">
                  <ArrowRight size={14} />
                </div>
              </div>
              
              <p className="text-xs text-zinc-400 leading-relaxed">
                Campuran soal acak dari seluruh bab Buku Boyman. Uji kesiapan materi secara menyeluruh.
              </p>

              <div className="mt-1 pt-3 border-t border-zinc-800/80 w-full flex justify-between items-center text-[10px] text-zinc-500">
                <div className="flex items-center gap-1">
                  <Target size={12} className="text-zinc-400" />
                  <span>{gabunganChapter.questionCount} Soal</span>
                </div>
                <div className="flex items-center gap-1">
                  <Timer size={12} className="text-zinc-400" />
                  <span>10 Menit</span>
                </div>
              </div>
            </button>
          </div>
        )}

        {/* === SEPARATOR === */}
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px flex-1 bg-zinc-900/50"></div>
          <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest px-1">Simulasi Per Bab</span>
          <div className="h-px flex-1 bg-zinc-900/50"></div>
        </div>

        {/* === BAB-BAB REGULER === */}
        <div className="flex flex-col gap-4 mb-16">
          {regularChapters.map((ch) => (
            <button
              key={ch.chapter}
              onClick={() => navigate(`/chapter/${ch.chapter}`)}
              className="bg-zinc-900/20 border border-zinc-850 active:bg-zinc-900/30 rounded-xl p-4 flex items-center justify-between text-left group transition-colors duration-150"
            >
              <div className="flex items-center gap-4 flex-1">
                <div className="w-9 h-9 bg-zinc-900 border border-zinc-800 text-zinc-300 font-bold text-sm rounded-lg flex items-center justify-center flex-shrink-0">
                  {ch.chapter}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-white truncate">
                    Bab {ch.chapter}
                  </h3>
                  <p className="text-[11px] text-zinc-400 font-normal mt-0.5 truncate pr-2">
                    {CHAPTER_TITLES[ch.chapter] ? formatTitle(CHAPTER_TITLES[ch.chapter]) : `Materi Kepramukaan Bab ${ch.chapter}`}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 flex-shrink-0">
                <span className="text-[10px] font-semibold text-zinc-500 bg-zinc-900/40 px-2 py-0.5 rounded border border-zinc-800/60">
                  {ch.questionCount} Soal
                </span>
                <div className="text-zinc-500 group-hover:text-zinc-300 transition-colors">
                  <ArrowRight size={14} />
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
