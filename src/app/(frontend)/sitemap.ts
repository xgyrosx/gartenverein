import type { MetadataRoute } from 'next'

import { getPublishedSlugs } from '@/lib/content'
import { serverUrl } from '@/lib/url'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [pages, news] = await Promise.all([getPublishedSlugs('seiten'), getPublishedSlugs('news')])
  const entries: MetadataRoute.Sitemap = [
    { url: serverUrl, changeFrequency: 'weekly' },
    { url: `${serverUrl}/news`, changeFrequency: 'weekly' },
    { url: `${serverUrl}/termine`, changeFrequency: 'weekly' },
  ]
  for (const p of pages) {
    if (p.slug === 'start') continue
    entries.push({ url: `${serverUrl}/${p.slug}`, lastModified: p.updatedAt })
  }
  for (const n of news) {
    entries.push({ url: `${serverUrl}/news/${n.slug}`, lastModified: n.updatedAt })
  }
  return entries
}
