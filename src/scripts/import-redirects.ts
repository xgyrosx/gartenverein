import { readFileSync } from 'node:fs'
import path from 'node:path'

import config from '@payload-config'
import { getPayload } from 'payload'

// Liest docs/redirects-alt-neu.csv und legt die Weiterleitungen an (bereits vorhandene und unsinnige werden übersprungen).
// Aufruf: pnpm redirects:import

function parseCsv(text: string): string[][] {
  const rows: string[][] = []
  let row: string[] = []
  let cell = ''
  let quoted = false
  for (let i = 0; i < text.length; i++) {
    const c = text[i]
    if (quoted) {
      if (c === '"' && text[i + 1] === '"') { cell += '"'; i++ }
      else if (c === '"') quoted = false
      else cell += c
    } else if (c === '"') quoted = true
    else if (c === ',') { row.push(cell); cell = '' }
    else if (c === '\n' || c === '\r') {
      if (c === '\r' && text[i + 1] === '\n') i++
      row.push(cell); cell = ''
      if (row.some(Boolean)) rows.push(row)
      row = []
    } else cell += c
  }
  if (cell || row.length) { row.push(cell); rows.push(row) }
  return rows
}

const normalize = (p: string) => {
  const x = p.toLowerCase()
  return x.length > 1 ? x.replace(/\/+$/, '') : x
}

const payload = await getPayload({ config })
const rows = parseCsv(readFileSync(path.resolve(process.cwd(), 'docs/redirects-alt-neu.csv'), 'utf8')).slice(1)
let created = 0
let skipped = 0
for (const [oldUrl, newUrl] of rows) {
  let from: string
  try {
    const u = new URL(oldUrl)
    if (u.search) { skipped++; continue } // Adressen mit Parametern lassen sich nicht per Pfad umleiten
    from = normalize(u.pathname)
  } catch {
    from = normalize(oldUrl)
  }
  if (from === '/' || from === normalize(newUrl)) { skipped++; continue }
  const { totalDocs } = await payload.count({ collection: 'redirects', where: { from: { equals: from } } })
  if (totalDocs > 0) { skipped++; continue }
  await payload.create({
    collection: 'redirects',
    data: { from, to: { type: 'custom', url: newUrl } } as never,
    context: { disableRevalidate: true },
  })
  created++
}
payload.logger.info(`Weiterleitungen: ${created} angelegt, ${skipped} übersprungen.`)
process.exit(0)
