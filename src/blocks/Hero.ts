import type { Block } from 'payload'

import { linkFields } from '@/fields/link'

export const Hero: Block = {
  slug: 'hero',
  labels: { singular: 'Hero (grosser Seitenkopf)', plural: 'Heros' },
  fields: [
    { name: 'title', type: 'text', label: 'Titel', required: true },
    {
      name: 'subtitle',
      type: 'text',
      label: 'Untertitel',
      admin: { description: 'Optional. Ein kurzer Satz unter dem Titel.' },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Hintergrundbild',
      admin: { description: 'Optional. Querformat funktioniert am besten.' },
    },
    {
      name: 'hasButton',
      type: 'checkbox',
      label: 'Button anzeigen',
      defaultValue: false,
    },
    {
      name: 'button',
      type: 'group',
      label: 'Button',
      admin: { condition: (_, sibling) => Boolean(sibling?.hasButton) },
      fields: linkFields,
    },
  ],
}
