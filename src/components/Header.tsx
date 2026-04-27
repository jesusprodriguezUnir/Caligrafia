"use client";

import Link from "next/link";
import { useState } from "react";
import { SpiralIcon, BookIcon, SparklesIcon } from "./Icons";
import { ThemeSwitcher } from "./ThemeSwitcher";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header style={{
      width: "100%",
      padding: "0.75rem 2rem",
      background: "rgba(255, 255, 255, 0.9)",
      backdropFilter: "blur(10px)",
      borderBottom: "var(--border-thick)",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      position: "sticky",
      top: 0,
      zIndex: 100,
      gap: "1rem",
    }}>
      <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.5rem", textDecoration: "none", flexShrink: 0 }}>
        <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
          <SpiralIcon className="header-spiral" />
          <h1 style={{ 
            fontFamily: "var(--font-display)", 
            fontWeight: 900, 
            fontSize: "1.4rem", 
            color: "var(--color-primary)",
            letterSpacing: "-0.5px",
            margin: 0
          }}>
            CALIGRA-FÍATE
          </h1>
        </div>
      </Link>

      {/* Desktop Navigation */}
      <nav style={{ display: "flex", gap: "1rem", alignItems: "center" }} className="desktop-nav">
        <ThemeSwitcher />
        <Link href="/cuadernillos" style={{
          display: "flex",
          alignItems: "center",
          gap: "0.4rem",
          fontWeight: 700,
          fontSize: "0.9rem",
          color: "var(--color-primary)",
          transition: "color 0.2s",
          padding: "6px 12px",
        }} className="nav-link">
          <BookIcon /> Colección
        </Link>
        <Link href="/generador" style={{
          display: "flex",
          alignItems: "center",
          gap: "0.4rem",
          fontWeight: 700,
          fontSize: "0.9rem",
          color: "var(--color-primary)",
          transition: "color 0.2s",
          padding: "6px 12px",
        }} className="nav-link">
          <SparklesIcon /> Generador
        </Link>
        <Link href="/caligrafiate" style={{
          background: "var(--color-cta)",
          padding: "8px 18px",
          borderRadius: "var(--radius-md)",
          color: "white",
          fontWeight: 800,
          fontSize: "0.9rem",
          display: "flex",
          alignItems: "center",
          gap: "0.4rem",
          border: "var(--border-thick)",
          boxShadow: "var(--shadow-sm)",
          textDecoration: "none",
          transition: "transform 0.15s ease, box-shadow 0.15s ease",
          whiteSpace: "nowrap",
        }} className="cta-header-btn">
          Crear ficha
        </Link>
      </nav>

      {/* Mobile Hamburger Button */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        style={{
          display: "none",
          background: "white",
          border: "var(--border-thick)",
          borderRadius: "8px",
          padding: "8px 12px",
          cursor: "pointer",
          fontSize: "1.5rem",
          width: "44px",
          height: "44px",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
        className="hamburger-btn"
        aria-label="Abrir menú"
      >
        {isMenuOpen ? "✕" : "☰"}
      </button>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <nav style={{
          display: "none",
          position: "absolute",
          top: "100%",
          left: 0,
          right: 0,
          background: "rgba(255, 255, 255, 0.97)",
          backdropFilter: "blur(10px)",
          borderBottom: "var(--border-thick)",
          flexDirection: "column",
          gap: "0.75rem",
          padding: "1rem 2rem",
          zIndex: 99
        }}
        className="mobile-menu"
        >
          <div style={{ paddingBottom: "0.5rem", borderBottom: "var(--border-dashed)" }}>
            <ThemeSwitcher />
          </div>
          <Link href="/cuadernillos" style={{
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
            fontWeight: 700,
            fontSize: "1rem",
            color: "var(--color-primary)",
            textDecoration: "none",
            padding: "0.5rem 0",
          }} onClick={() => setIsMenuOpen(false)}>
            <BookIcon /> Colección
          </Link>
          <Link href="/generador" style={{
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
            fontWeight: 700,
            fontSize: "1rem",
            color: "var(--color-primary)",
            textDecoration: "none",
            padding: "0.5rem 0",
          }} onClick={() => setIsMenuOpen(false)}>
            <SparklesIcon /> Generador
          </Link>
          <Link href="/caligrafiate" style={{
            background: "var(--color-cta)",
            padding: "12px 20px",
            borderRadius: "var(--radius-md)",
            color: "white",
            fontWeight: 800,
            fontSize: "1rem",
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
            border: "var(--border-thick)",
            textDecoration: "none",
            justifyContent: "center",
          }} onClick={() => setIsMenuOpen(false)}>
            Crear ficha
          </Link>
        </nav>
      )}
      
      <style jsx>{`
        .nav-link:hover {
          color: var(--color-secondary);
        }
        .cta-header-btn:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }
        .header-spiral {
          color: var(--color-secondary);
          width: 1.5rem;
          height: 1.5rem;
        }

        @media (max-width: 640px) {
          .desktop-nav {
            display: none !important;
          }
          .hamburger-btn {
            display: flex !important;
          }
          .mobile-menu {
            display: flex !important;
          }
        }

        @media (min-width: 641px) {
          .hamburger-btn {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
};


