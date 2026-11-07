// Build-Ablauf: zuerst die Datenbank vorbereiten, dann Next.js bauen.
//  - Postgres (DATABASE_URL = postgres://…): offene Migrationen ausführen (bevorzugt über den direkten Anschluss)
//  - SQLite (lokal): Schema automatisch anlegen
import { spawnSync } from 'node:child_process'

const url = process.env.DATABASE_URL || process.env.POSTGRES_URL || ''
const isPostgres = /^postgres(ql)?:\/\//.test(url)
const env = { ...process.env, NODE_OPTIONS: '--no-deprecation --max-old-space-size=8000' }

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
