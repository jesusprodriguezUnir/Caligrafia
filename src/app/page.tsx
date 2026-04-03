import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className={styles.main} style={{ fontFamily: "var(--font-main)" }}>
      <div className={`${styles.hero}`} style={{ 
        background: "white", 
        border: "var(--border-thick)", 
        padding: "3.5rem", 
        borderRadius: "var(--radius-lg)", 
        boxShadow: "var(--shadow-flat)",
        maxWidth: "1100px",
        margin: "0 auto",
        position: "relative"
      }}>
        {/* Adorno de esquina hand-drawn */}
        <div style={{ position: "absolute", top: "-20px", right: "40px", background: "white", border: "var(--border-thick)", borderRadius: "15px", padding: "8px 20px", fontWeight: 900, transform: "rotate(5deg)", fontSize: "0.9rem" }}>
          ¡NUEVO CURSO! 🖍️
        </div>

        <div style={{ position: "relative", width: "100%", height: "350px", borderRadius: "var(--radius-md)", overflow: "hidden", marginBottom: "2.5rem", border: "var(--border-thick)" }}>
           <Image 
             src="/hero-play.png" 
             alt="Caligrafía Creativa" 
             fill
             priority
             style={{ objectFit: "cover" }}
           />
        </div>
        
        <h1 className={styles.title} style={{ fontWeight: 900, fontSize: "4rem", color: "var(--color-primary)", lineHeight: 1.1 }}>
          <span style={{ fontSize: "1.5rem", display: "block", color: "var(--color-accent)", fontFamily: "var(--font-hand)", marginBottom: "0.5rem" }}>Aprende de forma divertida</span>
          CALIGRAFÍA <span style={{ color: "var(--color-secondary)" }}>MÁGICA</span>
        </h1>
        
        <p className={styles.subtitle} style={{ color: "#475569", fontWeight: 600, fontSize: "1.3rem", marginBottom: "3rem", maxWidth: "800px", margin: "1rem auto 3rem" }}>
          ¡Crea, practica y juega con letras mágicas en un entorno lleno de creatividad! 🌟
        </p>
        
        {/* Tarjeta destacada — Caligraf_iate */}
        <div style={{
          background: "linear-gradient(135deg, #0EA5E9 0%, #1A1A1A 100%)",
          border: "var(--border-thick)",
          borderRadius: "var(--radius-md)",
          padding: "2rem 2.5rem",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1.5rem",
          boxShadow: "8px 8px 0px #000",
          flexWrap: "wrap",
          marginBottom: "2rem",
          textAlign: "left",
          position: "relative",
          overflow: "hidden"
        }}>
          {/* Doodle de fondo */}
          <div style={{ position: "absolute", right: "20px", top: "10px", fontSize: "6rem", opacity: 0.1, transform: "rotate(15deg)" }}>✍️</div>
          <div style={{ flex: 1, minWidth: "220px" }}>
            <div style={{ display: "inline-block", background: "var(--color-accent)", border: "2px solid white", borderRadius: "30px", padding: "3px 14px", fontSize: "0.78rem", fontWeight: 900, marginBottom: "0.7rem", letterSpacing: "1px" }}>
              ✨ GENERADOR DE FICHAS
            </div>
            <h2 style={{ fontSize: "3.5rem", fontWeight: 800, margin: "0 0 0.4rem", lineHeight: 1.1, fontFamily: "var(--font-calligraphy)", textShadow: "2px 2px 0px rgba(0,0,0,0.1)" }}>
              Caligra<span style={{ color: "#EF4444" }}>-</span>Fíate
            </h2>
            <p style={{ margin: 0, opacity: 0.85, fontSize: "1rem", fontWeight: 600 }}>
              Crea fichas personalizadas paso a paso: formato, márgenes, tipo de letra y contenido.
            </p>
          </div>
          <Link href="/caligrafiate" style={{
            flexShrink: 0,
            padding: "16px 32px",
            background: "white",
            color: "var(--color-primary)",
            border: "3px solid white",
            borderRadius: "50px",
            fontWeight: 900,
            fontSize: "1.1rem",
            textDecoration: "none",
            boxShadow: "4px 4px 0 #EF4444",
            display: "inline-block",
            whiteSpace: "nowrap"
          }}>
            Crear ficha →
          </Link>
        </div>

        <div className={styles.actions} style={{ gap: "2rem", justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/cuadernillos" className="btn-primary" style={{ 
            padding: "20px 40px", 
            fontSize: "1.4rem", 
            borderRadius: "var(--radius-md)", 
            backgroundColor: "var(--color-secondary)", 
            border: "var(--border-thick)",
            boxShadow: "6px 6px 0px #0369A1",
            fontWeight: 900,
            textDecoration: "none",
            color: "white"
          }}>
            Saber más &gt;
          </Link>
        </div>
      </div>

    </main>
  );
}
