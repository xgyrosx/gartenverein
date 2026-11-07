import type { CollectionConfig } from 'payload'

import { loggedIn, publishedOrLoggedIn } from '@/access'
import { revalidateAfterChange, revalidateAfterDelete } from '@/hooks/revalidate'

export const angebotTypen = [
  { label: 'Parzelle mit Haus zur Miete', value: 'parzelle-miete' },
  { label: 'Haus zum Kauf', value: 'haus-kauf' },
  { label: 'Gemeinschaftsgarten', value: 'gemeinschaftsgarten' },
]

export const angebotStatus = [
  { label: 'Verfügbar', value: 'verfuegbar' },
  { label: 'Nur Warteliste', value: 'warteliste' },
  { label: 'Ausgebucht', value: 'ausgebucht' },
]

export const Gartenangebote: CollectionConfig = {
  slug: 'gartenangebote',
  labels: { singular: 'Gartenangebot', plural: 'Gartenangebote' },
  admin: {
    useAsTitle: 'title',
    listSearchableFields: ['title'],
    defaultColumns: ['title', 'type', 'status', 'area', 'updatedAt'],
    group: 'Garten',
    description: 'Freie und belegte Gärten bzw. Häuser. Wird auf der Seite «Garten pachten» angezeigt.',
  },
  hooks: { afterChange: [revalidateAfterChange], afterDelete: [revalidateAfterDelete] },
  access: {
    read: publishedOrLoggedIn,
    create: loggedIn,
    update: loggedIn,
    delete: loggedIn,
  },
  versions: { drafts: true, maxPerDoc: 5 },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Bezeichnung',
      required: true,
      admin: { description: 'Z. B. «Parzelle 12 mit Gartenhaus».' },
    },
    { name: 'type', type: 'select', label: 'Art', required: true, options: angebotTypen, defaultValue: 'parzelle-miete' },
    {
      name: 'status',
      type: 'select',
      // Eigener Name nötig: «enum_gartenangebote_status» ist bei Postgres schon für den Entwurf-Status belegt.
      enumName: 'enum_gartenangebote_verfuegbarkeit',
      label: 'Status',
      required: true,
      options: angebotStatus,
      defaultValue: 'verfuegbar',
      admin: { description: 'Der Status wird auf der Website immer als Text angezeigt.' },
    },
    {
      name: 'area',
      type: 'number',
      label: 'Fläche (m²)',
      min: 0,
      admin: { description: 'Optional.' },
    },
    {
      name: 'areal',
      type: 'relationship',
      relationTo: 'areale',
      label: 'Areal',
      admin: { description: 'Optional. Auf welchem Areal liegt das Angebot?' },
    },
    { name: 'hinweis', type: 'textarea', label: 'Hinweis', admin: { description: 'Optional, z. B. «Besichtigung nach Absprache».' } },
  ],
}
