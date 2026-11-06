import type { Block } from 'payload'

export const Preistabelle: Block = {
  slug: 'preistabelle',
  labels: { singular: 'Preistabelle (Pachtkosten)', plural: 'Preistabellen' },
  fields: [
    { name: 'title', type: 'text', label: 'Überschrift', defaultValue: 'Kosten' },
    {
      type: 'ui',
      name: 'hinweisKonditionen',
      admin: {
        components: {
          Field: '@/components/admin/KonditionenHinweis#KonditionenHinweis',
        },
      },
    },
  ],
}
