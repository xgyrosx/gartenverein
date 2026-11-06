import Image from 'next/image'

import type { Media } from '@/payload-types'

type Props = {
  media: Media | number | null | undefined
  className?: string
  sizes?: string
  priority?: boolean
  fill?: boolean
}

/** Zeigt ein Bild aus der Media-Collection mit Alt-Text. */
export function Img({ media, className, sizes, priority, fill }: Props) {
  if (!media || typeof media !== 'object' || !media.url) return null
  const common = { alt: media.alt, className, sizes, priority, src: media.url }
  if (fill) return <Image {...common} fill />
  return <Image {...common} width={media.width ?? 1200} height={media.height ?? 800} />
}
