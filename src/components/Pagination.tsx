import Link from 'next/link'

/** Seitennummerierung für statische Seiten: Seite 1 = basePath, weitere = basePath/seite/N */
export function Pagination({ page, totalPages, basePath }: { page: number; totalPages: number; basePath: string }) {
  if (totalPages <= 1) return null
  const href = (n: number) => (n === 1 ? basePath : `${basePath}/seite/${n}`)
  const item = 'min-w-10 rounded-md border px-3 py-2 text-center'
  return (
    <nav aria-label="Seitennummerierung" className="mt-10">
      <ul className="flex flex-wrap items-center gap-2">
        {page > 1 && (
          <li>
            <Link href={href(page - 1)} className={`${item} bg-card hover:bg-accent`} rel="prev">
              ← Zurück
            </Link>
          </li>
        )}
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
          <li key={n}>
            <Link
              href={href(n)}
              aria-current={n === page ? 'page' : undefined}
              aria-label={`Seite ${n}`}
              className={`${item} ${n === page ? 'bg-primary font-bold text-primary-foreground' : 'bg-card hover:bg-accent'}`}
            >
              {n}
            </Link>
          </li>
        ))}
        {page < totalPages && (
          <li>
            <Link href={href(page + 1)} className={`${item} bg-card hover:bg-accent`} rel="next">
              Weiter →
            </Link>
          </li>
        )}
      </ul>
    </nav>
  )
}
