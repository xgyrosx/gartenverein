import type { Block } from 'payload'

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
  ],
}
