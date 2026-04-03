"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function SecretTrigger() {
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Secret combo: Ctrl + Alt + A (Admin)
      if (e.ctrlKey && e.altKey && e.key.toLowerCase() === 'a') {
        console.log("Acceso Secreto Detectado: Redirigiendo a Administración...");
        router.push("/admin/pdf-manager");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [router]);

  return null; // El componente es invisible
}
