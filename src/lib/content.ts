import config from '@payload-config'
import { getPayload, type Where } from 'payload'

import { getDraftContext } from '@/lib/draft'
import type { Areale, Dokumente, Ratgeber, Gartenangebote, News, Personen, Termine } from '@/payload-types'

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

export async function getUpcomingTermine(limit = 100, category?: Termine['category'] | null): Promise<Termine[]> {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'termine',
    where: {
      startDate: { greater_than_equal: new Date().toISOString() },
      ...(category ? { category: { equals: category } } : {}),
    },
    sort: 'startDate',
    limit,
    depth: 1,
    draft: false,
    pagination: false,
    overrideAccess: false,
  })
  return docs
}

/** Vergangene Termine eines Jahres (neueste zuerst). */
export async function getPastTermine(year: number): Promise<Termine[]> {
  const payload = await getPayload({ config })
  const now = new Date().toISOString()
  const yearEnd = new Date(Date.UTC(year + 1, 0, 1)).toISOString()
  const { docs } = await payload.find({
    collection: 'termine',
    where: {
      and: [
        { startDate: { less_than: now } },
        { startDate: { greater_than_equal: new Date(Date.UTC(year, 0, 1)).toISOString() } },
        { startDate: { less_than: yearEnd } },
      ],
    },
    sort: '-startDate',
    limit: 500,
    depth: 1,
    draft: false,
    pagination: false,
    overrideAccess: false,
  })
  return docs
}

/** Jahre, in denen es vergangene Termine gibt (neueste zuerst). */
export async function getTerminJahre(): Promise<number[]> {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'termine',
    where: { startDate: { less_than: new Date().toISOString() } },
    limit: 2000,
    depth: 0,
    draft: false,
    pagination: false,
    overrideAccess: false,
    select: { startDate: true },
  })
  const years = new Set(docs.map((d) => new Date(d.startDate).getUTCFullYear()))
  return [...years].sort((x, y) => y - x)
}

export async function getTermin(slug: string): Promise<Termine | null> {
  const payload = await getPayload({ config })
  const { draft, user } = await getDraftContext()
  const { docs } = await payload.find({
    collection: 'termine',
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

export const NEWS_PAGE_SIZE = 9

export async function getNewsPage(page: number) {
  const payload = await getPayload({ config })
  const res = await payload.find({
    collection: 'news',
    sort: '-publishedAt',
    page,
    limit: NEWS_PAGE_SIZE,
    depth: 1,
    draft: false,
    overrideAccess: false,
  })
  return { docs: res.docs, totalPages: res.totalPages, page: res.page ?? page }
}

/** Adressen aller veröffentlichten Seiten bzw. News (für statische Generierung und Sitemap). */
export async function getPublishedSlugs(collection: 'seiten' | 'news' | 'areale' | 'termine' | 'ratgeber'): Promise<{ slug: string; updatedAt: string }[]> {
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

export async function getAngebote(type?: Gartenangebote['type'] | null): Promise<Gartenangebote[]> {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'gartenangebote',
    where: type ? { type: { equals: type } } : undefined,
    sort: 'title',
    limit: 100,
    depth: 1,
    draft: false,
    pagination: false,
    overrideAccess: false,
  })
  return docs
}

export async function getPersonen(group?: Personen['group'] | null): Promise<Personen[]> {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'personen',
    where: group ? { group: { equals: group } } : undefined,
    sort: ['sort', 'name'],
    limit: 200,
    depth: 1,
    draft: false,
    pagination: false,
    overrideAccess: false,
  })
  return docs
}

export async function getAreale(): Promise<Areale[]> {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'areale',
    sort: 'name',
    limit: 100,
    depth: 1,
    draft: false,
    pagination: false,
    overrideAccess: false,
  })
  return docs
}

export async function getAreal(slug: string): Promise<Areale | null> {
  const payload = await getPayload({ config })
  const { draft, user } = await getDraftContext()
  const { docs } = await payload.find({
    collection: 'areale',
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

export async function getDokumente(category?: Dokumente['category'] | null): Promise<Dokumente[]> {
  const payload = await getPayload({ config })
  const today = new Date().toISOString().slice(0, 10)
  const { docs } = await payload.find({
    collection: 'dokumente',
    where: {
      and: [
        ...(category ? [{ category: { equals: category } }] : []),
        { or: [{ validUntil: { exists: false } }, { validUntil: { greater_than_equal: today } }] },
      ],
    },
    sort: 'title',
    limit: 200,
    depth: 0,
    draft: false,
    pagination: false,
    overrideAccess: false,
  })
  return docs
}

export async function getRatgeberList(opts: { category?: Ratgeber['category'] | null; month?: number | null; limit?: number } = {}): Promise<Ratgeber[]> {
  const payload = await getPayload({ config })
  const and: Where[] = [
    ...(opts.category ? [{ category: { equals: opts.category } }] : []),
    ...(opts.month ? [{ months: { in: [String(opts.month)] } }] : []),
  ]
  const { docs } = await payload.find({
    collection: 'ratgeber',
    where: and.length ? { and } : undefined,
    sort: 'title',
    limit: opts.limit ?? 200,
    depth: 1,
    draft: false,
    pagination: false,
    overrideAccess: false,
  })
  return docs
}

export async function getRatgeber(slug: string): Promise<Ratgeber | null> {
  const payload = await getPayload({ config })
  const { draft, user } = await getDraftContext()
  const { docs } = await payload.find({
    collection: 'ratgeber',
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
