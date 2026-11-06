import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'

import { NewsArchiv } from '@/components/NewsArchiv'
import { getNewsPage } from '@/lib/content'

type Args = { params: Promise<{ n: string }> }

export async function generateStaticParams() {
  const { totalPages } = await getNewsPage(1)
  return Array.from({ length: Math.max(0, totalPages - 1) }, (_, i) => ({ n: String(i + 2) }))
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { n } = await params
  return { title: `News – Seite ${n}` }
}

export default async function NewsSeite({ params }: Args) {
  const { n } = await params
  const page = Number(n)
  if (!Number.isInteger(page) || page < 1) notFound()
  if (page === 1) redirect('/news')
  const { totalPages } = await getNewsPage(page)
  if (page > totalPages) notFound()
  return <NewsArchiv page={page} />
}
