import { personenGruppen } from '@/collections/Personen'
import type { BlockOf } from '@/components/blocks/types'
import { Img } from '@/components/Img'
import { getPersonen } from '@/lib/content'
import type { Personen } from '@/payload-types'

function PersonCard({ p }: { p: Personen }) {
  return (
    <li className="flex gap-4 rounded-lg border bg-card p-4">
      {typeof p.photo === 'object' && p.photo && (
        <Img media={p.photo} size="thumbnail" sizes="96px" className="size-24 shrink-0 rounded-md object-cover" />
      )}
      <div>
        <h4 className="text-lg font-bold">{p.name}</h4>
        {p.role && <p className="text-muted-foreground">{p.role}</p>}
        {p.contact && <p className="mt-1 whitespace-pre-line">{p.contact}</p>}
      </div>
    </li>
  )
}

export async function PersonenrasterBlock({ block }: { block: BlockOf<'personenraster'> }) {
  const personen = await getPersonen(block.group)
  const groups = block.group ? personenGruppen.filter((g) => g.value === block.group) : personenGruppen
  return (
    <section className="mx-auto max-w-page px-4 py-8">
      {block.title && <h2 className="text-2xl font-bold text-brand-900">{block.title}</h2>}
      {personen.length === 0 && <p className="mt-4">Zurzeit sind keine Personen erfasst.</p>}
      {groups.map((g) => {
        const list = personen.filter((p) => p.group === g.value)
        if (list.length === 0) return null
        return (
          <div key={g.value} className="mt-6">
            {!block.group && <h3 className="mb-3 text-xl font-bold">{g.label}</h3>}
            <ul className="grid gap-4 md:grid-cols-2">
              {list.map((p) => (
                <PersonCard key={p.id} p={p} />
              ))}
            </ul>
          </div>
        )
      })}
    </section>
  )
}
