import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-[#050505] text-zinc-400 py-12 px-6 md:px-12 border-t border-zinc-900 w-full overflow-hidden mt-24">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-12 mb-16 md:mb-24">
          {/* Left Section */}
          <div className="md:w-1/3">
            <p className="text-zinc-300 text-lg md:text-xl font-medium mb-8 max-w-sm leading-relaxed">
              ZEROLOGICDEV merancang dan mengembangkan platform edukasi digital yang modern, interaktif, dan intuitif.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-xl border border-zinc-800 flex items-center justify-center hover:bg-zinc-900 hover:border-zinc-700 transition-all text-zinc-400 hover:text-white">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z"/><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"/></svg>
              </a>
              <a href="https://www.instagram.com/lelouch.ln?igsh=c2FhdHd1NGd6azk1" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl border border-zinc-800 flex items-center justify-center hover:bg-zinc-900 hover:border-zinc-700 transition-all text-zinc-400 hover:text-white">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-xl border border-zinc-800 flex items-center justify-center hover:bg-zinc-900 hover:border-zinc-700 transition-all text-zinc-400 hover:text-white">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
              </a>
              <a href="https://www.linkedin.com/in/ahlun-najarrudin" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl border border-zinc-800 flex items-center justify-center hover:bg-zinc-900 hover:border-zinc-700 transition-all text-zinc-400 hover:text-white">
                 <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
            </div>
          </div>

          {/* Links Section */}
          <div className="flex flex-col md:flex-row gap-12 md:gap-24">
            <div className="flex flex-col gap-4">
              <h4 className="text-white font-semibold text-lg mb-2">Product</h4>
              <a href="#" className="hover:text-white transition-colors">Product Updates</a>
            </div>
            
            <div className="flex flex-col gap-4">
              <h4 className="text-white font-semibold text-lg mb-2">Resources</h4>
              <a href="#" className="hover:text-white transition-colors">Customer stories</a>
              <a href="#" className="hover:text-white transition-colors">Product docs</a>
            </div>

            <div className="flex flex-col gap-4">
              <h4 className="text-white font-semibold text-lg mb-2">Company</h4>
              <a href="#" className="hover:text-white transition-colors">About</a>
              <div className="flex items-center gap-3">
                <a href="#" className="hover:text-white transition-colors">Careers</a>
                <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-zinc-900 text-zinc-300 border border-zinc-800">WE'RE HIRING</span>
              </div>
            </div>
          </div>
        </div>

        {/* Large Text Logotype */}
        <div className="w-full border-b border-zinc-800 mb-6 flex justify-center overflow-hidden relative h-[9vw] md:h-[6.5vw]">
          <h1 
            className="text-[14vw] md:text-[11.5vw] leading-none font-black text-transparent tracking-tighter w-full text-center absolute top-0 md:-top-[1vw]"
            style={{ 
              WebkitTextStroke: '2px rgba(255,255,255,0.2)',
            }}
          >
            ZEROLOGIC
          </h1>
        </div>

        {/* Bottom */}
        <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-6 text-sm">
          <p className="text-zinc-500">© 2026 ZEROLOGIC / Inovasi Tanpa Batas</p>
          <div className="flex flex-wrap justify-center items-center gap-6 text-zinc-400">
            <a href="#" className="hover:text-white transition-colors">Security</a>
            <a href="#" className="hover:text-white transition-colors">Terms of service</a>
            <a href="#" className="hover:text-white transition-colors">Privacy policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
