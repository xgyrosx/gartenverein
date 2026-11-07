import type { Metadata } from 'next'

import { PageView } from '@/components/PageView'
import { getPage } from '@/lib/getPage'
import { buildMetadata } from '@/lib/seo'
import { describeLayout } from '@/lib/seo-defaults'

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage('start')
  const { title, ...rest } = buildMetadata({
    seo: page?.meta,
    fallbackDescription: page ? describeLayout(page.layout) : undefined,
    path: '/',
  })
  // Die Startseite zeigt nur den Vereinsnamen (bzw. den SEO-Titel) ohne Zusatz im Tab.
  return { ...rest, ...(typeof title === 'string' ? { title: { absolute: title } } : {}) }
}

export default async function HomePage() {
  const page = await getPage('start')
  if (!page) {
    return (
      <div className="mx-auto max-w-content px-4 py-16">
        <h1 className="text-3xl font-bold text-brand-900">Gartenverein</h1>
        <p className="mt-4 text-lg">
          Die Startseite ist noch nicht angelegt. Im Verwaltungsbereich unter «Seiten» eine Seite mit
          der Adresse «start» erstellen und veröffentlichen.
        </p>
      </div>
    )
  }
  return <PageView page={page} />
}
