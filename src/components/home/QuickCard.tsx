import { Icon } from '@/components/home/Icon'
import { NavLink } from '@/components/layout/NavLink'
import type { IconName } from '@/lib/icons'

type Props = { title: string; text?: string | null; href: string; external?: boolean; icon: IconName }

/**
 * Schnellzugriff-Karte: die ganze Karte ist ein Link.
 * Unter 640 px als Listenkarte (Icon links, Text rechts), darüber mit Icon oben.
 */
export function QuickCard({ title, text, href, external, icon }: Props) {
  return (
    <NavLink
      href={href}
      external={external}
      className="group flex h-full items-center gap-4 rounded-card border border-line bg-paper p-5 transition-shadow hover:shadow-hover sm:flex-col sm:items-start sm:gap-5 sm:p-6"
    >
      <span className="grid size-[52px] shrink-0 place-items-center rounded-full bg-sage-100 text-forest">
        <Icon name={icon} className="size-6" />
      </span>
      <span className="block">
        <span className="block font-display text-[19px] font-semibold leading-tight text-ink sm:text-[22px]">{title}</span>
        {text && <span className="mt-1 block text-[15px] leading-normal text-ink-soft">{text}</span>}
      </span>
    </NavLink>
  )
}
