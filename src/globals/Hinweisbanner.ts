import type { GlobalConfig } from 'payload'

import { loggedIn } from '@/access'
import { linkFields } from '@/fields/link'

export const Hinweisbanner: GlobalConfig = {
  slug: 'hinweisbanner',
  label: 'Hinweisbanner',
  admin: {
    group: 'Einstellungen',
    description: 'Ein auffälliger Hinweis ganz oben auf jeder Seite, z. B. bei Änderungen oder Störungen.',
  },
  access: { read: () => true, update: loggedIn },
  fields: [
    {
      name: 'enabled',
      type: 'checkbox',
      label: 'Banner anzeigen',
      defaultValue: false,
      admin: { description: 'Schalter zum schnellen Ein- und Ausschalten.' },
    },
    {
      name: 'type',
      type: 'select',
      label: 'Art',
      required: true,
      defaultValue: 'info',
      options: [
        { label: 'Information', value: 'info' },
        { label: 'Warnung', value: 'warnung' },
      ],
    },
    { name: 'text', type: 'text', label: 'Text', maxLength: 200, admin: { description: 'Kurz halten (max. 200 Zeichen).' } },
    {
      type: 'row',
      fields: [
        {
          name: 'visibleFrom',
          type: 'date',
          label: 'Sichtbar von',
          admin: { date: { pickerAppearance: 'dayAndTime', displayFormat: 'dd.MM.yyyy HH:mm' }, description: 'Optional.' },
        },
        {
          name: 'visibleUntil',
          type: 'date',
          label: 'Sichtbar bis',
          admin: { date: { pickerAppearance: 'dayAndTime', displayFormat: 'dd.MM.yyyy HH:mm' }, description: 'Optional.' },
        },
      ],
    },
    { name: 'hasLink', type: 'checkbox', label: 'Link hinzufügen', defaultValue: false },
    {
      name: 'link',
      type: 'group',
      label: 'Link',
      admin: { condition: (data) => Boolean(data?.hasLink) },
      fields: linkFields,
    },
  ],
}
