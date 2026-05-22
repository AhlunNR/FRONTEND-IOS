import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Timer, Target, BookOpen, ArrowRight, Sparkles } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import Footer from '@/components/Footer';

export default function LandingPageDesktop() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-[#030303] text-zinc-300 flex flex-col font-sans relative overflow-hidden">
      {/* Premium Background Dotted Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#1f2937_1px,transparent_1px)] [background-size:32px_32px] opacity-20 pointer-events-none"></div>

      {/* Layered Colorful Glow Backdrops */}
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[130px] pointer-events-none"></div>
      <div className="absolute bottom-[20%] right-[-10%] w-[650px] h-[650px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute top-[40%] left-[45%] -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Hero Section */}
      <div className="flex-grow flex flex-col items-center justify-center p-8 mt-24 relative z-10">
        <div className="max-w-6xl w-full flex flex-row items-center gap-16 mb-24">
          
          {/* Left Content */}
          <div className="flex-1 flex flex-col items-start text-left">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold tracking-wider uppercase mb-8 backdrop-blur-sm">
              <Sparkles size={12} className="animate-pulse" />
              <span>Edisi Buku Boyman Pramuka</span>
            </div>

            <h1 className="text-6xl lg:text-7xl font-extrabold text-white mb-6 tracking-tight leading-tight">
              Kuasai Materi <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-500 drop-shadow-[0_2px_15px_rgba(59,130,246,0.3)]">
                Boyman Pramuka
              </span>
            </h1>

            <p className="text-lg text-zinc-400 mb-10 leading-relaxed font-light max-w-xl">
              Platform kuis interaktif premium untuk menguji kesiapan dan pemahaman kepramukaan Anda. Hadapi simulasi 10 menit terstruktur yang dirancang untuk mengasah kemampuan taktis Anda.
            </p>

            <button
              onClick={() => navigate(user ? '/simulasi' : '/login')}
              className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-base rounded-2xl transition-all duration-300 shadow-[0_4px_20px_rgba(59,130,246,0.3)] hover:shadow-[0_10px_30px_rgba(59,130,246,0.5)] border border-blue-400/20 hover:border-blue-400/40 transform hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] flex items-center gap-3"
            >
              <span>Mulai Latihan Sekarang</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>

          {/* Right Content - Features Stack */}
          <div className="flex-1 flex flex-col gap-6 max-w-md">
            {/* Feature 1 - Timer */}
            <div className="group relative bg-zinc-950/40 backdrop-blur-xl rounded-2xl border border-zinc-800/80 p-6 shadow-xl hover:border-blue-500/30 hover:bg-zinc-900/40 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
              <div className="absolute -top-12 -right-12 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-all duration-300"></div>
              <div className="flex items-center gap-5 relative z-10">
                <div className="w-14 h-14 rounded-xl bg-zinc-900 flex items-center justify-center border border-zinc-800 text-blue-400 group-hover:border-blue-500/30 group-hover:bg-blue-600/10 group-hover:scale-105 transition-all duration-300">
                  <Timer size={24} />
                </div>
                <div>
                  <p className="font-bold text-white text-lg tracking-wide">10 Menit 3 Detik</p>
                  <p className="text-sm text-zinc-400 mt-0.5">Batas waktu presisi untuk melatih kecepatan berpikir</p>
                </div>
              </div>
            </div>

            {/* Feature 2 - Target */}
            <div className="group relative bg-zinc-950/40 backdrop-blur-xl rounded-2xl border border-zinc-800/80 p-6 shadow-xl hover:border-indigo-500/30 hover:bg-zinc-900/40 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
              <div className="absolute -top-12 -right-12 w-24 h-24 bg-indigo-500/10 rounded-full blur-2xl group-hover:bg-indigo-500/20 transition-all duration-300"></div>
              <div className="flex items-center gap-5 relative z-10">
                <div className="w-14 h-14 rounded-xl bg-zinc-900 flex items-center justify-center border border-zinc-800 text-indigo-400 group-hover:border-indigo-500/30 group-hover:bg-indigo-600/10 group-hover:scale-105 transition-all duration-300">
                  <Target size={24} />
                </div>
                <div>
                  <p className="font-bold text-white text-lg tracking-wide">50 Soal Taktis</p>
                  <p className="text-sm text-zinc-400 mt-0.5">Pilihan ganda terstruktur yang diacak secara real-time</p>
                </div>
              </div>
            </div>

            {/* Feature 3 - Chapters */}
            <div className="group relative bg-zinc-950/40 backdrop-blur-xl rounded-2xl border border-zinc-800/80 p-6 shadow-xl hover:border-purple-500/30 hover:bg-zinc-900/40 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
              <div className="absolute -top-12 -right-12 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl group-hover:bg-purple-500/20 transition-all duration-300"></div>
              <div className="flex items-center gap-5 relative z-10">
                <div className="w-14 h-14 rounded-xl bg-zinc-900 flex items-center justify-center border border-zinc-800 text-purple-400 group-hover:border-purple-500/30 group-hover:bg-purple-600/10 group-hover:scale-105 transition-all duration-300">
                  <BookOpen size={24} />
                </div>
                <div>
                  <p className="font-bold text-white text-lg tracking-wide">8 Bab Kritis</p>
                  <p className="text-sm text-zinc-400 mt-0.5">Mencakup sandi, navigasi peta, Morse, P3K, dan lainnya</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
