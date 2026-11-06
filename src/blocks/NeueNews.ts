import type { Block } from 'payload'

export const NeueNews: Block = {
  slug: 'neueNews',
  labels: { singular: 'Neueste News', plural: 'Neueste News' },
  fields: [
    { name: 'title', type: 'text', label: 'Überschrift', defaultValue: 'Neueste News' },
    {
      name: 'count',
      type: 'number',
      label: 'Anzahl',
      required: true,
      defaultValue: 3,
      min: 1,
      max: 12,
      admin: { step: 1, description: 'Wie viele Beiträge angezeigt werden (1–12).' },
    },
  ],
}
