import Link from 'next/link'

import type { BlockOf } from '@/components/blocks/types'
import { RatgeberRaster } from '@/components/gartenwissen/RatgeberKarte'
import { getRatgeberList } from '@/lib/content'
import { currentMonth, monthNames } from '@/lib/format'

/** Zeigt Ratgeber-Artikel, die zum aktuellen Monat passen. */
export async function DiesenMonatBlock({ block }: { block: BlockOf<'diesenMonat'> }) {
  const month = currentMonth()
  const items = await getRatgeberList({ month, limit: block.count })
  return (
    <section className="mx-auto max-w-page px-4 py-8">
      <h2 className="text-2xl font-bold text-brand-900">
        {block.title || 'Diesen Monat im Garten'} <span className="text-muted-foreground">({monthNames[month - 1]})</span>
      </h2>
      <div className="mt-4">
        <RatgeberRaster items={items} empty="Für diesen Monat sind noch keine Tipps erfasst." />
      </div>
      <p className="mt-4">
        <Link className="font-medium text-brand-800 underline hover:text-brand-950" href="/gartenwissen/gartenjahr">
          Das ganze Gartenjahr ansehen
        </Link>
      </p>
    </section>
  )
}
