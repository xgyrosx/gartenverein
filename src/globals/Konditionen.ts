import type { GlobalConfig } from 'payload'

import { loggedIn } from '@/access'
import { revalidateGlobalAfterChange } from '@/hooks/revalidate'

export const Konditionen: GlobalConfig = {
  slug: 'konditionen',
  label: 'Konditionen (Preise)',
  admin: {
    group: 'Garten',
    description: 'Einzige Quelle für alle Preise. Sie erscheinen überall, wo der Baustein «Preistabelle» eingebunden ist.',
  },
  access: { read: () => true, update: loggedIn },
  hooks: { afterChange: [revalidateGlobalAfterChange] },
  fields: [
    {
      name: 'pachtarten',
      type: 'array',
      label: 'Pachtarten',
      labels: { singular: 'Pachtart', plural: 'Pachtarten' },
      fields: [
        { name: 'name', type: 'text', label: 'Bezeichnung', required: true, admin: { description: 'Z. B. «Parzelle klein».' } },
        {
          type: 'row',
          fields: [
            { name: 'from', type: 'number', label: 'Jahrespacht von (CHF)', required: true, min: 0 },
            {
              name: 'to',
              type: 'number',
              label: 'Jahrespacht bis (CHF)',
              min: 0,
              admin: { description: 'Leer lassen, wenn es nur einen Preis gibt.' },
            },
          ],
        },
        { name: 'note', type: 'text', label: 'Bemerkung', admin: { description: 'Optional, z. B. «inkl. Wasser».' } },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'entryFee', type: 'number', label: 'Aufnahmegebühr (CHF)', min: 0 },
        { name: 'deposit', type: 'number', label: 'Kaution (CHF)', min: 0 },
      ],
    },
    { name: 'note', type: 'textarea', label: 'Hinweistext', admin: { description: 'Erscheint unter der Preistabelle.' } },
    {
      name: 'isExample',
      type: 'checkbox',
      label: 'Preise sind nur Beispielwerte',
      defaultValue: true,
      admin: {
        description:
          'Solange angekreuzt, steht bei den Preisen «Beispiel – vom Verein zu bestätigen». Haken entfernen, sobald die Preise geprüft sind.',
      },
    },
  ],
}
