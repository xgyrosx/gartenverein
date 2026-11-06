import { NavLink } from '@/components/layout/NavLink'
import type { BlockOf } from '@/components/blocks/types'
import { resolveLink } from '@/lib/resolveLink'

export function KartenBlock({ block }: { block: BlockOf<'karten'> }) {
  return (
    <section className="mx-auto max-w-page px-4 py-8">
      {block.title && <h2 className="mb-4 text-2xl font-bold text-brand-900">{block.title}</h2>}
      <ul className="grid gap-6 md:grid-cols-3">
        {(block.cards ?? []).map((card, i) => {
          const link = resolveLink(card)
          return (
            <li
              key={card.id ?? i}
              className="relative flex flex-col rounded-lg border bg-card p-6 transition-shadow focus-within:ring-2 focus-within:ring-ring hover:shadow-md"
            >
              <h3 className="text-xl font-bold text-brand-900">{card.title}</h3>
              {card.text && <p className="mt-2 flex-1 leading-relaxed">{card.text}</p>}
              {link && (
                <NavLink
                  href={link.href}
                  external={link.external}
                  className="mt-4 font-medium text-brand-800 underline after:absolute after:inset-0 hover:text-brand-950 focus-visible:outline-none"
                >
                  {link.label}
                </NavLink>
              )}
            </li>
          )
        })}
      </ul>
    </section>
  )
}
