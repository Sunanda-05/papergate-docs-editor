import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthState = {
  id: string|null,
  accessToken: string | null;
  setAuthState: (token: string, id: string|null) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      id: null,
      setAuthState: (token, id) => set({ accessToken: token, id  }),
      logout: () => set({ accessToken: null, id: null }),
    }),
    { name: "auth-storage" }
  )
);
