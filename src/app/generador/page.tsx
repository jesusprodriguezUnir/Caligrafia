"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import styles from "../caligrafiate/caligrafiate.module.css";
import { Header } from "@/components/Header";
import { DownloadIcon, SparklesIcon } from "@/components/Icons";

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
      const lineStep = formato === "cuadricula-4" ? 16 : formato === "cuadricula-5" ? 20 : 0;

      if (formato === "cuadricula-4" || formato === "cuadricula-5") {
        ctx.strokeStyle = "#D1E8FF";
        ctx.lineWidth = 0.6;
        for (let x = margenWidth; x <= canvas.width - 20; x += lineStep) {
          ctx.beginPath(); ctx.moveTo(x, 20); ctx.lineTo(x, canvas.height - 20); ctx.stroke();
        }
        for (let y = 20; y <= canvas.height - 20; y += lineStep) {
          ctx.beginPath(); ctx.moveTo(margenWidth, y); ctx.lineTo(canvas.width - 20, y); ctx.stroke();
        }
        ctx.strokeStyle = "#A3C4E0";
        ctx.lineWidth = 0.8;
        for (let x = margenWidth; x <= canvas.width - 20; x += lineStep * 5) {
          ctx.beginPath(); ctx.moveTo(x, 20); ctx.lineTo(x, canvas.height - 20); ctx.stroke();
        }
        for (let y = 20; y <= canvas.height - 20; y += lineStep * 5) {
          ctx.beginPath(); ctx.moveTo(margenWidth, y); ctx.lineTo(canvas.width - 20, y); ctx.stroke();
        }
        
        if (margen === "dibujo") {
          ctx.font = "28px Arial";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          const selectedEmoji = marginImages[margenDibujo];
          for (let gridY = 20; gridY <= canvas.height - lineStep * 5; gridY += lineStep * 5) {
            ctx.fillText(selectedEmoji, margenWidth - 40, gridY + lineStep * 2.5);
          }
        }
      } else if (formato === "pauta-guiada") {
        const h = 22;
        const gap = 30;
        let lineY = 100;

        while (lineY + h * 3 < canvas.height - 50) {
          const topY = lineY;
          const midTop = topY + h;
          const midBot = topY + h * 2;
          const botY = topY + h * 3;

          ctx.fillStyle = "#E0F2FE";
          ctx.fillRect(margenWidth, topY, canvas.width - margenWidth - 20, h);
          ctx.fillStyle = "#FFEDD5";
          ctx.fillRect(margenWidth, midBot, canvas.width - margenWidth - 20, h);

          ctx.save();
          ctx.lineWidth = 1;
          ctx.strokeStyle = "#0EA5E9";
          ctx.beginPath(); ctx.moveTo(margenWidth, topY); ctx.lineTo(canvas.width - 20, topY); ctx.stroke();
          ctx.strokeStyle = "#92400E";
          ctx.beginPath(); ctx.moveTo(margenWidth, botY); ctx.lineTo(canvas.width - 20, botY); ctx.stroke();
          ctx.strokeStyle = "#6B7280";
          ctx.setLineDash([4, 3]);
          ctx.beginPath(); ctx.moveTo(margenWidth, midTop); ctx.lineTo(canvas.width - 20, midTop); ctx.stroke();
          ctx.beginPath(); ctx.moveTo(margenWidth, midBot); ctx.lineTo(canvas.width - 20, midBot); ctx.stroke();
          ctx.restore();
          
          if (margen === "dibujo") {
            ctx.save();
            const iconX = margenWidth - 42;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.font = "28px Arial";
            const selectedEmoji = marginImages[margenDibujo];
            ctx.fillText(selectedEmoji, iconX, midTop + h/2);
            ctx.restore();
          }

          lineY += h * 3 + gap;
        }
      } else {
        const h = 22;
        const gap = 30;
        let lineY = 100;

        while (lineY + h * 3 < canvas.height - 50) {
          const topY = lineY;
          const midTop = topY + h;
          const midBot = topY + h * 2;

          ctx.strokeStyle = "#6B7280";
          ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(margenWidth, midTop); ctx.lineTo(canvas.width - 20, midTop); ctx.stroke();
          ctx.beginPath(); ctx.moveTo(margenWidth, midBot); ctx.lineTo(canvas.width - 20, midBot); ctx.stroke();
          
          if (margen === "dibujo") {
            ctx.font = "28px Arial";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            const selectedEmoji = marginImages[margenDibujo];
            ctx.fillText(selectedEmoji, margenWidth - 42, midTop + h/2);
          }
          lineY += h * 3 + gap;
        }
      }

      ctx.strokeStyle = "#ffb3b3";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(margenWidth, 0);
      ctx.lineTo(margenWidth, canvas.height);
      ctx.stroke();
    }

    ctx.fillStyle = color;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const isDot = tipoLetra === "escolar-dot" || tipoLetra === "massallera-dot";

    const getLineSpacing = () => {
      if (formato === "cuadricula-4") return 16;
      if (formato === "cuadricula-5") return 20;
      if (formato === "pauta-guiada") return 60;
      return 60;
    };

    const lineSpacing = getLineSpacing();
    const startY = formato === "cuadricula-4" || formato === "cuadricula-5" ? 100 : 75;

    const isCuadricula = formato === "cuadricula-4" || formato === "cuadricula-5";
    const textStartX = isCuadricula ? margenWidth + 20 : margenWidth + 10;

    lineas.forEach((texto, index) => {
      const y = startY + index * lineSpacing;
      
      ctx.font = `bold ${fontSize}px ${getFontFamily()}`;
      
      if (isCuadricula) {
        ctx.textAlign = "left";
        if (isDot && texto) {
          drawDottedTextLeft(ctx, texto, textStartX, y, fontSize, color, margenWidth);
        } else if (texto) {
          ctx.fillText(texto, textStartX, y);
        }
      } else {
        ctx.textAlign = "center";
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

  const drawDottedTextLeft = (ctx: CanvasRenderingContext2D, text: string, x: number, y: number, fontSize: number, color: string, margenWidth: number) => {
    const isEscolarDot = tipoLetra === "escolar-dot";
    const isMassalleraDot = tipoLetra === "massallera-dot";
    
    if (isEscolarDot) {
      ctx.font = `${fontSize}px "Escolar Dot", "Escolar", Arial`;
    } else if (isMassalleraDot) {
      ctx.font = `bold ${fontSize}px "Massallera", Georgia`;
    }
    
    ctx.textAlign = "left";
    if (isEscolarDot) {
      ctx.fillStyle = color;
      ctx.fillText(text, x, y);
    } else if (isMassalleraDot) {
      ctx.strokeStyle = color;
      ctx.lineWidth = Math.max(1, fontSize * 0.025);
      ctx.setLineDash([1.5, 3.5]);
      ctx.strokeText(text, x, y);
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
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />
      
      <main style={{ 
        flex: 1, 
        display: "flex", 
        flexDirection: "row", 
        flexWrap: "wrap",
        background: "var(--color-background)",
        padding: "1rem"
      }}>
        
        {/* SIDEBAR DE CONTROLES */}
        <aside 
          style={{ 
            flex: "1 1 500px", 
            maxWidth: "600px",
            padding: "1rem", 
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            height: "calc(100vh - 5rem)",
            position: "sticky",
            top: "5rem",
            overflowY: "auto",
          }}
        >
          <div style={{ 
            background: "white", 
            padding: "2.5rem 2rem 5rem 2rem", 
            borderRadius: "var(--radius-md)", 
            border: "var(--border-thick)", 
            boxShadow: "var(--shadow-flat)",
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem"
          }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2.2rem", color: "var(--color-primary)", marginBottom: "0.25rem" }}>
              Ajustes del Estudio
            </h2>

            <section>
              <label style={{ fontWeight: 800, display: "flex", justifyContent: "space-between", marginBottom: "0.75rem", fontSize: "1.2rem" }}>
                <span>✍️ Texto Mágico</span>
                <span style={{ fontSize: "0.9rem", color: "#64748b" }}>{numLineas} líneas</span>
              </label>
              <input 
                type="range" 
                min="1" 
                max="10" 
                value={numLineas} 
                onChange={(e) => setNumLineas(parseInt(e.target.value))}
                style={{ width: "100%", height: "8px", accentColor: "var(--color-secondary)", marginBottom: "1.5rem" }}
              />
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", maxHeight: "350px", overflowY: "auto", paddingRight: "8px" }}>
                {lineas.map((linea, index) => (
                  <input 
                    key={index}
                    type="text" 
                    value={linea}
                    onChange={(e) => actualizarLinea(index, e.target.value)}
                    placeholder={`Escribe algo aquí...`}
                    maxLength={40}
                    style={{ 
                      width: "100%", 
                      padding: "1rem", 
                      borderRadius: "15px", 
                      border: "3px solid #e2e8f0",
                      fontSize: "1.1rem",
                      fontWeight: 700,
                      outline: "none",
                      transition: "border-color 0.2s"
                    }} 
                  />
                ))}
              </div>
            </section>

            <section style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "1.5rem" }}>
              <div>
                <label style={{ fontWeight: 800, display: "block", marginBottom: "0.5rem", fontSize: "1.1rem" }}>📏 Tamaño</label>
                <input 
                  type="range" 
                  min="20" 
                  max="100" 
                  value={fontSize} 
                  onChange={(e) => setFontSize(parseInt(e.target.value))}
                  style={{ width: "100%", height: "8px", accentColor: "var(--color-secondary)" }}
                />
              </div>
              <div>
                <label style={{ fontWeight: 800, display: "block", marginBottom: "0.5rem", fontSize: "1.1rem" }}>🎨 Color</label>
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  {["#1A1A1A", "#0EA5E9", "#EF4444", "#22C55E", "#FB923C"].map(c => (
                    <button 
                      key={c}
                      onClick={() => setColor(c)}
                      style={{ 
                        width: "32px", 
                        height: "32px", 
                        borderRadius: "50%", 
                        background: c, 
                        border: color === c ? "3px solid #1A1A1A" : "1px solid #ddd",
                        cursor: "pointer",
                        transform: color === c ? "scale(1.15)" : "none",
                        transition: "transform 0.2s"
                      }}
                    />
                  ))}
                </div>
              </div>
            </section>

            <section>
              <label style={{ fontWeight: 800, display: "block", marginBottom: "0.5rem", fontSize: "1.1rem" }}>🔤 Estilo de Letra</label>
              <select 
                value={tipoLetra} 
                onChange={(e) => setTipoLetra(e.target.value as TipoLetra)}
                style={{ 
                  width: "100%", 
                  padding: "1rem", 
                  borderRadius: "15px", 
                  border: "3px solid #1A1A1A",
                  fontSize: "1.1rem",
                  fontWeight: 800,
                  background: "white",
                  cursor: "pointer"
                }}
              >
                <option value="escolar">Escolar Normal</option>
                <option value="escolar-dot">Escolar Punteada</option>
                <option value="massallera">Massallera Normal</option>
                <option value="massallera-dot">Massallera Punteada</option>
              </select>
            </section>

            <section>
              <label style={{ fontWeight: 800, display: "block", marginBottom: "0.5rem", fontSize: "1.1rem" }}>📐 Formato de Pauta</label>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                {[
                  { val: "pauta-guiada" as Formato, label: "Montessori" },
                  { val: "pauta-normal" as Formato, label: "Normal" },
                  { val: "cuadricula-5" as Formato, label: "Cuadrícula" },
                  { val: "cuadricula-4" as Formato, label: "4mm" }
                ].map((f) => (
                  <button 
                    key={f.val}
                    onClick={() => setFormato(f.val)}
                    style={{ 
                      padding: "12px", 
                      borderRadius: "12px", 
                      border: formato === f.val ? "4px solid #1A1A1A" : "2px solid #ddd",
                      background: formato === f.val ? "var(--color-secondary)" : "#f8fafc",
                      color: formato === f.val ? "white" : "#475569",
                      fontWeight: 800,
                      cursor: "pointer",
                      fontSize: "0.95rem"
                    }}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </section>

            <section>
              <label style={{ fontWeight: 800, display: "block", marginBottom: "0.75rem", fontSize: "1.1rem" }}>🖼️ Dibujo de Margen</label>
              <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1rem" }}>
                {(["sin", "con", "dibujo"] as Margen[]).map((m) => (
                  <button 
                    key={m}
                    onClick={() => setMargen(m)}
                    style={{ 
                      flex: 1,
                      padding: "12px", 
                      borderRadius: "12px", 
                      border: margen === m ? "3px solid #1A1A1A" : "2px solid #ddd",
                      background: margen === m ? "var(--color-cta)" : "white",
                      color: margen === m ? "white" : "#1A1A1A",
                      fontWeight: 800,
                      cursor: "pointer",
                      fontSize: "0.9rem"
                    }}
                  >
                    {m === "sin" ? "Sin" : m === "con" ? "Línea" : "Emoji"}
                  </button>
                ))}
              </div>
              {margen === "dibujo" && (
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", background: "#f8fafc", padding: "15px", borderRadius: "15px" }}>
                  {(Object.keys(marginImages) as MargenDibujo[]).map((img) => (
                    <button 
                      key={img}
                      onClick={() => setMargenDibujo(img)}
                      style={{ 
                        width: "42px", 
                        height: "42px", 
                        borderRadius: "10px", 
                        border: margenDibujo === img ? "3px solid #1A1A1A" : "1px solid transparent",
                        background: "white",
                        cursor: "pointer",
                        fontSize: "1.4rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "all 0.1s"
                      }}
                    >
                      {marginImages[img]}
                    </button>
                  ))}
                </div>
              )}
            </section>

            <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
              <button onClick={generarAleatorio} style={{ 
                flex: 1,
                padding: "16px", 
                border: "3px solid #1A1A1A", 
                borderRadius: "15px", 
                background: "var(--color-success)", 
                color: "white",
                cursor: "pointer", 
                fontWeight: 900,
                boxShadow: "6px 6px 0 #1A1A1A",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                fontSize: "1rem"
              }}>
                🎲 Aleatorio
              </button>
              <button 
                onClick={descargarImagen}
                style={{ 
                  flex: 1.5,
                  padding: "16px", 
                  border: "3px solid #1A1A1A", 
                  borderRadius: "15px", 
                  background: "var(--color-cta)", 
                  color: "white",
                  cursor: "pointer", 
                  fontWeight: 900,
                  boxShadow: "6px 6px 0 #1A1A1A",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                  fontSize: "1rem"
                }}
              >
                <DownloadIcon /> Descargar
              </button>
            </div>
          </div>
        </aside>

        {/* ÁREA PRINCIPAL: PREVIEW DE LA FICHA */}
        <section style={{ 
          flex: "1 1 600px", 
          padding: "1rem", 
          display: "flex", 
          flexDirection: "column",
          alignItems: "center"
        }}>
          <div style={{ 
            width: "100%", 
            maxWidth: "900px",
            background: "white", 
            padding: "2rem", 
            borderRadius: "var(--radius-lg)", 
            border: "var(--border-thick)", 
            boxShadow: "var(--shadow-flat)",
            position: "relative"
          }}>
            <div style={{ 
               display: "flex", 
               justifyContent: "space-between", 
               alignItems: "center", 
               marginBottom: "1.5rem",
               borderBottom: "2px dashed #e2e8f0",
               paddingBottom: "1rem"
            }}>
              <div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", color: "var(--color-primary)" }}>
                  Tu Obra Maestra ✨
                </h3>
                <p style={{ color: "#64748b", fontWeight: 700, fontSize: "0.9rem" }}>
                  Vista previa en tiempo real
                </p>
              </div>
              <div style={{ 
                background: "var(--color-secondary)", 
                color: "white", 
                padding: "8px 16px", 
                borderRadius: "50px", 
                fontWeight: 800,
                fontSize: "0.8rem",
                border: "2px solid #1A1A1A"
              }}>
                CALIDAD HD
              </div>
            </div>

            <div style={{ 
              background: "#F8FAFC", 
              borderRadius: "15px", 
              padding: "2rem",
              border: "2px solid #E2E8F0",
              display: "flex",
              justifyContent: "center",
              boxShadow: "inset 0 2px 10px rgba(0,0,0,0.05)"
            }}>
              <div style={{ 
                background: "white", 
                boxShadow: "0 10px 30px rgba(0,0,0,0.1), 0 1px 3px rgba(0,0,0,0.05)",
                lineHeight: 0,
                borderRadius: "4px",
                overflow: "hidden"
              }}>
                <canvas 
                  ref={canvasRef} 
                  width={1000}
                  height={1200} 
                  style={{ 
                    width: "100%", 
                    maxWidth: "700px", 
                    height: "auto", 
                    display: "block" 
                  }} 
                />
              </div>
            </div>

            <div style={{ 
              marginTop: "1.5rem", 
              textAlign: "center",
              padding: "1rem",
              background: "#fff7ed",
              borderRadius: "15px",
              border: "1px solid #ffedd5"
            }}>
              <p style={{ fontSize: "0.9rem", color: "#92400e", fontWeight: 700 }}>
                💡 <strong>Consejo:</strong> Si las palabras se salen del margen, intenta reducir el tamaño de letra o usar frases más cortas.
              </p>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}