import { RichText } from '@/components/RichText'
import type { Seiten } from '@/payload-types'

type Block = Extract<NonNullable<Seiten['layout']>[number], { blockType: 'text' }>

export function TextBlock({ block }: { block: Block }) {
  return (
    <section className="mx-auto max-w-content px-4 py-8">
      <RichText data={block.content} />
    </section>
  )
}
