import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'

import { PageView } from '@/components/PageView'
import { getPage } from '@/lib/getPage'

export const dynamic = 'force-dynamic'

type Args = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params
  const page = await getPage(slug)
  return { title: page ? page.title : 'Seite nicht gefunden' }
}

export default async function Page({ params }: Args) {
  const { slug } = await params
  if (slug === 'start') redirect('/')
  const page = await getPage(slug)
  if (!page) notFound()
  return <PageView page={page} />
}
