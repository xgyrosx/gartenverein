import type { Block } from 'payload'

import { angebotTypen } from '@/collections/Gartenangebote'

export const Angebotsliste: Block = {
  slug: 'angebotsliste',
  labels: { singular: 'Angebotsliste (Gartenangebote)', plural: 'Angebotslisten' },
  fields: [
    { name: 'title', type: 'text', label: 'Überschrift', defaultValue: 'Aktuelle Angebote' },
    {
      name: 'type',
      type: 'select',
      label: 'Nur diese Art zeigen',
      options: angebotTypen,
      admin: { description: 'Leer lassen, um alle Angebote zu zeigen.' },
    },
  ],
}
