import Link from 'next/link'

import { ImagePlaceholder } from '@/components/home/ImagePlaceholder'
import { Img } from '@/components/Img'
import { newsKategorien } from '@/collections/News'
import { formatDate } from '@/lib/format'
import type { News } from '@/payload-types'

/** Beitrag: Bild (190 px), Kategorie und Datum, Titel, Teaser. Die ganze Karte ist ein Link (Titel). */
export function PostCard({ post }: { post: News }) {
  const category = newsKategorien.find((k) => k.value === post.category)?.label
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-card border border-line bg-paper transition-shadow focus-within:ring-2 focus-within:ring-forest hover:shadow-hover">
      <div className="relative h-[190px] shrink-0 overflow-hidden bg-sage-200">
        {typeof post.image === 'object' && post.image ? (
          <Img media={post.image} fill size="karte" sizes="(min-width: 1280px) 25vw, (min-width: 640px) 45vw, 100vw" className="object-cover" />
        ) : (
          <ImagePlaceholder label="Kein Titelbild" />
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-[13px] font-semibold text-forest">
          {category && <span>{category} · </span>}
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
        </p>
        <h3 className="mt-2 font-display text-[21px] font-semibold leading-tight text-ink">
          <Link href={`/news/${post.slug}`} className="after:absolute after:inset-0 focus-visible:outline-none">
            {post.title}
          </Link>
        </h3>
        <p className="mt-2 text-[15px] leading-normal text-ink-soft">{post.teaser}</p>
      </div>
    </article>
  )
}
