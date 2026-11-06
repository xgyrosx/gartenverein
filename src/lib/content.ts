import config from '@payload-config'
import { getPayload } from 'payload'

import { getDraftContext } from '@/lib/draft'
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
  const { draft, user } = await getDraftContext()
  const { docs } = await payload.find({
    collection: 'news',
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

/** Adressen aller veröffentlichten Seiten bzw. News (für statische Generierung und Sitemap). */
export async function getPublishedSlugs(collection: 'seiten' | 'news'): Promise<{ slug: string; updatedAt: string }[]> {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection,
    limit: 1000,
    depth: 0,
    draft: false,
    pagination: false,
    overrideAccess: false,
    select: { slug: true, updatedAt: true },
  })
  return docs.map((d) => ({ slug: d.slug, updatedAt: d.updatedAt }))
}
