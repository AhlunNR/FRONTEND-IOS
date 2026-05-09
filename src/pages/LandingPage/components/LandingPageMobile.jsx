import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Timer, Target, BookOpen } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import Footer from '@/components/Footer';

export default function LandingPageMobile() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-300 flex flex-col font-sans">
      <div className="flex-grow flex flex-col items-center justify-center p-6 relative overflow-hidden mt-10">
        
        {/* Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-64 h-64 bg-blue-600/20 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="text-center mb-10 relative z-10 w-full">
          <h1 className="text-5xl font-extrabold text-white mb-4 tracking-tight leading-tight">
            Master the <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Boyman</span> Code.
          </h1>
          <p className="text-zinc-400 text-base leading-relaxed font-light px-2">
            Platform interaktif premium untuk menguji pengetahuan kepramukaan Anda.
          </p>
        </div>

        <div className="w-full relative z-10 mb-10">
          <div className="bg-zinc-900/40 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-zinc-800/50 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 blur-[40px]"></div>
            
            <div className="space-y-6 relative z-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-zinc-800/50 flex items-center justify-center border border-zinc-700/50 text-blue-400">
                  <Timer size={20} />
                </div>
                <div>
                  <p className="font-bold text-white text-base">10 Menit 3 Detik</p>
                  <p className="text-xs text-zinc-400">Batas waktu per simulasi</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-zinc-800/50 flex items-center justify-center border border-zinc-700/50 text-indigo-400">
                  <Target size={20} />
                </div>
                <div>
                  <p className="font-bold text-white text-base">50 Soal Taktis</p>
                  <p className="text-xs text-zinc-400">Pilihan ganda (A, B, C, D)</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-zinc-800/50 flex items-center justify-center border border-zinc-700/50 text-purple-400">
                  <BookOpen size={20} />
                </div>
                <div>
                  <p className="font-bold text-white text-base">8 Bab Kritis</p>
                  <p className="text-xs text-zinc-400">1, 3, 5, 9, 12, 15, 20, 24</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={() => navigate(user ? '/simulasi' : '/login')}
          className="w-full relative z-10 py-4 bg-white text-black rounded-full font-bold text-lg hover:bg-zinc-200 transition-all active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.2)]"
        >
          Mulai Latihan
        </button>
      </div>

      <Footer />
    </div>
  );
}
