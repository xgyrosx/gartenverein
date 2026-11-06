import { Img } from '@/components/Img'
import { NavLink } from '@/components/layout/NavLink'
import { Button } from '@/components/ui/button'
import type { BlockOf } from '@/components/blocks/types'
import { resolveLink } from '@/lib/resolveLink'

export function HeroBlock({ block }: { block: BlockOf<'hero'> }) {
  const button = block.hasButton && block.button ? resolveLink(block.button) : null
  return (
    <section className="relative isolate overflow-hidden bg-brand-900 text-white">
      <Img media={block.image} fill priority sizes="100vw" className="-z-20 object-cover" />
      <div className="absolute inset-0 -z-10 bg-brand-950/60" aria-hidden="true" />
      <div className="mx-auto max-w-page px-4 py-20 sm:py-28">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{block.title}</h1>
        {block.subtitle && <p className="mt-4 max-w-2xl text-xl leading-relaxed">{block.subtitle}</p>}
        {button && (
          <Button asChild variant="secondary" size="lg" className="mt-8 text-base">
            <NavLink href={button.href} external={button.external}>
              {button.label}
            </NavLink>
          </Button>
        )}
      </div>
    </section>
  )
}
