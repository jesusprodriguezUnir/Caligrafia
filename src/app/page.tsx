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
        
        <div className={styles.actions} style={{ gap: "2rem", justifyContent: "center" }}>
          <Link href="/cuadernillos" className="btn-primary" style={{ 
            padding: "20px 50px", 
            fontSize: "1.5rem", 
            borderRadius: "var(--radius-md)", 
            backgroundColor: "var(--color-secondary)", 
            border: "var(--border-thick)",
            boxShadow: "6px 6px 0px #0369A1",
            fontWeight: 900,
            textDecoration: "none",
            color: "white"
          }}>
            Sabes más &gt;
          </Link>
          <Link href="/lienzo" style={{ 
            padding: "20px 50px", 
            fontSize: "1.5rem", 
            borderRadius: "var(--radius-md)", 
            background: "white", 
            color: "var(--color-primary)", 
            border: "var(--border-thick)",
            boxShadow: "6px 6px 0px #1A1A1A",
            fontWeight: 900,
            textDecoration: "none"
          }}>
            A jugar &gt;
          </Link>
        </div>
      </div>

    </main>
  );
}
