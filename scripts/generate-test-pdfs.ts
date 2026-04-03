import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import * as fs from 'fs-extra';
import * as path from 'path';

const CATEGORIAS = [
  { id: 1, titulo: "Preescritura", contenido: "~~~~ ~~~~ ~~~~ ~~~~" },
  { id: 2, titulo: "Vocales Mayúsculas", contenido: "A E I O U" },
  { id: 3, titulo: "Abecedario Mayúsculas", contenido: "A B C D E F G H I J K L M N Ñ O P Q R S T U V W X Y Z" },
  { id: 4, titulo: "Vocales Minúsculas", contenido: "a e i o u" },
  { id: 5, titulo: "Abecedario Minúsculas", contenido: "a b c d e f g h i j k l m n ñ o p q r s t u v w x y z" },
  { id: 6, titulo: "Palabras Mayúsculas", contenido: "HOLA MAMA PAPA SOL LUNA" },
  { id: 7, titulo: "Palabras Minúsculas", contenido: "casa perro gato libro flor" },
  { id: 8, titulo: "Frases Mayúsculas", contenido: "HOLA ¿COMO ESTAS?" },
  { id: 9, titulo: "Frases Minúsculas", contenido: "¡me encanta jugar y aprender!" },
  { id: 10, titulo: "Textos Mágicos", contenido: "Érase una vez un niño que escribía letras con polvo de estrellas..." },
];

async function generate() {
  const outputDir = path.join(process.cwd(), 'public', 'test-cuadernos');
  await fs.ensureDir(outputDir);

  for (const cat of CATEGORIAS) {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595, 842]); // A4
    const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const fontNormal = await pdfDoc.embedFont(StandardFonts.Helvetica);

    // Titulo Infantil
    page.drawText(`Nivel ${cat.id}: ${cat.titulo}`, {
      x: 50,
      y: 750,
      size: 30,
      font,
      color: rgb(0.1, 0.6, 0.9), // Azul
    });

    // Línea de caligrafía (Simulación)
    page.drawLine({
        start: { x: 50, y: 680 },
        end: { x: 545, y: 680 },
        thickness: 2,
        color: rgb(0.8, 0.8, 0.8),
        dashArray: [5, 5],
      });

    page.drawText(cat.contenido, {
      x: 50,
      y: 600,
      size: 24,
      font: fontNormal,
      color: rgb(0.2, 0.2, 0.2),
    });

    // Marca de agua
    page.drawText("Caligrafia Magica - Practica sin parar!", {
      x: 180,
      y: 50,
      size: 12,
      font: fontNormal,
      color: rgb(0.5, 0.5, 0.5),
    });

    const pdfBytes = await pdfDoc.save();
    const fileName = `${cat.id}-test.pdf`;
    await fs.writeFile(path.join(outputDir, fileName), pdfBytes);
    console.log(`Generated ${fileName}`);
  }
}

generate().catch(console.error);
