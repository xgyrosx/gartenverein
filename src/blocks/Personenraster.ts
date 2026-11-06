import type { Block } from 'payload'

import { personenGruppen } from '@/collections/Personen'

export const Personenraster: Block = {
  slug: 'personenraster',
  labels: { singular: 'Personenraster', plural: 'Personenraster' },
  fields: [
    { name: 'title', type: 'text', label: 'Überschrift', admin: { description: 'Optional.' } },
    {
      name: 'group',
      type: 'select',
      label: 'Nur diese Gruppe zeigen',
      options: personenGruppen,
      admin: { description: 'Leer lassen, um alle Gruppen nach Gruppe geordnet zu zeigen.' },
    },
  ],
}
