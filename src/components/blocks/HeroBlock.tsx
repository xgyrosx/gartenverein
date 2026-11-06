import { Img } from '@/components/Img'
import type { Seiten } from '@/payload-types'

type Block = Extract<NonNullable<Seiten['layout']>[number], { blockType: 'hero' }>

export function HeroBlock({ block }: { block: Block }) {
  return (
    <section className="relative isolate overflow-hidden bg-green-900 text-white">
      <Img media={block.image} fill priority sizes="100vw" className="-z-20 object-cover" />
      <div className="absolute inset-0 -z-10 bg-green-950/60" aria-hidden="true" />
      <div className="mx-auto max-w-5xl px-4 py-20 sm:py-28">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{block.title}</h1>
        {block.subtitle && <p className="mt-4 max-w-2xl text-xl leading-relaxed">{block.subtitle}</p>}
      </div>
    </section>
  )
}
