import type { CollectionConfig } from 'payload'

import { revalidateAfterChange, revalidateAfterDelete } from '@/hooks/revalidate'
import { loggedIn } from '@/access'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: { singular: 'Bild', plural: 'Bilder' },
  admin: {
    useAsTitle: 'alt',
    listSearchableFields: ['alt', 'filename'],
    defaultColumns: ['filename', 'alt', 'updatedAt'],
    group: 'Inhalte',
    description: 'Hochgeladene Bilder. Zu jedem Bild gehört ein Alt-Text.',
  },
  hooks: { afterChange: [revalidateAfterChange], afterDelete: [revalidateAfterDelete] },
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
    {
      name: 'credit',
      type: 'text',
      label: 'Bildnachweis',
      admin: { description: 'Optional, z. B. «Foto: Vorname Nachname». Wird in der Galerie angezeigt.' },
    },
  ],
  upload: {
    // Originale werden beim Hochladen auf maximal 2000 px Breite verkleinert (nie vergrössert).
    resizeOptions: { width: 2000, fit: 'inside', withoutEnlargement: true },
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
