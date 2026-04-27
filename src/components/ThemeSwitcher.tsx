"use client";

import { useTheme, type Theme } from "@/contexts/ThemeContext";

const THEMES: { id: Theme; icon: string; label: string; title: string }[] = [
  { id: "tinta", icon: "✒️", label: "Tinta", title: "Tinta & Papel — Elegante editorial" },
  { id: "magico", icon: "✨", label: "Mágico", title: "Mundo Mágico — Gamificado" },
  { id: "studio", icon: "⬜", label: "Studio", title: "Studio Limpio — Profesional" },
];

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "4px",
        background: "rgba(0,0,0,0.06)",
        borderRadius: "100px",
        padding: "4px",
      }}
      role="group"
      aria-label="Seleccionar tema visual"
    >
      {THEMES.map((t) => {
        const isActive = theme === t.id;
        return (
          <button
            key={t.id}
            onClick={() => setTheme(t.id)}
            title={t.title}
            aria-pressed={isActive}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              padding: "5px 10px",
              borderRadius: "100px",
              border: "none",
              cursor: "pointer",
              fontSize: "0.78rem",
              fontWeight: 700,
              fontFamily: "inherit",
              transition: "all 0.2s ease",
              background: isActive ? "var(--color-cta)" : "transparent",
              color: isActive ? "white" : "var(--color-primary)",
              boxShadow: isActive ? "0 2px 6px rgba(0,0,0,0.15)" : "none",
              whiteSpace: "nowrap",
            }}
          >
            <span style={{ fontSize: "0.9rem" }}>{t.icon}</span>
            <span className="theme-label">{t.label}</span>
          </button>
        );
      })}

      <style>{`
        @media (max-width: 640px) {
          .theme-label { display: none; }
        }
      `}</style>
    </div>
  );
}
