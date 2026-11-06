import type { CollectionConfig, FieldHook } from 'payload'

import { isAdmin, loggedIn, publishedOrLoggedIn } from '@/access'
import { BildText } from '@/blocks/BildText'
import { Hero } from '@/blocks/Hero'
import { Hinweisbox } from '@/blocks/Hinweisbox'
import { Text } from '@/blocks/Text'
import { slugify } from '@/lib/slugify'

const RESERVED = ['admin', 'api', 'next']

const slugFromTitle: FieldHook = ({ value, data }) => {
  const source = typeof value === 'string' && value.trim() ? value : data?.title
  return typeof source === 'string' ? slugify(source) : value
}

export const Seiten: CollectionConfig = {
  slug: 'seiten',
  labels: { singular: 'Seite', plural: 'Seiten' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', '_status', 'updatedAt'],
    group: 'Inhalte',
    description: 'Die Seiten der Website, aufgebaut aus Bausteinen.',
  },
  access: {
    read: publishedOrLoggedIn,
    create: loggedIn,
    update: loggedIn,
    delete: isAdmin,
  },
  versions: { drafts: true, maxPerDoc: 20 },
  fields: [
    { name: 'title', type: 'text', label: 'Titel', required: true },
    {
      name: 'slug',
      type: 'text',
      label: 'Adresse (Slug)',
      required: true,
      unique: true,
      index: true,
      hooks: { beforeValidate: [slugFromTitle] },
      validate: (value: string | null | undefined) => {
        if (!value) return 'Bitte eine Adresse angeben.'
        if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value))
          return 'Nur Kleinbuchstaben, Zahlen und Bindestriche erlaubt.'
        if (RESERVED.includes(value)) return 'Diese Adresse ist reserviert.'
        return true
      },
      admin: {
        position: 'sidebar',
        description:
          'Teil der Internetadresse, z. B. «ueber-uns» ergibt /ueber-uns. Wird aus dem Titel erzeugt, wenn leer. Die Startseite hat die Adresse «start».',
      },
    },
    {
      name: 'layout',
      type: 'blocks',
      label: 'Inhalt',
      blocks: [Hero, Text, BildText, Hinweisbox],
      admin: { description: 'Bausteine hinzufügen und mit dem Ziehgriff in die richtige Reihenfolge bringen.' },
    },
  ],
}
