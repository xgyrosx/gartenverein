import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { ratgeberKategorien } from '@/collections/Ratgeber'
import { RatgeberRaster } from '@/components/gartenwissen/RatgeberKarte'
import { RatgeberSuche } from '@/components/gartenwissen/RatgeberSuche'
import { getRatgeberList } from '@/lib/content'
import type { Ratgeber } from '@/payload-types'

type Args = { params: Promise<{ kategorie: string }> }

export function generateStaticParams() {
  return ratgeberKategorien.map((k) => ({ kategorie: k.value }))
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { kategorie } = await params
  const k = ratgeberKategorien.find((x) => x.value === kategorie)
  return { title: k ? `Gartenwissen: ${k.label}` : 'Gartenwissen' }
}

export default async function KategoriePage({ params }: Args) {
  const { kategorie } = await params
  const k = ratgeberKategorien.find((x) => x.value === kategorie)
  if (!k) notFound()
  const items = await getRatgeberList({ category: k.value as Ratgeber['category'] })
  return (
    <div className="mx-auto max-w-page px-4 py-12">
      <h1 className="text-4xl font-bold text-brand-900">Gartenwissen: {k.label}</h1>
      <div className="mt-8 max-w-content">
        <RatgeberSuche />
      </div>
      <nav aria-label="Kategorien" className="mt-8">
        <ul className="flex flex-wrap gap-2">
          <li>
            <Link href="/gartenwissen" className="block rounded-md border bg-card px-3 py-2 hover:bg-accent">
              Alle
            </Link>
          </li>
          {ratgeberKategorien.map((c) => (
            <li key={c.value}>
              <Link
                href={`/gartenwissen/kategorie/${c.value}`}
                aria-current={c.value === k.value ? 'page' : undefined}
                className={`block rounded-md border px-3 py-2 ${c.value === k.value ? 'bg-primary font-bold text-primary-foreground' : 'bg-card hover:bg-accent'}`}
              >
                {c.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-10">
        <RatgeberRaster items={items} empty="In dieser Kategorie gibt es noch keine Artikel." />
      </div>
    </div>
  )
}
