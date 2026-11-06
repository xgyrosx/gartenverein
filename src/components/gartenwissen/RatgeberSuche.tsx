'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

type Treffer = { id: number; title: string; teaser?: string | null; path?: string | null; doc: { relationTo: string } }

const art = (rel: string) => (rel === 'ratgeber' ? 'Ratgeber' : 'Seite')

/** Sucht im Suchindex (Payload-Search-Plugin) über die öffentliche API – ohne Fremddienste. */
export function RatgeberSuche() {
  const [q, setQ] = useState('')
  const [treffer, setTreffer] = useState<Treffer[] | null>(null)
  const [fehler, setFehler] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(() => {
    clearTimeout(timer.current)
    const term = q.trim()
    if (term.length < 2) {
      setTreffer(null)
      return
    }
    timer.current = setTimeout(async () => {
      try {
        const params = new URLSearchParams({ limit: '10', depth: '0', sort: 'priority' })
        params.set('where[or][0][title][like]', term)
        params.set('where[or][1][teaser][like]', term)
        const res = await fetch(`/api/suche?${params}`)
        if (!res.ok) throw new Error(String(res.status))
        const json = (await res.json()) as { docs: Treffer[] }
        setTreffer(json.docs)
        setFehler(false)
      } catch {
        setFehler(true)
        setTreffer(null)
      }
    }, 250)
    return () => clearTimeout(timer.current)
  }, [q])

  return (
    <div role="search">
      <label htmlFor="ratgeber-suche" className="block text-lg font-medium">
        Gartenwissen durchsuchen
      </label>
      <input
        id="ratgeber-suche"
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="z. B. Tomaten, Kompost, Schnecken"
        autoComplete="off"
        className="mt-2 w-full rounded-md border border-input bg-white px-4 py-3 text-lg"
      />
      <div aria-live="polite" className="mt-3">
        {fehler && <p>Die Suche ist gerade nicht verfügbar.</p>}
        {treffer && (
          <>
            <p className="text-muted-foreground">{treffer.length === 0 ? 'Keine Treffer.' : `${treffer.length} Treffer`}</p>
            <ul className="mt-2 space-y-2">
              {treffer.map((t) => (
                <li key={t.id} className="rounded-md border bg-card p-3">
                  <Link href={t.path ?? '/'} className="font-bold text-brand-800 underline hover:text-brand-950">
                    {t.title}
                  </Link>
                  <span className="ml-2 text-sm text-muted-foreground">{art(t.doc.relationTo)}</span>
                  {t.teaser && <p className="mt-1">{t.teaser}</p>}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  )
}
