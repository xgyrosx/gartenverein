import type { Block } from 'payload'

export const Text: Block = {
  slug: 'text',
  labels: { singular: 'Text', plural: 'Texte' },
  fields: [
    {
      name: 'content',
      type: 'richText',
      label: 'Text',
      required: true,
      admin: { description: 'Überschriften, Listen und Links sind über die Werkzeugleiste möglich.' },
    },
  ],
}
