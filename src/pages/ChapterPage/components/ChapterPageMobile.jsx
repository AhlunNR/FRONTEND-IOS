import React, { useEffect, useCallback, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useQuizStore from '@/store/useQuizStore';
import { useTimer } from '@/hooks/useTimer';
import Timer from '@/features/quiz/Timer';
import QuestionBoard from '@/features/quiz/QuestionBoard';
import QuizResult from '@/features/quiz/QuizResult';

const CHAPTER_TITLES = {
  1: 'PENGERTIAN, SIFAT, FUNGSI',
  3: 'BIOGRAFI BADEN-POWELL',
  5: 'SCOUTING FOR BOYS',
  9: 'BERKEMAH (HIDUP DI ALAM BEBAS)',
  12: 'MORSE',
  15: 'MEMBACA PETA (NAVIGASI)',
  20: 'SANDI PRAMUKA',
  24: 'P3K dan KESEHATAN',
  99: 'SOAL GABUNGAN',
};

export default function ChapterPageMobile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showBoard, setShowBoard] = useState(false);
  const [showNameModal, setShowNameModal] = useState(false);
  const [nameInput, setNameInput] = useState('');

  const {
    questions,
    currentIndex,
    answers,
    totalQuestions,
    timerEndTime,
    isLoading,
    error,
    quizStatus,
    result,
    loadQuestions,
    setAnswer,
    nextQuestion,
    prevQuestion,
    goToQuestion,
    submitQuiz,
    resetQuiz,
  } = useQuizStore();

  const handleTimeUp = useCallback(() => {
    const store = useQuizStore.getState();
    if (store.quizStatus === 'in-progress') {
      store.submitQuiz(603);
    }
  }, []);

  const { timeLeft, timeSpent, isRunning, start, reset: resetTimer } = useTimer({
    endTime: timerEndTime,
    autoStart: false,
    onTimeUp: handleTimeUp,
  });

  useEffect(() => {
    // Check if user has set their name
    const savedName = localStorage.getItem('boyman-user-name');
    if (!savedName) {
      setShowNameModal(true);
    } else {
      loadQuestions(id);
    }
  }, [id]);

  const handleNameSubmit = () => {
    const name = nameInput.trim() || 'Anonim';
    localStorage.setItem('boyman-user-name', name);
    setShowNameModal(false);
    loadQuestions(id);
  };

  useEffect(() => {
    if (quizStatus === 'in-progress' && !isRunning) {
      start();
    }
  }, [quizStatus]);

  // Name modal
  if (showNameModal) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 font-sans">
        <div className="bg-zinc-900/60 backdrop-blur-xl rounded-3xl border border-zinc-800/50 p-8 w-full max-w-sm shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[50px] pointer-events-none"></div>
          <h2 className="text-xl font-extrabold text-white mb-2 relative z-10">Siapa namamu?</h2>
          <p className="text-zinc-400 text-xs mb-6 relative z-10">Nama ini akan tercatat di riwayat kuis.</p>
          <input
            type="text"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleNameSubmit()}
            placeholder="Masukkan nama lengkap..."
            maxLength={40}
            autoFocus
            className="w-full bg-zinc-800/80 border border-zinc-700/50 rounded-xl px-4 py-3 text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 mb-4 relative z-10"
          />
          <button
            onClick={handleNameSubmit}
            className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold text-sm active:bg-blue-500 transition-all shadow-[0_0_20px_rgba(37,99,235,0.2)] relative z-10"
          >
            Mulai Kuis
          </button>
        </div>
      </div>
    );
  }

  const handleSubmit = () => {
    if (window.confirm('Yakin ingin mengirim jawaban?')) {
      submitQuiz(timeSpent);
    }
  };

  const handleRetry = () => {
    resetQuiz();
    resetTimer(603);
    loadQuestions(id);
  };

  if (isLoading && quizStatus === 'loading') {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center font-sans">
        <div className="text-zinc-400 text-base font-light tracking-widest animate-pulse">Memuat simulasi bab {id}...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center p-6 font-sans">
        <p className="text-red-500 text-center mb-6 text-base">{error}</p>
        <button onClick={() => navigate('/simulasi')} className="px-8 py-3 bg-zinc-800 text-white rounded-full font-medium active:bg-zinc-700 transition-colors border border-zinc-700">
          Kembali
        </button>
      </div>
    );
  }

  if (quizStatus === 'finished' && result) {
    return <QuizResult result={result} onRetry={handleRetry} />;
  }

  if (quizStatus === 'submitting') {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center font-sans">
        <div className="text-zinc-400 text-base font-light tracking-widest animate-pulse">Mengirim jawaban...</div>
      </div>
    );
  }

  if (!questions.length) return null;

  const currentQuestion = questions[currentIndex];
  const selectedAnswer = answers[currentQuestion.id] || null;
  const answeredCount = Object.keys(answers).length;

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-300 font-sans flex flex-col relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[80px] pointer-events-none"></div>

      {/* Header Sticky */}
      <div className="sticky top-0 z-40 bg-[#050505]/80 backdrop-blur-xl border-b border-zinc-800/50 p-4 pb-3 flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <button onClick={() => navigate('/simulasi')} className="text-xs text-zinc-400 active:text-white transition-colors">
            ← Kembali
          </button>
          <div className="flex items-center gap-3">
            <div className="text-sm font-bold text-white tracking-wider tabular-nums font-mono bg-zinc-900/50 border border-zinc-800/80 px-3 py-1 rounded-full">
              <Timer timeLeft={timeLeft} isRunning={isRunning} />
            </div>
          </div>
        </div>

        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-lg font-bold text-white">Bab {id}</h1>
            <p className="text-xs text-zinc-500">{CHAPTER_TITLES[parseInt(id)] || ''}</p>
          </div>
          <button 
            onClick={() => setShowBoard(!showBoard)}
            className="text-xs font-semibold text-blue-400 bg-blue-400/10 px-3 py-1.5 rounded-lg active:bg-blue-400/20 transition-colors flex items-center gap-1.5"
          >
            <span>{answeredCount}/{totalQuestions}</span>
            <span>Grid</span>
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-zinc-800/80 rounded-full h-1.5 overflow-hidden border border-zinc-800">
          <div
            className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full transition-all duration-500 ease-out"
            style={{ width: `${(answeredCount / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      {/* Board Modal (Bottom Sheet style) */}
      {showBoard && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/60 backdrop-blur-sm" onClick={() => setShowBoard(false)}>
          <div 
            className="bg-[#0a0a0a] border-t border-zinc-800/80 rounded-t-3xl p-6 pb-10 shadow-2xl max-h-[80vh] flex flex-col"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-sm text-zinc-400 tracking-widest uppercase">Navigasi Soal</h3>
              <button onClick={() => setShowBoard(false)} className="text-zinc-500 text-sm font-bold p-2">✕</button>
            </div>
            <div className="overflow-y-auto mb-6 px-2 py-4 -mx-2 scrollbar-hide">
              <QuestionBoard
                totalQuestions={totalQuestions}
                currentIndex={currentIndex}
                answers={answers}
                questions={questions}
                onNavigate={(idx) => { goToQuestion(idx); setShowBoard(false); }}
              />
            </div>
            <button
              onClick={() => { setShowBoard(false); handleSubmit(); }}
              className="w-full py-4 bg-zinc-800/80 border border-zinc-700/50 text-white rounded-2xl font-bold active:bg-zinc-700 transition-all"
            >
              Akhiri Simulasi
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 p-5 pb-32 relative z-10 overflow-y-auto">
        <div className="bg-zinc-900/40 backdrop-blur-xl rounded-3xl border border-zinc-800/50 p-6 shadow-xl relative overflow-hidden">
          <span className="text-xs text-zinc-500 font-bold tracking-widest uppercase mb-4 block">Soal {currentIndex + 1}</span>
          
          <h2 className="text-lg font-semibold text-white leading-relaxed mb-8">
            {currentQuestion.question_text}
          </h2>

          <div className="flex flex-col gap-3">
            {currentQuestion.options.map((opt, i) => {
              const isSelected = selectedAnswer === opt;
              const optionLetter = ['A', 'B', 'C', 'D'][i];
              const optionText = opt.replace(/^[A-D]\.\s*/, '');

              return (
                <button
                  key={i}
                  onClick={() => setAnswer(currentQuestion.id, opt)}
                  className={`p-4 rounded-2xl text-left transition-all border ${
                    isSelected
                      ? 'bg-blue-600/10 border-blue-500/50 text-white ring-1 ring-blue-500/50'
                      : 'bg-zinc-900/50 border-zinc-800/80 text-zinc-400 active:bg-zinc-800 active:text-zinc-200'
                  }`}
                >
                  <span className={`font-bold mr-3 ${isSelected ? 'text-blue-400' : 'text-zinc-600'}`}>{optionLetter}</span>
                  {optionText}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Fixed Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-[#050505] via-[#050505] to-transparent pt-12 z-30">
        <div className="flex gap-3">
          <button
            onClick={prevQuestion}
            disabled={currentIndex === 0}
            className="px-6 py-4 bg-zinc-900/80 backdrop-blur-md border border-zinc-800/50 text-zinc-400 rounded-2xl font-bold disabled:opacity-30 active:bg-zinc-800 flex-1 flex justify-center items-center"
          >
            ←
          </button>

          {currentIndex === totalQuestions - 1 ? (
            <button
              onClick={handleSubmit}
              className="px-6 py-4 bg-blue-600 text-white rounded-2xl font-bold active:bg-blue-500 transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] flex-[2]"
            >
              Kirim
            </button>
          ) : (
            <button
              onClick={nextQuestion}
              className="px-6 py-4 bg-white text-black rounded-2xl font-bold active:bg-zinc-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] flex-[2]"
            >
              Selanjutnya →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
