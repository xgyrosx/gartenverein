import Link from 'next/link'

import { terminKategorien } from '@/collections/Termine'
import { formatMonthYear, formatRange } from '@/lib/format'
import { terminOrt } from '@/lib/ics'
import type { Termine } from '@/payload-types'

const kategorie = (v: string) => terminKategorien.find((k) => k.value === v)?.label ?? v

function Eintrag({ t }: { t: Termine }) {
  const ort = terminOrt(t)
  return (
    <li>
      <article className="relative rounded-lg border bg-card p-5 focus-within:ring-2 focus-within:ring-ring hover:shadow-md">
        <p className="text-sm font-medium text-muted-foreground">
          <span className="rounded-full border px-2 py-0.5">{kategorie(t.category)}</span>
          {t.registrationRequired && <span className="ml-2 rounded-full border border-amber-600 bg-amber-50 px-2 py-0.5 text-amber-950">Anmeldung nötig</span>}
        </p>
        <h3 className="mt-2 text-xl font-bold text-brand-900">
          <Link href={`/termine/${t.slug}`} className="after:absolute after:inset-0 focus-visible:outline-none">
            {t.title}
          </Link>
        </h3>
        <p className="mt-1">
          <time dateTime={t.startDate}>{formatRange(t.startDate, t.endDate)}</time>
          {ort && <span> · {ort}</span>}
        </p>
      </article>
    </li>
  )
}

/** Terminliste; mit `byMonth` mit Monatsüberschriften. */
export function TerminListe({ termine, byMonth = false, headingLevel = 3 }: { termine: Termine[]; byMonth?: boolean; headingLevel?: 2 | 3 }) {
  if (termine.length === 0) {
    return <p className="text-lg">Keine Termine gefunden.</p>
  }
  if (!byMonth) {
    return (
      <ul className="space-y-4">
        {termine.map((t) => (
          <Eintrag key={t.id} t={t} />
        ))}
      </ul>
    )
  }
  const groups = new Map<string, Termine[]>()
  for (const t of termine) {
    const key = formatMonthYear(t.startDate)
    groups.set(key, [...(groups.get(key) ?? []), t])
  }
  const H = headingLevel === 2 ? 'h2' : 'h3'
  return (
    <div className="space-y-8">
      {[...groups.entries()].map(([month, list]) => (
        <section key={month}>
          <H className="mb-3 text-2xl font-bold text-brand-900">{month}</H>
          <ul className="space-y-4">
            {list.map((t) => (
              <Eintrag key={t.id} t={t} />
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}
