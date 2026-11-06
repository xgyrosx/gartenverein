import type { BlockOf } from '@/components/blocks/types'
import { currentMonth, monthNames } from '@/lib/format'

/** Platzhalter – wird in R10 mit den Ratgeber-Artikeln des Monats befüllt. */
export function DiesenMonatBlock({ block }: { block: BlockOf<'diesenMonat'> }) {
  return (
    <section className="mx-auto max-w-page px-4 py-8">
      <h2 className="text-2xl font-bold text-brand-900">
        {block.title || 'Diesen Monat im Garten'} <span className="text-muted-foreground">({monthNames[currentMonth() - 1]})</span>
      </h2>
      <p className="mt-2">Tipps für den Garten folgen demnächst.</p>
    </section>
  )
}
