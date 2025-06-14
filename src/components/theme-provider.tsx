"use client";

import { useEffect } from "react";
import { useThemeStore } from "@/stores/theme-store";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme, setTheme, hasHydrated } = useThemeStore();

  useEffect(() => {
    if (!hasHydrated) return;
    setTheme(theme);
  }, [theme, setTheme, hasHydrated]);

  return <>{children}</>;
}
