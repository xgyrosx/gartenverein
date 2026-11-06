import { RichText } from '@/components/RichText'
import type { Seiten } from '@/payload-types'

type Block = Extract<NonNullable<Seiten['layout']>[number], { blockType: 'hinweisbox' }>

const styles: Record<Block['variant'], string> = {
  info: 'border-green-700 bg-green-50 text-green-950',
  hinweis: 'border-amber-600 bg-amber-50 text-amber-950',
  wichtig: 'border-red-700 bg-red-50 text-red-950',
}

export function HinweisboxBlock({ block }: { block: Block }) {
  return (
    <section className="mx-auto max-w-3xl px-4 py-8">
      <aside className={`rounded-lg border-l-8 p-6 ${styles[block.variant]}`}>
        {block.title && <p className="mb-2 text-lg font-bold">{block.title}</p>}
        <RichText data={block.content} />
      </aside>
    </section>
  )
}
