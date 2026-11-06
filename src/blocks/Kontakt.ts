import type { Block } from 'payload'

export const Kontakt: Block = {
  slug: 'kontakt',
  labels: { singular: 'Kontaktdaten des Vereins', plural: 'Kontaktdaten' },
  fields: [
    { name: 'title', type: 'text', label: 'Überschrift', defaultValue: 'So erreichen Sie uns' },
    {
      type: 'ui',
      name: 'hinweisKontakt',
      admin: { components: { Field: '@/components/admin/KontaktHinweis#KontaktHinweis' } },
    },
  ],
}
