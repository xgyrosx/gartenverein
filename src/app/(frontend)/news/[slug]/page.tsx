import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { Img } from '@/components/Img'
import { RichText } from '@/components/RichText'
import { getNews } from '@/lib/content'
import { formatDate } from '@/lib/format'

export const dynamic = 'force-dynamic'

type Args = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params
  const news = await getNews(slug)
  return { title: news?.title ?? 'News nicht gefunden', description: news?.teaser }
}

export default async function NewsDetail({ params }: Args) {
  const { slug } = await params
  const news = await getNews(slug)
  if (!news) notFound()
  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <p>
        <Link className="text-brand-800 underline hover:text-brand-950" href="/news">
          ← Alle News
        </Link>
      </p>
      <time className="mt-6 block text-earth-700" dateTime={news.publishedAt}>
        {formatDate(news.publishedAt)}
      </time>
      <h1 className="mt-1 text-4xl font-bold text-brand-900">{news.title}</h1>
      <p className="mt-4 text-xl leading-relaxed">{news.teaser}</p>
      <Img media={news.image} size="gross" priority sizes="(min-width: 768px) 768px, 100vw" className="mt-6 h-auto w-full rounded-lg" />
      <RichText data={news.content} className="mt-8" />
    </article>
  )
}
