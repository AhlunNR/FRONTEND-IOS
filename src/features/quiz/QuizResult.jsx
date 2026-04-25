import React from 'react';
import { useNavigate } from 'react-router-dom';
import { formatTime } from '@/utils/formatTime';

/**
 * Komponen hasil quiz setelah submit
 */
export default function QuizResult({ result, onRetry }) {
  const navigate = useNavigate();

  if (!result) return null;

  const { chapter, score, correctCount, wrongCount, unansweredCount, totalQuestions, timeSpent } = result;

  const getGradeInfo = (score) => {
    if (score >= 90) return { grade: 'A', text: 'Sangat Baik', color: 'text-green-400', bg: 'bg-green-400/10 border-green-400/20' };
    if (score >= 80) return { grade: 'B', text: 'Baik', color: 'text-blue-400', bg: 'bg-blue-400/10 border-blue-400/20' };
    if (score >= 70) return { grade: 'C', text: 'Cukup', color: 'text-orange-400', bg: 'bg-orange-400/10 border-orange-400/20' };
    return { grade: 'D', text: 'Kurang', color: 'text-red-400', bg: 'bg-red-400/10 border-red-400/20' };
  };

  const gradeInfo = getGradeInfo(score);

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="bg-zinc-900/40 backdrop-blur-xl rounded-3xl shadow-2xl border border-zinc-800/50 p-8 w-full max-w-md relative z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-[40px] pointer-events-none"></div>
        
        <h2 className="text-3xl font-extrabold text-center mb-1 text-white tracking-tight">Hasil Simulasi</h2>
        <p className="text-zinc-500 text-center mb-8 font-medium">Bab {chapter}</p>

        <div className="flex flex-col items-center justify-center mb-8">
          <div
            className={`w-36 h-36 rounded-full flex flex-col items-center justify-center border-4 mb-6 relative ${
              score >= 70
                ? 'border-green-500/50 text-green-400 shadow-[0_0_30px_rgba(74,222,128,0.2)]'
                : score >= 40
                ? 'border-orange-500/50 text-orange-400 shadow-[0_0_30px_rgba(251,146,60,0.2)]'
                : 'border-red-500/50 text-red-400 shadow-[0_0_30px_rgba(248,113,113,0.2)]'
            }`}
          >
            <div className={`absolute inset-0 rounded-full blur-[20px] opacity-30 ${score >= 70 ? 'bg-green-500' : score >= 40 ? 'bg-orange-500' : 'bg-red-500'}`}></div>
            <span className="text-5xl font-black relative z-10">{score}</span>
            <span className="text-sm font-bold opacity-60 relative z-10">/ 100</span>
          </div>
          
          {/* Sistem Nilai (Grade) */}
          <div className="flex items-center gap-3">
            <span className={`px-4 py-1.5 rounded-lg border font-black text-xl tracking-widest ${gradeInfo.bg} ${gradeInfo.color}`}>
              {gradeInfo.grade}
            </span>
            <span className={`font-bold tracking-wide uppercase text-sm ${gradeInfo.color}`}>
              {gradeInfo.text}
            </span>
          </div>
        </div>

        {/* Detail */}
        <div className="space-y-4 mb-8 bg-zinc-950/50 p-5 rounded-2xl border border-zinc-800/50">
          <div className="flex justify-between text-sm">
            <span className="text-zinc-500 font-medium">Benar</span>
            <span className="font-bold text-green-400">{correctCount} soal</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-zinc-500 font-medium">Salah</span>
            <span className="font-bold text-red-400">{wrongCount} soal</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-zinc-500 font-medium">Tidak Dijawab</span>
            <span className="font-bold text-zinc-400">{unansweredCount} soal</span>
          </div>
          <div className="h-px w-full bg-zinc-800/50 my-2"></div>
          <div className="flex justify-between text-sm">
            <span className="text-zinc-500 font-medium">Total Soal</span>
            <span className="font-bold text-zinc-300">{totalQuestions}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-zinc-500 font-medium">Waktu Terpakai</span>
            <span className="font-bold text-zinc-300">{formatTime(timeSpent)}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <button
            onClick={onRetry}
            className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-500 active:scale-[0.98] transition-all shadow-[0_0_20px_rgba(37,99,235,0.2)]"
          >
            Ulangi Simulasi
          </button>
          <button
            onClick={() => navigate('/simulasi')}
            className="w-full py-4 bg-zinc-800/50 text-zinc-300 border border-zinc-700/50 rounded-2xl font-bold hover:bg-zinc-800 hover:text-white active:scale-[0.98] transition-all"
          >
            Kembali ke Menu
          </button>
        </div>
      </div>
    </div>
  );
}
