import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthState = {
  id: string | null;
  accessToken: string | null;
  setAuthState: (token: string, id: string | null) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      id: null,
      setAuthState: (token, id) => {
        set({ accessToken: token, id });
        document.cookie = `accessToken=${token}; path=/`;
      },
      logout: () => {
        set({ accessToken: null, id: null });
        document.cookie =
          "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; max-age=0";
      },
    }),
    { name: "auth-storage" }
  )
);
