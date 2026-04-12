import styles from "./page.module.css";
import { SpiralIcon } from "@/components/Icons";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className={styles.main}>
      {/* 🎈 ELEGANT HERO SECTION */}
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
        <div style={{ position: "relative", width: "100%", maxWidth: "900px", aspectRatio: "21 / 9", borderRadius: "12px", overflow: "hidden", margin: "0 auto 3rem", border: "var(--border-thick)", background: "linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)", boxShadow: "6px 6px 0 #1a1a1a" }}>
          <Image
            src="/hero-elegant.png"
            alt="Escritura elegante con pluma en un escritorio minimalista"
            fill
            priority
            sizes="(max-width: 1200px) 100vw, 900px"
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
          textShadow: "3px 3px 0 rgba(14, 165, 233, 0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.2rem",
          position: "relative"
        }}>
          {/* Filigree Background Spiral */}
          <SpiralIcon className="spiral-svg-accent" />
          
          CALIGRA-F<span style={{ position: "relative" }}>I<SpiralIcon className="tilde-spiral" /></span>ATE
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
          El Arte de Escribir con un Toque de Magia ✨
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "1.5rem" }}>
          <Link href="/caligrafiate" id="cta-start-wizard" style={{
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
            Comenzar mi viaje →
          </Link>
          <Link href="/cuadernillos" id="cta-explore-collection" style={{
            padding: "20px 40px",
            background: "white",
            color: "var(--color-primary)",
            borderRadius: "100px",
            fontWeight: 800,
            fontSize: "1.5rem",
            textDecoration: "none",
            boxShadow: "8px 8px 0 #1a1a1a",
            display: "inline-block",
            border: "var(--border-thick)",
            transition: "transform 0.1s ease, box-shadow 0.1s ease",
          }} className="cta-button-hoverSecondary">
            Explorar Colección
          </Link>
        </div>
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
          <h2 className="sectionTitle" style={{ fontFamily: "var(--font-display)" }}>Herramientas para cada etapa</h2>
          <p className="sectionSubtitle" style={{ fontWeight: 700 }}>Desde tus primeros puntos hasta frases completas.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "3rem" }}>
          <div style={{ padding: "10px", border: "var(--border-thick)", borderRadius: "var(--radius-md)", background: "#f0f9ff", transform: "rotate(-2deg)", textAlign: "center" }}>
            <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>📖</div>
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

      {/* ⚙️ ELIGE TU HERRAMIENTA */}
      <section className="sectionContainer">
        <div className="sectionHeader">
          <h2 className="sectionTitle" style={{ fontFamily: "var(--font-display)" }}>Elige tu herramienta</h2>
          <p className="sectionSubtitle" style={{ fontWeight: 700 }}>Dos formas de crear fichas de caligrafía mágicas.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "3rem", maxWidth: "900px", margin: "0 auto" }}>
          {/* Generador Libre */}
          <div className="card-hover-effect" style={{ padding: "3rem", border: "var(--border-thick)", borderRadius: "var(--radius-lg)", background: "#fff7ed", boxShadow: "4px 4px 0 rgba(251, 146, 60, 0.3)" }}>
            <div style={{ fontSize: "3rem", marginBottom: "1.5rem", textAlign: "center" }}>⚡</div>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", marginBottom: "1rem", color: "var(--color-primary)" }}>Generador Libre</h3>
            <p style={{ fontSize: "1rem", lineHeight: 1.6, color: "#475569", marginBottom: "2rem" }}>
              Crea fichas al instante. Ajusta formato, fuente, tamaño y color sin complicaciones.
            </p>
            <ul style={{ listStyle: "none", marginBottom: "2rem", fontSize: "0.95rem" }}>
              <li style={{ marginBottom: "0.5rem" }}>✓ Interfaz directa y simple</li>
              <li style={{ marginBottom: "0.5rem" }}>✓ Personalización rápida</li>
              <li>✓ Descarga instantánea</li>
            </ul>
            <Link href="/generador" style={{
              display: "inline-block",
              padding: "15px 35px",
              background: "var(--color-cta)",
              color: "white",
              borderRadius: "100px",
              fontWeight: 800,
              textDecoration: "none",
              border: "var(--border-thick)",
              boxShadow: "6px 6px 0 #1a1a1a",
              transition: "transform 0.1s ease, box-shadow 0.1s ease"
            }} className="cta-button-hover">
              Crear ficha libre →
            </Link>
          </div>

          {/* Asistente Guiado */}
          <div className="card-hover-effect" style={{ padding: "3rem", border: "var(--border-thick)", borderRadius: "var(--radius-lg)", background: "#f0f9ff", boxShadow: "4px 4px 0 rgba(14, 165, 233, 0.3)" }}>
            <div style={{ fontSize: "3rem", marginBottom: "1.5rem", textAlign: "center" }}>🧙</div>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", marginBottom: "1rem", color: "var(--color-primary)" }}>Asistente Guiado</h3>
            <p style={{ fontSize: "1rem", lineHeight: 1.6, color: "#475569", marginBottom: "2rem" }}>
              Construye fichas paso a paso. Perfecto para educadores que buscan control total.
            </p>
            <ul style={{ listStyle: "none", marginBottom: "2rem", fontSize: "0.95rem" }}>
              <li style={{ marginBottom: "0.5rem" }}>✓ Asistente interactivo</li>
              <li style={{ marginBottom: "0.5rem" }}>✓ Más opciones de contenido</li>
              <li>✓ Generación avanzada</li>
            </ul>
            <Link href="/caligrafiate" style={{
              display: "inline-block",
              padding: "15px 35px",
              background: "var(--color-secondary)",
              color: "white",
              borderRadius: "100px",
              fontWeight: 800,
              textDecoration: "none",
              border: "var(--border-thick)",
              boxShadow: "6px 6px 0 #1a1a1a",
              transition: "transform 0.1s ease, box-shadow 0.1s ease"
            }} className="cta-button-hover">
              Abrir asistente →
            </Link>
          </div>
        </div>
      </section>

      {/* ℹ️ SOBRE NOSOTROS */}
      <section className="sectionContainer" style={{ marginBottom: "8rem" }}>
        <div style={{ background: "var(--color-secondary)", color: "white", padding: "4rem", borderRadius: "var(--radius-lg)", border: "var(--border-thick)", boxShadow: "8px 8px 0 var(--color-primary)" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2.5rem", marginBottom: "1.5rem" }}>Nuestra Misión</h2>
          <p style={{ fontSize: "1.2rem", lineHeight: 1.8, fontWeight: 700 }}>
            Caligra-Fiate nace para devolver la ilusión por la escritura. Combinamos la pedagogía clásica con un estilo moderno y amigable para que cada alumno descubra su propio camino.
          </p>
        </div>
      </section>
    </main>
  );
}
