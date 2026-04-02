import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Caligrafía Mágica - Aprende Jugando",
  description: "La plataforma web más Premium e interactiva para que los niños aprendan caligrafía con los mejores cuadernillos y lienzos mágicos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
