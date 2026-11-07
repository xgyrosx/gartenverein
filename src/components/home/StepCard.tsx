/** Schritt der Pacht: grosse Ziffer (nur grafisch), Titel, Kurztext. Gehört in eine nummerierte Liste (<ol>). */
export function StepCard({ n, title, text }: { n: number; title: string; text?: string | null }) {
  return (
    <li className="rounded-card border border-line bg-paper p-6">
      <span aria-hidden="true" className="block font-display text-[56px] font-semibold leading-none text-leaf">
        {n}
      </span>
      <h3 className="mt-4 font-display text-[22px] font-semibold leading-tight text-ink">
        <span className="sr-only">Schritt {n}: </span>
        {title}
      </h3>
      {text && <p className="mt-2 text-[15px] leading-normal text-ink-soft">{text}</p>}
    </li>
  )
}
