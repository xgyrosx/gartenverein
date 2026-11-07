import Link from 'next/link'

import { formatDateTime, formatTime } from '@/lib/format'
import { terminOrt } from '@/lib/ics'
import type { Termine } from '@/payload-types'

const TZ = 'Europe/Zurich'
const day = (iso: string) => new Intl.DateTimeFormat('de-CH', { day: 'numeric', timeZone: TZ }).format(new Date(iso))
const month = (iso: string) => new Intl.DateTimeFormat('de-CH', { month: 'short', timeZone: TZ }).format(new Date(iso)).replace('.', '')

/** Termin-Zeile: Datumschip (Tag gross, Monat klein), Titel, Ort und Uhrzeit. Für den dunklen Panel-Hintergrund. */
export function EventRow({ termin }: { termin: Termine }) {
  const ort = terminOrt(termin)
  return (
    <li className="relative flex items-center gap-4 rounded-2xl p-2 focus-within:ring-2 focus-within:ring-white hover:bg-white/10">
      <span aria-hidden="true" className="flex w-14 shrink-0 flex-col items-center rounded-xl bg-white py-2 text-forest">
        <span className="font-display text-2xl font-semibold leading-none">{day(termin.startDate)}</span>
        <span className="mt-1 text-xs font-semibold uppercase tracking-wide">{month(termin.startDate)}</span>
      </span>
      <div>
        <h4 className="font-display text-[18px] font-semibold leading-tight text-white">
          <Link href={`/termine/${termin.slug}`} className="after:absolute after:inset-0 focus-visible:outline-none">
            {termin.title}
          </Link>
        </h4>
        <p className="mt-1 text-[15px] text-on-dark-soft">
          <span className="sr-only">{formatDateTime(termin.startDate)}. </span>
          <time dateTime={termin.startDate}>{formatTime(termin.startDate)} Uhr</time>
          {ort && <span> · {ort}</span>}
        </p>
      </div>
    </li>
  )
}
