import type { BlockOf } from '@/components/blocks/types'
import { getVereinsdaten } from '@/lib/globals'

export async function KontaktBlock({ block }: { block: BlockOf<'kontakt'> }) {
  const v = await getVereinsdaten()
  const ort = [v.zip, v.city].filter(Boolean).join(' ')
  return (
    <section className="mx-auto max-w-content px-4 py-8">
      {block.title && <h2 className="text-2xl font-bold text-brand-900">{block.title}</h2>}
      <address className="mt-4 space-y-1 not-italic">
        <div className="font-bold">{v.name}</div>
        {v.street && <div>{v.street}</div>}
        {ort && <div>{ort}</div>}
        {v.email && (
          <div>
            E-Mail: <a className="text-brand-800 underline" href={`mailto:${v.email}`}>{v.email}</a>
          </div>
        )}
        {v.phone && (
          <div>
            Telefon: <a className="text-brand-800 underline" href={`tel:${v.phone.replace(/[^+\d]/g, '')}`}>{v.phone}</a>
          </div>
        )}
      </address>
    </section>
  )
}
