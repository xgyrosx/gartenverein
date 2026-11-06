import type { CollectionConfig } from 'payload'

import { loggedIn, publishedOrLoggedIn } from '@/access'
import { revalidateAfterChange, revalidateAfterDelete } from '@/hooks/revalidate'

export const dokumentKategorien = [
  { label: 'Formular', value: 'formular' },
  { label: 'Reglement', value: 'reglement' },
  { label: 'Information', value: 'information' },
]

export const Dokumente: CollectionConfig = {
  slug: 'dokumente',
  labels: { singular: 'Dokument', plural: 'Dokumente' },
  admin: {
    useAsTitle: 'title',
    listSearchableFields: ['title', 'filename'],
    defaultColumns: ['title', 'category', 'version', 'validUntil', '_status'],
    group: 'Garten',
    description: 'PDF-Dokumente zum Herunterladen: Formulare, Reglemente und Informationen.',
  },
  hooks: { afterChange: [revalidateAfterChange], afterDelete: [revalidateAfterDelete] },
  access: { read: publishedOrLoggedIn, create: loggedIn, update: loggedIn, delete: loggedIn },
  versions: { drafts: true, maxPerDoc: 5 },
  upload: {
    staticDir: 'documents',
    mimeTypes: ['application/pdf'],
  },
  fields: [
    { name: 'title', type: 'text', label: 'Titel', required: true, admin: { description: 'Z. B. «Gartenordnung».' } },
    { name: 'category', type: 'select', label: 'Kategorie', required: true, options: dokumentKategorien, defaultValue: 'information' },
    {
      name: 'version',
      type: 'text',
      label: 'Version / Stand',
      admin: { description: 'Z. B. «Stand März 2025».' },
    },
    {
      name: 'validUntil',
      type: 'date',
      label: 'Gültig bis',
      admin: {
        date: { pickerAppearance: 'dayOnly', displayFormat: 'dd.MM.yyyy' },
        description: 'Optional. Nach diesem Datum verschwindet das Dokument automatisch aus den Listen.',
      },
    },
  ],
}
