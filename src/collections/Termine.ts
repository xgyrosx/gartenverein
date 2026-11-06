import type { CollectionConfig } from 'payload'

import { revalidateAfterChange, revalidateAfterDelete } from '@/hooks/revalidate'
import { loggedIn, publishedOrLoggedIn } from '@/access'

export const Termine: CollectionConfig = {
  slug: 'termine',
  labels: { singular: 'Termin', plural: 'Termine' },
  admin: {
    useAsTitle: 'title',
    listSearchableFields: ['title', 'location'],
    defaultColumns: ['title', 'startDate', 'location', '_status'],
    group: 'Inhalte',
    description: 'Veranstaltungen und Arbeitseinsätze. Auf der Website erscheinen nur kommende Termine.',
  },
  hooks: { afterChange: [revalidateAfterChange], afterDelete: [revalidateAfterDelete] },
  access: {
    read: publishedOrLoggedIn,
    create: loggedIn,
    update: loggedIn,
    delete: loggedIn,
  },
  versions: { drafts: true, maxPerDoc: 10 },
  defaultSort: 'startDate',
  fields: [
    { name: 'title', type: 'text', label: 'Titel', required: true },
    {
      name: 'startDate',
      type: 'date',
      label: 'Datum und Zeit',
      required: true,
      admin: {
        date: { pickerAppearance: 'dayAndTime', displayFormat: 'dd.MM.yyyy HH:mm', timeIntervals: 15 },
        description: 'Beginn des Termins.',
      },
    },
    {
      name: 'location',
      type: 'text',
      label: 'Ort',
      admin: { description: 'Z. B. «Vereinshaus» oder «Parzelle 12».' },
    },
    {
      name: 'description',
      type: 'richText',
      label: 'Beschreibung',
      admin: { description: 'Optional. Was passiert, was mitbringen?' },
    },
  ],
}
