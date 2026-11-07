import type { Metadata } from 'next'
import Link from 'next/link'

import { monatsOptionen } from '@/collections/Ratgeber'
import { kategorieLabel, RatgeberRaster } from '@/components/gartenwissen/RatgeberKarte'
import { Img } from '@/components/Img'
import { RichText } from '@/components/RichText'
import { getPublishedSlugs, getRatgeber } from '@/lib/content'
import { buildMetadata } from '@/lib/seo'
import type { Ratgeber } from '@/payload-types'
import { redirectOrNotFound } from '@/lib/redirects'

type Args = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return (await getPublishedSlugs('ratgeber')).map((r) => ({ slug: r.slug }))
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params
  const r = await getRatgeber(slug)
  if (!r) return redirectOrNotFound(`/gartenwissen/${slug}`)
  return buildMetadata({ path: `/gartenwissen/${slug}`, seo: r.meta, fallbackTitle: r.title, fallbackDescription: r.teaser, fallbackImage: r.image })
}

export default async function RatgeberDetail({ params }: Args) {
  const { slug } = await params
  const r = await getRatgeber(slug)
  if (!r) return redirectOrNotFound(`/gartenwissen/${slug}`)
  const months = (r.months ?? []).map((m) => monatsOptionen.find((o) => o.value === m)?.label).filter(Boolean)
  const related = (r.related ?? []).filter((x): x is Ratgeber => typeof x === 'object')
  return (
    <article className="mx-auto max-w-content px-4 py-12">
      <p>
        <Link className="text-brand-800 underline hover:text-brand-950" href="/gartenwissen">
          ← Gartenwissen
        </Link>
      </p>
      <p className="mt-6 text-muted-foreground">
        <Link className="underline" href={`/gartenwissen/kategorie/${r.category}`}>
          {kategorieLabel(r.category)}
        </Link>
        {months.length > 0 && <span> · Passt zu: {months.join(', ')}</span>}
      </p>
      <h1 className="mt-1 text-4xl font-bold text-brand-900">{r.title}</h1>
      <p className="mt-4 text-xl leading-relaxed">{r.teaser}</p>
      <Img media={r.image} size="gross" priority sizes="(min-width: 768px) 768px, 100vw" className="mt-6 h-auto w-full rounded-lg" />
      <RichText data={r.content} className="mt-8" />
      {related.length > 0 && (
        <section className="mt-12">
          <h2 className="mb-4 text-2xl font-bold text-brand-900">Weiterlesen</h2>
          <RatgeberRaster items={related} />
        </section>
      )}
    </article>
  )
}
