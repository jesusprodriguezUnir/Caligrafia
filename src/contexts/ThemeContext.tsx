"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type Theme = "tinta" | "magico" | "studio";

interface ThemeContextValue {
  theme: Theme;
  setTheme: (t: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "magico",
  setTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("magico");

  useEffect(() => {
    const stored = localStorage.getItem("cf-theme") as Theme | null;
    const initial: Theme =
      stored === "tinta" || stored === "magico" || stored === "studio"
        ? stored
        : "magico";
    setThemeState(initial);
    document.body.setAttribute("data-theme", initial);
  }, []);

  const setTheme = (t: Theme) => {
    setThemeState(t);
    localStorage.setItem("cf-theme", t);
    document.body.setAttribute("data-theme", t);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

/**
 * Inline script that sets data-theme before first paint to avoid FOUC.
 * Must be rendered inside <head> or at the top of <body> in layout.tsx.
 */
export function ThemeScript() {
  const script = `
    (function() {
      try {
        var t = localStorage.getItem('cf-theme');
        if (t === 'tinta' || t === 'magico' || t === 'studio') {
          document.body.setAttribute('data-theme', t);
        } else {
          document.body.setAttribute('data-theme', 'magico');
        }
      } catch(e) {}
    })();
  `;
  return (
    <script
      dangerouslySetInnerHTML={{ __html: script }}
      suppressHydrationWarning
    />
  );
}
