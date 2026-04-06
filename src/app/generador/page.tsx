"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import styles from "../caligrafiate/caligrafiate.module.css";

type TipoLetra = "escolar" | "escolar-dot" | "massallera" | "massallera-dot";
type Margen = "sin" | "con" | "dibujo";
type MargenDibujo = "tren" | "barco" | "coche" | "arbol" | "casa" | "unicornio" | "perro" | "gato" | "nino" | "nina";
type Formato = "pauta-guiada" | "pauta-normal" | "cuadricula-5" | "cuadricula-4";

const bancoPalabras = [
  "Lucía", "Martín", "Noemí", "Carlos", "Sofía", "Diego", "María", "Pablo", "Ana", "Javier",
  "perro", "gato", "león", "elefante", "mariposa", "caballo", "pájaro", "pez", "rana", "vaca",
  "rojo", "azul", "verde", "amarillo", "naranja", "morado", "rosa", "negro", "blanco", "marrón",
  "casa", "libro", "sol", "luna", "estrella", "árbol", "flor", "coche", "avión", "barco",
  "Hola", "Adiós", "Gracias", "Por favor", "Buenos días", "Buenas noches", "Amigo", "Familia"
];

const bancoFrases = [
  "El sol brilla",
  "Mi familia es grande",
  "Me gusta leer",
  "Hoy es un gran día",
  "Juego con mis amigos",
  "El cielo está azul",
  "Tengo un perro",
  "Me encanta la pizza",
  "Voy al parque",
  "Mi casa es grande",
  "El tren es rápido",
  "Las estrellas brillan",
  "El agua es azul",
  "Tengo muchos amigos",
  "Me divierto mucho"
];

const marginImages: Record<MargenDibujo, string> = {
  tren: "🚂",
  barco: "⛵",
  coche: "🚗",
  arbol: "🌳",
  casa: "🏠",
  unicornio: "🦄",
  perro: "🐕",
  gato: "🐱",
  nino: "👦",
  nina: "👧"
};

export default function GeneradorMagico() {
  const [lineas, setLineas] = useState<string[]>(["¡Mi magia!", "", "", ""]);
  const [numLineas, setNumLineas] = useState(4);
  const [fontSize, setFontSize] = useState(60);
  const [color, setColor] = useState("#0EA5E9");
  const [showGuides, setShowGuides] = useState(true);
  const [tipoLetra, setTipoLetra] = useState<TipoLetra>("escolar");
  const [margen, setMargen] = useState<Margen>("con");
  const [margenDibujo, setMargenDibujo] = useState<MargenDibujo>("tren");
  const [formato, setFormato] = useState<Formato>("pauta-normal");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const actualizarLinea = (index: number, valor: string) => {
    const nuevasLineas = [...lineas];
    nuevasLineas[index] = valor;
    setLineas(nuevasLineas);
  };

  useEffect(() => {
    if (lineas.length !== numLineas) {
      const nuevasLineas = [...lineas];
      while (nuevasLineas.length < numLineas) {
        nuevasLineas.push("");
      }
      while (nuevasLineas.length > numLineas) {
        nuevasLineas.pop();
      }
      setLineas(nuevasLineas);
    }
  }, [numLineas, lineas]);

  const getFontFamily = () => {
    switch (tipoLetra) {
      case "massallera":
      case "massallera-dot":
        return "Massallera, Georgia";
      case "escolar":
      case "escolar-dot":
        return "Escolar, Georgia";
      default:
        return "Escolar, Georgia";
    }
  };

  const generarAleatorio = () => {
    const nuevasLineas: string[] = [];
    const numFrases = Math.min(numLineas, 10);
    
    for (let i = 0; i < numFrases; i++) {
      const usarFrase = Math.random() > 0.4;
      if (usarFrase) {
        const frase = bancoFrases[Math.floor(Math.random() * bancoFrases.length)];
        nuevasLineas.push(frase);
      } else {
        const palabra = bancoPalabras[Math.floor(Math.random() * bancoPalabras.length)];
        nuevasLineas.push(palabra);
      }
    }
    
    while (nuevasLineas.length < numLineas) {
      nuevasLineas.push("");
    }
    
    setLineas(nuevasLineas);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const getMargenWidth = () => {
      switch (margen) {
        case "sin": return 20;
        case "con": return 60;
        case "dibujo": return 85;
        default: return 60;
      }
    };

    const margenWidth = getMargenWidth();

    if (showGuides) {
      const getPautaSpacing = () => {
        if (formato === "cuadricula-4") return 16;
        if (formato === "cuadricula-5") return 20;
        return 40;
      };

      const lineSpacing = getPautaSpacing();

      if (formato === "cuadricula-4" || formato === "cuadricula-5") {
        ctx.strokeStyle = "#e2e8f0";
        ctx.lineWidth = 0.5;
        for (let x = margenWidth; x < canvas.width - 20; x += lineSpacing) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, canvas.height);
          ctx.stroke();
        }
        for (let y = 0; y < canvas.height; y += lineSpacing) {
          ctx.beginPath();
          ctx.moveTo(margenWidth, y);
          ctx.lineTo(canvas.width - 20, y);
          ctx.stroke();
        }
      } else if (formato === "pauta-guiada") {
        for (let y = 0; y < canvas.height; y += lineSpacing * 3) {
          ctx.strokeStyle = "#1A1A1A";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(margenWidth, y);
          ctx.lineTo(canvas.width - 20, y);
          ctx.stroke();
          
          ctx.beginPath();
          ctx.moveTo(margenWidth, y + lineSpacing * 2);
          ctx.lineTo(canvas.width - 20, y + lineSpacing * 2);
          ctx.stroke();
          
          ctx.strokeStyle = "#dbeafe";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(margenWidth, y + lineSpacing);
          ctx.lineTo(canvas.width - 20, y + lineSpacing);
          ctx.stroke();
        }
      } else {
        ctx.strokeStyle = "#e2e8f0";
        ctx.lineWidth = 1;
        for (let i = 0; i < canvas.height; i += lineSpacing) {
          ctx.beginPath();
          ctx.moveTo(margenWidth, i);
          ctx.lineTo(canvas.width - 20, i);
          ctx.stroke();
        }
      }

      ctx.strokeStyle = "#ffb3b3";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(margenWidth, 0);
      ctx.lineTo(margenWidth, canvas.height);
      ctx.stroke();

      if (margen === "dibujo") {
        ctx.font = "24px sans-serif";
        const selectedEmoji = marginImages[margenDibujo];
        
        // Ajustamos el paso de los iconos al de la pauta
        const stepY = formato === "pauta-guiada" ? 120 : (formato === "cuadricula-4" ? 16 : (formato === "cuadricula-5" ? 20 : 40));
        const offsetIconY = formato === "pauta-guiada" ? 60 : (stepY / 2);
        
        for (let y = 0; y < canvas.height; y += stepY) {
          if (y + offsetIconY > canvas.height - 20) break;
          // Evitamos el primer icono si está demasiado arriba
          if (y === 0 && formato !== "pauta-guiada") continue;
          ctx.fillText(selectedEmoji, 32, y + offsetIconY + 8);
        }
      }
    }

    ctx.fillStyle = color;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const isDot = tipoLetra === "escolar-dot" || tipoLetra === "massallera-dot";

    const getLineSpacing = () => {
      if (formato === "cuadricula-4") return 16;
      if (formato === "cuadricula-5") return 20;
      if (formato === "pauta-guiada") return 60;
      return 40;
    };

    const lineSpacing = getLineSpacing();
    const startY = 60;

    lineas.forEach((texto, index) => {
      const y = startY + index * lineSpacing;
      
      ctx.font = `bold ${fontSize}px ${getFontFamily()}`;
      const textMetrics = ctx.measureText(texto || "");
      const textWidth = textMetrics.width;
      const canvasRight = canvas.width - 20;
      const availableWidth = canvasRight - margenWidth;
      const maxCenter = margenWidth + availableWidth / 2;
      const minCenter = margenWidth + textWidth / 2 + 10;
      const centerX = Math.min(maxCenter, Math.max(minCenter, (margenWidth + canvasRight) / 2));
      
      if (isDot && texto) {
        drawDottedText(ctx, texto, centerX, y, fontSize, color, margenWidth);
      } else if (texto) {
        ctx.fillText(texto, centerX, y);
      }
    });

    ctx.fillStyle = "rgba(0,0,0,0.05)";
    ctx.font = "bold 14px Arial";
    ctx.fillText("Caligra-Fiate", canvas.width - 70, canvas.height - 20);

    ctx.strokeStyle = "#1A1A1A";
    ctx.lineWidth = 4;
    ctx.strokeRect(5, 5, canvas.width - 10, canvas.height - 10);
  }, [lineas, fontSize, color, showGuides, tipoLetra, margen, margenDibujo, formato]);

  const drawDottedText = (ctx: CanvasRenderingContext2D, text: string, x: number, y: number, fontSize: number, color: string, margenWidth: number) => {
    const isEscolarDot = tipoLetra === "escolar-dot";
    const isMassalleraDot = tipoLetra === "massallera-dot";
    const canvasRight = ctx.canvas.width - 20;
    const availableWidth = canvasRight - margenWidth;
    const maxCenter = margenWidth + availableWidth / 2;
    
    if (isEscolarDot) {
      ctx.font = `${fontSize}px "Escolar Dot", "Escolar", Arial`;
      const metrics = ctx.measureText(text);
      const textWidth = metrics.width;
      const minCenter = margenWidth + textWidth / 2 + 10;
      const centerX = Math.min(maxCenter, Math.max(minCenter, (margenWidth + canvasRight) / 2));
      const startX = centerX - textWidth / 2;
      ctx.fillStyle = color;
      ctx.fillText(text, startX, y);
    } else if (isMassalleraDot) {
      ctx.font = `bold ${fontSize}px "Massallera", Georgia`;
      const metrics = ctx.measureText(text);
      const textWidth = metrics.width;
      const minCenter = margenWidth + textWidth / 2 + 10;
      const centerX = Math.min(maxCenter, Math.max(minCenter, (margenWidth + canvasRight) / 2));
      const startX = centerX - textWidth / 2;
      
      ctx.strokeStyle = color;
      ctx.lineWidth = Math.max(1, fontSize * 0.025);
      ctx.setLineDash([1.5, 3.5]);
      ctx.strokeText(text, startX, y);
      ctx.setLineDash([]);
    }
  };

  const descargarImagen = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `caligrafia-personalizada.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <main className={styles.main}>
      <header style={{ textAlign: "center", marginBottom: "3rem", paddingTop: "2.5rem" }}>
         <h1 className={styles.brand}>GENERADOR <span className={styles.brandUnder}>MÁGICO</span></h1>
         <p className={styles.tagline}>Crea tus propios ejercicios de escritura en segundos ✨</p>
      </header>

      <div style={{ display: "flex", gap: "2rem", width: "100%", maxWidth: "1200px", flexWrap: "wrap", justifyContent: "center" }}>
        
        <div style={{ 
          flex: "1 1 400px", 
          background: "white", 
          padding: "2.5rem", 
          borderRadius: "var(--radius-lg)", 
          border: "var(--border-thick)", 
          boxShadow: "var(--shadow-flat)",
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem"
        }}>
          <div>
            <label style={{ fontWeight: 800, display: "block", marginBottom: "0.5rem" }}>✍️ Líneas de texto:</label>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.75rem" }}>
              <label style={{ fontWeight: 600, fontSize: "0.9rem" }}>Número de líneas:</label>
              <input 
                type="range" 
                min="1" 
                max="10" 
                value={numLineas} 
                onChange={(e) => setNumLineas(parseInt(e.target.value))}
                style={{ width: "100px", accentColor: "var(--color-secondary)" }}
              />
              <span style={{ fontWeight: 700, minWidth: "20px" }}>{numLineas}</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", maxHeight: "300px", overflowY: "auto" }}>
              {lineas.map((linea, index) => (
                <div key={index} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "#94a3b8", minWidth: "25px" }}>{index + 1}.</span>
                  <input 
                    type="text" 
                    value={linea}
                    onChange={(e) => actualizarLinea(index, e.target.value)}
                    placeholder={`Línea ${index + 1}`}
                    maxLength={40}
                    style={{ 
                      flex: 1, 
                      padding: "0.6rem", 
                      borderRadius: "8px", 
                      border: "2px solid #e2e8f0",
                      fontSize: "1rem",
                      fontWeight: 500
                    }} 
                  />
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div>
              <label style={{ fontWeight: 800, display: "block", marginBottom: "0.5rem" }}>📏 Tamaño: <span style={{ color: "var(--color-secondary)" }}>{fontSize}px</span></label>
              <input 
                type="range" 
                min="20" 
                max="100" 
                value={fontSize} 
                onChange={(e) => setFontSize(parseInt(e.target.value))}
                style={{ width: "100%", accentColor: "var(--color-secondary)" }}
              />
            </div>
            <div>
              <label style={{ fontWeight: 800, display: "block", marginBottom: "0.5rem" }}>🎨 Color:</label>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {["#1A1A1A", "#0EA5E9", "#EF4444", "#22C55E", "#FB923C"].map(c => (
                  <button 
                    key={c}
                    onClick={() => setColor(c)}
                    style={{ 
                      width: "30px", 
                      height: "30px", 
                      borderRadius: "50%", 
                      background: c, 
                      border: color === c ? "3px solid #1A1A1A" : "1px solid #ddd",
                      cursor: "pointer",
                      transform: color === c ? "scale(1.2)" : "none"
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div>
            <label style={{ fontWeight: 800, display: "block", marginBottom: "0.5rem" }}>🔤 Tipo de letra:</label>
            <select 
              value={tipoLetra} 
              onChange={(e) => setTipoLetra(e.target.value as TipoLetra)}
              style={{ 
                width: "100%", 
                padding: "0.8rem", 
                borderRadius: "10px", 
                border: "2px solid #1A1A1A",
                fontSize: "1rem",
                fontWeight: 600,
                background: "white",
                cursor: "pointer"
              }}
            >
              <option value="escolar">Letra Escolar</option>
              <option value="escolar-dot">Letra Escolar Punteada</option>
              <option value="massallera">Letra Massallera</option>
              <option value="massallera-dot">Letra Massallera Punteada</option>
            </select>
          </div>

          <div>
            <label style={{ fontWeight: 800, display: "block", marginBottom: "0.5rem" }}>📐 Margen:</label>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              {(["sin", "con", "dibujo"] as Margen[]).map((m) => (
                <button 
                  key={m}
                  onClick={() => setMargen(m)}
                  style={{ 
                    flex: 1,
                    padding: "10px", 
                    borderRadius: "10px", 
                    border: margen === m ? "3px solid #1A1A1A" : "2px solid #ddd",
                    background: margen === m ? "var(--color-secondary)" : "white",
                    color: margen === m ? "white" : "#1A1A1A",
                    fontWeight: 700,
                    cursor: "pointer",
                    fontSize: "0.9rem"
                  }}
                >
                  {m === "sin" ? "Sin" : m === "con" ? "Con" : "Con dibujos"}
                </button>
              ))}
            </div>
            {margen === "dibujo" && (
              <div style={{ marginTop: "0.75rem" }}>
                <label style={{ fontWeight: 600, fontSize: "0.9rem", display: "block", marginBottom: "0.5rem" }}>🎯 Imagen del margen:</label>
                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                  {(Object.keys(marginImages) as MargenDibujo[]).map((img) => (
                    <button 
                      key={img}
                      onClick={() => setMargenDibujo(img)}
                      style={{ 
                        width: "36px", 
                        height: "36px", 
                        borderRadius: "8px", 
                        border: margenDibujo === img ? "3px solid #1A1A1A" : "1px solid #ddd",
                        background: "white",
                        cursor: "pointer",
                        fontSize: "1.2rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                    >
                      {marginImages[img]}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div>
            <label style={{ fontWeight: 800, display: "block", marginBottom: "0.5rem" }}>📏 Formato de pauta:</label>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
              {[
                { val: "pauta-guiada" as Formato, icon: "📏", label: "Montessori" },
                { val: "pauta-normal" as Formato, icon: "📄", label: "Normal" },
                { val: "cuadricula-5" as Formato, icon: "📐", label: "5mm" },
                { val: "cuadricula-4" as Formato, icon: "📐", label: "4mm" }
              ].map((f) => (
                <button 
                  key={f.val}
                  onClick={() => setFormato(f.val)}
                  style={{ 
                    padding: "10px", 
                    borderRadius: "10px", 
                    border: formato === f.val ? "3px solid #1A1A1A" : "2px solid #ddd",
                    background: formato === f.val ? "var(--color-secondary)" : "white",
                    color: formato === f.val ? "white" : "#1A1A1A",
                    fontWeight: 700,
                    cursor: "pointer",
                    fontSize: "0.9rem"
                  }}
                >
                  {f.icon} {f.label}
                </button>
              ))}
            </div>
          </div>

          <label style={{ display: "flex", alignItems: "center", gap: "10px", fontWeight: 700, cursor: "pointer" }}>
            <input type="checkbox" checked={showGuides} onChange={e => setShowGuides(e.target.checked)} style={{ width: "20px", height: "20px" }} />
            Mostrar guías y margen
          </label>

          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginTop: "0.5rem" }}>
            <button onClick={generarAleatorio} style={{ 
              padding: "10px 20px", 
              border: "2px solid #1A1A1A", 
              borderRadius: "10px", 
              background: "var(--color-success)", 
              color: "white",
              cursor: "pointer", 
              fontWeight: 700,
              boxShadow: "3px 3px 0 #1A1A1A"
            }}>
              🎲 Generar aleatorio
            </button>
          </div>

          <div style={{ marginTop: "0.5rem" }}>
            <button onClick={descargarImagen} className="btn-primary" style={{ width: "100%", padding: "18px", fontSize: "1.2rem", backgroundColor: "var(--color-cta)", boxShadow: "5px 5px 0 #1A1A1A" }}>
              🖼️ Descargar PNG
            </button>
          </div>
          
          <Link href="/" style={{ textAlign: "center", color: "#64748b", fontWeight: 700 }}>
            ← Volver al inicio
          </Link>
        </div>

        <div style={{ flex: "1 1 700px", minWidth: 0 }}>
          <div style={{ 
            background: "white", 
            padding: "1.5rem", 
            borderRadius: "var(--radius-lg)", 
            border: "var(--border-thick)", 
            boxShadow: "var(--shadow-flat)",
            position: "sticky",
            top: "2rem"
          }}>
            <h3 style={{ fontFamily: "var(--font-hand)", fontSize: "1.8rem", textAlign: "center", marginBottom: "1rem" }}>¡Tu ficha en vivo!</h3>
            <div style={{ border: "2px dashed #E2E8F0", borderRadius: "15px", overflow: "hidden" }}>
              <canvas 
                ref={canvasRef} 
                width={1000}
                height={800}
                style={{ width: "100%", height: "auto", display: "block" }} 
              />
            </div>
            <p style={{ textAlign: "center", fontSize: "0.85rem", color: "#94a3b8", marginTop: "1rem" }}>
              Revisa que las letras quepan bien en el papel antes de bajarlo.
            </p>
          </div>
        </div>

      </div>
    </main>
  );
}