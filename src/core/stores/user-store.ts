import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { User } from '@/api/get-user';

type UserDataState = {
  userData: null | User;
  setUserData: (data: null | User) => void;
};

export const useUserDataStore = create<UserDataState>()(
  persist(
    (set) => ({
      userData: null,
      setUserData: (userData) => set(() => ({ userData })),
    }),
    {
      name: 'userData',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
