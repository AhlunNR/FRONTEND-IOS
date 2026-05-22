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
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center font-sans">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-2 border-zinc-800 border-t-zinc-400 rounded-full animate-spin"></div>
          <p className="text-zinc-500 text-xs font-medium tracking-wide">Memuat data simulasi...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center p-8 font-sans">
        <div className="max-w-md w-full bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 text-center shadow-lg">
          <h3 className="text-base font-bold text-white mb-2">Terjadi Kesalahan</h3>
          <p className="text-zinc-400 text-xs mb-5 leading-relaxed">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="w-full py-2 bg-zinc-800 hover:bg-zinc-750 text-white border border-zinc-700 rounded-lg font-semibold text-xs transition-colors"
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
      <div className="flex-grow p-8 mt-16 relative z-10 max-w-5xl mx-auto w-full">
        
        {/* Header */}
        <div className="mb-10 border-b border-zinc-800 pb-6">
          <div className="inline-flex items-center px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <span>Simulasi Pembelajaran</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white leading-tight">Pilih Kuis Simulasi</h1>
          <p className="text-zinc-500 text-sm mt-1 leading-relaxed">Pilih bab Buku Boyman untuk menguji kesiapan pemahaman Anda.</p>
        </div>

        {/* === SOAL GABUNGAN (SPESIAL - ACCENT LEFT BORDER) === */}
        {gabunganChapter && (
          <div className="mb-10">
            <div className="w-full border-l-4 border-l-amber-500 bg-zinc-900/40 border border-zinc-800 rounded-xl p-6 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-amber-500 flex-shrink-0">
                  <Zap size={22} />
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-bold text-white">Soal Gabungan</h3>
                    <span className="text-[9px] bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded font-semibold uppercase tracking-wider">
                      Ujian
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 mt-1 leading-relaxed max-w-xl">
                    Campuran soal acak dari seluruh bab Buku Boyman secara menyeluruh. Simulasi terbaik untuk menguji kesiapan materi.
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-6 flex-shrink-0">
                <div className="flex flex-col items-end gap-1.5 text-zinc-500 text-[11px]">
                  <div className="flex items-center gap-1.5">
                    <Target size={12} />
                    <span className="font-medium">{gabunganChapter.questionCount} Soal</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Timer size={12} />
                    <span className="font-medium">10 Menit</span>
                  </div>
                </div>
                <button
                  onClick={() => navigate(`/chapter/${gabunganChapter.chapter}`)}
                  className="px-4 py-2 bg-white text-zinc-950 hover:bg-zinc-200 font-semibold text-xs rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
                >
                  <span>Mulai Ujian</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* === SEPARATOR === */}
        <div className="flex items-center gap-4 mb-8">
          <div className="h-px flex-1 bg-zinc-900/50"></div>
          <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest px-2">Simulasi Per Bab</span>
          <div className="h-px flex-1 bg-zinc-900/50"></div>
        </div>

        {/* === BAB-BAB REGULER === */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {regularChapters.map((ch) => (
            <button
              key={ch.chapter}
              onClick={() => navigate(`/chapter/${ch.chapter}`)}
              className="bg-zinc-900/30 border border-zinc-850 hover:border-zinc-700 transition-colors duration-200 rounded-xl p-5 flex flex-col justify-between min-h-[170px] text-left group"
            >
              <div>
                <div className="flex items-center justify-between w-full mb-4">
                  <div className="w-9 h-9 bg-zinc-900 border border-zinc-800 text-zinc-300 font-bold text-sm rounded-lg flex items-center justify-center">
                    {ch.chapter}
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-zinc-400">
                    <ArrowRight size={14} />
                  </div>
                </div>
                
                <h3 className="text-base font-bold text-white group-hover:text-zinc-200 transition-colors mb-1.5">
                  Bab {ch.chapter}
                </h3>
                
                <p className="text-xs text-zinc-400 font-normal leading-relaxed min-h-[32px]">
                  {CHAPTER_TITLES[ch.chapter] ? formatTitle(CHAPTER_TITLES[ch.chapter]) : `Materi Kepramukaan Bab ${ch.chapter}`}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-zinc-900/80 w-full flex justify-between items-center text-[11px] text-zinc-500">
                <div className="flex items-center gap-1">
                  <Target size={12} className="text-zinc-400" />
                  <span>{ch.questionCount} Soal</span>
                </div>
                <div className="flex items-center gap-1">
                  <Timer size={12} className="text-zinc-400" />
                  <span>10 Menit</span>
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
