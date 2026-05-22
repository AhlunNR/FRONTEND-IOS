import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Timer, Target, BookOpen, ArrowRight, Sparkles } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import Footer from '@/components/Footer';

export default function LandingPageMobile() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-[#030303] text-zinc-300 flex flex-col font-sans relative overflow-hidden">
      {/* Premium Background Dotted Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#1f2937_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none"></div>

      {/* Subtle Glows */}
      <div className="absolute top-[10%] left-[-20%] w-64 h-64 bg-blue-600/10 rounded-full blur-[80px] pointer-events-none"></div>
      <div className="absolute bottom-[30%] right-[-20%] w-72 h-72 bg-indigo-600/10 rounded-full blur-[90px] pointer-events-none"></div>

      <div className="flex-grow flex flex-col items-center justify-center p-6 relative z-10 mt-10">
        
        {/* Top Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-semibold tracking-wider uppercase mb-6 backdrop-blur-sm">
          <Sparkles size={10} className="animate-pulse" />
          <span>Edisi Buku Boyman</span>
        </div>

        <div className="text-center mb-8 relative z-10 w-full">
          <h1 className="text-4xl font-extrabold text-white mb-4 tracking-tight leading-tight">
            Kuasai Materi <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-500 drop-shadow-[0_2px_10px_rgba(59,130,246,0.3)]">
              Boyman Pramuka
            </span>
          </h1>
          <p className="text-zinc-400 text-sm leading-relaxed font-light px-2">
            Platform kuis interaktif premium untuk menguji kesiapan dan pemahaman kepramukaan Anda secara cepat dan presisi.
          </p>
        </div>

        {/* Feature List (Compact Stack) */}
        <div className="w-full flex flex-col gap-4 mb-8 relative z-10">
          {/* Feature 1 - Timer */}
          <div className="bg-zinc-950/40 backdrop-blur-xl rounded-2xl p-4.5 border border-zinc-800/80 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/5 blur-xl pointer-events-none"></div>
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-11 h-11 rounded-xl bg-zinc-900 flex items-center justify-center border border-zinc-800 text-blue-400">
                <Timer size={20} />
              </div>
              <div>
                <p className="font-bold text-white text-sm">10 Menit 3 Detik</p>
                <p className="text-[11px] text-zinc-400 mt-0.5">Batas waktu untuk melatih kecepatan berpikir</p>
              </div>
            </div>
          </div>

          {/* Feature 2 - Target */}
          <div className="bg-zinc-950/40 backdrop-blur-xl rounded-2xl p-4.5 border border-zinc-800/80 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-indigo-500/5 blur-xl pointer-events-none"></div>
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-11 h-11 rounded-xl bg-zinc-900 flex items-center justify-center border border-zinc-800 text-indigo-400">
                <Target size={20} />
              </div>
              <div>
                <p className="font-bold text-white text-sm">50 Soal Taktis</p>
                <p className="text-[11px] text-zinc-400 mt-0.5">Pilihan ganda terstruktur yang diacak</p>
              </div>
            </div>
          </div>

          {/* Feature 3 - Chapters */}
          <div className="bg-zinc-950/40 backdrop-blur-xl rounded-2xl p-4.5 border border-zinc-800/80 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-purple-500/5 blur-xl pointer-events-none"></div>
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-11 h-11 rounded-xl bg-zinc-900 flex items-center justify-center border border-zinc-800 text-purple-400">
                <BookOpen size={20} />
              </div>
              <div>
                <p className="font-bold text-white text-sm">8 Bab Kritis</p>
                <p className="text-[11px] text-zinc-400 mt-0.5">Morse, sandi, navigasi peta, P3K, dll.</p>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={() => navigate(user ? '/simulasi' : '/login')}
          className="w-full relative z-10 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-base rounded-2xl transition-all active:scale-[0.98] shadow-[0_4px_20px_rgba(59,130,246,0.35)] border border-blue-400/20 flex items-center justify-center gap-2"
        >
          <span>Mulai Latihan Sekarang</span>
          <ArrowRight size={18} />
        </button>
      </div>

      <Footer />
    </div>
  );
}
