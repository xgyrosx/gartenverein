import type { Metadata } from 'next'
import Link from 'next/link'

import { ratgeberKategorien } from '@/collections/Ratgeber'
import { RatgeberRaster } from '@/components/gartenwissen/RatgeberKarte'
import { RatgeberSuche } from '@/components/gartenwissen/RatgeberSuche'
import { getRatgeberList } from '@/lib/content'

export const metadata: Metadata = { title: 'Gartenwissen', description: 'Tipps und Ratgeber rund um den Garten.' }

export default async function GartenwissenPage() {
  const items = await getRatgeberList()
  return (
    <div className="mx-auto max-w-page px-4 py-12">
      <h1 className="text-4xl font-bold text-brand-900">Gartenwissen</h1>
      <p className="mt-4 max-w-content text-lg">Tipps und Anleitungen von Gärtnerinnen und Gärtnern für Gärtnerinnen und Gärtner.</p>
      <div className="mt-8 max-w-content">
        <RatgeberSuche />
      </div>
      <nav aria-label="Kategorien" className="mt-8">
        <ul className="flex flex-wrap gap-2">
          <li>
            <Link href="/gartenwissen" aria-current="page" className="block rounded-md border bg-primary px-3 py-2 font-bold text-primary-foreground">
              Alle
            </Link>
          </li>
          {ratgeberKategorien.map((k) => (
            <li key={k.value}>
              <Link href={`/gartenwissen/kategorie/${k.value}`} className="block rounded-md border bg-card px-3 py-2 hover:bg-sage-100">
                {k.label}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/gartenwissen/gartenjahr" className="block rounded-md border border-brand-700 bg-card px-3 py-2 font-medium hover:bg-sage-100">
              Gartenjahr (nach Monat)
            </Link>
          </li>
        </ul>
      </nav>
      <h2 className="mt-10 mb-4 text-2xl font-bold text-brand-900">Alle Artikel</h2>
      <RatgeberRaster items={items} empty="Noch keine Artikel vorhanden." />
    </div>
  )
}
