import type { GlobalConfig } from 'payload'

import { revalidateGlobalAfterChange } from '@/hooks/revalidate'
import { loggedIn } from '@/access'
import { linkFields } from '@/fields/link'

export const Fusszeile: GlobalConfig = {
  slug: 'fusszeile',
  label: 'Fusszeile',
  admin: { group: 'Einstellungen', description: 'Der Bereich ganz unten auf jeder Seite.' },
  access: { read: () => true, update: loggedIn },
  hooks: { afterChange: [revalidateGlobalAfterChange] },
  fields: [
    {
      name: 'text',
      type: 'textarea',
      label: 'Text',
      admin: { description: 'Optional. Ein kurzer Satz, z. B. zu den Öffnungszeiten.' },
    },
    {
      name: 'legalLinks',
      type: 'array',
      label: 'Rechtliches',
      labels: { singular: 'Link', plural: 'Links' },
      maxRows: 4,
      admin: { description: 'Z. B. Impressum und Datenschutz.' },
      fields: linkFields,
    },
    {
      name: 'partnerLinks',
      type: 'array',
      label: 'Partnerlinks',
      labels: { singular: 'Link', plural: 'Links' },
      maxRows: 8,
      admin: { description: 'Links zu Partnerorganisationen, z. B. dem Dachverband.' },
      fields: linkFields,
    },
  ],
}
