import Image from 'next/image'

import type { Media } from '@/payload-types'

type Props = {
  media: Media | number | null | undefined
  className?: string
  sizes?: string
  priority?: boolean
  fill?: boolean
  /** Vorgefertigte Bildgrösse (statt Original). */
  size?: 'thumbnail' | 'karte' | 'gross'
}

/** Zeigt ein Bild aus der Media-Collection mit Alt-Text. */
export function Img({ media, className, sizes, priority, fill, size }: Props) {
  if (!media || typeof media !== 'object' || !media.url) return null
  const variant = size ? media.sizes?.[size] : undefined
  const src = variant?.url ?? media.url
  const width = variant?.width ?? media.width ?? 1200
  const height = variant?.height ?? media.height ?? 800
  const common = { alt: media.alt, className, sizes, priority, src }
  if (fill) return <Image {...common} fill />
  return <Image {...common} width={width} height={height} />
}
