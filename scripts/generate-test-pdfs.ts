import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import * as fs from 'fs-extra';
import * as path from 'path';

const CATEGORIAS = [
  { 
    id: 1, titulo: "Preescritura", 
    ejercicios: [
        { nombre: "Trazos en Zig-Zag", sample: "/\\/\\/\\/\\" },
        { nombre: "Líneas de Montañas", sample: "^^^^ ^^^^" },
        { nombre: "Ondas del Mar", sample: "~~~~ ~~~~" }
    ] 
  },
  { 
    id: 2, titulo: "Vocales Mayúsculas", 
    ejercicios: [
        { nombre: "Vocal A y E", sample: "A E A E A E" },
        { nombre: "Vocal I y O", sample: "I O I O I O" },
        { nombre: "Vocal U y Repaso", sample: "A E I O U" }
    ] 
  },
  { 
    id: 3, titulo: "Abecedario Mayúsculas", 
    ejercicios: [
        { nombre: "Letras A a la D", sample: "A B C D A B C D" },
        { nombre: "Letras E a la H", sample: "E F G H E F G H" },
        { nombre: "De la I a la L", sample: "I J K L I J K L" }
    ] 
  },
  { 
    id: 4, titulo: "Vocales Minúsculas", 
    ejercicios: [
        { nombre: "Vocales a, e", sample: "a e a e a e" },
        { nombre: "Vocales i, o", sample: "i o i o i o" },
        { nombre: "Vocal u", sample: "u u u u u u" }
    ] 
  },
  { 
    id: 5, titulo: "Abecedario Minúsculas", 
    ejercicios: [
        { nombre: "Letras a, b, c", sample: "a b c a b c a b c" },
        { nombre: "Letras d, e, f", sample: "d e f d e f d e f" },
        { nombre: "Letras g, h, i", sample: "g h i g h i g h i" }
    ] 
  },
  { 
    id: 6, titulo: "Palabras Mayúsculas", 
    ejercicios: [
        { nombre: "MAMÁ Y PAPÁ", sample: "MAMÁ PAPÁ MAMÁ PAPÁ" },
        { nombre: "EL SOL", sample: "SOL SOL SOL SOL" },
        { nombre: "LA LUNA", sample: "LUNA LUNA LUNA LUNA" }
    ] 
  },
  { 
    id: 7, titulo: "Palabras Minúsculas", 
    ejercicios: [
        { nombre: "casa y perro", sample: "casa perro casa perro" },
        { nombre: "sol y luna", sample: "sol luna sol luna" },
        { nombre: "mami y papi", sample: "mami papi mami papi" }
    ] 
  },
  { 
    id: 8, titulo: "Frases Mayúsculas", 
    ejercicios: [
        { nombre: "EL SOL BRILLA", sample: "EL SOL BRILLA MUCHO" },
        { nombre: "HOLA AMIGO", sample: "HOLA MI BUEN AMIGO" },
        { nombre: "JUGAR ES DIVERTIDO", sample: "JUGAR ES MUY DIVERTIDO" }
    ] 
  },
  { 
    id: 9, titulo: "Frases Minúsculas", 
    ejercicios: [
        { nombre: "mi gato es lindo", sample: "mi gato es muy lindo" },
        { nombre: "me gusta leer", sample: "me gusta mucho leer" },
        { nombre: "el cielo es azul", sample: "el cielo es azul claro" }
    ] 
  },
  { 
    id: 10, titulo: "Textos Mágicos", 
    ejercicios: [
        { nombre: "El Dragón Azul", sample: "Había una vez un dragón azul..." },
        { nombre: "El Hada Rosa", sample: "El hada rosa volaba feliz..." },
        { nombre: "El Bosque Mágico", sample: "En el bosque mágico de letras..." }
    ] 
  },
];

async function generate() {
  const outputDir = path.join(process.cwd(), 'public', 'test-cuadernos');
  await fs.ensureDir(outputDir);

  for (const cat of CATEGORIAS) {
    for (let i = 0; i < 3; i++) {
        const ejercicio = cat.ejercicios[i];
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage([595, 842]); // A4
        const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
        const fontNormal = await pdfDoc.embedFont(StandardFonts.Helvetica);

        page.drawText(`${cat.titulo}`, {
            x: 50,
            y: 780,
            size: 20,
            font,
            color: rgb(0.1, 0.6, 0.9),
        });

        page.drawText(`Reto: ${ejercicio.nombre}`, {
            x: 50,
            y: 740,
            size: 28,
            font,
            color: rgb(1, 0.2, 0.2),
        });

        // Línea de caligrafía
        page.drawLine({
            start: { x: 50, y: 700 },
            end: { x: 545, y: 700 },
            thickness: 2,
            color: rgb(0.8, 0.8, 0.8),
            dashArray: [5, 5],
        });

        // Puntos de práctica BASADOS EN EL EJERCICIO
        for (let row = 0; row < 6; row++) {
            page.drawLine({
                start: { x: 50, y: 600 - (row * 90) },
                end: { x: 545, y: 600 - (row * 90) },
                thickness: 1,
                color: rgb(0.9, 0.9, 0.9),
            });
            // Dibujamos el sample real del ejercicio
            page.drawText(ejercicio.sample, {
                x: 60,
                y: 610 - (row * 90),
                size: 30,
                font: fontNormal,
                color: rgb(0.8, 0.8, 0.8), // Color clarito para que los niños repasen
            });
        }

        page.drawText("Caligrafia Magica - Ejercicio Real: " + ejercicio.nombre, {
            x: 50,
            y: 30,
            size: 10,
            font: fontNormal,
            color: rgb(0.6, 0.6, 0.6),
        });

        const pdfBytes = await pdfDoc.save();
        const fileName = `${cat.id}.${i+1}-test.pdf`;
        await fs.writeFile(path.join(outputDir, fileName), pdfBytes);
        console.log(`Generated ${fileName}: ${ejercicio.nombre}`);
    }
  }
}

generate().catch(console.error);
