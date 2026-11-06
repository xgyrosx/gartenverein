import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { de } from '@payloadcms/translations/languages/de'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { News } from './collections/News'
import { Seiten } from './collections/Seiten'
import { Termine } from './collections/Termine'
import { Fusszeile } from './globals/Fusszeile'
import { Hinweisbanner } from './globals/Hinweisbanner'
import { Navigation } from './globals/Navigation'
import { Vereinsdaten } from './globals/Vereinsdaten'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Seiten, News, Termine, Media, Users],
  globals: [Navigation, Hinweisbanner, Fusszeile, Vereinsdaten],
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
    client: {
      url: process.env.DATABASE_URL || '',
    },
  }),
  sharp,
  plugins: [],
})
