import type { Block } from 'payload'

import { dokumentKategorien } from '@/collections/Dokumente'

export const Dokumentenliste: Block = {
  slug: 'dokumentenliste',
  labels: { singular: 'Dokumentenliste (Downloads)', plural: 'Dokumentenlisten' },
  fields: [
    { name: 'title', type: 'text', label: 'Überschrift', defaultValue: 'Dokumente' },
    {
      name: 'category',
      type: 'select',
      label: 'Nur diese Kategorie',
      options: dokumentKategorien,
      admin: { description: 'Leer lassen, um alle Dokumente nach Kategorie geordnet zu zeigen.' },
    },
  ],
}
