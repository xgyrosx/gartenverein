import Link from 'next/link'

import { ratgeberKategorien } from '@/collections/Ratgeber'
import { Img } from '@/components/Img'
import type { Ratgeber } from '@/payload-types'

export const kategorieLabel = (v: string) => ratgeberKategorien.find((k) => k.value === v)?.label ?? v

export function RatgeberKarte({ r }: { r: Ratgeber }) {
  return (
    <article className="relative flex h-full flex-col overflow-hidden rounded-lg border bg-card focus-within:ring-2 focus-within:ring-ring hover:shadow-md">
      <Img media={r.image} size="karte" sizes="(min-width: 768px) 33vw, 100vw" className="aspect-[16/9] w-full object-cover" />
      <div className="flex flex-1 flex-col p-5">
        <p className="text-sm font-medium text-muted-foreground">{kategorieLabel(r.category)}</p>
        <h3 className="mt-1 text-xl font-bold text-brand-900">
          <Link href={`/gartenwissen/${r.slug}`} className="after:absolute after:inset-0 focus-visible:outline-none">
            {r.title}
          </Link>
        </h3>
        <p className="mt-2 flex-1 leading-relaxed">{r.teaser}</p>
      </div>
    </article>
  )
}

export function RatgeberRaster({ items, empty = 'Keine Artikel gefunden.' }: { items: Ratgeber[]; empty?: string }) {
  if (items.length === 0) return <p className="text-lg">{empty}</p>
  return (
    <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {items.map((r) => (
        <li key={r.id}>
          <RatgeberKarte r={r} />
        </li>
      ))}
    </ul>
  )
}
