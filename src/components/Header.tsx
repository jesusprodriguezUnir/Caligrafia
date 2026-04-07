import Link from "next/link";
import { SpiralIcon, BookIcon, SparklesIcon } from "./Icons";

export const Header = () => {
  return (
    <header style={{
      width: "100%",
      padding: "1rem 2rem",
      background: "rgba(255, 255, 255, 0.8)",
      backdropFilter: "blur(10px)",
      borderBottom: "var(--border-thick)",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      position: "sticky",
      top: 0,
      zIndex: 100,
    }}>
      <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.5rem", textDecoration: "none" }}>
        <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
          <SpiralIcon className="header-spiral" />
          <h1 style={{ 
            fontFamily: "var(--font-display)", 
            fontWeight: 900, 
            fontSize: "1.5rem", 
            color: "var(--color-primary)",
            letterSpacing: "-0.5px",
            margin: 0
          }}>
            CALIGRA-FÍATE
          </h1>
        </div>
      </Link>

      <nav style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
        <Link href="/cuadernillos" style={{ 
          display: "flex", 
          alignItems: "center", 
          gap: "0.4rem", 
          fontWeight: 700, 
          fontSize: "0.95rem",
          color: "var(--color-primary)",
          transition: "color 0.2s"
        }} className="nav-link">
          <BookIcon /> Colección
        </Link>
        <Link href="/generador" style={{ 
          background: "var(--color-secondary)", 
          padding: "8px 16px", 
          borderRadius: "100px", 
          color: "white", 
          fontWeight: 800, 
          fontSize: "0.95rem",
          display: "flex",
          alignItems: "center",
          gap: "0.4rem",
          border: "2px solid var(--color-primary)",
          boxShadow: "3px 3px 0 var(--color-primary)"
        }}>
          <SparklesIcon /> Generador
        </Link>
      </nav>
      
      <style jsx>{`
        .nav-link:hover {
          color: var(--color-secondary);
        }
        .header-spiral {
          color: var(--color-secondary);
          width: 1.5rem;
          height: 1.5rem;
        }
      `}</style>
    </header>
  );
};
