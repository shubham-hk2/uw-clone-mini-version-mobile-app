import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface RegisterState {
  registerObject: {}; // Changed to an array to hold objects
  add: (item: any) => void; // Accepts any object
  reset: () => void;
}

export const useRegisterStore = create<RegisterState>()((set) => ({
  registerObject: {},
  add: (item) =>
    set((state) => ({
      registerObject: {
        ...state.registerObject,
        ...item,
      },
    })),
  reset: () => set({ registerObject: {} }), // Resets to initial state with an empty array
}));
