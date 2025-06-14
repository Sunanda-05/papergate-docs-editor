"use client";

import { useThemeStore } from "@/stores/theme-store";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";

export default function ThemeToggle() {
  const { theme, setTheme } = useThemeStore();

  const nextTheme = theme === "light" ? "dark" : "light";

  return (
    <div className="flex gap-2">
      <Switch
        id="theme"
        checked={nextTheme === "light"}
        onClick={() => setTheme(nextTheme)}
      />
      <Label htmlFor="theme">
        {theme === "light" ? "Light" : "Dark"}
      </Label>
    </div>
  );
}
