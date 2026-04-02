import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className={styles.main} style={{ background: "var(--color-background)" }}>
      <div className={`${styles.hero} glass`} style={{ border: "1px solid #E2E8F0", padding: "3rem" }}>
        <div style={{ position: "relative", width: "100%", height: "300px", borderRadius: "var(--radius-lg)", overflow: "hidden", marginBottom: "2.5rem", boxShadow: "var(--shadow-md)" }}>
           <Image 
             src="/hero.png" 
             alt="Caligrafía Mágica Pro" 
             fill
             priority
             style={{ objectFit: "cover" }}
           />
        </div>
        <h1 className={styles.title} style={{ fontWeight: 700, letterSpacing: "-1px" }}>
          Excelencia en <span className={styles.highlight} style={{ color: "var(--color-primary)" }}>Caligrafía</span>
        </h1>
        <p className={styles.subtitle} style={{ color: "#475569", marginBottom: "3rem" }}>
          La plataforma definitiva para el desarrollo de la escritura. Recursos especializados y herramientas de generación con inteligencia artificial.
        </p>
        <div className={styles.actions} style={{ gap: "1rem" }}>
          <Link href="/cuadernillos" className="btn-primary" style={{ padding: "14px 32px" }}>
            Explorar Recursos
          </Link>
          <Link href="/lienzo" className={styles.btnSecondary} style={{ padding: "14px 32px", border: "1px solid #CBD5E1", background: "white", boxShadow: "var(--shadow-sm)" }}>
            Lienzo Interactivo
          </Link>
        </div>
      </div>
    </main>
  );
}
