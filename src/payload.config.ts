import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { de } from '@payloadcms/translations/languages/de'
import { searchPlugin } from '@payloadcms/plugin-search'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Areale } from './collections/Areale'
import { Dokumente } from './collections/Dokumente'
import { Gartenangebote } from './collections/Gartenangebote'
import { News } from './collections/News'
import { Personen } from './collections/Personen'
import { Ratgeber } from './collections/Ratgeber'
import { Seiten } from './collections/Seiten'
import { Termine } from './collections/Termine'
import { Fusszeile } from './globals/Fusszeile'
import { Konditionen } from './globals/Konditionen'
import { Hinweisbanner } from './globals/Hinweisbanner'
import { Oeffnungszeiten } from './globals/Oeffnungszeiten'
import { Navigation } from './globals/Navigation'
import { Vereinsdaten } from './globals/Vereinsdaten'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: { titleSuffix: ' – Verwaltung' },
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Seiten, News, Termine, Areale, Personen, Ratgeber, Gartenangebote, Dokumente, Media, Users],
  globals: [Navigation, Hinweisbanner, Fusszeile, Vereinsdaten, Konditionen, Oeffnungszeiten],
  editor: lexicalEditor(),
  i18n: {
    supportedLanguages: { de },
    fallbackLanguage: 'de',
  },
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: sqliteAdapter({
    // Prototyp: Das Datenbankschema wird automatisch angelegt/angepasst (auch beim Build).
    // Vor dem Go-Live auf Migrationen umstellen (siehe docs/entwicklung.md).
    push: true,
    client: {
      url: process.env.DATABASE_URL || '',
    },
  }),
  sharp,
  plugins: [
    // Suche: nur veröffentlichte Ratgeber-Artikel und Seiten werden indexiert.
    searchPlugin({
      collections: ['ratgeber', 'seiten'],
      defaultPriorities: { ratgeber: 10, seiten: 20 },
      beforeSync: ({ originalDoc, searchDoc }) => {
        const doc = originalDoc as { title?: string; slug?: string; teaser?: string }
        const isRatgeber = searchDoc.doc.relationTo === 'ratgeber'
        return {
          ...searchDoc,
          title: doc.title ?? '',
          teaser: doc.teaser ?? '',
          path: isRatgeber ? `/gartenwissen/${doc.slug}` : doc.slug === 'start' ? '/' : `/${doc.slug}`,
        }
      },
      searchOverrides: {
        slug: 'suche',
        labels: { singular: 'Suchindex-Eintrag', plural: 'Suchindex' },
        admin: { group: 'Einstellungen', description: 'Wird automatisch gepflegt. Nur bei Problemen mit der Suche «Neu indexieren» verwenden.' },
        access: { read: () => true, create: () => false, update: () => false, delete: () => false },
        fields: ({ defaultFields }) => [
          ...defaultFields,
          { name: 'teaser', type: 'textarea', label: 'Teaser' },
          { name: 'path', type: 'text', label: 'Adresse' },
        ],
      },
    }),
    seoPlugin({
      collections: ['seiten', 'news', 'termine', 'areale', 'ratgeber'],
      uploadsCollection: 'media',
      generateTitle: ({ doc }) => (doc as { title?: string; name?: string }).title ?? (doc as { name?: string }).name ?? '',
      generateDescription: ({ doc }) => (doc as { teaser?: string; summary?: string }).teaser ?? (doc as { summary?: string }).summary ?? '',
    }),
  ],
})
