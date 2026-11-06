import type { Block } from 'payload'

export const NaechsteTermine: Block = {
  slug: 'naechsteTermine',
  labels: { singular: 'Nächste Termine', plural: 'Nächste Termine' },
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
  ],
}
