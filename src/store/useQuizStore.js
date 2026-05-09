import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { fetchQuestionsByChapter, submitAnswers as submitAnswersApi, saveHistoryToServer } from '@/services/api';
import useHistoryStore from './useHistoryStore';

const useQuizStore = create(
  persist(
    (set, get) => ({
      // State
      questions: [],
      currentIndex: 0,
      answers: {},       // { questionId: "jawaban user" }
      chapter: null,
      totalQuestions: 0,
      timeLimit: 603,
      timerEndTime: null, // Absolut timestamp kapan waktu habis

      // Loading / Error
      isLoading: false,
      error: null,

      // Quiz status
      quizStatus: 'idle', // 'idle' | 'loading' | 'in-progress' | 'submitting' | 'finished'

      // Hasil setelah submit
      result: null,

      // Actions
      loadQuestions: async (chapterId) => {
        const state = get();
        const targetChapter = parseInt(chapterId);

        // Jika user me-refresh halaman dan chapter yang aktif SAMA,
        // pertahankan jawaban dan status quiz. Jangan di-reset!
        if (state.chapter === targetChapter && state.quizStatus === 'in-progress') {
          set({ isLoading: false, error: null });
          return;
        }

        set({ isLoading: true, error: null, quizStatus: 'loading' });

        try {
          const data = await fetchQuestionsByChapter(chapterId);
          set({
            questions: data.questions,
            chapter: data.chapter,
            totalQuestions: data.totalQuestions,
            timeLimit: data.timeLimit,
            currentIndex: 0,
            answers: {},
            result: null,
            timerEndTime: Date.now() + data.timeLimit * 1000, // Waktu habis = Sekarang + limit
            isLoading: false,
            quizStatus: 'in-progress',
          });
        } catch (err) {
          set({
            isLoading: false,
            error: err.message,
            quizStatus: 'idle',
          });
        }
      },

      setAnswer: (questionId, answer) => {
        set((state) => ({
          answers: { ...state.answers, [questionId]: answer },
        }));
      },

      goToQuestion: (index) => {
        const { totalQuestions } = get();
        if (index >= 0 && index < totalQuestions) {
          set({ currentIndex: index });
        }
      },

      nextQuestion: () => {
        const { currentIndex, totalQuestions } = get();
        if (currentIndex < totalQuestions - 1) {
          set({ currentIndex: currentIndex + 1 });
        }
      },

      prevQuestion: () => {
        const { currentIndex } = get();
        if (currentIndex > 0) {
          set({ currentIndex: currentIndex - 1 });
        }
      },

      submitQuiz: async (timeSpent) => {
        const { chapter, answers } = get();
        set({ quizStatus: 'submitting', isLoading: true });

        try {
          const result = await submitAnswersApi(chapter, answers, timeSpent);
          // Save to local history
          const getGrade = (s) => {
            if (s >= 90) return 'A';
            if (s >= 80) return 'B';
            if (s >= 70) return 'C';
            return 'D';
          };

          const historyRecord = {
            id: Date.now().toString(),
            timestamp: new Date().toISOString(),
            ...result
          };

          useHistoryStore.getState().addHistoryRecord(historyRecord);

          // Generate or retrieve a unique device ID
          let deviceId = localStorage.getItem('boyman-device-id');
          if (!deviceId) {
            deviceId = 'device-' + Date.now() + '-' + Math.random().toString(36).substring(2, 9);
            localStorage.setItem('boyman-device-id', deviceId);
          }

          // Send to server (fire-and-forget, won't block UI)
          const userName = localStorage.getItem('boyman-user-name') || 'Anonim';

          saveHistoryToServer({
            deviceId,
            userName,
            chapter: result.chapter,
            score: result.score,
            grade: getGrade(result.score),
            correctCount: result.correctCount,
            wrongCount: result.wrongCount,
            unansweredCount: result.unansweredCount,
            totalQuestions: result.totalQuestions,
            timeSpent: result.timeSpent || 0,
          });

          set({
            result,
            quizStatus: 'finished',
            isLoading: false,
          });
        } catch (err) {
          set({
            error: err.message,
            isLoading: false,
          });
        }
      },

      resetQuiz: () => {
        set({
          questions: [],
          currentIndex: 0,
          answers: {},
          chapter: null,
          totalQuestions: 0,
          timeLimit: 603,
          timerEndTime: null,
          isLoading: false,
          error: null,
          quizStatus: 'idle',
          result: null,
        });
      },
    }),
    {
      name: 'boyman-quiz-storage', // Nama key di localStorage
      partialize: (state) => ({
        // Hanya simpan state krusial yang perlu diingat setelah refresh
        questions: state.questions,
        currentIndex: state.currentIndex,
        answers: state.answers,
        chapter: state.chapter,
        totalQuestions: state.totalQuestions,
        timeLimit: state.timeLimit,
        timerEndTime: state.timerEndTime,
        quizStatus: state.quizStatus,
        result: state.result,
      }),
    }
  )
);

export default useQuizStore;
