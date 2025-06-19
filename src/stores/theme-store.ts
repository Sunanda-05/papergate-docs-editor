import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type Theme = "dark" | "light" | "system";

interface ThemeStore {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
}

export const useThemeStore = create<ThemeStore>()(
  devtools(
    persist(
      (set) => ({
        theme: "system",
        hasHydrated: false,
        setHasHydrated: (state) => set({ hasHydrated: state }),
        setTheme: (theme) => {
          set({ theme });
          document.documentElement.classList.remove("light", "dark");
          if (theme === "system") {
            const systemPref = window.matchMedia(
              "(prefers-color-scheme: dark)"
            ).matches;
            document.documentElement.classList.add(
              systemPref ? "dark" : "light"
            );
          } else {
            document.documentElement.classList.add(theme);
          }
        },
      }),
      {
        name: "theme-storage",
        onRehydrateStorage: () => (state) => {
          state?.setHasHydrated(true);
        },
      }
    )
  )
);
