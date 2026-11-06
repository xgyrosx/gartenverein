import Link from 'next/link'

import { RatgeberRaster } from '@/components/gartenwissen/RatgeberKarte'
import { getRatgeberList } from '@/lib/content'
import { currentMonth, monthNames } from '@/lib/format'

export async function Gartenjahr({ monat }: { monat: number | null }) {
  const gewaehlt = monat ?? currentMonth()
  const items = await getRatgeberList({ month: gewaehlt })
  return (
    <div className="mx-auto max-w-page px-4 py-12">
      <p>
        <Link className="text-brand-800 underline hover:text-brand-950" href="/gartenwissen">
          ← Gartenwissen
        </Link>
      </p>
      <h1 className="mt-6 text-4xl font-bold text-brand-900">Das Gartenjahr</h1>
      <p className="mt-4 max-w-content text-lg">Was im Garten wann zu tun ist: Wählen Sie einen Monat.</p>
      <nav aria-label="Monat wählen" className="mt-6">
        <ul className="flex flex-wrap gap-2">
          {monthNames.map((name, i) => (
            <li key={name}>
              <Link
                href={`/gartenwissen/gartenjahr/${i + 1}`}
                aria-current={i + 1 === gewaehlt ? 'page' : undefined}
                className={`block rounded-md border px-3 py-2 ${i + 1 === gewaehlt ? 'bg-primary font-bold text-primary-foreground' : 'bg-card hover:bg-accent'}`}
              >
                {name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <h2 className="mt-10 mb-4 text-2xl font-bold text-brand-900">Im {monthNames[gewaehlt - 1]}</h2>
      <RatgeberRaster items={items} empty="Für diesen Monat sind noch keine Tipps erfasst." />
    </div>
  )
}
