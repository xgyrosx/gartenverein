import config from '@payload-config'
import { getPayload } from 'payload'

// Wird beim Build auf Vercel mit SEED_ON_BUILD=1 ausgeführt: füllt die Datenbank mit den Beispielinhalten,
// aber nur, wenn es noch keine Seiten gibt. Bestehende Inhalte werden nie angefasst.
const payload = await getPayload({ config })
const { totalDocs } = await payload.count({ collection: 'seiten' })
if (totalDocs > 0) {
  payload.logger.info(`Seed übersprungen: ${totalDocs} Seiten vorhanden.`)
  process.exit(0)
}
payload.logger.info('Datenbank ist leer – Beispielinhalte werden angelegt.')
await import('../seed') // beendet den Prozess selbst, wenn es fertig ist
