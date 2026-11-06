import type { GlobalConfig } from 'payload'

import { loggedIn } from '@/access'
import { linkFields } from '@/fields/link'

export const Kopfzeile: GlobalConfig = {
  slug: 'kopfzeile',
  label: 'Kopfzeile (Navigation)',
  admin: { group: 'Einstellungen', description: 'Das Menü oben auf jeder Seite.' },
  access: { read: () => true, update: loggedIn },
  fields: [
    {
      name: 'items',
      type: 'array',
      label: 'Menüpunkte',
      labels: { singular: 'Menüpunkt', plural: 'Menüpunkte' },
      admin: { description: 'Reihenfolge per Ziehgriff ändern. Nicht veröffentlichte Seiten erscheinen nicht im Menü.' },
      fields: linkFields,
    },
  ],
}
