import type { Block } from 'payload'

export const DiesenMonat: Block = {
  slug: 'diesenMonat',
  labels: { singular: 'Diesen Monat im Garten', plural: 'Diesen Monat im Garten' },
  fields: [
    { name: 'title', type: 'text', label: 'Überschrift', defaultValue: 'Diesen Monat im Garten' },
    {
      name: 'count',
      type: 'number',
      label: 'Anzahl Artikel',
      required: true,
      defaultValue: 3,
      min: 1,
      max: 6,
      admin: { step: 1 },
    },
  ],
}
