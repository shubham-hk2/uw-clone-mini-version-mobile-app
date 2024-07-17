import { create } from 'zustand';

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
  reset: () => set({ registerObject: {} }),
}));
