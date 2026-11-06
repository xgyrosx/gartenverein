import type { CollectionConfig } from 'payload'

import { loggedIn, publishedOrLoggedIn } from '@/access'
import { slugField } from '@/fields/slug'
import { revalidateAfterChange, revalidateAfterDelete } from '@/hooks/revalidate'
import { monthNames } from '@/lib/format'

export const ratgeberKategorien = [
  { label: 'Boden & Düngen', value: 'boden-duengen' },
  { label: 'Pflanzen & Ernte', value: 'pflanzen-ernte' },
  { label: 'Unkraut', value: 'unkraut' },
  { label: 'Tiere & Insekten', value: 'tiere-insekten' },
  { label: 'Beeren', value: 'beeren' },
  { label: 'Allgemein', value: 'allgemein' },
]

export const monatsOptionen = monthNames.map((label, i) => ({ label, value: String(i + 1) }))

export const Ratgeber: CollectionConfig = {
  slug: 'ratgeber',
  labels: { singular: 'Ratgeber-Artikel', plural: 'Ratgeber' },
  admin: {
    useAsTitle: 'title',
    listSearchableFields: ['title', 'slug'],
    preview: (doc) => (doc?.slug ? `/next/preview?path=${encodeURIComponent(`/gartenwissen/${doc.slug}`)}` : null),
    defaultColumns: ['title', 'category', 'months', '_status', 'updatedAt'],
    group: 'Gartenwissen',
    description: 'Tipps und Anleitungen rund um den Garten.',
  },
  hooks: { afterChange: [revalidateAfterChange], afterDelete: [revalidateAfterDelete] },
  access: { read: publishedOrLoggedIn, create: loggedIn, update: loggedIn, delete: loggedIn },
  versions: { drafts: true, maxPerDoc: 10 },
  defaultSort: 'title',
  fields: [
    { name: 'title', type: 'text', label: 'Titel', required: true },
    slugField('Teil der Internetadresse, z. B. «tomaten-giessen» ergibt /gartenwissen/tomaten-giessen. Wird aus dem Titel erzeugt, wenn leer.'),
    {
      name: 'category',
      type: 'select',
      label: 'Kategorie',
      required: true,
      defaultValue: 'allgemein',
      options: ratgeberKategorien,
      admin: { position: 'sidebar' },
    },
    {
      name: 'months',
      type: 'select',
      hasMany: true,
      label: 'Passende Monate',
      options: monatsOptionen,
      admin: {
        position: 'sidebar',
        description: 'Optional. In diesen Monaten erscheint der Artikel im «Gartenjahr» und auf der Startseite unter «Diesen Monat im Garten».',
      },
    },
    {
      name: 'teaser',
      type: 'textarea',
      label: 'Teaser',
      required: true,
      maxLength: 300,
      admin: { description: '1–2 Sätze für Übersicht und Suche (max. 300 Zeichen).' },
    },
    { name: 'image', type: 'upload', relationTo: 'media', label: 'Teaserbild', admin: { description: 'Optional.' } },
    { name: 'content', type: 'richText', label: 'Inhalt', required: true },
    {
      name: 'related',
      type: 'relationship',
      relationTo: 'ratgeber',
      hasMany: true,
      label: 'Verwandte Artikel',
      filterOptions: ({ id }) => (id ? { id: { not_equals: id } } : true),
      admin: { description: 'Optional. Werden unter dem Artikel als Weiterlesen-Tipp angezeigt.' },
    },
  ],
}
