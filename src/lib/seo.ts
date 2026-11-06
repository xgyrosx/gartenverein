import type { Metadata } from 'next'

import type { Media } from '@/payload-types'

type Seo = { title?: string | null; description?: string | null; image?: number | Media | null } | null | undefined

/** Metadaten aus den SEO-Feldern (Plugin) mit Rückfall auf Titel/Teaser. */
export function buildMetadata({
  seo,
  fallbackTitle,
  fallbackDescription,
  fallbackImage,
}: {
  seo: Seo
  fallbackTitle?: string
  fallbackDescription?: string | null
  fallbackImage?: number | Media | null
}): Metadata {
  const title = seo?.title || fallbackTitle
  const description = seo?.description || fallbackDescription || undefined
  const image = seo?.image ?? fallbackImage
  const imageUrl = image && typeof image === 'object' ? (image.sizes?.gross?.url ?? image.url) : undefined
  return {
    title,
    description,
    openGraph: { title, description, ...(imageUrl ? { images: [{ url: imageUrl }] } : {}) },
  }
}
