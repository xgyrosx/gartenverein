import type { CollectionConfig } from 'payload'

import { loggedIn, publishedOrLoggedIn } from '@/access'
import { slugField } from '@/fields/slug'
import { revalidateAfterChange, revalidateAfterDelete } from '@/hooks/revalidate'

export const Alben: CollectionConfig = {
  slug: 'alben',
  labels: { singular: 'Album', plural: 'Alben' },
  admin: {
    useAsTitle: 'title',
    listSearchableFields: ['title', 'slug'],
    preview: (doc) => (doc?.slug ? `/next/preview?path=${encodeURIComponent(`/galerie/${doc.slug}`)}` : null),
    defaultColumns: ['title', 'year', '_status', 'updatedAt'],
    group: 'Inhalte',
    description: 'Fotoalben für die Galerie, z. B. «Sommerfest 2026».',
  },
  hooks: { afterChange: [revalidateAfterChange], afterDelete: [revalidateAfterDelete] },
  access: { read: publishedOrLoggedIn, create: loggedIn, update: loggedIn, delete: loggedIn },
  versions: { drafts: true, maxPerDoc: 10 },
  defaultSort: '-year',
  fields: [
    { name: 'title', type: 'text', label: 'Titel', required: true },
    slugField('Teil der Internetadresse, z. B. «sommerfest-2026» ergibt /galerie/sommerfest-2026. Wird aus dem Titel erzeugt, wenn leer.'),
    {
      type: 'row',
      fields: [
        {
          name: 'year',
          type: 'number',
          label: 'Jahr',
          required: true,
          defaultValue: () => new Date().getFullYear(),
          min: 1990,
          max: 2100,
          admin: { step: 1, description: 'Bestimmt, unter welchem Jahr das Album in der Galerie erscheint.' },
        },
        {
          name: 'date',
          type: 'date',
          label: 'Datum',
          admin: { date: { pickerAppearance: 'dayOnly', displayFormat: 'dd.MM.yyyy' }, description: 'Optional, z. B. Tag des Anlasses.' },
        },
      ],
    },
    { name: 'description', type: 'textarea', label: 'Beschreibung', admin: { description: 'Optional.' } },
    {
      name: 'images',
      type: 'upload',
      relationTo: 'media',
      hasMany: true,
      label: 'Bilder',
      required: true,
      admin: {
        description:
          'Mehrere Bilder auswählbar. Das erste Bild ist das Titelbild. Jedes Bild braucht einen Alt-Text; den Bildnachweis pflegen Sie beim Bild unter «Bilder».',
      },
    },
  ],
}
