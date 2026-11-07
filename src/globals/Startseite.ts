import type { Field, GlobalConfig } from 'payload'

import { loggedIn } from '@/access'
import { linkFields, targetFields } from '@/fields/link'
import { revalidateGlobalAfterChange } from '@/hooks/revalidate'
import { iconOptions } from '@/lib/icons'

const linkGroup = (name: string, label: string, description?: string): Field => ({
  name,
  type: 'group',
  label,
  admin: { description },
  fields: linkFields,
})

const cardRows = (name: string, label: string, description: string): Field => ({
  name,
  type: 'array',
  label,
  labels: { singular: 'Karte', plural: 'Karten' },
  minRows: 4,
  maxRows: 4,
  admin: { description, initCollapsed: true },
  fields: [
    { name: 'icon', type: 'select', label: 'Icon', required: true, options: [...iconOptions], defaultValue: 'sprout' },
    { name: 'title', type: 'text', label: 'Titel', required: true },
    { name: 'text', type: 'textarea', label: 'Kurztext', maxLength: 140 },
    ...targetFields,
  ],
})

export const Startseite: GlobalConfig = {
  slug: 'startseite',
  label: 'Startseite',
  admin: {
    group: 'Einstellungen',
    description: 'Texte, Bild und Links der Startseite. Beiträge und Termine erscheinen automatisch.',
  },
  access: { read: () => true, update: loggedIn },
  hooks: { afterChange: [revalidateGlobalAfterChange] },
  fields: [
    {
      name: 'utilitySlogan',
      type: 'text',
      label: 'Slogan in der Leiste ganz oben',
      maxLength: 80,
      admin: { description: 'Kurzer Satz in der grünen Leiste oben auf jeder Seite.' },
    },
    {
      type: 'collapsible',
      label: 'Hero (Kopfbereich)',
      fields: [
        { name: 'heroTitle', type: 'text', label: 'Titel', admin: { description: 'Die grosse Überschrift der Startseite.' } },
        { name: 'heroIntro', type: 'textarea', label: 'Einleitung', maxLength: 240 },
        {
          name: 'heroImage',
          type: 'upload',
          relationTo: 'media',
          label: 'Foto',
          admin: { description: 'Querformat. Der Alt-Text wird beim Bild gepflegt (Pflichtfeld).' },
        },
        linkGroup('heroPrimary', 'Hauptschaltfläche', 'Z. B. «Garten anfragen».'),
        linkGroup('heroSecondary', 'Zweite Schaltfläche', 'Z. B. «Termine ansehen».'),
      ],
    },
    {
      type: 'collapsible',
      label: 'Schnellzugriff (4 Karten)',
      fields: [cardRows('quickLinks', 'Karten', 'Genau 4 Karten: z. B. Garten pachten, Termine, Formulare, Hütten.')],
    },
    {
      type: 'collapsible',
      label: 'Rund ums Gärtnern (4 Karten)',
      fields: [
        { name: 'gardenTitle', type: 'text', label: 'Überschrift', admin: { description: 'Leer = «Rund ums Gärtnern».' } },
        cardRows('gardenLinks', 'Karten', 'Genau 4 Karten: z. B. Gut zu wissen, Tiere im Garten, Bildergalerie, Inserate.'),
      ],
    },
    {
      type: 'collapsible',
      label: 'Mitmachen (grünes Band)',
      fields: [
        { name: 'joinTitle', type: 'text', label: 'Titel' },
        { name: 'joinText', type: 'textarea', label: 'Text', maxLength: 240 },
        linkGroup('joinPrimary', 'Hauptschaltfläche'),
        linkGroup('joinSecondary', 'Zweite Schaltfläche'),
      ],
    },
  ],
}
