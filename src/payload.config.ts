import { de } from '@payloadcms/translations/languages/de'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { searchPlugin } from '@payloadcms/plugin-search'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { createDatabaseAdapter } from './db'
import { revalidateAfterChange, revalidateAfterDelete } from './hooks/revalidate'
import { lexicalToPlainText } from './lib/richtext'
import { defaultSeoImage, describeLayout, truncate } from './lib/seo-defaults'
import { Media } from './collections/Media'
import { Alben } from './collections/Alben'
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
  collections: [Seiten, News, Termine, Alben, Areale, Personen, Ratgeber, Gartenangebote, Dokumente, Media, Users],
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
  db: await createDatabaseAdapter(),
  sharp,
  plugins: [
    // Dateien (Bilder, PDFs) auf Vercel Blob – nur aktiv, wenn BLOB_READ_WRITE_TOKEN gesetzt ist, sonst lokaler Ordner.
    vercelBlobStorage({
      enabled: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
      // Öffentliche Dateien direkt vom Blob-CDN ausliefern (schneller, keine Funktionsaufrufe).
      collections: { media: { disablePayloadAccessControl: true }, dokumente: { disablePayloadAccessControl: true } },
      token: process.env.BLOB_READ_WRITE_TOKEN ?? '',
    }),
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
    // Suchmaschinen-Felder (Titel, Beschreibung, Vorschaubild) mit sinnvollen Vorschlägen aus dem Inhalt
    seoPlugin({
      collections: ['seiten', 'news', 'termine', 'areale', 'ratgeber'],
      uploadsCollection: 'media',
      generateTitle: ({ doc }) => {
        const d = doc as { title?: string; name?: string }
        return d.title ?? d.name ?? ''
      },
      generateDescription: ({ doc }) => {
        const d = doc as { teaser?: string; summary?: string; layout?: unknown; description?: unknown }
        return d.teaser ?? d.summary ?? (d.layout ? describeLayout(d.layout) : truncate(lexicalToPlainText(d.description)))
      },
      generateImage: ({ doc }) => defaultSeoImage(doc as Record<string, unknown>),
    }),
    // Weiterleitungen alter Adressen (siehe docs/redirects-alt-neu.csv)
    redirectsPlugin({
      collections: ['seiten', 'news', 'termine', 'areale', 'ratgeber'],
      overrides: {
        admin: { group: 'Einstellungen', description: 'Leitet alte Adressen auf neue Seiten um (z. B. von der früheren Website).' },
        hooks: { afterChange: [revalidateAfterChange], afterDelete: [revalidateAfterDelete] },
        fields: ({ defaultFields }) =>
          defaultFields.map((f) =>
            'name' in f && f.name === 'from'
              ? {
                  ...f,
                  hooks: {
                    // Immer klein geschrieben und ohne Schluss-Schrägstrich speichern, damit der Abgleich zuverlässig ist.
                    beforeValidate: [
                      ({ value }: { value?: unknown }) =>
                        typeof value === 'string' ? (value.trim().toLowerCase().replace(/^(?!\/|https?:)/, '/').replace(/(.)\/+$/, '$1')) : value,
                    ],
                  },
                }
              : f,
          ),
      },
    }),
  ],
})
