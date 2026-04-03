import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import * as fs from 'fs-extra';
import * as path from 'path';

const PUBLIC_DIR = path.join(process.cwd(), 'public');
const OUTPUT_DIR = path.join(PUBLIC_DIR, 'processed');

export interface ProcessResult {
  fileName: string;
  success: boolean;
  outputPath?: string;
  error?: string;
}

function cleanTitle(filename: string): string {
    let clean = filename.toLowerCase();
    
    // Lista de palabras a eliminar del título automático
    const wordsToRemove = [
      '.pdf', 'rubio', 'anaya', 'santillana', 'kumon', 
      'cuaderno', 'cuadernos', 'caligrafía', 'caligrafia', 
      'escritura', 'educación', 'infantil', 'primaria', 
      '(', ')', '  '
    ];
    
    for (const w of wordsToRemove) {
       clean = clean.split(w).join(' ');
    }
    
    clean = clean.replace(/\s+/g, ' ').trim();
    if (!clean) return "Ejercicios Prácticos";
    
    // Capitalize cada palabra
    return clean.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

export async function processPDFs(): Promise<ProcessResult[]> {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const results: ProcessResult[] = [];
  const pdfFiles: string[] = [];

  function findPDFs(dir: string) {
    if (!fs.existsSync(dir)) return;
    const list = fs.readdirSync(dir);
    list.forEach(file => {
      const fullPath = path.join(dir, file);
      if (fs.statSync(fullPath).isDirectory()) {
        if (!fullPath.includes('node_modules') && !fullPath.includes('.next') && !fullPath.includes('processed')) {
          findPDFs(fullPath);
        }
      } else if (file.toLowerCase().endsWith('.pdf')) {
        pdfFiles.push(fullPath);
      }
    });
  }

  findPDFs(PUBLIC_DIR);

  for (const pdfPath of pdfFiles) {
    const fileName = path.basename(pdfPath, '.pdf');
    const specificOutputDir = path.join(OUTPUT_DIR, fileName);
    const outputPath = path.join(specificOutputDir, 'cuadernillo-premium.pdf');

    try {
      if (!fs.existsSync(specificOutputDir)) {
        fs.mkdirSync(specificOutputDir, { recursive: true });
      }

      const pdfBytes = fs.readFileSync(pdfPath);
      
      // ignoreEncryption ignora las contraseñas para lectura si el PDF tiene bloqueos básicos
      const originalDoc = await PDFDocument.load(pdfBytes, { ignoreEncryption: true });
      
      const pdfDoc = await PDFDocument.create();
      const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
      const fontStandard = await pdfDoc.embedFont(StandardFonts.Helvetica);

      // --- 1. PORTADA GENERADA DINÁMICAMENTE (ESTILO INFANTIL) ---
      const cover = pdfDoc.addPage([595, 842]); // Tamaño A4 estándar
      const { width, height } = cover.getSize();
      
      // Fondo alegre para la portada (Azul cielo claro)
      cover.drawRectangle({
        x: 0,
        y: 0,
        width,
        height,
        color: rgb(0.85, 0.95, 1), 
      });
      
      // Dibujar algunos círculos mágicos (burbujas) infantiles
      cover.drawCircle({ x: 100, y: height - 100, size: 60, color: rgb(1, 0.9, 0.4), opacity: 0.8 }); // Sol amarillo
      cover.drawCircle({ x: width - 80, y: height - 250, size: 40, color: rgb(0.3, 0.8, 0.6), opacity: 0.6 }); // Burbuja verde
      cover.drawCircle({ x: 60, y: height / 2 - 50, size: 80, color: rgb(1, 0.6, 0.6), opacity: 0.6 }); // Burbuja rosa
      cover.drawCircle({ x: width - 120, y: 150, size: 50, color: rgb(0.6, 0.5, 0.9), opacity: 0.6 }); // Burbuja morada
      cover.drawCircle({ x: width / 2 + 50, y: 80, size: 30, color: rgb(1, 0.6, 0.2), opacity: 0.7 }); // Burbuja naranja

      // Título principal arcoíris/divertido
      cover.drawText("CALIGRA-FIATE", {
         x: 70,
         y: height - 160,
         size: 38,
         font: fontBold,
         color: rgb(1, 0.46, 0.1), // Naranja divertido
      });
      
      cover.drawText("¡Tu cuaderno de súper aventuras!", {
         x: 50,
         y: height - 200,
         size: 22,
         font: fontStandard,
         color: rgb(0.1, 0.6, 0.8), // Azul brillante
      });

      const displayTitle = cleanTitle(fileName);
      cover.drawText(`Misión Especial:`, {
         x: 50,
         y: height / 2 + 60,
         size: 26,
         font: fontBold,
         color: rgb(0.5, 0.2, 0.8), // Morado infantil
      });

      cover.drawText(displayTitle, {
         x: 50,
         y: height / 2,
         size: 34,
         font: fontBold,
         color: rgb(0.1, 0.7, 0.4), // Verde saltarín
         maxWidth: width - 100,
      });
      
      cover.drawText("¡Vamos a aprender jugando!", {
         x: 50,
         y: 60,
         size: 16,
         font: fontStandard,
         color: rgb(0.9, 0.3, 0.5), // Rosa oscuro
      });

      // --- 2. CONTENIDO: EXTRACCIÓN Y RECORTE DE PÁGINAS ---
      // El enfoque es extraer la página original, recortar los márgenes (donde hay logos)
      // e incrustarla en una nueva hoja. De esta forma no pintamos nada encima.
      const pages = originalDoc.getPages();

      for (let i = 0; i < pages.length; i++) {
         const origPage = pages[i];
         const { width: origW, height: origH } = origPage.getSize();
         
         // Calculamos recortar un 12% arriba y un 10% abajo.
         const cropMarginTop = origH * 0.12; 
         const cropMarginBottom = origH * 0.10;
         
         const contentHeight = origH - cropMarginTop - cropMarginBottom;
         
         // La nueva hoja será del tamaño del contenido + 45px abajo para nuestro pie de página
         const newH = contentHeight + 45;
         const newPage = pdfDoc.addPage([origW, newH]);
         
         // Extraemos el recuadro que nos interesa del PDF original (el centro con los ejercicios)
         const embeddedCropped = await pdfDoc.embedPage(origPage, {
            left: 0,
            right: origW,
            bottom: cropMarginBottom,
            top: origH - cropMarginTop,
         });
         
         // Dibujamos el recorte desplazado 45px hacia arriba para dejar espacio en blanco al fondo
         newPage.drawPage(embeddedCropped, {
            x: 0,
            y: 45,
            width: origW,
            height: contentHeight
         });

         // Pie de página infantil
         newPage.drawText("Caligra-fiate", {
            x: origW / 2 - 50,
            y: 18,
            size: 14,
            font: fontBold,
            color: rgb(0.2, 0.6, 0.9) // Celeste vibrante
         });
      }


      const modBytes = await pdfDoc.save();
      fs.writeFileSync(outputPath, modBytes);
      
      results.push({ fileName, success: true, outputPath });
    } catch (err: any) {
      console.error(`Error procesando ${fileName}:`, err);
      results.push({ fileName, success: false, error: err.message });
    }
  }

  return results;
}
