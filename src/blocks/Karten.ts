import type { Block, Field } from 'payload'

import { linkFields } from '@/fields/link'

export const Karten: Block = {
  slug: 'karten',
  labels: { singular: 'Karten (Info-Karten)', plural: 'Karten' },
  fields: [
    { name: 'title', type: 'text', label: 'Überschrift', admin: { description: 'Optional.' } },
    {
      name: 'cards',
      type: 'array',
      label: 'Karten',
      labels: { singular: 'Karte', plural: 'Karten' },
      minRows: 1,
      maxRows: 6,
      fields: [
        { name: 'title', type: 'text', label: 'Titel', required: true },
        { name: 'text', type: 'textarea', label: 'Text', maxLength: 300 },
        { ...linkFields[0], label: 'Beschriftung des Links', admin: { description: 'Z. B. «Mehr erfahren».' } } as Field,
        ...linkFields.slice(1),
      ],
    },
  ],
}
