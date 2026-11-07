import type { MetadataRoute } from 'next'

import { ratgeberKategorien } from '@/collections/Ratgeber'
import { getAlben, getNewsPage, getPublishedSlugs, getTerminJahre } from '@/lib/content'
import { monthNames } from '@/lib/format'
import { serverUrl } from '@/lib/url'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [pages, news, termine, areale, ratgeber, alben, jahre, newsPage1] = await Promise.all([
    getPublishedSlugs('seiten'),
    getPublishedSlugs('news'),
    getPublishedSlugs('termine'),
    getPublishedSlugs('areale'),
    getPublishedSlugs('ratgeber'),
    getAlben(),
    getTerminJahre(),
    getNewsPage(1),
  ])
  const u = (path: string, lastModified?: string, changeFrequency?: 'weekly' | 'monthly' | 'yearly') => ({
    url: `${serverUrl}${path}`,
    ...(lastModified ? { lastModified } : {}),
    ...(changeFrequency ? { changeFrequency } : {}),
  })

  const entries: MetadataRoute.Sitemap = [
    u('', undefined, 'weekly'),
    u('/news', undefined, 'weekly'),
    u('/termine', undefined, 'weekly'),
    u('/termine/archiv', undefined, 'monthly'),
    u('/areale', undefined, 'monthly'),
    u('/gartenwissen', undefined, 'weekly'),
    u('/gartenwissen/gartenjahr', undefined, 'monthly'),
    u('/galerie', undefined, 'monthly'),
  ]
  for (let n = 2; n <= newsPage1.totalPages; n++) entries.push(u(`/news/seite/${n}`))
  for (const j of jahre) entries.push(u(`/termine/archiv/${j}`, undefined, 'yearly'))
  for (const k of ratgeberKategorien) entries.push(u(`/gartenwissen/kategorie/${k.value}`))
  monthNames.forEach((_, i) => entries.push(u(`/gartenwissen/gartenjahr/${i + 1}`)))
  for (const p of pages) if (p.slug !== 'start') entries.push(u(`/${p.slug}`, p.updatedAt))
  for (const n of news) entries.push(u(`/news/${n.slug}`, n.updatedAt))
  for (const t of termine) entries.push(u(`/termine/${t.slug}`, t.updatedAt))
  for (const a of areale) entries.push(u(`/areale/${a.slug}`, a.updatedAt))
  for (const r of ratgeber) entries.push(u(`/gartenwissen/${r.slug}`, r.updatedAt))
  for (const a of alben) entries.push(u(`/galerie/${a.slug}`, a.updatedAt))
  return entries
}
