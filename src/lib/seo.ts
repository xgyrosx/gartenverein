import type { Metadata } from 'next'

import type { Media } from '@/payload-types'

type Seo = { title?: string | null; description?: string | null; image?: number | Media | null } | null | undefined

/** Metadaten aus den SEO-Feldern (Plugin) mit Rückfall auf Titel/Teaser. Nicht gesetzte Werte werden weggelassen. */
export function buildMetadata({
  seo,
  fallbackTitle,
  fallbackDescription,
  fallbackImage,
  path,
}: {
  seo: Seo
  fallbackTitle?: string
  fallbackDescription?: string | null
  fallbackImage?: number | Media | null
  /** Pfad der Seite (z. B. «/news/sommerfest»), für die kanonische Adresse */
  path?: string
}): Metadata {
  const title = seo?.title || fallbackTitle
  const description = seo?.description || fallbackDescription || undefined
  const image = seo?.image ?? fallbackImage
  const imageUrl = image && typeof image === 'object' ? (image.sizes?.gross?.url ?? image.url) : undefined
  return {
    ...(title ? { title } : {}),
    ...(description ? { description } : {}),
    ...(path ? { alternates: { canonical: path } } : {}),
    openGraph: {
      ...(title ? { title } : {}),
      ...(description ? { description } : {}),
      type: 'website',
      locale: 'de_CH',
      ...(path ? { url: path } : {}),
      ...(imageUrl ? { images: [{ url: imageUrl }] } : {}),
    },
  }
}
