import { NewsCard } from '@/components/NewsCard'
import { Pagination } from '@/components/Pagination'
import { getNewsPage } from '@/lib/content'

export async function NewsArchiv({ page }: { page: number }) {
  const { docs, totalPages } = await getNewsPage(page)
  return (
    <div className="mx-auto max-w-page px-4 py-12">
      <h1 className="text-4xl font-bold text-brand-900">News</h1>
      {page > 1 && <p className="mt-2 text-muted-foreground">Seite {page} von {totalPages}</p>}
      {docs.length === 0 ? (
        <p className="mt-6 text-lg">Noch keine News vorhanden.</p>
      ) : (
        <ul className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {docs.map((n) => (
            <li key={n.id} className="flex">
              <NewsCard news={n} />
            </li>
          ))}
        </ul>
      )}
      <Pagination page={page} totalPages={totalPages} basePath="/news" />
    </div>
  )
}
