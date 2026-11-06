import type { Block } from 'payload'

export const BildText: Block = {
  slug: 'bildText',
  labels: { singular: 'Bild und Text', plural: 'Bild und Text' },
  fields: [
    { name: 'image', type: 'upload', relationTo: 'media', label: 'Bild', required: true },
    {
      name: 'imagePosition',
      type: 'select',
      label: 'Position des Bildes',
      required: true,
      defaultValue: 'links',
      options: [
        { label: 'Links', value: 'links' },
        { label: 'Rechts', value: 'rechts' },
      ],
      admin: { description: 'Auf dem Handy steht das Bild immer über dem Text.' },
    },
    { name: 'content', type: 'richText', label: 'Text', required: true },
  ],
}
