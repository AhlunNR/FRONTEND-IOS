import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Timer, Target, BookOpen } from 'lucide-react';
import Footer from '@/components/Footer';

export default function LandingPageDesktop() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-300 flex flex-col font-sans">
      {/* Hero Section */}
      <div className="flex-grow flex flex-col items-center justify-center p-8 mt-20 relative overflow-hidden">
        {/* Subtle Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-5xl w-full flex flex-row items-center gap-16 relative z-10 mb-20">
          <div className="flex-1">
            <h1 className="text-6xl md:text-7xl font-extrabold text-white mb-6 tracking-tight leading-tight">
              Master the <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Boyman</span> Code.
            </h1>
            <p className="text-xl text-zinc-400 mb-10 leading-relaxed font-light">
              Platform interaktif premium untuk menguji pengetahuan kepramukaan Anda. 
              Berpacu dengan waktu dalam simulasi 10 menit yang menegangkan.
            </p>
            <button
              onClick={() => navigate('/simulasi')}
              className="px-10 py-5 bg-white text-black rounded-full font-bold text-lg hover:bg-zinc-200 transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.3)]"
            >
              Mulai Latihan
            </button>
          </div>

          <div className="flex-1 relative">
            {/* Glassmorphism Card */}
            <div className="bg-zinc-900/40 backdrop-blur-xl rounded-3xl border border-zinc-800/50 p-10 shadow-2xl relative overflow-hidden">
              {/* Card internal glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 blur-[50px] -mr-10 -mt-10"></div>
              
              <div className="space-y-8 relative z-10">
                <div className="flex items-center gap-5 group">
                  <div className="w-14 h-14 rounded-2xl bg-zinc-800/50 flex items-center justify-center border border-zinc-700/50 group-hover:border-blue-500/50 transition-colors text-zinc-300 group-hover:text-blue-400">
                    <Timer size={24} />
                  </div>
                  <div>
                    <p className="font-bold text-white text-lg tracking-wide">10 Menit 3 Detik</p>
                    <p className="text-sm text-zinc-400">Batas waktu presisi per simulasi</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-5 group">
                  <div className="w-14 h-14 rounded-2xl bg-zinc-800/50 flex items-center justify-center border border-zinc-700/50 group-hover:border-indigo-500/50 transition-colors text-zinc-300 group-hover:text-indigo-400">
                    <Target size={24} />
                  </div>
                  <div>
                    <p className="font-bold text-white text-lg tracking-wide">50 Soal Taktis</p>
                    <p className="text-sm text-zinc-400">Evaluasi pilihan ganda terstruktur</p>
                  </div>
                </div>

                <div className="flex items-center gap-5 group">
                  <div className="w-14 h-14 rounded-2xl bg-zinc-800/50 flex items-center justify-center border border-zinc-700/50 group-hover:border-purple-500/50 transition-colors text-zinc-300 group-hover:text-purple-400">
                    <BookOpen size={24} />
                  </div>
                  <div>
                    <p className="font-bold text-white text-lg tracking-wide">8 Bab Kritis</p>
                    <p className="text-sm text-zinc-400">Fokus pada bab 1, 3, 5, 9, 12, 15, 20, 24</p>
                  </div>
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
