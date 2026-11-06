import type { Block } from 'payload'

import { terminKategorien } from '@/collections/Termine'

export const NaechsteTermine: Block = {
  slug: 'naechsteTermine',
  labels: { singular: 'Terminliste (kommende Termine)', plural: 'Terminlisten' },
  fields: [
    { name: 'title', type: 'text', label: 'Überschrift', defaultValue: 'Nächste Termine' },
    {
      name: 'count',
      type: 'number',
      label: 'Anzahl',
      required: true,
      defaultValue: 3,
      min: 1,
      max: 12,
      admin: { step: 1, description: 'Wie viele Termine angezeigt werden (1–12).' },
    },
    {
      name: 'category',
      type: 'select',
      label: 'Nur diese Kategorie',
      options: terminKategorien,
      admin: { description: 'Leer lassen, um alle Kategorien zu zeigen.' },
    },
  ],
}
