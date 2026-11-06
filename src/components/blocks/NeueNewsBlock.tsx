import Link from 'next/link'

import { NewsCard } from '@/components/NewsCard'
import { getNewsList } from '@/lib/content'
import type { Seiten } from '@/payload-types'

type Block = Extract<NonNullable<Seiten['layout']>[number], { blockType: 'neueNews' }>

export async function NeueNewsBlock({ block }: { block: Block }) {
  const news = await getNewsList(block.count)
  if (news.length === 0) return null
  return (
    <section className="mx-auto max-w-5xl px-4 py-8">
      <h2 className="text-2xl font-bold text-brand-900">{block.title || 'Neueste News'}</h2>
      <div className="mt-4 grid gap-6 md:grid-cols-3">
        {news.map((n) => (
          <NewsCard key={n.id} news={n} />
        ))}
      </div>
      <p className="mt-4">
        <Link className="font-medium text-brand-800 underline hover:text-brand-950" href="/news">
          Alle News
        </Link>
      </p>
    </section>
  )
}
