import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Timer, Target, BookOpen, ArrowRight } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import Footer from '@/components/Footer';

export default function LandingPageDesktop() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-300 flex flex-col font-sans relative">
      
      {/* Main Content */}
      <div className="flex-grow flex flex-col items-center justify-center p-8 mt-16 max-w-6xl mx-auto w-full">
        <div className="w-full flex flex-row items-center gap-16 mb-20">
          
          {/* Left Column - Hero Content */}
          <div className="flex-1 flex flex-col items-start text-left">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs font-semibold tracking-wider uppercase mb-6">
              <span>Boyman Quiz Platform</span>
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-tight">
              Kuis Pembelajaran <br />
              <span className="text-zinc-400">Buku Boyman Pramuka</span>
            </h1>

            <p className="text-base text-zinc-400 mb-8 leading-relaxed font-normal max-w-xl">
              Uji kesiapan dan pemahaman kepramukaan Anda secara terstruktur. Hadapi simulasi 10 menit presisi yang dirancang secara formal untuk mengevaluasi materi secara komprehensif.
            </p>

            <button
              onClick={() => navigate(user ? '/simulasi' : '/login')}
              className="px-6 py-3 bg-white text-zinc-950 hover:bg-zinc-200 font-semibold text-sm rounded-lg transition-all duration-200 flex items-center gap-2 shadow-sm"
            >
              <span>Mulai Latihan</span>
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Right Column - Features list */}
          <div className="flex-1 flex flex-col gap-5 max-w-md w-full">
            
            {/* Feature 1 - Timer */}
            <div className="bg-zinc-900/30 border border-zinc-850 rounded-xl p-5 hover:border-zinc-700 transition-colors duration-250">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 flex-shrink-0">
                  <Timer size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-white text-base">Simulasi 10 Menit</h4>
                  <p className="text-xs text-zinc-400 mt-1 leading-relaxed">Evaluasi berbatas waktu presisi untuk melatih kecepatan dan ketepatan berpikir.</p>
                </div>
              </div>
            </div>

            {/* Feature 2 - Target */}
            <div className="bg-zinc-900/30 border border-zinc-850 rounded-xl p-5 hover:border-zinc-700 transition-colors duration-250">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 flex-shrink-0">
                  <Target size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-white text-base">50 Soal Evaluasi</h4>
                  <p className="text-xs text-zinc-400 mt-1 leading-relaxed">Soal pilihan ganda komprehensif yang diacak secara sistematis untuk setiap sesi kuis.</p>
                </div>
              </div>
            </div>

            {/* Feature 3 - Chapters */}
            <div className="bg-zinc-900/30 border border-zinc-850 rounded-xl p-5 hover:border-zinc-700 transition-colors duration-250">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 flex-shrink-0">
                  <BookOpen size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-white text-base">Materi 8 Bab Kunci</h4>
                  <p className="text-xs text-zinc-400 mt-1 leading-relaxed">Fokus materi krusial meliputi navigasi peta, Morse, sandi, P3K, dan sejarah pramuka.</p>
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
