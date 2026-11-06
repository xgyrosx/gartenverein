import Link from 'next/link'

import { TerminListe } from '@/components/TerminListe'
import { TerminTabs } from '@/components/TerminTabs'
import { getPastTermine, getTerminJahre } from '@/lib/content'

export async function TerminArchiv({ jahr }: { jahr: number | null }) {
  const jahre = await getTerminJahre()
  const gewaehlt = jahr ?? jahre[0] ?? null
  const termine = gewaehlt ? await getPastTermine(gewaehlt) : []
  return (
    <div className="mx-auto max-w-content px-4 py-12">
      <h1 className="text-4xl font-bold text-brand-900">Termine – Archiv</h1>
      <div className="mt-6">
        <TerminTabs active="archiv" />
      </div>
      {jahre.length === 0 ? (
        <p className="mt-8 text-lg">Noch keine vergangenen Termine.</p>
      ) : (
        <>
          <nav aria-label="Jahr wählen" className="mt-6">
            <ul className="flex flex-wrap gap-2">
              {jahre.map((j) => (
                <li key={j}>
                  <Link
                    href={`/termine/archiv/${j}`}
                    aria-current={j === gewaehlt ? 'page' : undefined}
                    className={`rounded-md border px-3 py-1 ${j === gewaehlt ? 'bg-accent font-bold' : 'bg-card hover:bg-accent'}`}
                  >
                    {j}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-8">
            <TerminListe termine={termine} byMonth headingLevel={2} />
          </div>
        </>
      )}
    </div>
  )
}
