import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Caligra-fiate - ¡Aprende Jugando!",
  description: "¡La plataforma más divertida para que los niños aprendan caligrafía con cuadernos mágicos y juegos de escritura!",
};

import { SecretTrigger } from "@/components/SecretTrigger";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const contactLinks = {
    email: "mailto:contacto@caligra-fiate.com",
    instagram: "https://www.instagram.com/caligrafiate",
    facebook: "https://www.facebook.com/caligrafiate",
    tiktok: "https://www.tiktok.com/@caligrafiate",
  };

  return (
    <html lang="es">
      <body>
        <SecretTrigger />
        {children}
        <footer className="siteFooter">
          <div className="siteFooterInner">
            <p className="siteFooterTitle">Siguenos y contacta</p>
            <p className="siteFooterSubtitle">Accede a nuestros perfiles oficiales y al correo de contacto.</p>

            <div className="siteFooterSocialGrid">
              <a className="siteFooterSocialLink socialMail" href={contactLinks.email} aria-label="Enviar correo de contacto a Caligra-fiate">
                <span className="siteFooterSocialIcon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" role="img" focusable="false">
                    <path d="M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm0 2v.51l9 5.63 9-5.63V7H3zm18 10V9.87l-8.49 5.31a1 1 0 0 1-1.02 0L3 9.87V17h18z" fill="currentColor" />
                  </svg>
                </span>
                <span className="siteFooterSocialText">
                  <strong>Correo</strong>
                  <small>contacto@caligra-fiate.com</small>
                </span>
              </a>

              <a className="siteFooterSocialLink socialInstagram" href={contactLinks.instagram} target="_blank" rel="noopener noreferrer" aria-label="Abrir Instagram de Caligra-fiate">
                <span className="siteFooterSocialIcon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" role="img" focusable="false">
                    <path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9a5.5 5.5 0 0 1-5.5 5.5h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9zm10.75 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" fill="currentColor" />
                  </svg>
                </span>
                <span className="siteFooterSocialText">
                  <strong>Instagram</strong>
                  <small>@caligrafiate</small>
                </span>
              </a>

              <a className="siteFooterSocialLink socialFacebook" href={contactLinks.facebook} target="_blank" rel="noopener noreferrer" aria-label="Abrir Facebook de Caligra-fiate">
                <span className="siteFooterSocialIcon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" role="img" focusable="false">
                    <path d="M13.5 22v-8h2.7l.4-3h-3.1V9.1c0-.87.26-1.46 1.57-1.46H16.7V4.97c-.3-.04-1.33-.12-2.53-.12-2.5 0-4.22 1.45-4.22 4.12V11H7.2v3h2.75v8h3.55z" fill="currentColor" />
                  </svg>
                </span>
                <span className="siteFooterSocialText">
                  <strong>Facebook</strong>
                  <small>/caligrafiate</small>
                </span>
              </a>

              <a className="siteFooterSocialLink socialTikTok" href={contactLinks.tiktok} target="_blank" rel="noopener noreferrer" aria-label="Abrir TikTok de Caligra-fiate">
                <span className="siteFooterSocialIcon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" role="img" focusable="false">
                    <path d="M14.5 3c.27 2.14 1.64 3.88 3.73 4.43v2.9a7.5 7.5 0 0 1-3.65-1.12v5.08A6.9 6.9 0 1 1 8.1 7.4v3.01a3.93 3.93 0 1 0 3.5 3.91V3h2.9z" fill="currentColor" />
                  </svg>
                </span>
                <span className="siteFooterSocialText">
                  <strong>TikTok</strong>
                  <small>@caligrafiate</small>
                </span>
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
