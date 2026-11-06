import type { Block } from 'payload'

export const Hinweisbox: Block = {
  slug: 'hinweisbox',
  labels: { singular: 'Hinweisbox', plural: 'Hinweisboxen' },
  fields: [
    {
      name: 'variant',
      type: 'select',
      label: 'Farbe',
      required: true,
      defaultValue: 'info',
      options: [
        { label: 'Information (grün)', value: 'info' },
        { label: 'Hinweis (gelb)', value: 'hinweis' },
        { label: 'Wichtig (rot)', value: 'wichtig' },
      ],
      admin: { description: 'Wichtig nur sparsam einsetzen, z. B. für Absagen oder Änderungen.' },
    },
    { name: 'title', type: 'text', label: 'Titel', admin: { description: 'Optional.' } },
    { name: 'content', type: 'richText', label: 'Text', required: true },
  ],
}
