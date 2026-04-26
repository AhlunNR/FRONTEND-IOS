import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchChapters } from '@/services/api';
import Footer from '@/components/Footer';
import { Target, Timer } from 'lucide-react';

const CHAPTER_TITLES = {
  1: 'PENGERTIAN, SIFAT, DAN FUNGSI',
  3: 'BIOGRAFI BADEN-POWELL',
  5: 'SCOUTING FOR BOYS',
  9: 'BERKEMAH (HIDUP DI ALAM BEBAS)',
  12: 'MORSE',
  15: 'MEMBACA PETA (NAVIGASI)',
  20: 'SANDI PRAMUKA',
  24: 'P3K DAN KESEHATAN',
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

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
            {chapters.map((ch) => (
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
