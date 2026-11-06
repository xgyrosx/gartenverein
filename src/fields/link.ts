import type { Field } from 'payload'

/** Wiederverwendbare Felder für einen Link: Beschriftung + Seite der Website oder andere Adresse. */
export const linkFields: Field[] = [
  { name: 'label', type: 'text', label: 'Beschriftung', required: true },
  {
    name: 'linkType',
    type: 'select',
    label: 'Verweis auf',
    required: true,
    defaultValue: 'seite',
    options: [
      { label: 'Seite der Website', value: 'seite' },
      { label: 'Andere Adresse', value: 'adresse' },
    ],
  },
  {
    name: 'page',
    type: 'relationship',
    relationTo: 'seiten',
    label: 'Seite',
    required: true,
    admin: { condition: (_, sibling) => sibling?.linkType === 'seite' },
  },
  {
    name: 'url',
    type: 'text',
    label: 'Adresse',
    required: true,
    admin: {
      condition: (_, sibling) => sibling?.linkType === 'adresse',
      description:
        'Externe Website (https://…) oder Bereich dieser Website, z. B. /news oder /termine.',
    },
    validate: (value: string | null | undefined) => {
      if (!value) return 'Bitte eine Adresse angeben.'
      if (!/^(https?:\/\/|\/|mailto:|tel:)/.test(value))
        return 'Die Adresse muss mit https://, / , mailto: oder tel: beginnen.'
      return true
    },
  },
]
