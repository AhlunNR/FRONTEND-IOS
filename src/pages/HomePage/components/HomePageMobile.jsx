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
  99: 'SOAL GABUNGAN I',
  100: 'UJIAN GABUNGAN II (HARDCORE)',
  101: 'GRAND MASTER TRIAL',
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
      if (word === 'ii' || word === 'iii') return word.toUpperCase();
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
        <div className="w-8 h-8 border-2 border-zinc-800 border-t-zinc-400 rounded-full animate-spin mb-3"></div>
        <p className="text-zinc-500 text-[11px] font-medium tracking-wide">Memuat data simulasi...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center p-5 font-sans">
        <div className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl p-5 text-center shadow-lg">
          <h3 className="text-sm font-bold text-white mb-2">Terjadi Kesalahan</h3>
          <p className="text-zinc-400 text-[11px] mb-4 leading-relaxed">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="w-full py-2.5 bg-zinc-800 hover:bg-zinc-750 text-white border border-zinc-700 rounded-lg font-semibold text-xs transition-colors"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  const regularChapters = chapters.filter(ch => ch.chapter !== 99 && ch.chapter !== 100 && ch.chapter !== 101);
  const gabunganChapter = chapters.find(ch => ch.chapter === 99);
  const gabungan2Chapter = chapters.find(ch => ch.chapter === 100);
  const grandMasterChapter = chapters.find(ch => ch.chapter === 101);

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-300 flex flex-col font-sans pb-6">
      <div className="flex-grow p-5 mt-16">
        
        {/* Header */}
        <div className="mb-6 border-b border-zinc-800/80 pb-5">
          <div className="inline-flex items-center px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 text-[10px] font-semibold uppercase tracking-wider mb-2.5">
            <span>Simulasi Pembelajaran</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white leading-tight">Pilih Kuis</h1>
          <p className="text-zinc-500 text-xs mt-1.5 leading-relaxed">Pilih bab Buku Boyman untuk menguji kesiapan Anda.</p>
        </div>

        {/* === GRAND MASTER TRIAL (SPEEDRUN) === */}
        {grandMasterChapter && (
          <div className="mb-4">
            <button
              onClick={() => navigate(`/chapter/${grandMasterChapter.chapter}`)}
              className="w-full text-left border-l-[4px] border-l-violet-600 bg-zinc-900/60 border border-zinc-800 rounded-xl p-4 flex flex-col relative overflow-hidden shadow-[0_4px_20px_rgba(139,92,246,0.1)] active:scale-[0.98] transition-transform"
            >
              <div className="absolute top-[-30%] right-[-10%] w-32 h-32 bg-violet-600/15 blur-[40px] rounded-full"></div>
              <div className="flex justify-between items-start mb-3 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-lg bg-violet-950/50 border border-violet-500/30 flex items-center justify-center text-violet-400 shadow-inner">
                    <Zap size={22} className="animate-pulse" />
                  </div>
                  <div>
                    <h3 className="text-[16px] font-black text-white leading-tight mb-0.5 tracking-wide">GRAND MASTER TRIAL</h3>
                    <span className="text-[9px] text-violet-300 font-bold tracking-widest uppercase">Speedrun Mode</span>
                  </div>
                </div>
              </div>
              <p className="text-[11px] text-zinc-400 leading-relaxed mb-3 relative z-10 font-medium">
                Evaluasi menyeluruh 100 soal eksklusif. Uji kecepatan refleks Anda!
              </p>
              <div className="mt-auto pt-3 border-t border-zinc-800/80 w-full flex justify-between items-center text-[10px] text-zinc-500 relative z-10">
                <div className="flex gap-4">
                  <div className="flex items-center gap-1.5 text-violet-300/90">
                    <Target size={12} />
                    <span className="font-bold tracking-wide">{grandMasterChapter.questionCount} Soal Baru</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-red-400/90">
                    <Timer size={12} className="animate-pulse" />
                    <span className="font-bold">Hanya 5 Menit</span>
                  </div>
                </div>
                <ArrowRight size={14} className="text-violet-400" />
              </div>
            </button>
          </div>
        )}

        {/* === UJIAN GABUNGAN II (HARDCORE) === */}
        {gabungan2Chapter && (
          <div className="mb-4">
            <button
              onClick={() => navigate(`/chapter/${gabungan2Chapter.chapter}`)}
              className="w-full text-left border-l-[3px] border-l-red-500 bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 flex flex-col relative overflow-hidden shadow-sm active:scale-[0.98] transition-transform"
            >
              <div className="absolute top-[-20%] right-[-10%] w-24 h-24 bg-red-500/10 blur-[30px]"></div>
              <div className="flex justify-between items-start mb-3 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500">
                    <Target size={18} />
                  </div>
                  <div>
                    <h3 className="text-[15px] font-bold text-white leading-tight mb-0.5">Ujian Gabungan II</h3>
                    <span className="text-[9px] text-red-400 font-semibold tracking-wide animate-pulse">HARDCORE MODE</span>
                  </div>
                </div>
              </div>
              <p className="text-[11px] text-zinc-400 leading-relaxed mb-3 relative z-10">
                Mode tersulit: 50 soal lintas bab dengan opsi jawaban yang diacak secara sistem.
              </p>
              <div className="mt-auto pt-3 border-t border-zinc-800/80 w-full flex justify-between items-center text-[10px] text-zinc-500 relative z-10">
                <div className="flex gap-4">
                  <div className="flex items-center gap-1.5 text-red-400/80">
                    <Target size={12} />
                    <span className="font-semibold">{gabungan2Chapter.questionCount} Soal Acak</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Timer size={12} />
                    <span className="font-semibold">10 Menit</span>
                  </div>
                </div>
                <ArrowRight size={14} className="text-red-400" />
              </div>
            </button>
          </div>
        )}

        {/* === SOAL GABUNGAN I === */}
        {gabunganChapter && (
          <div className="mb-6">
            <button
              onClick={() => navigate(`/chapter/${gabunganChapter.chapter}`)}
              className="w-full text-left border-l-[3px] border-l-amber-500 bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 flex flex-col relative overflow-hidden shadow-sm active:scale-[0.98] transition-transform"
            >
              <div className="flex justify-between items-start mb-3 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-amber-500">
                    <Zap size={18} />
                  </div>
                  <div>
                    <h3 className="text-[15px] font-bold text-white leading-tight mb-0.5">Soal Gabungan I</h3>
                    <span className="text-[9px] text-amber-500/80 font-semibold tracking-wide">UJIAN STANDAR</span>
                  </div>
                </div>
              </div>
              <p className="text-[11px] text-zinc-400 leading-relaxed mb-3 relative z-10">
                Campuran soal reguler dari seluruh bab secara menyeluruh.
              </p>
              <div className="mt-auto pt-3 border-t border-zinc-800/80 w-full flex justify-between items-center text-[10px] text-zinc-500 relative z-10">
                <div className="flex gap-4">
                  <div className="flex items-center gap-1.5">
                    <Target size={12} />
                    <span className="font-semibold">{gabunganChapter.questionCount} Soal</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Timer size={12} />
                    <span className="font-semibold">10 Menit</span>
                  </div>
                </div>
                <ArrowRight size={14} className="text-zinc-600" />
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
