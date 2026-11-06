import config from '@payload-config'
import { getPayload } from 'payload'

import type { Seiten } from '@/payload-types'

/** Lädt eine veröffentlichte Seite. Zugriffsregeln der Collection gelten (overrideAccess: false). */
export async function getPage(slug: string): Promise<Seiten | null> {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'seiten',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 2,
    draft: false,
    pagination: false,
    overrideAccess: false,
  })
  return docs[0] ?? null
}
