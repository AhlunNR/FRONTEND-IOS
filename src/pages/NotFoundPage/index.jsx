import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-300 flex flex-col items-center justify-center font-sans relative overflow-hidden px-6">
      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Glowing 404 text */}
        <div className="relative">
          <h1 
            className="text-[40vw] md:text-[20rem] font-black text-transparent bg-clip-text bg-white leading-none tracking-tighter mix-blend-screen"
            style={{ 
              filter: 'drop-shadow(0 0 40px rgba(255,255,255,0.4)) drop-shadow(0 0 80px rgba(255,255,255,0.2))' 
            }}
          >
            404
          </h1>
          {/* Extra blur layer underneath for that "blurred large numerals" look */}
          <h1 
            className="absolute top-0 left-0 text-[40vw] md:text-[20rem] font-black text-white leading-none tracking-tighter blur-[20px] opacity-60 pointer-events-none"
          >
            404
          </h1>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-white mt-8 mb-4 tracking-tight">
          The page you requested cannot be found.
        </h2>
        
        <p className="text-zinc-500 text-sm md:text-base max-w-sm mb-10 leading-relaxed font-medium">
          The link may be broken, or the page could<br className="hidden md:block" /> have been taken down or renamed.
        </p>

        <button
          onClick={() => navigate('/')}
          className="px-6 py-2.5 bg-white text-black text-sm rounded-full font-bold hover:bg-zinc-200 transition-all active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.15)]"
        >
          Go back home
        </button>
      </div>
    </div>
  );
}
