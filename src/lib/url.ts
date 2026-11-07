/**
 * Öffentliche Adresse der Website (für Sitemap, Vorschau, Open Graph, Kalender).
 * Reihenfolge: NEXT_PUBLIC_SERVER_URL → Vercel-Produktionsadresse → Vercel-Deployment-Adresse → localhost.
 */
const fromVercel = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : undefined

export const serverUrl = (process.env.NEXT_PUBLIC_SERVER_URL || fromVercel || 'http://localhost:3000').replace(/\/$/, '')
