import type { Metadata } from 'next'
import Link from 'next/link'

import { Img } from '@/components/Img'
import { getAlben } from '@/lib/content'
import type { Alben } from '@/payload-types'

export const metadata: Metadata = { title: 'Galerie', description: 'Fotos aus dem Vereinsleben.' }

export default async function GaleriePage() {
  const alben = await getAlben()
  const years = [...new Set(alben.map((a) => a.year))].sort((a, b) => b - a)
  return (
    <div className="mx-auto max-w-page px-4 py-12">
      <h1 className="text-4xl font-bold text-brand-900">Galerie</h1>
      <p className="mt-4 max-w-content text-lg">Eindrücke aus dem Garten und von unseren Anlässen.</p>
      {alben.length === 0 && <p className="mt-8 text-lg">Noch keine Alben vorhanden.</p>}
      {years.map((year) => (
        <section key={year} className="mt-10">
          <h2 className="mb-4 text-2xl font-bold text-brand-900">{year}</h2>
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {alben
              .filter((a) => a.year === year)
              .map((a: Alben) => {
                const first = Array.isArray(a.images) ? a.images.find((i) => typeof i === 'object') : null
                return (
                  <li key={a.id} className="relative overflow-hidden rounded-lg border bg-card focus-within:ring-2 focus-within:ring-ring hover:shadow-md">
                    {first && typeof first === 'object' && (
                      <Img media={first} size="karte" sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" className="aspect-[4/3] w-full object-cover" />
                    )}
                    <div className="p-4">
                      <h3 className="text-xl font-bold text-brand-900">
                        <Link href={`/galerie/${a.slug}`} className="after:absolute after:inset-0 focus-visible:outline-none">
                          {a.title}
                        </Link>
                      </h3>
                      <p className="text-muted-foreground">{Array.isArray(a.images) ? a.images.length : 0} Bilder</p>
                    </div>
                  </li>
                )
              })}
          </ul>
        </section>
      ))}
    </div>
  )
}
