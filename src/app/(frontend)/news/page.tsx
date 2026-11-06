import type { Metadata } from 'next'

import { NewsCard } from '@/components/NewsCard'
import { getNewsList } from '@/lib/content'

export const metadata: Metadata = { title: 'News' }

export default async function NewsPage() {
  const news = await getNewsList()
  return (
    <div className="mx-auto max-w-page px-4 py-12">
      <h1 className="text-4xl font-bold text-brand-900">News</h1>
      {news.length === 0 ? (
        <p className="mt-6 text-lg">Noch keine News vorhanden.</p>
      ) : (
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {news.map((n) => (
            <NewsCard key={n.id} news={n} />
          ))}
        </div>
      )}
    </div>
  )
}
