import config from '@payload-config'
import { getPayload } from 'payload'

import { getDraftContext } from '@/lib/draft'
import type { Seiten } from '@/payload-types'

/** Lädt eine Seite. Öffentlich nur Veröffentlichtes; im Vorschau-Modus (angemeldet) auch der Entwurf. */
export async function getPage(slug: string): Promise<Seiten | null> {
  const payload = await getPayload({ config })
  const { draft, user } = await getDraftContext()
  const { docs } = await payload.find({
    collection: 'seiten',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 2,
    draft,
    user,
    pagination: false,
    overrideAccess: false,
  })
  return docs[0] ?? null
}
