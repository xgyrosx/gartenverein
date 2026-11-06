import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'

import { PageView } from '@/components/PageView'
import { getPublishedSlugs } from '@/lib/content'
import { getPage } from '@/lib/getPage'
import { buildMetadata } from '@/lib/seo'


type Args = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const pages = await getPublishedSlugs('seiten')
  return pages.filter((p) => p.slug !== 'start').map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params
  const page = await getPage(slug)
  if (!page) return { title: 'Seite nicht gefunden' }
  return buildMetadata({ seo: page.meta, fallbackTitle: page.title })
}

export default async function Page({ params }: Args) {
  const { slug } = await params
  if (slug === 'start') redirect('/')
  const page = await getPage(slug)
  if (!page) notFound()
  return <PageView page={page} />
}
