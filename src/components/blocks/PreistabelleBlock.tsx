import type { BlockOf } from '@/components/blocks/types'
import { formatChf } from '@/lib/format'
import { getKonditionen } from '@/lib/globals'

export async function PreistabelleBlock({ block }: { block: BlockOf<'preistabelle'> }) {
  const k = await getKonditionen()
  const arten = k.pachtarten ?? []
  return (
    <section className="mx-auto max-w-content px-4 py-8">
      {block.title && <h2 className="text-2xl font-bold text-brand-900">{block.title}</h2>}
      {k.isExample && (
        <p className="mt-2 inline-block rounded bg-amber-100 px-2 py-1 text-sm font-medium text-amber-950">
          Beispiel – vom Verein zu bestätigen
        </p>
      )}
      {arten.length > 0 && (
        <div className="mt-4 overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <caption className="sr-only">Jahrespacht nach Pachtart</caption>
            <thead>
              <tr className="border-b-2 border-earth-300">
                <th scope="col" className="py-2 pr-4">Pachtart</th>
                <th scope="col" className="py-2">Jahrespacht</th>
              </tr>
            </thead>
            <tbody>
              {arten.map((a, i) => (
                <tr key={a.id ?? i} className="border-b border-border">
                  <th scope="row" className="py-3 pr-4 font-medium">
                    {a.name}
                    {a.note && <span className="block text-sm font-normal text-muted-foreground">{a.note}</span>}
                  </th>
                  <td className="py-3 whitespace-nowrap">
                    {a.to ? `${formatChf(a.from)} bis ${formatChf(a.to)}` : formatChf(a.from)}
                    <span className="text-muted-foreground"> pro Jahr</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {(k.entryFee != null || k.deposit != null) && (
        <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-6 gap-y-1">
          {k.entryFee != null && (
            <>
              <dt className="font-medium">Aufnahmegebühr</dt>
              <dd>{formatChf(k.entryFee)} (einmalig)</dd>
            </>
          )}
          {k.deposit != null && (
            <>
              <dt className="font-medium">Kaution</dt>
              <dd>{formatChf(k.deposit)}</dd>
            </>
          )}
        </dl>
      )}
      {k.note && <p className="mt-4 text-muted-foreground">{k.note}</p>}
    </section>
  )
}
