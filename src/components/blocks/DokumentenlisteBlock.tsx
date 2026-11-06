import type { BlockOf } from '@/components/blocks/types'
import { DokumentListe } from '@/components/DokumentListe'
import { getDokumente } from '@/lib/content'

export async function DokumentenlisteBlock({ block }: { block: BlockOf<'dokumentenliste'> }) {
  const docs = await getDokumente(block.category)
  return (
    <section className="mx-auto max-w-content px-4 py-8">
      {block.title && <h2 className="mb-4 text-2xl font-bold text-brand-900">{block.title}</h2>}
      <DokumentListe docs={docs} grouped={!block.category} />
    </section>
  )
}
