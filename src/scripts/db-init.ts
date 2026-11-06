import config from '@payload-config'
import { getPayload } from 'payload'

// Legt das Datenbankschema an bzw. passt es an (Prototyp-Modus mit "push").
// Läuft vor dem Build, damit die Seiten beim Build statisch erzeugt werden können.
await getPayload({ config })
process.exit(0)
