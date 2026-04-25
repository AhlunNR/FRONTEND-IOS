import React from 'react';

/**
 * Board navigasi soal - grid nomor soal yang bisa diklik
 */
export default function QuestionBoard({ totalQuestions, currentIndex, answers, questions, onNavigate }) {
  return (
    <div className="grid grid-cols-5 gap-2">
      {Array.from({ length: totalQuestions }).map((_, i) => {
        const q = questions[i];
        const isAnswered = q && answers[q.id];
        const isCurrent = i === currentIndex;

        return (
          <button
            key={i}
            onClick={() => onNavigate(i)}
            className={`aspect-square flex items-center justify-center rounded-xl text-sm font-bold transition-all shadow-sm ${
              isCurrent
                ? 'bg-blue-600 text-white border-none shadow-[0_0_15px_rgba(37,99,235,0.4)] scale-110 z-10'
                : isAnswered
                ? 'bg-zinc-800 text-zinc-300 border border-zinc-700/50'
                : 'bg-zinc-900/50 text-zinc-500 border border-zinc-800/50 hover:bg-zinc-800/80 hover:text-zinc-300'
            }`}
          >
            {i + 1}
          </button>
        );
      })}
    </div>
  );
}
