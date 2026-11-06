import type { CollectionConfig } from 'payload'

import { revalidateAfterChange, revalidateAfterDelete } from '@/hooks/revalidate'
import { isAdmin, loggedIn, publishedOrLoggedIn } from '@/access'
import { BildText } from '@/blocks/BildText'
import { Hero } from '@/blocks/Hero'
import { Hinweisbox } from '@/blocks/Hinweisbox'
import { NaechsteTermine } from '@/blocks/NaechsteTermine'
import { NeueNews } from '@/blocks/NeueNews'
import { Text } from '@/blocks/Text'
import { slugField } from '@/fields/slug'

export const Seiten: CollectionConfig = {
  slug: 'seiten',
  labels: { singular: 'Seite', plural: 'Seiten' },
  admin: {
    useAsTitle: 'title',
    listSearchableFields: ['title', 'slug'],
    preview: (doc) =>
      doc?.slug ? `/next/preview?path=${encodeURIComponent(doc.slug === 'start' ? '/' : `/${doc.slug}`)}` : null,
    defaultColumns: ['title', 'slug', '_status', 'updatedAt'],
    group: 'Inhalte',
    description: 'Die Seiten der Website, aufgebaut aus Bausteinen.',
  },
  hooks: { afterChange: [revalidateAfterChange], afterDelete: [revalidateAfterDelete] },
  access: {
    read: publishedOrLoggedIn,
    create: loggedIn,
    update: loggedIn,
    delete: isAdmin,
  },
  versions: { drafts: true, maxPerDoc: 20 },
  fields: [
    { name: 'title', type: 'text', label: 'Titel', required: true },
    slugField(
      'Teil der Internetadresse, z. B. «ueber-uns» ergibt /ueber-uns. Wird aus dem Titel erzeugt, wenn leer. Die Startseite hat die Adresse «start».',
    ),
    {
      name: 'layout',
      type: 'blocks',
      label: 'Inhalt',
      blocks: [Hero, Text, BildText, Hinweisbox, NeueNews, NaechsteTermine],
      admin: { description: 'Bausteine hinzufügen und mit dem Ziehgriff in die richtige Reihenfolge bringen.' },
    },
  ],
}
