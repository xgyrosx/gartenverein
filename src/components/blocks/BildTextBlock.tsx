import { Img } from '@/components/Img'
import { RichText } from '@/components/RichText'
import type { Seiten } from '@/payload-types'

type Block = Extract<NonNullable<Seiten['layout']>[number], { blockType: 'bildText' }>

export function BildTextBlock({ block }: { block: Block }) {
  const right = block.imagePosition === 'rechts'
  return (
    <section className="mx-auto grid max-w-5xl items-center gap-8 px-4 py-8 md:grid-cols-2">
      <div className={right ? 'md:order-2' : undefined}>
        <Img
          media={block.image}
          sizes="(min-width: 768px) 50vw, 100vw"
          className="h-auto w-full rounded-lg object-cover"
        />
      </div>
      <RichText data={block.content} />
    </section>
  )
}
