import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchChapters } from '@/services/api';
import Footer from '@/components/Footer';
import { Target, Timer, Zap } from 'lucide-react';

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
      <div className="min-h-screen bg-[#050505] flex items-center justify-center font-sans">
        <div className="text-zinc-400 text-base font-light tracking-widest animate-pulse">Memuat data simulasi...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center p-6 font-sans">
        <p className="text-red-500 text-center mb-6 text-base">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-8 py-3 bg-zinc-800 text-white rounded-full font-medium active:bg-zinc-700 transition-colors border border-zinc-700 w-full"
        >
          Coba Lagi
        </button>
      </div>
    );
  }

  const regularChapters = chapters.filter(ch => ch.chapter !== 99);
  const gabunganChapter = chapters.find(ch => ch.chapter === 99);

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-300 flex flex-col font-sans relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[80px] pointer-events-none"></div>

      <div className="flex-grow p-6 mt-8 relative z-10">

        <div className="mb-10 border-b border-zinc-800/50 pb-4 relative z-10">
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Pilih Simulasi</h1>
          <p className="text-zinc-400 mt-2 text-sm font-light leading-relaxed">Pilih bab dari Buku Boyman untuk menguji kemampuan Anda.</p>
        </div>

        {/* === SOAL GABUNGAN (SPESIAL) === */}
        {gabunganChapter && (
          <div className="mb-8 relative z-10">
            <button
              onClick={() => navigate(`/chapter/${gabunganChapter.chapter}`)}
              className="w-full bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-red-500/10 backdrop-blur-xl p-6 rounded-3xl border border-amber-500/30 flex flex-col items-start gap-4 active:border-amber-400/60 active:bg-amber-500/10 transition-all text-left shadow-lg shadow-amber-500/5 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-[50px] pointer-events-none"></div>
              <div className="flex items-center gap-4 w-full relative z-10">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center border border-amber-500/30">
                  <Zap size={22} className="text-amber-400" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-white tracking-wide">Soal Gabungan</h3>
                    <span className="text-[9px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full font-bold border border-amber-500/30 uppercase tracking-wider">Ujian</span>
                  </div>
                </div>
              </div>
              
              <p className="text-xs text-amber-200/60 font-medium leading-relaxed relative z-10">
                Campuran soal dari semua bab — uji kesiapan Anda secara menyeluruh.
              </p>

              <div className="mt-2 pt-4 border-t border-amber-500/20 w-full flex justify-between items-center relative z-10">
                <div className="flex items-center gap-2 text-amber-400/70">
                  <Target size={12} />
                  <span className="text-[10px] font-semibold">{gabunganChapter.questionCount} Soal</span>
                </div>
                <div className="flex items-center gap-2 text-amber-400/70">
                  <Timer size={12} />
                  <span className="text-[10px] font-semibold">10:03</span>
                </div>
              </div>
            </button>
          </div>
        )}

        {/* === SEPARATOR === */}
        <div className="flex items-center gap-3 mb-6 relative z-10">
          <div className="h-px flex-1 bg-zinc-800/50"></div>
          <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Per Bab</span>
          <div className="h-px flex-1 bg-zinc-800/50"></div>
        </div>

        {/* === BAB-BAB REGULER === */}
        <div className="flex flex-col gap-4 relative z-10 mb-16">
          {regularChapters.map((ch) => (
            <button
              key={ch.chapter}
              onClick={() => navigate(`/chapter/${ch.chapter}`)}
              className="bg-zinc-900/40 backdrop-blur-xl p-6 rounded-3xl border border-zinc-800/50 flex flex-col items-start gap-4 active:border-blue-500/50 active:bg-zinc-800/50 transition-all text-left shadow-lg"
            >
              <div className="flex items-center gap-4 w-full">
                <div className="w-12 h-12 rounded-xl bg-zinc-800/80 flex items-center justify-center border border-zinc-700/50">
                  <span className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-indigo-500">
                    {ch.chapter}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white tracking-wide">
                    Bab {ch.chapter}
                  </h3>
                </div>
              </div>
              
              <p className="text-xs text-zinc-400 font-medium leading-relaxed">
                {CHAPTER_TITLES[ch.chapter] || `Materi Kepramukaan Bab ${ch.chapter}`}
              </p>

              <div className="mt-2 pt-4 border-t border-zinc-800/50 w-full flex justify-between items-center">
                <div className="flex items-center gap-2 text-zinc-500">
                  <Target size={12} className="text-indigo-400/70" />
                  <span className="text-[10px] font-semibold">{ch.questionCount} Soal</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-500">
                  <Timer size={12} className="text-blue-400/70" />
                  <span className="text-[10px] font-semibold">10:03</span>
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
