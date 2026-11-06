import { RichText } from '@/components/RichText'
import { formatDateTime } from '@/lib/format'
import type { Termine } from '@/payload-types'

export function TerminListe({ termine }: { termine: Termine[] }) {
  if (termine.length === 0) {
    return <p className="text-lg">Zurzeit sind keine kommenden Termine eingetragen.</p>
  }
  return (
    <ul className="space-y-4">
      {termine.map((t) => (
        <li key={t.id}>
          <article className="rounded-lg border border-earth-200 bg-white p-5">
            <h3 className="text-xl font-bold text-brand-900">{t.title}</h3>
            <p className="mt-1 text-earth-800">
              <time dateTime={t.startDate}>{formatDateTime(t.startDate)}</time>
              {t.location && <span> · {t.location}</span>}
            </p>
            {t.description && <RichText data={t.description} className="mt-3" />}
          </article>
        </li>
      ))}
    </ul>
  )
}
