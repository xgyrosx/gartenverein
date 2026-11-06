import { BildTextBlock } from '@/components/blocks/BildTextBlock'
import { HeroBlock } from '@/components/blocks/HeroBlock'
import { HinweisboxBlock } from '@/components/blocks/HinweisboxBlock'
import { TextBlock } from '@/components/blocks/TextBlock'
import type { Seiten } from '@/payload-types'

export function RenderBlocks({ blocks }: { blocks: NonNullable<Seiten['layout']> }) {
  return (
    <>
      {blocks.map((block, i) => {
        const key = block.id ?? i
        switch (block.blockType) {
          case 'hero':
            return <HeroBlock key={key} block={block} />
          case 'text':
            return <TextBlock key={key} block={block} />
          case 'bildText':
            return <BildTextBlock key={key} block={block} />
          case 'hinweisbox':
            return <HinweisboxBlock key={key} block={block} />
          default:
            return null
        }
      })}
    </>
  )
}
