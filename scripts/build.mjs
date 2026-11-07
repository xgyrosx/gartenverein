// Build-Ablauf: zuerst die Datenbank vorbereiten, dann Next.js bauen.
//  - Postgres (DATABASE_URL = postgres://…): offene Migrationen ausführen (bevorzugt über den direkten Anschluss)
//  - SQLite (lokal): Schema automatisch anlegen
import { spawnSync } from 'node:child_process'

const url = process.env.DATABASE_URL || process.env.POSTGRES_URL || ''
const isPostgres = /^postgres(ql)?:\/\//.test(url)
const env = { ...process.env, NODE_OPTIONS: '--no-deprecation --max-old-space-size=8000' }

// Auf Vercel müssen Datenbank und Secret gesetzt sein – sonst klar abbrechen statt mit SQLite zu starten.
if (process.env.VERCEL) {
  const missing = []
  if (!process.env.PAYLOAD_SECRET) missing.push('PAYLOAD_SECRET  (langer Zufallswert, z. B. mit «openssl rand -hex 32» erzeugen)')
  if (!isPostgres) missing.push('DATABASE_URL  (postgres://… – im Vercel-Projekt unter «Storage» Neon verbinden)')
  if (missing.length > 0) {
    console.error('\n✗ Es fehlen Umgebungsvariablen für den Build auf Vercel:\n  - ' + missing.join('\n  - '))
    console.error('\nSiehe docs/deployment-vercel.md, Schritte 3–5. Danach «Redeploy» auslösen.\n')
    process.exit(1)
  }
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    console.warn('\n⚠ BLOB_READ_WRITE_TOKEN fehlt: Bilder und PDFs können auf Vercel nicht gespeichert werden (Blob unter «Storage» verbinden).\n')
  }
}

function run(cmd, args, extraEnv = {}) {
  const r = spawnSync(cmd, args, { stdio: 'inherit', env: { ...env, ...extraEnv }, shell: process.platform === 'win32' })
  if (r.status !== 0) process.exit(r.status ?? 1)
}

if (isPostgres) {
  const direct = process.env.DATABASE_URL_UNPOOLED || process.env.POSTGRES_URL_NON_POOLING || url
  console.log('→ Postgres: Migrationen ausführen')
  run('pnpm', ['exec', 'payload', 'migrate'], { DATABASE_URL: direct })
} else {
  console.log('→ SQLite: Schema anlegen')
  run('pnpm', ['db:init'])
}
run('pnpm', ['exec', 'next', 'build'])
