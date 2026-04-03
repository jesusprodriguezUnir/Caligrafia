"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "../page.module.css";

const BASE_PATH = "/recursos/83_cuadernos_infantiles_Rubio_Anaya_Santillana_Kumon_caligrafia_matematicas_etc";

const COLECCION = [
  {
    categoria: "Caligrafía",
    subcategoria: "Anaya",
    items: [
      { titulo: "Caligrafía Anaya 10", archivo: "01/Caligrafía/caligrafia anaya/Cuaderno Caligrafia Anaya 10.pdf" },
      { titulo: "Caligrafía Anaya 2", archivo: "01/Caligrafía/caligrafia anaya/Cuaderno Caligrafia Anaya 2.pdf" },
      { titulo: "Caligrafía Anaya 3", archivo: "01/Caligrafía/caligrafia anaya/cuaderno Caligrafia Anaya 3.pdf" },
      { titulo: "Caligrafía Anaya 8", archivo: "01/Caligrafía/caligrafia anaya/Cuaderno Caligrafia Anaya 8.pdf" },
      { titulo: "Caligrafía Anaya 9", archivo: "01/Caligrafía/caligrafia anaya/Cuaderno caligrafia Anaya 9.pdf" }
    ]
  },
  {
    categoria: "Caligrafía",
    subcategoria: "El tren de los números",
    items: [
      { titulo: "El tren de los números 1 (Infantil)", archivo: "01/Caligrafía/Caligrafía El tren de los números/el tren de los números 1 infantil.pdf" },
      { titulo: "El tren de los números 2 (Infantil)", archivo: "01/Caligrafía/Caligrafía El tren de los números/el tren de los números 2 infantil.pdf" },
      { titulo: "El tren de los números 4 (Infantil)", archivo: "01/Caligrafía/Caligrafía El tren de los números/el tren de los números 4 infantil.pdf" },
      { titulo: "El tren de los números 6 (Infantil)", archivo: "01/Caligrafía/Caligrafía El tren de los números/el tren de los números 6 infantil.pdf" }
    ]
  },
  {
    categoria: "Caligrafía",
    subcategoria: "Cuadernos Rubio",
    items: [
      { titulo: "Rubio: Números 0", archivo: "01/Caligrafía/Cuadernos Rubio infantil/0 caligrafia números rubio, cuadernos.pdf" },
      { titulo: "Rubio: Escritura 00", archivo: "01/Caligrafía/Cuadernos Rubio infantil/Caligrafía Rubio Escritura 00 (educación infantil).pdf" },
      { titulo: "Rubio: Escritura 01", archivo: "01/Caligrafía/Cuadernos Rubio infantil/Caligrafía Rubio Escritura 01 (educación infantil).pdf" },
      { titulo: "Rubio: Escritura 02", archivo: "01/Caligrafía/Cuadernos Rubio infantil/Caligrafía Rubio Escritura 02 (educación infantil).pdf" },
      { titulo: "Rubio: Escritura 03", archivo: "01/Caligrafía/Cuadernos Rubio infantil/Caligrafía Rubio escritura 03 (educación infantil).pdf" },
      { titulo: "Rubio: Escritura 04", archivo: "01/Caligrafía/Cuadernos Rubio infantil/Caligrafía Rubio Escritura 04 (educación infantil).pdf" },
      { titulo: "Rubio: Escritura 05", archivo: "01/Caligrafía/Cuadernos Rubio infantil/Caligrafía Rubio Escritura 05 (educación infantil).pdf" },
      { titulo: "Rubio: Escritura 06", archivo: "01/Caligrafía/Cuadernos Rubio infantil/Caligrafía Rubio escritura 06 (educación infantil).pdf" },
      { titulo: "Rubio: Escritura 08", archivo: "01/Caligrafía/Cuadernos Rubio infantil/Caligrafía Rubio escritura 08 (educación infantil).pdf" },
      { titulo: "Rubio: Escritura 09", archivo: "01/Caligrafía/Cuadernos Rubio infantil/Caligrafía Rubio Escritura 09 (educación infantil).pdf" }
    ]
  },
  {
    categoria: "Caligrafía",
    subcategoria: "Rubio Preescolar",
    items: [
      { titulo: "Rubio 10", archivo: "01/Caligrafía/Cuadernos Rubio prescolar/CUADERNO RUBIO 10.pdf" },
      { titulo: "Preescolar 1", archivo: "01/Caligrafía/Cuadernos Rubio prescolar/preescolar_1.pdf" },
      { titulo: "Preescolar 2", archivo: "01/Caligrafía/Cuadernos Rubio prescolar/preescolar_2.pdf" },
      { titulo: "Preescolar 3", archivo: "01/Caligrafía/Cuadernos Rubio prescolar/preescolar_3.pdf" },
      { titulo: "Preescolar 4", archivo: "01/Caligrafía/Cuadernos Rubio prescolar/preescolar_4.pdf" },
      { titulo: "Preescolar 5", archivo: "01/Caligrafía/Cuadernos Rubio prescolar/Preescolar_5.pdf" },
      { titulo: "Preescolar n", archivo: "01/Caligrafía/Cuadernos Rubio prescolar/preescolar_numeros.pdf" }
    ]
  },
  {
    categoria: "Grafomotricidad",
    subcategoria: "Fichas",
    items: [
      { titulo: "Ejercicios Grafomotricidad", archivo: "02/ejercicios Grafomotricidad.pdf" },
      { titulo: "Grafomotricidad General", archivo: "02/grafomotricidad.pdf" }
    ]
  },
  {
    categoria: "Matemáticas",
    subcategoria: "Primaria Santillana",
    items: [
      { titulo: "Desarrollo Inteligencia 4º", archivo: "03/Fichas Santillana - Desarrollo Inteligencia 4 Primaria.pdf" },
      { titulo: "Juegos Y Matemáticas Primaria", archivo: "03/Juegos Y Matematicas En Primaria [Santillana].pdf" },
      { titulo: "Matemáticas 2º (La Casa del Saber)", archivo: "03/Matematicas 2 Primaria Santillana Castellano La Casa del Saber.pdf" },
      { titulo: "Ampliación Matemáticas", archivo: "03/Matemáticas/Cuadernos Primaria Santillana/ampliación.pdf" },
      { titulo: "Problemas Matemáticas 1", archivo: "03/Matemáticas/Cuadernos Primaria Santillana/Problemas Matematicas-01 Santillana Cuadernos p.pdf" },
      { titulo: "Problemas Matemáticas 2", archivo: "03/Matemáticas/Cuadernos Primaria Santillana/Problemas Matematicas-02 Santillana Cuadernos.pdf" },
      { titulo: "Refuerzo", archivo: "03/Matemáticas/Cuadernos Primaria Santillana/refuerzo.pdf" }
    ]
  },
  {
    categoria: "Matemáticas",
    subcategoria: "Problemas Rubio",
    items: [
      { titulo: "Rubio: Dividir por una cifra", archivo: "03/Matemáticas/Problemas Rubio/Problemas Rubio dividir por una cifra 4.pdf" },
      { titulo: "Rubio: Multiplicar por una cifra", archivo: "03/Matemáticas/Problemas Rubio/Problemas Rubio multiplicar por una cifra 3 (educación primaria).pdf" },
      { titulo: "Rubio: Restar llevando", archivo: "03/Matemáticas/Problemas Rubio/Problemas Rubio restar llevando.pdf" },
      { titulo: "Rubio: Sumar sin llevar", archivo: "03/Matemáticas/Problemas Rubio/Problemas Rubio sumar sin llevar (educación primaria) p.pdf" }
    ]
  },
  {
    categoria: "Método Kumon",
    subcategoria: "Kumon Workbooks",
    items: [
      { titulo: "Kumon: Addition", archivo: "04/Kumon/Addition.pdf" },
      { titulo: "Kumon: Subtraction", archivo: "04/Kumon/Subtraction.pdf" },
      { titulo: "Kumon: Animals", archivo: "04/Kumon/Animals.pdf" },
      { titulo: "Kumon: Coding / Tracing", archivo: "04/Kumon/Tracing.pdf" },
      { titulo: "Kumon: Cutting", archivo: "04/Kumon/Cutting.pdf" },
      { titulo: "Numbers 1-150 (Ages 4-6)", archivo: "04/Kumon/Ages 4-5-6 My Book of Number Games 1-150.pdf" },
      { titulo: "Rhyming Words (Ages 4-6)", archivo: "04/Kumon/Ages 4-5-6 My Book of Rhyming Words and Phrases.pdf" }
    ]
  },
  {
    categoria: "Fichas Extra",
    subcategoria: "Fichas para niños",
    items: [
      { titulo: "Fichas Infantiles Pack 1-9", archivo: "05/Fichas para niños/Fichas para niños 1.pdf" },
      { titulo: "Fichas Infantiles Pack 2", archivo: "05/Fichas para niños/Fichas para niños 2.pdf" },
      { titulo: "Fichas Infantiles Pack 3", archivo: "05/Fichas para niños/Fichas para niños 3.pdf" }
    ]
  }
];

export default function ColeccionCompleta() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("Caligrafía");
  const [preview, setPreview] = useState<string | null>(null);

  const getFullUrl = (archivo: string) => {
    // Codificamos cada segmento de la ruta por separado para maxima compatibilidad
    // Esto evita problemas con tildes (í, á, etc.) y espacios en subcarpetas
    const encodedSegments = archivo.split('/').map(segment => encodeURIComponent(segment));
    return `${BASE_PATH}/${encodedSegments.join('/')}`;
  };

  const categories = Array.from(new Set(COLECCION.map(c => c.categoria)));

  const filteredCollection = COLECCION.filter(c => c.categoria === activeTab).map(cat => ({
    ...cat,
    items: cat.items.filter(i => 
      i.titulo.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(cat => cat.items.length > 0);

  return (
    <main className={styles.main}>
      <div className={`${styles.hero} glass`} style={{ maxWidth: "1200px", padding: "4rem", border: "5px dashed var(--color-secondary)", borderRadius: "var(--radius-lg)" }}>
        <h1 className={styles.title} style={{ fontSize: "3.5rem", color: "var(--color-primary)", fontWeight: 800 }}>¡La Mega Biblioteca Mágica! 📚</h1>
        <p className={styles.subtitle} style={{ fontSize: "1.3rem", fontWeight: 600, color: "#475569" }}>
          ¡Todos los cuadernos del mundo en un solo lugar para ti! 👋✨
        </p>

        <div style={{ margin: "2rem auto", maxWidth: "600px" }}>
          <input 
            type="text" 
            placeholder="🔍 ¡Busca tu cuaderno favorito aquí!..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ 
              width: "100%", 
              padding: "1.2rem 2rem", 
              borderRadius: "100px", 
              border: "4px solid var(--color-secondary)", 
              fontSize: "1.2rem",
              fontWeight: 600,
              boxShadow: "0 8px 0px rgba(56, 189, 248, 0.2)",
              outline: "none"
            }}
          />
        </div>

        {/* Tabs de Selección */}
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center", marginBottom: "3rem" }}>
          {categories.map(cat => (
            <button 
              key={cat}
              onClick={() => setActiveTab(cat)}
              style={{
                padding: "1rem 2rem",
                borderRadius: "50px",
                border: "none",
                backgroundColor: activeTab === cat ? "var(--color-primary)" : "white",
                color: activeTab === cat ? "white" : "var(--color-text)",
                fontWeight: 800,
                fontSize: "1.1rem",
                cursor: "pointer",
                transition: "all 0.2s",
                boxShadow: activeTab === cat ? "0 6px 0px #C2185B" : "0 6px 0px #CBD5E1",
                transform: activeTab === cat ? "translateY(2px)" : "none"
              }}
            >
              {cat === "Caligrafía" ? "✏️ Caligrafía" : 
               cat === "Grafomotricidad" ? "🌀 Trazos" :
               cat === "Matemáticas" ? "🔢 Números" :
               cat === "Método Kumon" ? "🇯🇵 Kumon" : "🌟 Extras"}
            </button>
          ))}
        </div>

        {/* Resultados */}
        <div style={{ textAlign: "left" }}>
          {filteredCollection.length > 0 ? (
            filteredCollection.map((cat, idx) => (
              <div key={idx} style={{ marginBottom: "3rem" }}>
                <h3 style={{ fontSize: "1.5rem", color: "var(--color-secondary)", marginBottom: "1.5rem", borderLeft: "4px solid var(--color-primary)", paddingLeft: "1rem" }}>
                  {cat.subcategoria}
                </h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.2rem" }}>
                  {cat.items.map((item, i) => (
                    <div key={i} style={{ 
                      background: "white", 
                      padding: "1.8rem", 
                      borderRadius: "var(--radius-md)", 
                      border: "3px solid #F1F5F9",
                      boxShadow: "var(--shadow-md)",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      transition: "transform 0.2s"
                    }}>
                      <div style={{ marginBottom: "1.2rem" }}>
                        <span style={{ fontSize: "0.8rem", backgroundColor: "#E0F2FE", color: "#0284C7", padding: "4px 10px", borderRadius: "10px", fontWeight: "800" }}>📘 CUADERNO</span>
                        <h4 style={{ fontSize: "1.2rem", marginTop: "0.8rem", fontWeight: 800, color: "var(--color-text)" }}>{item.titulo}</h4>
                      </div>
                      
                      <div style={{ display: "flex", gap: "0.5rem" }}>
                        <button 
                          onClick={() => setPreview(getFullUrl(item.archivo))}
                          style={{
                            flex: 1,
                            backgroundColor: "#F8FAFC",
                            color: "var(--color-text)",
                            padding: "8px",
                            borderRadius: "var(--radius-sm)",
                            fontSize: "0.85rem",
                            fontWeight: 600,
                            cursor: "pointer",
                            border: "1px solid #E2E8F0"
                          }}
                        >
                          Vista Previa
                        </button>
                        <a 
                          href={getFullUrl(item.archivo)}
                          download
                          style={{
                            flex: 1,
                            backgroundColor: "var(--color-primary)",
                            color: "white",
                            padding: "8px",
                            borderRadius: "var(--radius-sm)",
                            textDecoration: "none",
                            fontSize: "0.85rem",
                            fontWeight: 600,
                            textAlign: "center"
                          }}
                        >
                          Descargar
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div style={{ textAlign: "center", padding: "4rem", opacity: 0.5 }}>
              No se han encontrado resultados.
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

        <div style={{ marginTop: "4rem", borderTop: "1px solid #F1F5F9", paddingTop: "2rem" }}>
          <p style={{ fontSize: "0.9rem", color: "#64748B", marginBottom: "1.5rem" }}>Esta colección externa contiene material histórico proporcionado por terceros.</p>
          <Link href="/" style={{ color: "var(--color-primary)", fontWeight: 600 }}>
            &larr; Volver al Inicio
          </Link>
        </div>
      </div>
    </main>
  );
}
