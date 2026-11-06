import type { GlobalConfig } from 'payload'

import { loggedIn } from '@/access'

export const Vereinsdaten: GlobalConfig = {
  slug: 'vereinsdaten',
  label: 'Vereinsdaten',
  admin: { group: 'Einstellungen', description: 'Name, Adresse und Kontakt des Vereins. Wird in Kopf- und Fusszeile angezeigt.' },
  access: { read: () => true, update: loggedIn },
  fields: [
    { name: 'name', type: 'text', label: 'Name des Vereins', required: true, defaultValue: 'Gartenverein' },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: 'Logo',
      admin: { description: 'Optional. Solange kein Logo hochgeladen ist, zeigt die Website ein Platzhalter-Symbol.' },
    },
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
        { name: 'email', type: 'email', label: 'E-Mail' },
        { name: 'phone', type: 'text', label: 'Telefon', admin: { description: 'Z. B. +41 79 123 45 67' } },
      ],
    },
  ],
}
