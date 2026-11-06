import type { CollectionConfig } from 'payload'

import { revalidateAfterChange, revalidateAfterDelete } from '@/hooks/revalidate'
import { loggedIn, publishedOrLoggedIn } from '@/access'
import { slugField } from '@/fields/slug'

export const News: CollectionConfig = {
  slug: 'news',
  labels: { singular: 'News-Beitrag', plural: 'News' },
  admin: {
    useAsTitle: 'title',
    listSearchableFields: ['title', 'slug'],
    preview: (doc) => (doc?.slug ? `/next/preview?path=${encodeURIComponent(`/news/${doc.slug}`)}` : null),
    defaultColumns: ['title', 'publishedAt', '_status', 'updatedAt'],
    group: 'Inhalte',
    description: 'Neuigkeiten aus dem Verein.',
  },
  hooks: { afterChange: [revalidateAfterChange], afterDelete: [revalidateAfterDelete] },
  access: {
    read: publishedOrLoggedIn,
    create: loggedIn,
    update: loggedIn,
    delete: loggedIn,
  },
  versions: { drafts: true, maxPerDoc: 20 },
  defaultSort: '-publishedAt',
  fields: [
    { name: 'title', type: 'text', label: 'Titel', required: true },
    slugField('Teil der Internetadresse, z. B. «sommerfest» ergibt /news/sommerfest. Wird aus dem Titel erzeugt, wenn leer.'),
    {
      name: 'publishedAt',
      type: 'date',
      label: 'Datum',
      required: true,
      defaultValue: () => new Date().toISOString(),
      admin: {
        position: 'sidebar',
        date: { pickerAppearance: 'dayOnly', displayFormat: 'dd.MM.yyyy' },
        description: 'Datum, das bei der Meldung angezeigt wird. News werden nach diesem Datum sortiert.',
      },
    },
    {
      name: 'teaser',
      type: 'textarea',
      label: 'Teaser',
      required: true,
      maxLength: 300,
      admin: { description: 'Ein bis zwei Sätze für die Übersicht (max. 300 Zeichen).' },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Titelbild',
      admin: { description: 'Optional.' },
    },
    {
      name: 'imageCaption',
      type: 'text',
      label: 'Bildunterschrift / Bildnachweis',
      admin: { description: 'Optional, z. B. «Foto: Vorname Nachname».' },
    },
    { name: 'content', type: 'richText', label: 'Inhalt', required: true },
  ],
}
