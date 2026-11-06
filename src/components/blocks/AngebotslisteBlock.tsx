import type { BlockOf } from '@/components/blocks/types'
import { angebotStatus, angebotTypen } from '@/collections/Gartenangebote'
import { getAngebote } from '@/lib/content'

const label = (list: { label: string; value: string }[], value: string) => list.find((o) => o.value === value)?.label ?? value

const badgeStyle: Record<string, string> = {
  verfuegbar: 'border-brand-700 bg-brand-50 text-brand-950',
  warteliste: 'border-amber-600 bg-amber-50 text-amber-950',
  ausgebucht: 'border-earth-400 bg-earth-100 text-earth-900',
}

export async function AngebotslisteBlock({ block }: { block: BlockOf<'angebotsliste'> }) {
  const angebote = await getAngebote(block.type)
  return (
    <section className="mx-auto max-w-content px-4 py-8">
      {block.title && <h2 className="text-2xl font-bold text-brand-900">{block.title}</h2>}
      {angebote.length === 0 ? (
        <p className="mt-4">Zurzeit sind keine Angebote erfasst.</p>
      ) : (
        <ul className="mt-4 space-y-3">
          {angebote.map((a) => (
            <li key={a.id} className="rounded-lg border bg-card p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-lg font-bold">{a.title}</h3>
                <span className={`rounded-full border px-3 py-0.5 text-sm font-medium ${badgeStyle[a.status]}`}>
                  Status: {label(angebotStatus, a.status)}
                </span>
              </div>
              <p className="mt-1 text-muted-foreground">
                {label(angebotTypen, a.type)}
                {a.area ? ` · ${a.area} m²` : ''}
              </p>
              {a.hinweis && <p className="mt-2">{a.hinweis}</p>}
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
