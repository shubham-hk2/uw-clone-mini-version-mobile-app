import { create } from 'zustand';

type Answer = {
  question_id: string;
  selected_answer_index: number;
  time_taken: number;
};

type AnswersState = {
  answers: Answer[];
  addAnswer: (answer: Answer) => void;
  clearAnswers: () => void;
};

export const useAnswersStore = create<AnswersState>((set) => ({
  answers: [],
  addAnswer: (newAnswer) =>
    set((state) => {
      const existingIndex = state.answers.findIndex(
        (answer) => answer.question_id === newAnswer.question_id
      );
      if (existingIndex !== -1) {
        // Replace the existing answer
        const updatedAnswers = [...state.answers];
        updatedAnswers[existingIndex] = newAnswer;
        return { answers: updatedAnswers };
      } else {
        // Add a new answer
        return { answers: [...state.answers, newAnswer] };
      }
    }),
  clearAnswers: () => set({ answers: [] }),
}));
