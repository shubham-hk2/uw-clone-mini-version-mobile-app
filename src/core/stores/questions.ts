import { create } from 'zustand';

type QuestionsStore = {
  questions: any[];
  addQuestion: (answer: any[]) => void;
  clearQuestions: () => void;
};

export const useQuestionsStore = create<QuestionsStore>((set) => ({
  questions: [],
  addQuestion: (newAnswer) =>
    set((state) => {
      state.questions = newAnswer;
      return state;
    }),
  clearQuestions: () => set({ questions: [] }),
}));
