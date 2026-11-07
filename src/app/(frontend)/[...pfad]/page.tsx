import type { Metadata } from 'next'

import { PageView } from '@/components/PageView'
import { getPublishedSlugs } from '@/lib/content'
import { getPage } from '@/lib/getPage'
import { redirect } from 'next/navigation'
import { redirectOrNotFound } from '@/lib/redirects'
import { buildMetadata } from '@/lib/seo'
import { describeLayout } from '@/lib/seo-defaults'

// Fängt alle Adressen ab, die keine feste Route haben: /<slug> zeigt eine Seite,
// alles andere (z. B. alte Adressen mit mehreren Teilen) prüft die Weiterleitungen.
type Args = { params: Promise<{ pfad: string[] }> }

export async function generateStaticParams() {
  const pages = await getPublishedSlugs('seiten')
  return pages.filter((p) => p.slug !== 'start').map((p) => ({ pfad: [p.slug] }))
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { pfad } = await params
  const path = `/${pfad.join('/')}`
  if (pfad.length !== 1) return redirectOrNotFound(path)
  const page = await getPage(pfad[0])
  if (!page) return redirectOrNotFound(path)
  return buildMetadata({ seo: page.meta, fallbackTitle: page.title, fallbackDescription: describeLayout(page.layout), path })
}

export default async function Page({ params }: Args) {
  const { pfad } = await params
  const path = `/${pfad.join('/')}`
  if (pfad.length !== 1) return redirectOrNotFound(path)
  if (pfad[0] === 'start') redirect('/')
  const page = await getPage(pfad[0])
  if (!page) return redirectOrNotFound(path)
  return <PageView page={page} />
}
