import React, { useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useQuizStore from '@/store/useQuizStore';
import { useTimer } from '@/hooks/useTimer';
import Timer from '@/features/quiz/Timer';
import QuestionBoard from '@/features/quiz/QuestionBoard';
import QuizResult from '@/features/quiz/QuizResult';

const CHAPTER_TITLES = {
  1: 'Pengantar Kepramukaan',
  3: 'Sejarah Pandu Dunia',
  5: 'Scouting for Boys',
  9: 'Sandi & Semboyan',
  12: 'Morse',
  15: 'Tali Temali',
  20: 'Kompas & Navigasi',
  24: 'Pertolongan Pertama (P3K)',
};

export default function ChapterPageDesktop() {
  const { id } = useParams();
  const navigate = useNavigate();

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
    loadQuestions(id);
  }, [id]);

  useEffect(() => {
    if (quizStatus === 'in-progress' && !isRunning) {
      start();
    }
  }, [quizStatus]);

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
        <div className="text-zinc-400 text-xl font-light tracking-widest animate-pulse">Memuat simulasi bab {id}...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center p-8 font-sans">
        <p className="text-red-500 text-center mb-6 text-lg">{error}</p>
        <button onClick={() => navigate('/simulasi')} className="px-8 py-3 bg-zinc-800 text-white rounded-full font-medium hover:bg-zinc-700 transition-colors border border-zinc-700">
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
        <div className="text-zinc-400 text-xl font-light tracking-widest animate-pulse">Mengirim jawaban...</div>
      </div>
    );
  }

  if (!questions.length) return null;

  const currentQuestion = questions[currentIndex];
  const selectedAnswer = answers[currentQuestion.id] || null;
  const answeredCount = Object.keys(answers).length;

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-300 p-8 font-sans relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto flex gap-8 relative z-10">
        {/* Main Area */}
        <div className="flex-1 flex flex-col h-[calc(100vh-4rem)]">
          {/* Header */}
          <div className="flex justify-between items-center mb-8 border-b border-zinc-800/50 pb-6">
            <div>
              <h1 className="text-3xl font-extrabold text-white tracking-tight">Bab {id} — <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">{CHAPTER_TITLES[parseInt(id)] || ''}</span></h1>
              <p className="text-sm text-zinc-500 mt-2 font-medium">Soal {currentIndex + 1} dari {totalQuestions}</p>
            </div>
            <button
              onClick={() => navigate('/simulasi')}
              className="px-5 py-2.5 rounded-full bg-zinc-900/50 border border-zinc-800/50 text-sm text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all shadow-sm"
            >
              ← Kembali
            </button>
          </div>

          {/* Question Card */}
          <div className="bg-zinc-900/40 backdrop-blur-xl rounded-3xl border border-zinc-800/50 p-10 flex-1 mb-8 shadow-2xl relative overflow-hidden flex flex-col justify-center">
            {/* Inner Glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-[50px]"></div>

            <h2 className="text-2xl font-semibold text-white leading-relaxed mb-10 relative z-10">
              <span className="text-zinc-500 mr-3">{currentIndex + 1}.</span> 
              {currentQuestion.question_text}
            </h2>

            <div className="grid grid-cols-1 gap-4 relative z-10">
              {currentQuestion.options.map((opt, i) => {
                const isSelected = selectedAnswer === opt;
                const optionLetter = ['A', 'B', 'C', 'D'][i];
                const optionText = opt.replace(/^[A-D]\.\s*/, '');
                
                return (
                  <button
                    key={i}
                    onClick={() => setAnswer(currentQuestion.id, opt)}
                    className={`p-5 rounded-2xl text-left transition-all border ${
                      isSelected
                        ? 'bg-blue-600/10 border-blue-500/50 text-white shadow-[0_0_20px_rgba(59,130,246,0.15)] ring-1 ring-blue-500/50'
                        : 'bg-zinc-900/50 border-zinc-800 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 hover:border-zinc-700'
                    }`}
                  >
                    <span className={`font-bold mr-4 ${isSelected ? 'text-blue-400' : 'text-zinc-600'}`}>{optionLetter}</span>
                    {optionText}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex gap-4 items-center">
            <button
              onClick={prevQuestion}
              disabled={currentIndex === 0}
              className="px-8 py-4 bg-zinc-900/50 border border-zinc-800/50 text-zinc-400 rounded-2xl font-semibold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-zinc-800 hover:text-white transition-all backdrop-blur-sm"
            >
              ← Sebelumnya
            </button>

            <div className="flex-1" />

            {currentIndex === totalQuestions - 1 ? (
              <button
                onClick={handleSubmit}
                className="px-10 py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-500 transition-all shadow-[0_0_30px_rgba(37,99,235,0.3)] hover:scale-105 active:scale-95"
              >
                Kirim Jawaban
              </button>
            ) : (
              <button
                onClick={nextQuestion}
                className="px-10 py-4 bg-white text-black rounded-2xl font-bold hover:bg-zinc-200 transition-all shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:scale-105 active:scale-95"
              >
                Selanjutnya →
              </button>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-[320px] flex flex-col gap-6 h-[calc(100vh-4rem)]">
          {/* Timer */}
          <div className="bg-zinc-900/40 backdrop-blur-xl p-8 rounded-3xl border border-zinc-800/50 flex flex-col items-center justify-center shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-red-500/10 blur-[30px]"></div>
            <span className="text-xs text-zinc-500 mb-3 font-bold tracking-widest uppercase">Sisa Waktu</span>
            <div className="text-4xl font-black text-white tracking-wider tabular-nums font-mono drop-shadow-md">
              <Timer timeLeft={timeLeft} isRunning={isRunning} />
            </div>
          </div>

          {/* Progress */}
          <div className="bg-zinc-900/40 backdrop-blur-xl p-6 rounded-3xl border border-zinc-800/50 shadow-lg">
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs text-zinc-400 font-bold uppercase tracking-wider">Progress</span>
              <span className="text-xs font-black text-blue-400 bg-blue-400/10 px-2 py-1 rounded-md">{answeredCount}/{totalQuestions}</span>
            </div>
            <div className="w-full bg-zinc-800/80 rounded-full h-2.5 overflow-hidden border border-zinc-800">
              <div
                className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full transition-all duration-500 ease-out"
                style={{ width: `${(answeredCount / totalQuestions) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Board */}
          <div className="bg-zinc-900/40 backdrop-blur-xl p-6 rounded-3xl border border-zinc-800/50 flex-1 flex flex-col shadow-lg overflow-hidden">
            <h3 className="font-bold text-xs mb-5 text-zinc-400 tracking-widest uppercase border-b border-zinc-800/50 pb-3">Navigasi Soal</h3>
            <div className="flex-1 overflow-y-auto px-2 py-4 -m-2 scrollbar-hide">
              <QuestionBoard
                totalQuestions={totalQuestions}
                currentIndex={currentIndex}
                answers={answers}
                questions={questions}
                onNavigate={goToQuestion}
              />
            </div>
          </div>

          {/* Submit Action */}
          <button
            onClick={handleSubmit}
            className="w-full py-4 bg-zinc-800/50 border border-zinc-700/50 text-zinc-300 rounded-2xl font-bold hover:bg-zinc-800 hover:text-white hover:border-zinc-600 transition-all backdrop-blur-sm"
          >
            Akhiri Simulasi
          </button>
        </div>
      </div>
    </div>
  );
}
