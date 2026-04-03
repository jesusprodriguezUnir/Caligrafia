# Caligrafia Magica

Aplicacion Next.js con export estatico y backend desacoplado en Supabase.

## Requisitos

- Node.js 20+
- Proyecto Supabase creado

## Variables de entorno

Copia `.env.example` a `.env.local` y completa los valores:

```bash
cp .env.example .env.local
```

Variables usadas por el frontend:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` (o `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`)
- `NEXT_PUBLIC_SUPABASE_PROCESS_PDFS_FUNCTION` (opcional, default `process-pdfs`)

## Desarrollo local

```bash
npm install
npm run dev
```

## Arquitectura de procesado PDF

El proyecto se despliega como estatico (`output: "export"`), por lo que no usa API Routes de Next.js en produccion.

El boton de administracion `/admin/pdf-manager` invoca una **Supabase Edge Function**:

- Funcion: `process-pdfs`
- Archivo: `supabase/functions/process-pdfs/index.ts`
- Seguridad: requiere usuario autenticado con rol `admin`

## Despliegue de la Edge Function

1. Instala y autentica Supabase CLI.
1. Vincula el proyecto:

```bash
supabase link --project-ref zxzwclhuglgpybesobmt
```

1. Configura secretos para la funcion (ejemplo):

```bash
supabase secrets set PDF_SOURCE_BUCKET=recursos
supabase secrets set PDF_OUTPUT_BUCKET=recursos
supabase secrets set PDF_SOURCE_PREFIX=
supabase secrets set PDF_OUTPUT_PREFIX=processed
```

1. Despliega la funcion:

```bash
supabase functions deploy process-pdfs
```

## Despliegue en Vercel

1. Importa el repositorio en Vercel.
1. En Project Settings -> Environment Variables, agrega `NEXT_PUBLIC_SUPABASE_URL`.
1. En Project Settings -> Environment Variables, agrega `NEXT_PUBLIC_SUPABASE_ANON_KEY` (puedes usar tu key publishable).
1. En Project Settings -> Environment Variables, agrega `NEXT_PUBLIC_SUPABASE_PROCESS_PDFS_FUNCTION` = `process-pdfs`.
1. Ejecuta deploy.

## Verificacion

1. Abre la app desplegada.
2. Inicia sesion con un usuario admin en Supabase.
3. Accede a `/admin/pdf-manager` y ejecuta el procesamiento.
4. Verifica resultados en Supabase Storage bajo el prefijo `processed/`.
