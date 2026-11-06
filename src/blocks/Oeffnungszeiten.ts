import type { Block } from 'payload'

export const OeffnungszeitenBaustein: Block = {
  slug: 'oeffnungszeiten',
  labels: { singular: 'Öffnungszeiten', plural: 'Öffnungszeiten' },
  fields: [
    { name: 'title', type: 'text', label: 'Überschrift', defaultValue: 'Öffnungszeiten' },
    {
      type: 'ui',
      name: 'hinweisOeffnungszeiten',
      admin: { components: { Field: '@/components/admin/OeffnungszeitenHinweis#OeffnungszeitenHinweis' } },
    },
  ],
}
