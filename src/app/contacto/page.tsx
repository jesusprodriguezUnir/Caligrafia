import Link from "next/link";
import styles from "./contacto.module.css";

const contactLinks = {
  email: "mailto:contacto@caligra-fiate.com",
  instagram: "https://www.instagram.com/caligrafiate",
  facebook: "https://www.facebook.com/caligrafiate",
  tiktok: "https://www.tiktok.com/@caligrafiate",
};

export default function ContactoPage() {
  return (
    <main className={styles.main}>
      <section className={styles.card}>
        <Link href="/caligrafiate" className={styles.backLink} id="back-link">
          ← Volver a Caligra-fiate
        </Link>

        <h1 className={styles.title}>Contacto</h1>
        <p className={styles.subtitle}>
          Estamos disponibles para ayudarte con dudas, colaboraciones o soporte.
        </p>

        <div className={styles.grid}>
          <a className={styles.item} href={contactLinks.email}>
            <strong>Correo</strong>
            <span>contacto@caligra-fiate.com</span>
          </a>

          <a className={styles.item} href={contactLinks.instagram} target="_blank" rel="noopener noreferrer">
            <strong>Instagram</strong>
            <span>@caligrafiate</span>
          </a>

          <a className={styles.item} href={contactLinks.facebook} target="_blank" rel="noopener noreferrer">
            <strong>Facebook</strong>
            <span>/caligrafiate</span>
          </a>

          <a className={styles.item} href={contactLinks.tiktok} target="_blank" rel="noopener noreferrer">
            <strong>TikTok</strong>
            <span>@caligrafiate</span>
          </a>
        </div>
      </section>
    </main>
  );
}
