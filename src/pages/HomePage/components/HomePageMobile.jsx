import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchChapters } from '@/services/api';
import Footer from '@/components/Footer';
import { Target, Timer } from 'lucide-react';

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

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-300 flex flex-col font-sans relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[80px] pointer-events-none"></div>

      <div className="flex-grow p-6 mt-8 relative z-10">

        <div className="mb-10 border-b border-zinc-800/50 pb-4 relative z-10">
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Pilih Simulasi</h1>
          <p className="text-zinc-400 mt-2 text-sm font-light leading-relaxed">Pilih bab dari Buku Boyman untuk menguji kemampuan Anda.</p>
        </div>

        <div className="flex flex-col gap-4 relative z-10 mb-16">
          {chapters.map((ch) => (
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
