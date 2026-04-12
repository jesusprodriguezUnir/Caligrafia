"use client";

import Link from "next/link";
import { useState } from "react";
import { SpiralIcon, BookIcon, SparklesIcon } from "./Icons";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

      {/* Desktop Navigation */}
      <nav style={{ display: "flex", gap: "1.5rem", alignItems: "center" }} className="desktop-nav">
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

      {/* Mobile Hamburger Button */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        style={{
          display: "none",
          background: "white",
          border: "2px solid var(--color-primary)",
          borderRadius: "8px",
          padding: "8px 12px",
          cursor: "pointer",
          fontSize: "1.5rem",
          width: "44px",
          height: "44px",
          alignItems: "center",
          justifyContent: "center"
        }}
        className="hamburger-btn"
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
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)",
          borderBottom: "var(--border-thick)",
          flexDirection: "column",
          gap: "1rem",
          padding: "1rem 2rem",
          zIndex: 99
        }}
        className="mobile-menu"
        >
          <Link href="/cuadernillos" style={{
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
            fontWeight: 700,
            fontSize: "0.95rem",
            color: "var(--color-primary)",
            textDecoration: "none",
            padding: "0.75rem"
          }} onClick={() => setIsMenuOpen(false)}>
            <BookIcon /> Colección
          </Link>
          <Link href="/generador" style={{
            background: "var(--color-secondary)",
            padding: "0.75rem 1rem",
            borderRadius: "8px",
            color: "white",
            fontWeight: 800,
            fontSize: "0.95rem",
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
            textDecoration: "none",
            border: "2px solid var(--color-primary)",
            boxShadow: "3px 3px 0 var(--color-primary)"
          }} onClick={() => setIsMenuOpen(false)}>
            <SparklesIcon /> Generador
          </Link>
        </nav>
      )}
      
      <style jsx>{`
        .nav-link:hover {
          color: var(--color-secondary);
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
