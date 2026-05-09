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
      <div className="min-h-screen bg-[#050505] flex items-center justify-center font-sans">
        <div className="text-zinc-400 text-xl font-light tracking-widest animate-pulse">Memuat data simulasi...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center p-8 font-sans">
        <p className="text-red-500 text-center mb-6 text-lg">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-8 py-3 bg-zinc-800 text-white rounded-full font-medium hover:bg-zinc-700 transition-colors border border-zinc-700"
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
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="flex-grow p-8 mt-12 relative z-10">

        <div className="max-w-5xl mx-auto relative z-10 mb-24">
          <div className="mb-12 border-b border-zinc-800/50 pb-6">
            <h1 className="text-5xl font-extrabold text-white tracking-tight">Pilih Simulasi</h1>
            <p className="text-zinc-400 mt-3 text-lg font-light">Pilih bab dari Buku Boyman untuk menguji kemampuan Anda.</p>
          </div>

          {/* === SOAL GABUNGAN (SPESIAL) === */}
          {gabunganChapter && (
            <div className="mb-10">
              <button
                onClick={() => navigate(`/chapter/${gabunganChapter.chapter}`)}
                className="w-full bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-red-500/10 backdrop-blur-xl p-8 rounded-3xl border border-amber-500/30 flex items-center gap-8 hover:border-amber-400/60 hover:bg-amber-500/10 transition-all hover:-translate-y-1 text-left shadow-xl shadow-amber-500/5 relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-[60px] pointer-events-none"></div>
                <div className="w-16 h-16 rounded-2xl bg-amber-500/10 flex items-center justify-center border border-amber-500/30 flex-shrink-0 group-hover:bg-amber-500/20 transition-colors relative z-10">
                  <Zap size={28} className="text-amber-400" />
                </div>
                <div className="flex-1 relative z-10">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-2xl font-bold text-white tracking-wide group-hover:text-amber-300 transition-colors">Soal Gabungan</h3>
                    <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2.5 py-0.5 rounded-full font-bold border border-amber-500/30 uppercase tracking-wider">Ujian</span>
                  </div>
                  <p className="text-sm text-amber-200/50 font-medium leading-relaxed">
                    Campuran soal dari semua bab — uji kesiapan Anda secara menyeluruh.
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2 relative z-10 flex-shrink-0">
                  <div className="flex items-center gap-2 text-amber-400/70">
                    <Target size={14} />
                    <span className="text-xs font-semibold">{gabunganChapter.questionCount} Soal</span>
                  </div>
                  <div className="flex items-center gap-2 text-amber-400/70">
                    <Timer size={14} />
                    <span className="text-xs font-semibold">10:03</span>
                  </div>
                </div>
              </button>
            </div>
          )}

          {/* === SEPARATOR === */}
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px flex-1 bg-zinc-800/50"></div>
            <span className="text-xs text-zinc-500 font-bold uppercase tracking-widest">Per Bab</span>
            <div className="h-px flex-1 bg-zinc-800/50"></div>
          </div>

          {/* === BAB-BAB REGULER === */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
            {regularChapters.map((ch) => (
              <button
                key={ch.chapter}
                onClick={() => navigate(`/chapter/${ch.chapter}`)}
                className="bg-zinc-900/40 backdrop-blur-xl p-8 rounded-3xl border border-zinc-800/50 flex flex-col items-start gap-4 hover:border-blue-500/50 hover:bg-zinc-800/50 transition-all hover:-translate-y-1 shadow-xl text-left group"
              >
                <div className="flex items-center gap-4 w-full">
                  <div className="w-14 h-14 rounded-2xl bg-zinc-800/80 flex items-center justify-center border border-zinc-700/50 group-hover:bg-blue-600/20 group-hover:border-blue-500/30 transition-colors">
                    <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-indigo-500">
                      {ch.chapter}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white tracking-wide group-hover:text-blue-400 transition-colors">
                      Bab {ch.chapter}
                    </h3>
                  </div>
                </div>
                
                <p className="text-sm text-zinc-400 font-medium leading-relaxed min-h-[40px]">
                  {CHAPTER_TITLES[ch.chapter] || `Materi Kepramukaan Bab ${ch.chapter}`}
                </p>

                <div className="mt-4 pt-4 border-t border-zinc-800/50 w-full flex justify-between items-center">
                  <div className="flex items-center gap-2 text-zinc-500">
                    <Target size={14} className="text-indigo-400/70" />
                    <span className="text-xs font-semibold">{ch.questionCount} Soal</span>
                  </div>
                  <div className="flex items-center gap-2 text-zinc-500">
                    <Timer size={14} className="text-blue-400/70" />
                    <span className="text-xs font-semibold">10:03</span>
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
