import type { Field, GlobalConfig } from 'payload'

import { loggedIn } from '@/access'
import { revalidateGlobalAfterChange } from '@/hooks/revalidate'

export const wochentage = [
  { label: 'Montag', value: 'mo' },
  { label: 'Dienstag', value: 'di' },
  { label: 'Mittwoch', value: 'mi' },
  { label: 'Donnerstag', value: 'do' },
  { label: 'Freitag', value: 'fr' },
  { label: 'Samstag', value: 'sa' },
  { label: 'Sonntag', value: 'so' },
]

const timeValidate = (value: string | null | undefined) =>
  !value || /^([01]\d|2[0-3]):[0-5]\d$/.test(value) ? true : 'Bitte die Uhrzeit so angeben: 09:00'

const timeRow = (openOnly = false): Field => ({
  type: 'row',
  fields: [
    {
      name: 'from',
      type: 'text',
      label: 'Von',
      validate: timeValidate,
      admin: { description: 'Format 09:00', ...(openOnly ? { condition: (_: unknown, s: { closed?: boolean }) => !s?.closed } : {}) },
    },
    {
      name: 'to',
      type: 'text',
      label: 'Bis',
      validate: timeValidate,
      admin: { description: 'Format 12:00', ...(openOnly ? { condition: (_: unknown, s: { closed?: boolean }) => !s?.closed } : {}) },
    },
  ],
})

export const Oeffnungszeiten: GlobalConfig = {
  slug: 'oeffnungszeiten',
  label: 'Öffnungszeiten Materialhütte',
  admin: {
    group: 'Verein',
    description: 'Einzige Quelle für die Öffnungszeiten. Erscheinen überall, wo der Baustein «Öffnungszeiten» steht.',
  },
  access: { read: () => true, update: loggedIn },
  hooks: { afterChange: [revalidateGlobalAfterChange] },
  fields: [
    {
      name: 'regular',
      type: 'array',
      label: 'Reguläre Zeiten',
      labels: { singular: 'Tag', plural: 'Tage' },
      admin: { description: 'Nur Tage eintragen, an denen die Hütte geöffnet ist. Alle anderen Tage gelten als geschlossen.' },
      fields: [
        { name: 'day', type: 'select', label: 'Wochentag', required: true, options: wochentage },
        timeRow(),
        { name: 'note', type: 'text', label: 'Bemerkung', admin: { description: 'Optional.' } },
      ],
    },
    {
      name: 'exceptions',
      type: 'array',
      label: 'Ausnahmen',
      labels: { singular: 'Ausnahme', plural: 'Ausnahmen' },
      admin: { description: 'Feiertage, Ferien oder Sonderöffnungen. Vergangene Ausnahmen verschwinden automatisch von der Website.' },
      fields: [
        { name: 'date', type: 'date', label: 'Datum', required: true, admin: { date: { pickerAppearance: 'dayOnly', displayFormat: 'dd.MM.yyyy' } } },
        { name: 'closed', type: 'checkbox', label: 'Geschlossen', defaultValue: true },
        timeRow(true),
        { name: 'note', type: 'text', label: 'Hinweis', admin: { description: 'Z. B. «Betriebsferien».' } },
      ],
    },
    { name: 'generalNote', type: 'textarea', label: 'Allgemeiner Hinweis', admin: { description: 'Optional, erscheint unter den Zeiten.' } },
  ],
}
