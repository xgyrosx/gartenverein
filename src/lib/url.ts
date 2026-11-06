/** Öffentliche Adresse der Website (für Sitemap, Vorschau, Open Graph). */
export const serverUrl = (process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000').replace(/\/$/, '')
