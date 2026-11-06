import type { BlockOf } from '@/components/blocks/types'
import { RichText } from '@/components/RichText'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

export function AkkordeonBlock({ block }: { block: BlockOf<'akkordeon'> }) {
  const items = block.items ?? []
  return (
    <section className="mx-auto max-w-content px-4 py-8">
      {block.title && <h2 className="mb-4 text-2xl font-bold text-brand-900">{block.title}</h2>}
      <Accordion type="multiple" className="rounded-lg border bg-card px-4">
        {items.map((item, i) => (
          <AccordionItem key={item.id ?? i} value={`item-${i}`}>
            <AccordionTrigger className="text-lg font-bold">{item.title}</AccordionTrigger>
            <AccordionContent className="text-base">
              <RichText data={item.content} />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  )
}
