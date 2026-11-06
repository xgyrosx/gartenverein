import { RenderBlocks } from '@/components/RenderBlocks'
import type { Seiten } from '@/payload-types'

export function PageView({ page }: { page: Seiten }) {
  const layout = page.layout ?? []
  const hasHero = layout[0]?.blockType === 'hero'
  return (
    <>
      {!hasHero && (
        <h1 className="mx-auto max-w-content px-4 pt-12 text-4xl font-bold text-brand-900">{page.title}</h1>
      )}
      <RenderBlocks blocks={layout} />
      <div className="h-12" />
    </>
  )
}
