import type { GlobalConfig } from 'payload'

import { loggedIn } from '@/access'
import { linkFields } from '@/fields/link'

export const Fusszeile: GlobalConfig = {
  slug: 'fusszeile',
  label: 'Fusszeile',
  admin: { group: 'Einstellungen', description: 'Der Bereich ganz unten auf jeder Seite.' },
  access: { read: () => true, update: loggedIn },
  fields: [
    {
      name: 'text',
      type: 'textarea',
      label: 'Text',
      admin: { description: 'Optional. Ein kurzer Satz, z. B. zu den Öffnungszeiten.' },
    },
    {
      name: 'links',
      type: 'array',
      label: 'Links',
      labels: { singular: 'Link', plural: 'Links' },
      fields: linkFields,
    },
  ],
}
