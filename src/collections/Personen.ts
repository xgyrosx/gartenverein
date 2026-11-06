import type { CollectionConfig } from 'payload'

import { loggedIn, publishedOrLoggedIn } from '@/access'
import { revalidateAfterChange, revalidateAfterDelete } from '@/hooks/revalidate'

export const personenGruppen = [
  { label: 'Vorstand', value: 'vorstand' },
  { label: 'Ansprechperson', value: 'ansprechperson' },
  { label: 'Ehrenmitglied', value: 'ehrenmitglied' },
]

export const Personen: CollectionConfig = {
  slug: 'personen',
  labels: { singular: 'Person', plural: 'Personen' },
  admin: {
    useAsTitle: 'name',
    listSearchableFields: ['name', 'role'],
    defaultColumns: ['name', 'role', 'group', 'sort'],
    group: 'Verein',
    description: 'Vorstand, Ansprechpersonen und Ehrenmitglieder. Erscheinen im Baustein «Personenraster».',
  },
  hooks: { afterChange: [revalidateAfterChange], afterDelete: [revalidateAfterDelete] },
  access: { read: publishedOrLoggedIn, create: loggedIn, update: loggedIn, delete: loggedIn },
  versions: { drafts: true, maxPerDoc: 5 },
  defaultSort: 'sort',
  fields: [
    { name: 'name', type: 'text', label: 'Name', required: true },
    { name: 'role', type: 'text', label: 'Funktion', admin: { description: 'Z. B. «Präsidium» oder «Ansprechperson Areal 2».' } },
    { name: 'group', type: 'select', label: 'Gruppe', required: true, options: personenGruppen, defaultValue: 'vorstand' },
    { name: 'photo', type: 'upload', relationTo: 'media', label: 'Foto', admin: { description: 'Optional.' } },
    {
      name: 'contact',
      type: 'textarea',
      label: 'Kontaktangabe',
      admin: { description: 'Freitext, z. B. Telefon oder E-Mail. Nur angeben, was die Person veröffentlichen möchte.' },
    },
    {
      name: 'sort',
      type: 'number',
      label: 'Sortierung',
      defaultValue: 100,
      admin: { step: 1, description: 'Kleinere Zahlen erscheinen weiter vorne.' },
    },
  ],
}
