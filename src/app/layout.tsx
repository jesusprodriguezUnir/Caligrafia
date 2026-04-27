import type { Metadata } from "next";
import "./globals.css";
import { MailIcon, InstagramIcon, FacebookIcon, TikTokIcon } from "@/components/Icons";
import { ThemeProvider, ThemeScript } from "@/contexts/ThemeContext";

export const metadata: Metadata = {
  title: "Caligra-Fíate - El Arte de la Caligrafía",
  description: "Domina el arte de la escritura. Nuestra plataforma educativa combina pedagogía clásica con refinamiento artístico para perfeccionar cada trazo.",
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
      <body suppressHydrationWarning>
        <ThemeScript />
        <ThemeProvider>
          <SecretTrigger />
          {children}
          <footer className="siteFooter">
            <div className="siteFooterInner">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "2rem", marginBottom: "2rem" }}>
                <div>
                  <p className="siteFooterTitle">Síguenos y contacta</p>
                  <p className="siteFooterSubtitle">Accede a nuestros perfiles oficiales y al correo de contacto.</p>
                </div>
                <div style={{ paddingBottom: "0.5rem" }}>
                   <p style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--color-primary)" }}>
                     © {new Date().getFullYear()} Caligra-Fíate. Todos los derechos reservados.
                   </p>
                </div>
              </div>

              <div className="siteFooterSocialGrid">
                <a className="siteFooterSocialLink socialMail" href={contactLinks.email} aria-label="Enviar correo de contacto a Caligra-fiate">
                  <span className="siteFooterSocialIcon" aria-hidden="true">
                    <MailIcon />
                  </span>
                  <span className="siteFooterSocialText">
                    <strong>Correo</strong>
                    <small>contacto@caligra-fiate.com</small>
                  </span>
                </a>

                <a className="siteFooterSocialLink socialInstagram" href={contactLinks.instagram} target="_blank" rel="noopener noreferrer" aria-label="Abrir Instagram de Caligra-fiate">
                  <span className="siteFooterSocialIcon" aria-hidden="true">
                    <InstagramIcon />
                  </span>
                  <span className="siteFooterSocialText">
                    <strong>Instagram</strong>
                    <small>@caligrafiate</small>
                  </span>
                </a>

                <a className="siteFooterSocialLink socialFacebook" href={contactLinks.facebook} target="_blank" rel="noopener noreferrer" aria-label="Abrir Facebook de Caligra-fiate">
                  <span className="siteFooterSocialIcon" aria-hidden="true">
                    <FacebookIcon />
                  </span>
                  <span className="siteFooterSocialText">
                    <strong>Facebook</strong>
                    <small>/caligrafiate</small>
                  </span>
                </a>

                <a className="siteFooterSocialLink socialTikTok" href={contactLinks.tiktok} target="_blank" rel="noopener noreferrer" aria-label="Abrir TikTok de Caligra-fiate">
                  <span className="siteFooterSocialIcon" aria-hidden="true">
                    <TikTokIcon />
                  </span>
                  <span className="siteFooterSocialText">
                    <strong>TikTok</strong>
                    <small>@caligrafiate</small>
                  </span>
                </a>
              </div>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
