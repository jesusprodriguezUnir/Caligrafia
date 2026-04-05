import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className={styles.main}>
      {/* 🎈 PLAYFUL HERO SECTION */}
      <div className={styles.hero} style={{ 
        background: "white", 
        border: "var(--border-thick)", 
        padding: "clamp(2rem, 6vw, 4rem)", 
        borderRadius: "var(--radius-lg)", 
        boxShadow: "var(--shadow-flat)",
        maxWidth: "1100px",
        margin: "0 auto",
        position: "relative",
        width: "100%",
        textAlign: "center"
      }}>
        <div style={{ position: "relative", width: "100%", maxWidth: "700px", aspectRatio: "16 / 9", borderRadius: "12px", overflow: "hidden", margin: "0 auto 3rem", border: "var(--border-thick)", background: "linear-gradient(180deg, #d9f1ff 0%, #edf7ff 100%)", boxShadow: "6px 6px 0 #1a1a1a" }}>
           <Image 
             src="/hero.png" 
             alt="Un lápiz mágico gigante escribiendo CALIGRA-FIATE con el acento de lápiz" 
             fill
             priority
             sizes="(max-width: 1200px) 100vw, 700px"
             quality={100}
             style={{ objectFit: "cover" }}
           />
        </div>
        
        <h1 className={styles.title} style={{ 
          fontFamily: "var(--font-display)", 
          fontWeight: 800, 
          fontSize: "clamp(2rem, 8vw, 4.5rem)", 
          color: "var(--color-primary)", 
          lineHeight: 1.1, 
          marginBottom: "1.5rem",
          textShadow: "3px 3px 0 rgba(14, 165, 233, 0.1)"
        }}>
          CALIGRA-F<span className="pencilAccentLetter">I</span>ATE
        </h1>
        
        <p className={styles.subtitle} style={{ 
          color: "#475569", 
          fontWeight: 700, 
          fontSize: "clamp(1rem, 3vw, 1.4rem)", 
          maxWidth: "800px", 
          margin: "0 auto 3.5rem", 
          lineHeight: 1.6,
          fontFamily: "var(--font-hand)",
          textTransform: "uppercase",
          letterSpacing: "1px"
        }}>
          ¡Aprende Jugando con Letras Mágicas! ✨
        </p>

        <Link href="/caligrafiate" style={{
          padding: "20px 50px",
          background: "var(--color-cta)",
          color: "white",
          borderRadius: "100px",
          fontWeight: 800,
          fontSize: "1.5rem",
          textDecoration: "none",
          boxShadow: "8px 8px 0 #1a1a1a",
          display: "inline-block",
          border: "var(--border-thick)",
          transition: "transform 0.1s ease, box-shadow 0.1s ease",
        }} className="cta-button-hover">
          Crear ficha ahora →
        </Link>
      </div>

      {/* 🏗️ SECCIÓN DE BENEFICIOS */}
      <section className="sectionContainer">
        <div className="sectionHeader">
          <h2 className="sectionTitle" style={{ fontFamily: "var(--font-display)" }}>¿Por qué practicar?</h2>
          <p className="sectionSubtitle" style={{ fontWeight: 700 }}>¡Aprender a escribir es un superpoder!</p>
        </div>
        <div className="featureGrid">
          <div className="featureCard" style={{ borderColor: "#22C55E" }}>
            <span className="featureIcon">🧠</span>
            <h3 className="featureTitle" style={{ fontFamily: "var(--font-display)" }}>Psicomotricidad</h3>
            <p className="featureText">Mejora la precisión de tu mano mientras te diviertes trazando letras mágicas.</p>
          </div>
          <div className="featureCard" style={{ borderColor: "#0EA5E9" }}>
            <span className="featureIcon">🎯</span>
            <h3 className="featureTitle" style={{ fontFamily: "var(--font-display)" }}>Concentración</h3>
            <p className="featureText">Enfócate en cada trazo y descubre la paz que da dibujar tus propias palabras.</p>
          </div>
          <div className="featureCard" style={{ borderColor: "#EF4444" }}>
            <span className="featureIcon">🎨</span>
            <h3 className="featureTitle" style={{ fontFamily: "var(--font-display)" }}>Creatividad</h3>
            <p className="featureText">Personaliza tus fichas y convierte la tarea en un momento de creación artística.</p>
          </div>
        </div>
      </section>

      {/* 🖼️ SECCIÓN DE EJEMPLOS */}
      <section className="sectionContainer" style={{ background: "white", padding: "5rem 2rem", borderRadius: "var(--radius-lg)", border: "var(--border-thick)", boxShadow: "var(--shadow-flat)" }}>
        <div className="sectionHeader">
          <h2 className="sectionTitle" style={{ fontFamily: "var(--font-display)" }}>Fichas para cada etapa</h2>
          <p className="sectionSubtitle" style={{ fontWeight: 700 }}>Desde tus primeros puntos hasta frases completas.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "3rem" }}>
          <div style={{ padding: "10px", border: "var(--border-thick)", borderRadius: "var(--radius-md)", background: "#f0f9ff", transform: "rotate(-2deg)", textAlign: "center" }}>
            <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>✏️</div>
            <strong style={{ fontSize: "1.2rem", display: "block" }}>Letra Punteada</strong>
            <p>Ideal para empezar a calcar.</p>
          </div>
          <div style={{ padding: "10px", border: "var(--border-thick)", borderRadius: "var(--radius-md)", background: "#f0fdf4", transform: "rotate(2deg)", textAlign: "center" }}>
            <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>📏</div>
            <strong style={{ fontSize: "1.2rem", display: "block" }}>Pauta Guiada</strong>
            <p>Para controlar la altura.</p>
          </div>
          <div style={{ padding: "10px", border: "var(--border-thick)", borderRadius: "var(--radius-md)", background: "#fff7ed", transform: "rotate(-1deg)", textAlign: "center" }}>
            <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>⊞</div>
            <strong style={{ fontSize: "1.2rem", display: "block" }}>Cuadrícula</strong>
            <p>Perfecta para matemáticas.</p>
          </div>
        </div>
      </section>

      {/* 💬 TESTIMONIOS */}
      <section className="sectionContainer">
        <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
          <h2 className="sectionTitle" style={{ fontFamily: "var(--font-display)" }}>Lo que dicen los profes</h2>
          <div style={{ marginTop: "3rem", padding: "3rem", background: "white", border: "var(--border-thick)", borderRadius: "var(--radius-md)", boxShadow: "var(--shadow-flat)" }}>
            <p style={{ fontStyle: "italic", fontSize: "1.2rem", color: "var(--color-primary)", marginBottom: "1.5rem", fontWeight: 700 }}>
              "¡Es la mejor forma de que mis alumnos practiquen caligrafía sin aburrirse! El lápiz mágico les motiva muchísimo."
            </p>
            <strong style={{ color: "var(--color-secondary)", fontSize: "1.1rem" }}>— Profa. Laura, Escuela Infantil El Bosque</strong>
          </div>
        </div>
      </section>

      {/* ℹ️ SOBRE NOSOTROS */}
      <section className="sectionContainer" style={{ marginBottom: "8rem" }}>
        <div style={{ background: "var(--color-secondary)", color: "white", padding: "4rem", borderRadius: "var(--radius-lg)", border: "var(--border-thick)", boxShadow: "8px 8px 0 var(--color-primary)" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2.5rem", marginBottom: "1.5rem" }}>Nuestra Magia</h2>
          <p style={{ fontSize: "1.2rem", lineHeight: 1.8, fontWeight: 700 }}>
            Caligra-Fiate nace para devolver la ilusión por la escritura. Combinamos la pedagogía clásica con un entorno digital amigable para que cada niño descubra su propio estilo a su propio ritmo.
          </p>
        </div>
      </section>
    </main>
  );
}
