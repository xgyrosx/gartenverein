import config from '@payload-config'
import { getPayload } from 'payload'

import type { News, Termine } from '@/payload-types'

/** News und Termine werden immer mit den Rechten des Besuchers gelesen (nur Veröffentlichtes). */
export async function getNewsList(limit = 20): Promise<News[]> {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'news',
    sort: '-publishedAt',
    limit,
    depth: 1,
    draft: false,
    pagination: false,
    overrideAccess: false,
  })
  return docs
}

export async function getNews(slug: string): Promise<News | null> {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'news',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 2,
    draft: false,
    pagination: false,
    overrideAccess: false,
  })
  return docs[0] ?? null
}

export async function getUpcomingTermine(limit = 50): Promise<Termine[]> {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'termine',
    where: { startDate: { greater_than_equal: new Date().toISOString() } },
    sort: 'startDate',
    limit,
    depth: 1,
    draft: false,
    pagination: false,
    overrideAccess: false,
  })
  return docs
}
