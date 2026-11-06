import type { BlockOf } from '@/components/blocks/types'

export function TabelleBlock({ block }: { block: BlockOf<'tabelle'> }) {
  const rows = block.rows ?? []
  const showC = Boolean(block.col3)
  return (
    <section className="mx-auto max-w-content px-4 py-8">
      {block.title && <h2 className="text-2xl font-bold text-brand-900">{block.title}</h2>}
      <div className="mt-4 overflow-x-auto">
        <table className="w-full border-collapse text-left">
          {block.title && <caption className="sr-only">{block.title}</caption>}
          <thead>
            <tr className="border-b-2 border-earth-300">
              <th scope="col" className="py-2 pr-4">{block.col1 || 'Bezeichnung'}</th>
              <th scope="col" className="py-2 pr-4">{block.col2 || 'Wert'}</th>
              {showC && <th scope="col" className="py-2">{block.col3}</th>}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={r.id ?? i} className="border-b border-border">
                <th scope="row" className="py-3 pr-4 font-medium">{r.a}</th>
                <td className="py-3 pr-4">{r.b}</td>
                {showC && <td className="py-3">{r.c}</td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
