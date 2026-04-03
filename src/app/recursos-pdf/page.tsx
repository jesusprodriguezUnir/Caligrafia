"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "../page.module.css";

// ESTRUCTURA DE DATOS: Aquí puedes añadir fácilmente tus nuevos PDFs
const RECURSOS_PDF = [
  {
    id: 1,
    titulo: "Cuadernillo Clásico - Nivel 1",
    descripcion: "Colección completa de ejercicios de trazos básicos y grafomotricidad inicial.",
    categoria: "Caligrafía",
    tamano: "2.4 MB",
    url: "/pdfs/cuadernillo-n1.pdf" // Asegúrate de subir tus PDFs a la carpeta public/pdfs/
  },
  {
    id: 2,
    titulo: "Guía de Caligrafía para Padres",
    descripcion: "Consejos y técnicas para apoyar el aprendizaje de la escritura en casa.",
    categoria: "Guías",
    tamano: "1.1 MB",
    url: "/pdfs/guia-padres.pdf"
  },
  {
    id: 3,
    titulo: "Ejercicios de Enlace y Fluidez",
    descripcion: "Fichas avanzadas para perfeccionar la unión entre letras cursivas.",
    categoria: "Avanzado",
    tamano: "3.8 MB",
    url: "/pdfs/ejercicios-enlace.pdf"
  }
];

export default function BibliotecaPDF() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("Todos");

  const categorias = ["Todos", ...new Set(RECURSOS_PDF.map(r => r.categoria))];

  const [preview, setPreview] = useState<string | null>(null);

  const filteredRecursos = RECURSOS_PDF.filter(r => {
    const matchesSearch = r.titulo.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          r.descripcion.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "Todos" || r.categoria === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <main className={styles.main}>
      <div className={`${styles.hero} glass`} style={{ maxWidth: "1100px", padding: "4rem" }}>
        <h1 className={styles.title} style={{ fontSize: "2.8rem" }}>Biblioteca de Recursos PDF</h1>
        <p className={styles.subtitle}>
          Repositorio centralizado de materiales descargables en formato PDF de alta resolución.
        </p>

        {/* Filtros y Búsqueda */}
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "3rem", width: "100%", justifyContent: "center" }}>
          <input 
            type="text" 
            placeholder="Buscar por título o descripción..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ 
              flex: 1, 
              minWidth: "300px", 
              padding: "0.8rem 1.2rem", 
              borderRadius: "var(--radius-md)", 
              border: "1px solid #E2E8F0", 
              fontSize: "1rem" 
            }}
          />
          <div style={{ display: "flex", gap: "0.5rem" }}>
            {categorias.map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: "0.8rem 1.2rem",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid #E2E8F0",
                  backgroundColor: activeCategory === cat ? "var(--color-primary)" : "white",
                  color: activeCategory === cat ? "white" : "var(--color-text)",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.2s"
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid de PDFs */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.5rem", textAlign: "left", width: "100%" }}>
          {filteredRecursos.length > 0 ? (
            filteredRecursos.map(recurso => (
              <div key={recurso.id} style={{ 
                background: "white", 
                padding: "2rem", 
                borderRadius: "var(--radius-lg)", 
                border: "1px solid #E2E8F0", 
                transition: "all 0.2s",
                display: "flex",
                flexDirection: "column"
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "1rem" }}>
                  <span style={{ 
                    fontSize: "0.7rem", 
                    backgroundColor: "#F1F5F9", 
                    padding: "4px 8px", 
                    borderRadius: "4px", 
                    fontWeight: "bold", 
                    color: "#64748B",
                    textTransform: "uppercase"
                  }}>{recurso.categoria}</span>
                  <span style={{ fontSize: "0.8rem", color: "#94A3B8" }}>{recurso.tamano}</span>
                </div>
                <h3 style={{ fontSize: "1.2rem", color: "var(--color-text)", marginBottom: "0.5rem" }}>{recurso.titulo}</h3>
                <p style={{ fontSize: "0.95rem", color: "#64748B", lineHeight: "1.5", marginBottom: "2rem" }}>{recurso.descripcion}</p>
                
                <div style={{ marginTop: "auto", display: "flex", gap: "0.8rem" }}>
                  <button 
                    onClick={() => setPreview(recurso.url)}
                    className="btn-primary" 
                    style={{ flex: 1, backgroundColor: "#F8FAFC", color: "var(--color-text)", border: "1px solid #E2E8F0", padding: "10px" }}
                  >
                    Vista Previa
                  </button>
                  <a 
                    href={recurso.url} 
                    download 
                    className="btn-primary" 
                    style={{ flex: 1, display: "flex", gap: "0.5rem", alignItems: "center", justifyContent: "center", padding: "10px" }}
                  >
                    Descargar
                  </a>
                </div>
              </div>
            ))
          ) : (
            <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "4rem", color: "#64748B" }}>
              No se encontraron recursos que coincidan con tu búsqueda.
            </div>
          )}
        </div>

        {/* Modal de Previsualización PDF */}
        {preview && (
          <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.85)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
            <div style={{ position: "relative", width: "95%", height: "95%", backgroundColor: "white", borderRadius: "12px", overflow: "hidden", display: "flex", flexDirection: "column" }}>
               <div style={{ padding: "1rem", borderBottom: "1px solid #E2E8F0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                 <h3 style={{ fontSize: "1.1rem" }}>Previsualización de Documento</h3>
                 <button 
                  onClick={() => setPreview(null)}
                  style={{ background: "#F1F5F9", border: "none", borderRadius: "50%", width: "32px", height: "32px", cursor: "pointer", fontWeight: "bold" }}>×</button>
               </div>
               <iframe 
                src={`${preview}#toolbar=0`} 
                style={{ width: "100%", height: "100%", border: "none" }}
                title="PDF Preview"
               />
            </div>
          </div>
        )}

        <div style={{ marginTop: "4rem" }}>
          <Link href="/cuadernillos" style={{ color: "var(--color-primary)", fontWeight: 600 }}>
            &larr; Volver al Catálogo de Fases
          </Link>
        </div>
      </div>
    </main>
  );
}
