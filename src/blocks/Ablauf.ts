import type { Block } from 'payload'

export const Ablauf: Block = {
  slug: 'ablauf',
  labels: { singular: 'Ablauf (nummerierte Schritte)', plural: 'Abläufe' },
  fields: [
    { name: 'title', type: 'text', label: 'Überschrift', defaultValue: 'So funktioniert es' },
    {
      name: 'steps',
      type: 'array',
      label: 'Schritte',
      labels: { singular: 'Schritt', plural: 'Schritte' },
      minRows: 1,
      maxRows: 10,
      admin: { description: 'Die Schritte werden automatisch nummeriert.' },
      fields: [
        { name: 'title', type: 'text', label: 'Titel', required: true },
        { name: 'text', type: 'textarea', label: 'Beschreibung' },
      ],
    },
  ],
}
