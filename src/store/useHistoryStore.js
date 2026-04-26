import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useHistoryStore = create(
  persist(
    (set, get) => ({
      history: [],

      addHistoryRecord: (record) => {
        set((state) => {
          // Prepend the new record so the latest is at the top
          return { history: [record, ...state.history] };
        });
      },

      clearHistory: () => {
        set({ history: [] });
      },
    }),
    {
      name: 'boyman-history-storage', // Key in localStorage
    }
  )
);

export default useHistoryStore;
