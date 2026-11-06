import type { FieldHook, TextField } from 'payload'

import { slugify } from '@/lib/slugify'

// Adressen, die von festen Bereichen der Website belegt sind
const RESERVED = ['admin', 'api', 'next', 'news', 'termine', 'areale', 'gartenwissen', 'galerie', 'sitemap', 'robots']

const slugFrom =
  (sourceField: string): FieldHook =>
  ({ value, data }) => {
    const source = typeof value === 'string' && value.trim() ? value : data?.[sourceField]
    return typeof source === 'string' ? slugify(source) : value
  }

/** Slug-Feld, das sich aus dem Titel füllt, wenn es leer ist. */
export const slugField = (description: string, sourceField = 'title'): TextField => ({
  name: 'slug',
  type: 'text',
  label: 'Adresse (Slug)',
  required: true,
  unique: true,
  index: true,
  hooks: { beforeValidate: [slugFrom(sourceField)] },
  validate: (value: string | null | undefined) => {
    if (!value) return 'Bitte eine Adresse angeben.'
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value))
      return 'Nur Kleinbuchstaben, Zahlen und Bindestriche erlaubt.'
    if (RESERVED.includes(value)) return 'Diese Adresse ist reserviert.'
    return true
  },
  admin: { position: 'sidebar', description },
})
