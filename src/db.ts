import path from 'path'
import { fileURLToPath } from 'url'

const dirname = path.dirname(fileURLToPath(import.meta.url))

/**
 * Datenbank-Verbindung aus der Umgebung:
 * - `postgres://…` (z. B. Neon auf Vercel) → Postgres mit Migrationen (src/migrations)
 * - sonst eine SQLite-Datei (lokale Entwicklung), Schema wird automatisch angepasst
 */
export const databaseUrl = process.env.DATABASE_URL || process.env.POSTGRES_URL || 'file:./gartenverein.db'
export const isPostgres = /^postgres(ql)?:\/\//.test(databaseUrl)

export async function createDatabaseAdapter() {
  if (isPostgres) {
    const { postgresAdapter } = await import('@payloadcms/db-postgres')
    return postgresAdapter({
      // Wenige Verbindungen pro Serverless-Instanz; Neon bündelt sie über den «pooled» Anschluss.
      pool: { connectionString: databaseUrl, max: 5 },
      push: false,
      migrationDir: path.resolve(dirname, 'migrations'),
    })
  }
  const { sqliteAdapter } = await import('@payloadcms/db-sqlite')
  return sqliteAdapter({
    // Nur lokal: Das Schema wird automatisch angelegt/angepasst.
    push: true,
    client: { url: databaseUrl },
  })
}
