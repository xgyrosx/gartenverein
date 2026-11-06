import type { Metadata } from 'next'
import Link from 'next/link'

import { Img } from '@/components/Img'
import { getAreale } from '@/lib/content'

export const metadata: Metadata = { title: 'Areale' }

export default async function ArealePage() {
  const areale = await getAreale()
  return (
    <div className="mx-auto max-w-page px-4 py-12">
      <h1 className="text-4xl font-bold text-brand-900">Unsere Areale</h1>
      <p className="mt-4 max-w-content text-lg">Der Verein bewirtschaftet mehrere Gartenareale. Hier finden Sie Adressen, Parkplätze und eine Karte.</p>
      {areale.length === 0 ? (
        <p className="mt-6">Noch keine Areale erfasst.</p>
      ) : (
        <ul className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {areale.map((a) => {
            const first = Array.isArray(a.images) ? a.images[0] : null
            return (
              <li key={a.id} className="relative flex flex-col overflow-hidden rounded-lg border bg-card focus-within:ring-2 focus-within:ring-ring hover:shadow-md">
                {first && typeof first === 'object' && (
                  <Img media={first} size="karte" sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" className="aspect-[16/9] w-full object-cover" />
                )}
                <div className="flex flex-1 flex-col p-5">
                  <h2 className="text-xl font-bold text-brand-900">
                    <Link href={`/areale/${a.slug}`} className="after:absolute after:inset-0 focus-visible:outline-none">
                      {a.name}
                    </Link>
                  </h2>
                  <p className="mt-2 flex-1">{a.summary}</p>
                  {(a.street || a.city) && (
                    <p className="mt-2 text-muted-foreground">{[a.street, [a.zip, a.city].filter(Boolean).join(' ')].filter(Boolean).join(', ')}</p>
                  )}
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
