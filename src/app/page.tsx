"use client";

import Link from "next/link";
import { useTheme } from "@/contexts/ThemeContext";
import { Header } from "@/components/Header";

const BENEFITS = [
  { icon: "🧠", title: "Psicomotricidad", text: "Mejora la precisión de la mano con trazos guiados progresivos.", color: "#22C55E", nivel: 1 },
  { icon: "🎯", title: "Concentración", text: "Cada trazo entrena la atención sostenida y el enfoque.", color: "#0EA5E9", nivel: 2 },
  { icon: "🎨", title: "Creatividad", text: "Personaliza las fichas y convierte la práctica en expresión artística.", color: "#F97316", nivel: 3 },
];

const STATS = [
  { n: "10", l: "categorías" },
  { n: "30+", l: "fichas listas" },
  { n: "8", l: "fuentes educativas" },
  { n: "PDF", l: "descarga gratuita" },
];

function HomeTinta() {
  return (
    <main style={{ minHeight: "100vh", fontFamily: "var(--font-main)", background: "var(--color-background)", color: "var(--color-primary)" }}>
      <Header />
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "clamp(3rem, 8vw, 6rem) 2rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }} className="tinta-hero-grid">
        <div>
          <p style={{ fontFamily: "var(--font-hand)", fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)", color: "var(--color-cta)", marginBottom: "1rem", fontStyle: "italic" }}>El arte de escribir con elegancia</p>
          <h1 style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontWeight: 700, fontSize: "clamp(2.5rem, 6vw, 4rem)", lineHeight: 1.1, marginBottom: "1.5rem" }}>Caligra-Fíate</h1>
          <p style={{ fontSize: "clamp(1rem, 2vw, 1.15rem)", lineHeight: 1.75, color: "#4A5568", marginBottom: "2.5rem", maxWidth: 480 }}>Genera fichas de caligrafía personalizadas para tus alumnos. Elige fuente, formato y contenido en segundos.</p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Link href="/caligrafiate" style={{ padding: "14px 32px", background: "var(--color-cta)", color: "white", borderRadius: "var(--radius-md)", fontWeight: 700, fontSize: "1rem", textDecoration: "none", border: "var(--border-thick)", transition: "transform 0.15s, box-shadow 0.15s" }} className="cta-button-hover">Comenzar ahora ↗</Link>
            <Link href="/cuadernillos" style={{ padding: "14px 28px", background: "transparent", color: "var(--color-primary)", borderRadius: "var(--radius-md)", fontWeight: 700, fontSize: "1rem", textDecoration: "none", border: "var(--border-thick)" }}>Ver colección</Link>
          </div>
        </div>
        <div style={{ background: "#FDFAF5", border: "1px solid #D4C9B5", borderRadius: "var(--radius-md)", padding: "2.5rem 2rem 2.5rem 3.5rem", boxShadow: "0 8px 32px rgba(27,43,75,0.12)", position: "relative", overflow: "hidden", minHeight: 320 }}>
          <div style={{ position: "absolute", left: "2.5rem", top: 0, bottom: 0, width: "1px", background: "#F4A6A0" }} />
          {[{ text: "Mi caligrafía es mi arte.", filled: true }, { text: "", filled: false }, { text: "The quick brown fox.", filled: true }, { text: "", filled: false }, { text: "Abecedario completo...", filled: true }, { text: "", filled: false }].map((line, i) => (
            <div key={i} style={{ borderBottom: "1px solid #D4C9B5", paddingBottom: "0.6rem", marginBottom: "0.6rem", fontFamily: line.filled ? "var(--font-hand)" : undefined, fontSize: line.filled ? "1.25rem" : undefined, color: line.filled ? "var(--color-cta)" : "transparent", minHeight: "2rem" }}>{line.text}</div>
          ))}
          <div style={{ position: "absolute", top: "1rem", right: "1.5rem", fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: "5rem", color: "var(--color-primary)", opacity: 0.05, pointerEvents: "none", lineHeight: 1 }}>Aa</div>
        </div>
      </section>
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "0 2rem 5rem" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 700, marginBottom: "0.75rem" }}>¿Por qué practicar?</h2>
          <p style={{ color: "#64748b", fontSize: "1.05rem" }}>La escritura a mano desarrolla habilidades que perduran toda la vida.</p>
        </div>
        <div className="featureGrid">
          {BENEFITS.map((b) => (
            <div key={b.title} style={{ background: "#FDFAF5", border: "1px solid #D4C9B5", borderLeft: `3px solid ${b.color}`, borderRadius: "var(--radius-md)", padding: "2rem 1.5rem", display: "flex", flexDirection: "column", gap: "0.75rem", transition: "transform 0.2s, box-shadow 0.2s" }} className="featureCard">
              <span style={{ fontSize: "2.5rem" }}>{b.icon}</span>
              <h3 style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontWeight: 700, fontSize: "1.3rem" }}>{b.title}</h3>
              <p style={{ color: "#475569", lineHeight: 1.65, fontSize: "0.95rem" }}>{b.text}</p>
            </div>
          ))}
        </div>
      </section>
      <section style={{ background: "var(--color-primary)", color: "white", padding: "3.5rem 2rem", textAlign: "center" }}>
        <p style={{ fontFamily: "var(--font-hand)", fontSize: "clamp(1.5rem, 4vw, 2.2rem)", fontStyle: "italic", maxWidth: 700, margin: "0 auto", lineHeight: 1.6 }}>«La letra con sangre entra… pero con elegancia y práctica, entra mejor.»</p>
      </section>
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "5rem 2rem" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 700, marginBottom: "0.75rem" }}>Elige tu herramienta</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "2rem" }}>
          {[{ href: "/generador", icon: "✏️", title: "Generador Libre", desc: "Crea fichas al instante. Ajusta formato, fuente, tamaño y color sin complicaciones.", cta: "Crear ficha libre →", accentBg: "#FFF8F6" }, { href: "/caligrafiate", icon: "📖", title: "Asistente Guiado", desc: "Construye fichas paso a paso. Perfecto para educadores que buscan control total.", cta: "Iniciar asistente →", accentBg: "#F5F8FF" }].map((tool) => (
            <div key={tool.href} style={{ background: tool.accentBg, border: "1px solid #D4C9B5", borderRadius: "var(--radius-md)", padding: "2.5rem", display: "flex", flexDirection: "column", gap: "1rem" }} className="card-hover-effect">
              <span style={{ fontSize: "2.5rem" }}>{tool.icon}</span>
              <h3 style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontWeight: 700, fontSize: "1.5rem" }}>{tool.title}</h3>
              <p style={{ color: "#475569", lineHeight: 1.65, fontSize: "0.95rem", flex: 1 }}>{tool.desc}</p>
              <Link href={tool.href} style={{ display: "inline-block", padding: "12px 24px", background: "var(--color-cta)", color: "white", borderRadius: "var(--radius-md)", fontWeight: 700, textDecoration: "none", border: "var(--border-thick)", fontSize: "0.95rem", alignSelf: "flex-start", transition: "transform 0.15s, box-shadow 0.15s" }} className="cta-button-hover">{tool.cta}</Link>
            </div>
          ))}
        </div>
      </section>
      <style>{`@media (max-width: 768px) { .tinta-hero-grid { grid-template-columns: 1fr !important; } }`}</style>
    </main>
  );
}

function HomeMagico() {
  return (
    <main style={{ minHeight: "100vh", fontFamily: "var(--font-main)", background: "var(--color-background)", color: "var(--color-primary)" }}>
      <Header />
      <div style={{ textAlign: "center", paddingTop: "2rem" }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "white", border: "var(--border-thick)", borderRadius: "100px", padding: "8px 20px", fontWeight: 800, fontSize: "0.9rem", boxShadow: "var(--shadow-sm)" }}>🏆 ¡Más de 150 alumnos practicando hoy!</span>
      </div>
      <section style={{ maxWidth: 900, margin: "0 auto", padding: "2.5rem 2rem 0", textAlign: "center" }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "clamp(2.8rem, 8vw, 5rem)", lineHeight: 1.05, marginBottom: "1rem", letterSpacing: "-1px" }}>CALIGRA-<span style={{ color: "var(--color-cta)" }}>FÍATE</span> ✨</h1>
        <p style={{ fontFamily: "var(--font-hand)", fontSize: "clamp(1.1rem, 3vw, 1.5rem)", color: "#6B21A8", marginBottom: "2.5rem", fontStyle: "italic" }}>El arte de escribir con un toque de magia</p>
        <div style={{ display: "flex", justifyContent: "center", gap: "1.25rem", flexWrap: "wrap", marginBottom: "3rem" }}>
          <Link href="/caligrafiate" style={{ padding: "16px 40px", background: "var(--color-secondary)", color: "white", borderRadius: "100px", fontWeight: 800, fontSize: "1.1rem", textDecoration: "none", border: "var(--border-thick)", boxShadow: "var(--shadow-flat)", transition: "transform 0.1s, box-shadow 0.1s" }} className="cta-button-hover">¡Comenzar mi aventura! 🚀</Link>
          <Link href="/cuadernillos" style={{ padding: "16px 32px", background: "white", color: "var(--color-primary)", borderRadius: "100px", fontWeight: 800, fontSize: "1.1rem", textDecoration: "none", border: "var(--border-thick)", boxShadow: "var(--shadow-md)" }}>Ver cuadernos 📚</Link>
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap", marginBottom: "4rem" }}>
          {[{ icon: "🅰", label: "Vocales", stars: 1 }, { icon: "🔠", label: "Abecedario", stars: 2 }, { icon: "📖", label: "Textos", stars: 3 }].map((item) => (
            <Link href="/cuadernillos" key={item.label} style={{ background: "white", border: "var(--border-thick)", borderRadius: "var(--radius-md)", padding: "1.25rem 1.5rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem", textDecoration: "none", color: "var(--color-primary)", boxShadow: "var(--shadow-md)", minWidth: 100, transition: "transform 0.2s" }} className="card-hover-effect">
              <span style={{ fontSize: "2rem" }}>{item.icon}</span>
              <span style={{ fontWeight: 800, fontSize: "0.9rem" }}>{item.label}</span>
              <span style={{ fontSize: "1rem", letterSpacing: 2 }}>{"★".repeat(item.stars)}{"☆".repeat(3 - item.stars)}</span>
            </Link>
          ))}
        </div>
      </section>
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "0 2rem 5rem" }}>
        <div className="featureGrid">
          {BENEFITS.map((b) => (
            <div key={b.title} style={{ background: "white", border: "var(--border-thick)", borderRadius: "var(--radius-md)", padding: "2rem", display: "flex", flexDirection: "column", gap: "0.75rem", boxShadow: "var(--shadow-flat)" }} className="featureCard">
              <div style={{ width: 48, height: 48, borderRadius: "var(--radius-sm)", background: `${b.color}22`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.8rem" }}>{b.icon}</div>
              <h3 style={{ fontWeight: 800, fontSize: "1.2rem" }}>{b.title}</h3>
              <p style={{ color: "#475569", lineHeight: 1.6, fontSize: "0.95rem" }}>{b.text}</p>
              <span style={{ fontWeight: 800, fontSize: "0.75rem", color: "var(--color-secondary)", textTransform: "uppercase" as const, letterSpacing: "0.5px" }}>NIVEL {b.nivel} ACTIVO ✓</span>
            </div>
          ))}
        </div>
      </section>
      <section style={{ background: "var(--color-secondary)", padding: "3rem 2rem", textAlign: "center", color: "white" }}>
        <p style={{ fontWeight: 800, fontSize: "1.2rem", marginBottom: "1.25rem" }}>¿Quieres tus propias frases?</p>
        <p style={{ opacity: 0.9, marginBottom: "2rem" }}>¡Usa el Generador para escribir lo que tú quieras!</p>
        <Link href="/generador" style={{ display: "inline-block", padding: "14px 32px", background: "white", color: "var(--color-secondary)", borderRadius: "100px", fontWeight: 800, textDecoration: "none", border: "var(--border-thick)", fontSize: "1rem" }}>🪄 Abrir Generador</Link>
      </section>
    </main>
  );
}

function HomeStudio() {
  return (
    <main style={{ minHeight: "100vh", fontFamily: "var(--font-main)", background: "var(--color-background)", color: "var(--color-primary)" }}>
      <Header />
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "clamp(3rem, 8vw, 6rem) 2rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }} className="studio-hero-grid">
        <div>
          <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--color-cta)", textTransform: "uppercase" as const, letterSpacing: "1.5px", marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--color-cta)", display: "inline-block" }} />
            GENERADOR DE FICHAS DE CALIGRAFÍA
          </p>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(2.2rem, 5vw, 3.2rem)", lineHeight: 1.15, marginBottom: "1.25rem" }}>Fichas perfectas para tu aula, en segundos</h1>
          <p style={{ fontSize: "1.05rem", lineHeight: 1.75, color: "#475569", marginBottom: "2.5rem", maxWidth: 460 }}>Diseñado para docentes y familias. Fuentes educativas reales, descarga en PDF listo para imprimir.</p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
            <Link href="/caligrafiate" style={{ padding: "13px 28px", background: "var(--color-cta)", color: "white", borderRadius: "var(--radius-md)", fontWeight: 700, fontSize: "0.95rem", textDecoration: "none", border: "var(--border-thick)", transition: "transform 0.15s, box-shadow 0.15s" }} className="cta-button-hover">Crear ficha ahora</Link>
            <Link href="/cuadernillos" style={{ padding: "13px 24px", background: "white", color: "var(--color-primary)", borderRadius: "var(--radius-md)", fontWeight: 600, fontSize: "0.95rem", textDecoration: "none", border: "var(--border-thick)" }}>Ver ejemplos</Link>
          </div>
          <div style={{ display: "flex", gap: "1.25rem", flexWrap: "wrap" }}>
            {["✓ Fuentes educativas", "✓ Descarga PDF", "✓ Sin registro"].map((b) => (<span key={b} style={{ fontSize: "0.82rem", color: "#64748b", fontWeight: 600 }}>{b}</span>))}
          </div>
        </div>
        <div style={{ background: "#1E293B", borderRadius: "var(--radius-lg)", overflow: "hidden", boxShadow: "0 24px 64px rgba(0,0,0,0.2)" }}>
          <div style={{ padding: "10px 16px", display: "flex", alignItems: "center", gap: "8px", background: "#334155" }}>
            <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#EF4444", display: "inline-block" }} />
            <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#F59E0B", display: "inline-block" }} />
            <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#22C55E", display: "inline-block" }} />
            <span style={{ fontSize: "0.72rem", color: "#94A3B8", marginLeft: "0.5rem" }}>ficha-caligrafía.pdf</span>
          </div>
          <div style={{ background: "white", padding: "2rem 2rem 2rem 3rem", position: "relative", minHeight: 280 }}>
            <div style={{ position: "absolute", left: "2.5rem", top: 0, bottom: 0, width: "1px", background: "#F4A6A0" }} />
            {[{ text: "Mi nombre es Lucía.", filled: true }, { text: "", filled: false }, { text: "Hoy es lunes.", filled: true }, { text: "", filled: false }, { text: "", filled: false }].map((line, i) => (
              <div key={i} style={{ borderBottom: "1px solid #E2E8F0", paddingBottom: "0.55rem", marginBottom: "0.55rem", fontFamily: line.filled ? "'Dancing Script', cursive" : undefined, fontSize: line.filled ? "1.2rem" : undefined, color: line.filled ? "var(--color-cta)" : "transparent", minHeight: "1.9rem" }}>{line.text}</div>
            ))}
          </div>
        </div>
      </section>
      <section style={{ borderTop: "1px solid #E2E8F0", borderBottom: "1px solid #E2E8F0", background: "white" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }} className="stats-grid">
          {STATS.map((s, i) => (
            <div key={s.l} style={{ padding: "2rem", textAlign: "center", borderRight: i < STATS.length - 1 ? "1px solid #E2E8F0" : undefined }} className="stats-cell">
              <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "2.25rem", color: "var(--color-cta)", lineHeight: 1, marginBottom: "0.3rem" }}>{s.n}</p>
              <p style={{ fontSize: "0.85rem", color: "#64748b", fontWeight: 600 }}>{s.l}</p>
            </div>
          ))}
        </div>
      </section>
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "5rem 2rem" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(1.8rem, 4vw, 2.5rem)", marginBottom: "0.75rem" }}>Por qué elegir Caligra-Fíate</h2>
          <p style={{ color: "#64748b", fontSize: "1.05rem" }}>Diseñado para el aula moderna, usado por familias de toda España.</p>
        </div>
        <div className="featureGrid">
          {BENEFITS.map((b) => (
            <div key={b.title} style={{ background: "white", border: "1px solid #E2E8F0", borderRadius: "var(--radius-md)", padding: "2rem 1.75rem", display: "flex", flexDirection: "column", gap: "0.75rem" }} className="featureCard">
              <div style={{ width: 44, height: 44, borderRadius: "var(--radius-sm)", background: `${b.color}18`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.6rem" }}>{b.icon}</div>
              <h3 style={{ fontWeight: 700, fontSize: "1.15rem" }}>{b.title}</h3>
              <p style={{ color: "#64748b", lineHeight: 1.7, fontSize: "0.95rem" }}>{b.text}</p>
            </div>
          ))}
        </div>
      </section>
      <style>{`
        @media (max-width: 768px) {
          .studio-hero-grid { grid-template-columns: 1fr !important; }
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .stats-cell:nth-child(2) { border-right: none !important; }
        }
        @media (max-width: 480px) {
          .stats-grid { grid-template-columns: 1fr !important; }
          .stats-cell { border-right: none !important; border-bottom: 1px solid #E2E8F0; }
        }
      `}</style>
    </main>
  );
}

export default function Home() {
  const { theme } = useTheme();
  if (theme === "tinta") return <HomeTinta />;
  if (theme === "studio") return <HomeStudio />;
  return <HomeMagico />;
}
