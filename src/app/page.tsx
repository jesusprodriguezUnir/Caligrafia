import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={`${styles.hero} glass`}>
        <h1 className={styles.title}>
          ¡Bienvenido a <span className={styles.highlight}>Caligrafía Mágica</span>!
        </h1>
        <p className={styles.subtitle}>
          Aprender a escribir nunca fue tan divertido. Descubre nuestros cuadernillos y el lienzo interactivo mágico.
        </p>
        <div className={styles.actions}>
          <Link href="/cuadernillos" className="btn-primary">
            Ver Cuadernillos
          </Link>
          <Link href="/lienzo" className={styles.btnSecondary}>
            ¡Lienzo Mágico!
          </Link>
        </div>
      </div>
      
      <div className={styles.cloud1}>☁️</div>
      <div className={styles.cloud2}>☁️</div>
    </main>
  );
}
