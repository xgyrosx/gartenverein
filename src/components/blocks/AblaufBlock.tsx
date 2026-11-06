import type { BlockOf } from '@/components/blocks/types'

export function AblaufBlock({ block }: { block: BlockOf<'ablauf'> }) {
  return (
    <section className="mx-auto max-w-content px-4 py-8">
      {block.title && <h2 className="text-2xl font-bold text-brand-900">{block.title}</h2>}
      <ol className="mt-4 space-y-4">
        {(block.steps ?? []).map((step, i) => (
          <li key={step.id ?? i} className="flex gap-4">
            <span
              aria-hidden="true"
              className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground"
            >
              {i + 1}
            </span>
            <div>
              <h3 className="text-xl font-bold">
                <span className="sr-only">Schritt {i + 1}: </span>
                {step.title}
              </h3>
              {step.text && <p className="mt-1 leading-relaxed">{step.text}</p>}
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
