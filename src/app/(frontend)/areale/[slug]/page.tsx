import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { Img } from '@/components/Img'
import { RichText } from '@/components/RichText'
import { getAreal, getPublishedSlugs } from '@/lib/content'
import { osmLink } from '@/lib/osm'

type Args = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return (await getPublishedSlugs('areale')).map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params
  const a = await getAreal(slug)
  if (!a) notFound()
  return { title: a.name, description: a.summary }
}

export default async function ArealDetail({ params }: Args) {
  const { slug } = await params
  const a = await getAreal(slug)
  if (!a) notFound()
  const images = (Array.isArray(a.images) ? a.images : []).filter((i) => typeof i === 'object')
  const address = [a.street, [a.zip, a.city].filter(Boolean).join(' ')].filter(Boolean)
  return (
    <article className="mx-auto max-w-content px-4 py-12">
      <p>
        <Link className="text-brand-800 underline hover:text-brand-950" href="/areale">
          ← Alle Areale
        </Link>
      </p>
      <h1 className="mt-6 text-4xl font-bold text-brand-900">{a.name}</h1>
      <p className="mt-4 text-xl leading-relaxed">{a.summary}</p>

      <h2 className="mt-8 text-2xl font-bold text-brand-900">Adresse und Karte</h2>
      {address.length > 0 && (
        <address className="mt-2 not-italic">
          {address.map((line) => (
            <div key={line}>{line}</div>
          ))}
        </address>
      )}
      <p className="mt-3">
        <a className="font-medium text-brand-800 underline hover:text-brand-950" href={osmLink(a)} rel="noopener noreferrer" target="_blank">
          Route/Karte öffnen (OpenStreetMap)
          <span className="sr-only"> – öffnet in neuem Tab</span>
        </a>
      </p>

      {a.parking && (
        <>
          <h2 className="mt-8 text-2xl font-bold text-brand-900">Parkplätze</h2>
          <p className="mt-2 whitespace-pre-line">{a.parking}</p>
        </>
      )}

      {images.length > 0 && (
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {images.map((m) => (
            <li key={m.id}>
              <Img media={m} size="karte" sizes="(min-width: 640px) 50vw, 100vw" className="h-auto w-full rounded-lg" />
            </li>
          ))}
        </ul>
      )}

      {a.content && <RichText data={a.content} className="mt-8" />}
    </article>
  )
}
