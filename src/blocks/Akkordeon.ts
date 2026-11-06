import type { Block } from 'payload'

export const Akkordeon: Block = {
  slug: 'akkordeon',
  labels: { singular: 'Akkordeon (aufklappbare Themen)', plural: 'Akkordeons' },
  fields: [
    { name: 'title', type: 'text', label: 'Überschrift', admin: { description: 'Optional.' } },
    {
      name: 'items',
      type: 'array',
      label: 'Themen',
      labels: { singular: 'Thema', plural: 'Themen' },
      minRows: 1,
      admin: { description: 'Jedes Thema wird als aufklappbarer Abschnitt angezeigt (Frage/Antwort oder Thema/Text).' },
      fields: [
        { name: 'title', type: 'text', label: 'Thema / Frage', required: true },
        { name: 'content', type: 'richText', label: 'Text / Antwort', required: true },
      ],
    },
  ],
}
