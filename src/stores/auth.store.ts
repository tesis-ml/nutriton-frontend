import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware'

interface UserStore {
    user: User | undefined;
    setUser: (user: User) => void;
    resetData: () => void;
}

const useAuthStore = create<UserStore>()(
    persist(
        (set) => ({
            user: undefined,
            setUser: (user: User) => {
                set({ user })
            },
            resetData: () => {
                set({ user: undefined });
            },
        }),
        {
            name: 'user-data',
            storage: createJSONStorage(() => localStorage),
        }
    )
);

export default useAuthStore;
