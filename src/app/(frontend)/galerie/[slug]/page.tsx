import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { type GalerieBild, Lightbox } from '@/components/galerie/Lightbox'
import { getAlbum, getPublishedSlugs } from '@/lib/content'
import { formatDate } from '@/lib/format'
import type { Media } from '@/payload-types'

type Args = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return (await getPublishedSlugs('alben')).map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params
  const a = await getAlbum(slug)
  if (!a) notFound()
  return { title: a.title, description: a.description ?? undefined }
}

function toBild(m: Media): GalerieBild | null {
  const large = m.sizes?.gross?.url ?? m.url
  if (!large) return null
  return {
    id: m.id,
    alt: m.alt,
    credit: m.credit,
    thumb: m.sizes?.karte?.url ?? m.sizes?.thumbnail?.url ?? large,
    large,
    width: m.sizes?.gross?.width ?? m.width ?? 1600,
    height: m.sizes?.gross?.height ?? m.height ?? 1067,
  }
}

export default async function AlbumPage({ params }: Args) {
  const { slug } = await params
  const a = await getAlbum(slug)
  if (!a) notFound()
  const bilder = (Array.isArray(a.images) ? a.images : [])
    .filter((i): i is Media => typeof i === 'object')
    .map(toBild)
    .filter((b): b is GalerieBild => b !== null)
  return (
    <div className="mx-auto max-w-page px-4 py-12">
      <p>
        <Link className="text-brand-800 underline hover:text-brand-950" href="/galerie">
          ← Alle Alben
        </Link>
      </p>
      <h1 className="mt-6 text-4xl font-bold text-brand-900">{a.title}</h1>
      <p className="mt-2 text-muted-foreground">
        {a.date ? formatDate(a.date) : a.year} · {bilder.length} Bilder
      </p>
      {a.description && <p className="mt-4 max-w-content text-lg">{a.description}</p>}
      <p className="mt-4 text-sm text-muted-foreground">Bild anklicken für die Grossansicht. Mit den Pfeiltasten blättern, mit Esc schliessen.</p>
      <div className="mt-6">
        <Lightbox bilder={bilder} />
      </div>
    </div>
  )
}
