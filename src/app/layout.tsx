import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Caligrafía Mágica - ¡Aprende Jugando!",
  description: "¡La plataforma más divertida para que los niños aprendan caligrafía con cuadernos mágicos y juegos de escritura!",
};

import { SecretTrigger } from "@/components/SecretTrigger";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <SecretTrigger />
        {children}
      </body>
    </html>
  );
}
