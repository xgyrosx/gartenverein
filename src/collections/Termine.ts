import type { CollectionConfig, FieldHook } from 'payload'

import { loggedIn, publishedOrLoggedIn } from '@/access'
import { slugField } from '@/fields/slug'
import { revalidateAfterChange, revalidateAfterDelete } from '@/hooks/revalidate'
import { slugify } from '@/lib/slugify'

export const terminKategorien = [
  { label: 'Kurs', value: 'kurs' },
  { label: 'Anlass', value: 'anlass' },
  { label: 'Arbeitseinsatz', value: 'arbeitseinsatz' },
  { label: 'Betrieb', value: 'betrieb' },
]

// Adresse = Titel + Datum, damit wiederkehrende Termine (z. B. «Vorstandssitzung») eindeutig bleiben.
const terminSlug: FieldHook = ({ value, data }) => {
  if (typeof value === 'string' && value.trim()) return slugify(value)
  if (!data?.title) return value
  const datum = data.startDate ? new Date(data.startDate as string).toISOString().slice(0, 10) : ''
  return slugify(`${data.title} ${datum}`)
}

export const Termine: CollectionConfig = {
  slug: 'termine',
  labels: { singular: 'Termin', plural: 'Termine' },
  admin: {
    useAsTitle: 'title',
    listSearchableFields: ['title', 'location'],
    preview: (doc) => (doc?.slug ? `/next/preview?path=${encodeURIComponent(`/termine/${doc.slug}`)}` : null),
    defaultColumns: ['title', 'startDate', 'category', 'location', '_status'],
    group: 'Inhalte',
    description: 'Kurse, Anlässe und Arbeitseinsätze. Kommende Termine erscheinen auf der Website, vergangene im Archiv.',
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
      ...slugField('Teil der Internetadresse. Wird aus Titel und Datum erzeugt, wenn leer.'),
      hooks: { beforeValidate: [terminSlug] },
    },
    {
      name: 'category',
      type: 'select',
      label: 'Kategorie',
      required: true,
      defaultValue: 'anlass',
      options: terminKategorien,
      admin: { position: 'sidebar' },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'startDate',
          type: 'date',
          label: 'Beginn',
          required: true,
          admin: {
            date: { pickerAppearance: 'dayAndTime', displayFormat: 'dd.MM.yyyy HH:mm', timeIntervals: 15 },
            description: 'Datum und Uhrzeit des Beginns.',
          },
        },
        {
          name: 'endDate',
          type: 'date',
          label: 'Ende',
          admin: {
            date: { pickerAppearance: 'dayAndTime', displayFormat: 'dd.MM.yyyy HH:mm', timeIntervals: 15 },
            description: 'Optional.',
          },
          validate: (value: Date | string | null | undefined, { siblingData }: { siblingData?: { startDate?: string } }) => {
            if (!value || !siblingData?.startDate) return true
            return new Date(value) >= new Date(siblingData.startDate) ? true : 'Das Ende muss nach dem Beginn liegen.'
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'areal',
          type: 'relationship',
          relationTo: 'areale',
          label: 'Areal',
          admin: { description: 'Optional. Findet der Termin auf einem unserer Areale statt?' },
        },
        {
          name: 'location',
          type: 'text',
          label: 'Ort (falls kein Areal)',
          admin: { description: 'Z. B. «Vereinshaus» oder «Treffpunkt beim Eingang».' },
        },
      ],
    },
    {
      name: 'registrationRequired',
      type: 'checkbox',
      label: 'Anmeldung nötig',
      defaultValue: false,
    },
    {
      name: 'registrationText',
      type: 'textarea',
      label: 'Hinweis zur Anmeldung',
      admin: {
        condition: (_, s) => Boolean(s?.registrationRequired),
        description: 'Z. B. «Bitte bis 3 Tage vorher per E-Mail anmelden.»',
      },
    },
    {
      name: 'registrationUrl',
      type: 'text',
      label: 'Link zur Anmeldung',
      admin: { condition: (_, s) => Boolean(s?.registrationRequired), description: 'Optional, beginnt mit https://' },
      validate: (v: string | null | undefined) => (!v || /^https?:\/\//.test(v) ? true : 'Der Link muss mit https:// beginnen.'),
    },
    {
      name: 'attachment',
      type: 'upload',
      relationTo: 'dokumente',
      label: 'Dokument-Anhang',
      admin: { description: 'Optional, z. B. Programm oder Anmeldeformular. Zuerst unter «Dokumente» hochladen.' },
    },
    {
      name: 'description',
      type: 'richText',
      label: 'Beschreibung',
      admin: { description: 'Optional. Was passiert, was mitbringen?' },
    },
  ],
}
