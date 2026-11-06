import type { CollectionConfig } from 'payload'

import { loggedIn } from '@/access'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: { singular: 'Bild', plural: 'Bilder' },
  admin: {
    useAsTitle: 'alt',
    defaultColumns: ['filename', 'alt', 'updatedAt'],
    group: 'Inhalte',
    description: 'Hochgeladene Bilder. Zu jedem Bild gehört ein Alt-Text.',
  },
  access: {
    read: () => true,
    create: loggedIn,
    update: loggedIn,
    delete: loggedIn,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      label: 'Alt-Text',
      required: true,
      admin: {
        description:
          'Kurze Beschreibung des Bildes für Menschen, die es nicht sehen können (z. B. «Frau giesst Tomatenpflanzen im Gemeinschaftsgarten»).',
      },
    },
  ],
  upload: {
    mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/avif'],
    focalPoint: true,
    adminThumbnail: 'thumbnail',
    imageSizes: [
      { name: 'thumbnail', width: 400, height: 300, position: 'centre' },
      { name: 'karte', width: 800 },
      { name: 'gross', width: 1600 },
    ],
  },
}
