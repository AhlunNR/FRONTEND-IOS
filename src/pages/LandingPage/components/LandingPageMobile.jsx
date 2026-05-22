import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Timer, Target, BookOpen, ArrowRight } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import Footer from '@/components/Footer';

export default function LandingPageMobile() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-300 flex flex-col font-sans relative">
      
      {/* Main Content */}
      <div className="flex-grow flex flex-col items-center justify-center p-6 mt-12 relative z-10 w-full">
        
        {/* Top Badge */}
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 text-[10px] font-semibold tracking-wider uppercase mb-6">
          <span>Boyman Quiz Platform</span>
        </div>

        {/* Hero Text */}
        <div className="text-center mb-8 w-full">
          <h1 className="text-3xl font-bold text-white mb-3 tracking-tight leading-tight">
            Kuis Pembelajaran <br />
            <span className="text-zinc-400">Buku Boyman Pramuka</span>
          </h1>
          <p className="text-zinc-400 text-xs leading-relaxed font-normal px-2">
            Uji kesiapan dan pemahaman kepramukaan Anda secara terstruktur dengan simulasi 10 menit presisi.
          </p>
        </div>

        {/* Features list (Stacked) */}
        <div className="w-full flex flex-col gap-4 mb-8">
          
          {/* Feature 1 - Timer */}
          <div className="bg-zinc-900/30 border border-zinc-850 rounded-xl p-4.5">
            <div className="flex items-start gap-4">
              <div className="w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 flex-shrink-0">
                <Timer size={18} />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">Simulasi 10 Menit</h4>
                <p className="text-[11px] text-zinc-400 mt-0.5 leading-normal">Evaluasi berbatas waktu untuk melatih kecepatan dan ketepatan berpikir.</p>
              </div>
            </div>
          </div>

          {/* Feature 2 - Target */}
          <div className="bg-zinc-900/30 border border-zinc-850 rounded-xl p-4.5">
            <div className="flex items-start gap-4">
              <div className="w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 flex-shrink-0">
                <Target size={18} />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">50 Soal Evaluasi</h4>
                <p className="text-[11px] text-zinc-400 mt-0.5 leading-normal">Soal pilihan ganda acak sistematis untuk evaluasi komprehensif.</p>
              </div>
            </div>
          </div>

          {/* Feature 3 - Chapters */}
          <div className="bg-zinc-900/30 border border-zinc-850 rounded-xl p-4.5">
            <div className="flex items-start gap-4">
              <div className="w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 flex-shrink-0">
                <BookOpen size={18} />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">Materi 8 Bab Kunci</h4>
                <p className="text-[11px] text-zinc-400 mt-0.5 leading-normal">Navigasi peta, Morse, sandi, P3K, dan materi krusial Boyman.</p>
              </div>
            </div>
          </div>

        </div>

        {/* CTA Button */}
        <button
          onClick={() => navigate(user ? '/simulasi' : '/login')}
          className="w-full py-3.5 bg-white text-zinc-950 hover:bg-zinc-200 font-semibold text-sm rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm"
        >
          <span>Mulai Latihan</span>
          <ArrowRight size={16} />
        </button>
      </div>

      <Footer />
    </div>
  );
}
