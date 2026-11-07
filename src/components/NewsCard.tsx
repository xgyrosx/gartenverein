import Link from 'next/link'

import { Img } from '@/components/Img'
import { formatDate } from '@/lib/format'
import type { News } from '@/payload-types'

export function NewsCard({ news, headingLevel = 3 }: { news: News; headingLevel?: 2 | 3 }) {
  const Heading = headingLevel === 2 ? 'h2' : 'h3'
  return (
    <article className="flex flex-col overflow-hidden rounded-lg border border-earth-200 bg-white">
      <Img media={news.image} size="karte" sizes="(min-width: 768px) 33vw, 100vw" className="aspect-[16/9] w-full object-cover" />
      <div className="flex flex-1 flex-col p-5">
        <time className="text-sm text-earth-700" dateTime={news.publishedAt}>
          {formatDate(news.publishedAt)}
        </time>
        <Heading className="mt-1 text-xl font-bold text-brand-900">
          <Link className="hover:underline" href={`/news/${news.slug}`}>
            {news.title}
          </Link>
        </Heading>
        <p className="mt-2 flex-1 leading-relaxed">{news.teaser}</p>
        <Link className="mt-4 font-medium text-brand-800 underline hover:text-brand-950" href={`/news/${news.slug}`}>
          Weiterlesen<span className="sr-only">: {news.title}</span>
        </Link>
      </div>
    </article>
  )
}
