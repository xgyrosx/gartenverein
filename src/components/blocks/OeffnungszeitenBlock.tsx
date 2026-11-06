import { wochentage } from '@/globals/Oeffnungszeiten'
import type { BlockOf } from '@/components/blocks/types'
import { formatDate } from '@/lib/format'
import { getOeffnungszeiten } from '@/lib/globals'

export async function OeffnungszeitenBlock({ block }: { block: BlockOf<'oeffnungszeiten'> }) {
  const o = await getOeffnungszeiten()
  const today = new Date().toISOString().slice(0, 10)
  const exceptions = (o.exceptions ?? [])
    .filter((e) => e.date.slice(0, 10) >= today)
    .sort((a, b) => a.date.localeCompare(b.date))
  const time = (from?: string | null, to?: string | null) => (from && to ? `${from} – ${to} Uhr` : from ? `ab ${from} Uhr` : 'geöffnet')

  return (
    <section className="mx-auto max-w-content px-4 py-8">
      {block.title && <h2 className="text-2xl font-bold text-brand-900">{block.title}</h2>}
      <table className="mt-4 w-full border-collapse text-left">
        <caption className="sr-only">Reguläre Öffnungszeiten nach Wochentag</caption>
        <thead className="sr-only">
          <tr>
            <th scope="col">Wochentag</th>
            <th scope="col">Zeiten</th>
          </tr>
        </thead>
        <tbody>
          {wochentage.map((d) => {
            const entries = (o.regular ?? []).filter((r) => r.day === d.value)
            return (
              <tr key={d.value} className="border-b border-border">
                <th scope="row" className="w-40 py-2 font-medium">{d.label}</th>
                <td className="py-2">
                  {entries.length === 0
                    ? <span className="text-muted-foreground">Geschlossen</span>
                    : entries.map((e, i) => (
                        <div key={e.id ?? i}>
                          {time(e.from, e.to)}
                          {e.note && <span className="text-muted-foreground"> · {e.note}</span>}
                        </div>
                      ))}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      {exceptions.length > 0 && (
        <div className="mt-6">
          <h3 className="text-xl font-bold">Ausnahmen</h3>
          <ul className="mt-2 space-y-1">
            {exceptions.map((e, i) => (
              <li key={e.id ?? i}>
                <strong>{formatDate(e.date)}:</strong> {e.closed ? 'geschlossen' : time(e.from, e.to)}
                {e.note && <span> – {e.note}</span>}
              </li>
            ))}
          </ul>
        </div>
      )}
      {o.generalNote && <p className="mt-4 text-muted-foreground">{o.generalNote}</p>}
    </section>
  )
}
