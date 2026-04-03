"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

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
    subcategoria: "Cuadernos Rubio",
    items: [
      { titulo: "Rubio: Números 0", archivo: "01/Caligrafía/Cuadernos Rubio infantil/0 caligrafia números rubio, cuadernos.pdf" },
      { titulo: "Rubio: Escritura 00", archivo: "01/Caligrafía/Cuadernos Rubio infantil/Caligrafía Rubio Escritura 00 (educación infantil).pdf" },
      { titulo: "Rubio: Escritura 01", archivo: "01/Caligrafía/Cuadernos Rubio infantil/Caligrafía Rubio Escritura 01 (educación infantil).pdf" },
      { titulo: "Rubio: Escritura 02", archivo: "01/Caligrafía/Cuadernos Rubio infantil/Caligrafía Rubio Escritura 02 (educación infantil).pdf" },
      { titulo: "Rubio: Escritura 03", archivo: "01/Caligrafía/Cuadernos Rubio infantil/Caligrafía Rubio escritura 03 (educación infantil).pdf" }
    ]
  },
  {
      categoria: "Kumon",
      subcategoria: "Método Kumon",
      items: [
          { titulo: "Kumon: Addition", archivo: "04/Kumon/Addition.pdf" },
          { titulo: "Kumon: Subtraction", archivo: "04/Kumon/Subtraction.pdf" },
          { titulo: "Kumon: Animals", archivo: "04/Kumon/Animals.pdf" }
      ]
  }
];

export default function ColeccionCompleta() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("Caligrafía");
  const [preview, setPreview] = useState<string | null>(null);

  const getFullUrl = (archivo: string) => {
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
    <main style={{ padding: "4rem 2rem", minHeight: "100vh", fontFamily: "var(--font-main)" }}>
      <div style={{ 
        maxWidth: "1250px", 
        padding: "4rem", 
        border: "var(--border-thick)", 
        borderRadius: "var(--radius-lg)", 
        boxShadow: "var(--shadow-flat)", 
        background: "white",
        margin: "0 auto",
        position: "relative"
      }}>
        
        <h1 style={{ fontSize: "3.5rem", color: "var(--color-primary)", fontWeight: 900, marginBottom: "1rem" }}>
          <span style={{ fontFamily: "var(--font-hand)", color: "var(--color-accent)", fontSize: "1.8rem", display: "block" }}>¡Muchos muchos más!</span>
          LA MEGA <span style={{ color: "var(--color-secondary)" }}>BIBLIOTECA</span> 📚
        </h1>
        
        <p style={{ fontSize: "1.3rem", color: "#475569", fontWeight: 600, marginBottom: "3rem" }}>
          ¡Explora la colección gigante con más de 80 cuadernos para aprender! 🖍️✨
        </p>

        {/* Buscador Play Fun style */}
        <div style={{ margin: "2rem auto 4rem", maxWidth: "700px", position: "relative" }}>
          <input 
            type="text" 
            placeholder="🔍 ¡Busca tu cuaderno favorito aquí!..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ 
              width: "100%", 
              padding: "1.5rem 2.5rem", 
              borderRadius: "var(--radius-md)", 
              border: "var(--border-thick)", 
              fontSize: "1.3rem",
              fontWeight: 900,
              boxShadow: "6px 6px 0px #1A1A1A",
              outline: "none"
            }}
          />
        </div>

        {/* Tabs de Selección */}
        <div style={{ display: "flex", gap: "15px", flexWrap: "wrap", justifyContent: "center", marginBottom: "4rem" }}>
          {categories.map(cat => (
            <button 
              key={cat}
              onClick={() => setActiveTab(cat)}
              style={{
                padding: "1rem 2rem",
                borderRadius: "20px",
                border: "var(--border-thick)",
                backgroundColor: activeTab === cat ? "var(--color-secondary)" : "white",
                color: activeTab === cat ? "white" : "var(--color-primary)",
                fontWeight: 900,
                fontSize: "1.1rem",
                cursor: "pointer",
                transition: "all 0.1s",
                boxShadow: activeTab === cat ? "4px 4px 0px #0369A1" : "4px 4px 0px #1A1A1A",
                transform: activeTab === cat ? "translate(2px, 2px)" : "none"
              }}
            >
              {cat === "Caligrafía" ? "✏️ Escritura" : 
               cat === "Kumon" ? "🇯🇵 Kumon" : "🌟 Extras"}
            </button>
          ))}
        </div>

        {/* Resultados */}
        <div style={{ textAlign: "left" }}>
          {filteredCollection.length > 0 ? (
            filteredCollection.map((cat, idx) => (
              <div key={idx} style={{ marginBottom: "4rem" }}>
                <h3 style={{ fontSize: "1.8rem", color: "var(--color-secondary)", marginBottom: "2rem", fontFamily: "var(--font-hand)" }}>
                  Colección {cat.subcategoria}
                </h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2.5rem" }}>
                  {cat.items.map((item, i) => (
                    <div key={i} style={{ 
                      background: "white", 
                      padding: "2.5rem", 
                      borderRadius: "25px", 
                      border: "var(--border-thick)",
                      boxShadow: "8px 8px 0px #F1F5F9",
                      display: "flex",
                      flexDirection: "column"
                    }}>
                      <div style={{ marginBottom: "1.5rem" }}>
                        <span style={{ fontSize: "0.8rem", backgroundColor: "#B6E1E8", color: "#1A1A1A", padding: "6px 12px", borderRadius: "10px", fontWeight: "900", border: "2px solid #1A1A1A" }}>LIBRO HISTÓRICO 📘</span>
                        <h4 style={{ fontSize: "1.3rem", marginTop: "1rem", fontWeight: 900, color: "var(--color-primary)" }}>{item.titulo}</h4>
                      </div>
                      
                      <div style={{ display: "flex", gap: "12px", marginTop: "auto" }}>
                        <button 
                          onClick={() => setPreview(getFullUrl(item.archivo))}
                          style={{
                            flex: 1,
                            backgroundColor: "white",
                            color: "var(--color-primary)",
                            padding: "12px",
                            borderRadius: "12px",
                            fontWeight: 900,
                            cursor: "pointer",
                            border: "var(--border-thick)",
                            boxShadow: "4px 4px 0px #1A1A1A"
                          }}
                        >
                          🔍 Ver
                        </button>
                        <a 
                          href={getFullUrl(item.archivo)}
                          download
                          style={{
                            flex: 1,
                            backgroundColor: "var(--color-secondary)",
                            color: "white",
                            padding: "12px",
                            borderRadius: "12px",
                            textDecoration: "none",
                            fontWeight: 900,
                            textAlign: "center",
                            border: "var(--border-thick)",
                            boxShadow: "4px 4px 0px #0369A1"
                          }}
                        >
                          📥 Bajar
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div style={{ textAlign: "center", padding: "4rem", opacity: 0.5, fontSize: "1.5rem", fontWeight: 900 }}>
              ¡Vaya! No hemos encontrado ese cuaderno... 🧐
            </div>
          )}
        </div>

        {/* Modal de Previsualización Mágico Play Fun style */}
        {preview && (
          <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(182, 225, 232, 0.9)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
            <div style={{ position: "relative", width: "95%", height: "92%", backgroundColor: "white", borderRadius: "30px", overflow: "hidden", display: "flex", flexDirection: "column", border: "var(--border-thick)", boxShadow: "15px 15px 0px rgba(0,0,0,0.2)" }}>
               <div style={{ padding: "1.5rem 2.5rem", borderBottom: "var(--border-thick)", display: "flex", justifyContent: "space-between", alignItems: "center", background: "#F8FAFC" }}>
                 <h3 style={{ fontSize: "2rem", fontWeight: 900, color: "var(--color-primary)" }}>
                   ✨ <span style={{ fontFamily: "var(--font-hand)" }}>Tesoro Histórico</span> ✨
                 </h3>
                 <button 
                  onClick={() => setPreview(null)}
                  style={{ background: "white", border: "var(--border-thick)", borderRadius: "10px", width: "50px", height: "50px", cursor: "pointer", fontWeight: "900", color: "var(--color-primary)", fontSize: "1.5rem", boxShadow: "4px 4px 0px #1A1A1A" }}>X</button>
               </div>
               <iframe 
                src={`${preview}#toolbar=0`} 
                style={{ width: "100%", height: "100%", border: "none" }}
                title="Preview Histórico"
               />
            </div>
          </div>
        )}

        <div style={{ marginTop: "5rem", borderTop: "var(--border-thick)", paddingTop: "3rem", textAlign: "center" }}>
          <Link href="/" style={{ color: "var(--color-secondary)", fontWeight: 900, fontSize: "1.5rem", textDecoration: "none", borderBottom: "3px solid var(--color-secondary)" }}>
            &larr; Volver al Castillo del Inicio
          </Link>
        </div>
      </div>
    </main>
  );
}
