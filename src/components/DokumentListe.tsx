import { dokumentKategorien } from '@/collections/Dokumente'
import { formatFileSize } from '@/lib/format'
import type { Dokumente } from '@/payload-types'

export function DokumentEintrag({ d }: { d: Pick<Dokumente, 'title' | 'url' | 'filename' | 'filesize' | 'mimeType' | 'version'> }) {
  const typ = d.mimeType === 'application/pdf' ? 'PDF' : (d.filename?.split('.').pop()?.toUpperCase() ?? 'Datei')
  const size = formatFileSize(d.filesize)
  return (
    <li className="rounded-lg border bg-card p-4">
      <a href={d.url ?? '#'} download className="text-lg font-bold text-brand-800 underline hover:text-brand-950">
        {d.title}
        <span className="sr-only"> herunterladen</span>
      </a>
      <p className="mt-1 text-muted-foreground">
        {typ}
        {size && ` · ${size}`}
        {d.version && ` · ${d.version}`}
      </p>
    </li>
  )
}

export function DokumentListe({ docs, grouped = false }: { docs: Dokumente[]; grouped?: boolean }) {
  if (docs.length === 0) return <p>Zurzeit sind keine Dokumente verfügbar.</p>
  if (!grouped) {
    return (
      <ul className="space-y-3">
        {docs.map((d) => (
          <DokumentEintrag key={d.id} d={d} />
        ))}
      </ul>
    )
  }
  return (
    <div className="space-y-6">
      {dokumentKategorien.map((k) => {
        const list = docs.filter((d) => d.category === k.value)
        if (list.length === 0) return null
        return (
          <div key={k.value}>
            <h3 className="mb-2 text-xl font-bold">{k.label}</h3>
            <ul className="space-y-3">
              {list.map((d) => (
                <DokumentEintrag key={d.id} d={d} />
              ))}
            </ul>
          </div>
        )
      })}
    </div>
  )
}
