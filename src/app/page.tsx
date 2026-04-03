import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className={styles.main} style={{ background: "var(--color-background)", backgroundImage: "radial-gradient(var(--color-secondary) 1.5px, transparent 1.5px)", backgroundSize: "50px 50px" }}>
      <div className={`${styles.hero} glass`} style={{ border: "8px solid white", padding: "3rem", borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-lg)" }}>
        <div style={{ position: "relative", width: "100%", height: "300px", borderRadius: "100px", overflow: "hidden", marginBottom: "2.5rem", boxShadow: "var(--shadow-lg)", border: "8px solid #E0F2FE" }}>
           <Image 
             src="/hero.png" 
             alt="Aprende Caligrafía Jugando" 
             fill
             priority
             style={{ objectFit: "cover" }}
           />
        </div>
        <h1 className={styles.title} style={{ fontWeight: 900, fontSize: "4.5rem", color: "var(--color-primary)", textShadow: "4px 4px 0px rgba(14, 165, 233, 0.1)" }}>
          ¡Aventuras de <span style={{ color: "var(--color-secondary)", textDecoration: "underline" }}>Caligrafía</span> Mágica!
        </h1>
        <p className={styles.subtitle} style={{ color: "var(--color-text)", fontWeight: 700, fontSize: "1.4rem", marginBottom: "3rem" }}>
          ¡Practica sobre hojas mágicas, gana estrellas y diviértete con cada trazo! ✏️🌟
        </p>
        <div className={styles.actions} style={{ gap: "1.5rem" }}>
          <Link href="/cuadernillos" className="btn-primary" style={{ padding: "20px 45px", fontSize: "1.4rem", borderRadius: "100px", boxShadow: "0 10px 0px #0369A1", backgroundColor: "var(--color-primary)" }}>
            🚀 ¡Quiero mi Cuaderno!
          </Link>
          <Link href="/lienzo" style={{ padding: "20px 45px", fontSize: "1.4rem", border: "5px solid var(--color-primary)", borderRadius: "100px", background: "white", color: "var(--color-primary)", fontWeight: 900, boxShadow: "0 10px 0px #BAE6FD" }}>
            🎨 Dibujo Libre
          </Link>
        </div>
      </div>

    </main>
  );
}
