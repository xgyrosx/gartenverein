import type { CollectionConfig } from 'payload'

import { loggedIn, publishedOrLoggedIn } from '@/access'
import { slugField } from '@/fields/slug'
import { revalidateAfterChange, revalidateAfterDelete } from '@/hooks/revalidate'

export const Areale: CollectionConfig = {
  slug: 'areale',
  labels: { singular: 'Areal', plural: 'Areale' },
  admin: {
    useAsTitle: 'name',
    listSearchableFields: ['name', 'slug'],
    preview: (doc) => (doc?.slug ? `/next/preview?path=${encodeURIComponent(`/areale/${doc.slug}`)}` : null),
    defaultColumns: ['name', 'city', '_status', 'updatedAt'],
    group: 'Verein',
    description: 'Die Gartenareale des Vereins. Jedes Areal hat eine eigene Seite unter «Areale».',
  },
  hooks: { afterChange: [revalidateAfterChange], afterDelete: [revalidateAfterDelete] },
  access: { read: publishedOrLoggedIn, create: loggedIn, update: loggedIn, delete: loggedIn },
  versions: { drafts: true, maxPerDoc: 10 },
  defaultSort: 'name',
  fields: [
    { name: 'name', type: 'text', label: 'Name', required: true },
    slugField('Teil der Internetadresse, z. B. «hangweg» ergibt /areale/hangweg. Wird aus dem Namen erzeugt, wenn leer.', 'name'),
    { name: 'summary', type: 'textarea', label: 'Kurzbeschrieb', required: true, maxLength: 300, admin: { description: '1–2 Sätze für die Übersicht.' } },
    {
      type: 'row',
      fields: [
        { name: 'street', type: 'text', label: 'Strasse und Nr.' },
        { name: 'zip', type: 'text', label: 'PLZ', admin: { width: '25%' } },
        { name: 'city', type: 'text', label: 'Ort' },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'latitude', type: 'number', label: 'Breitengrad', admin: { description: 'Optional, z. B. 47.4231' } },
        { name: 'longitude', type: 'number', label: 'Längengrad', admin: { description: 'Optional, z. B. 8.5042' } },
      ],
    },
    {
      name: 'images',
      type: 'upload',
      relationTo: 'media',
      hasMany: true,
      label: 'Bilder',
      admin: { description: 'Optional. Mehrere Bilder auswählbar.' },
    },
    { name: 'parking', type: 'textarea', label: 'Parkplätze', admin: { description: 'Hinweise zu Parkplätzen und Zufahrt.' } },
    { name: 'content', type: 'richText', label: 'Weitere Informationen', admin: { description: 'Optional.' } },
  ],
}
