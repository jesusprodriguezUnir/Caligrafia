import Link from "next/link";
import styles from "../page.module.css";

export default function Cuadernillos() {
  return (
    <main className={styles.main}>
      <div className={`${styles.hero} glass`}>
        <h1 className={styles.title}>Centro de Descargas</h1>
        <p className={styles.subtitle}>
          Aquí podrás encontrar todos los cuadernillos Rubio organizados por nivel y tipo.
        </p>
        <div style={{ padding: "2rem", border: "2px dashed var(--color-primary)", borderRadius: "var(--radius-md)", marginBottom: "2rem" }}>
          <p>Próximamente: Lista de PDFs para descargar...</p>
        </div>
        <Link href="/" className="btn-primary">
          &larr; Volver al Inicio
        </Link>
      </div>
    </main>
  );
}
