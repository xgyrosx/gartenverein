import { BookOpen, Bug, CalendarDays, FileText, House, Images, Megaphone, Sprout, type LucideIcon } from 'lucide-react'

import type { IconName } from '@/lib/icons'

const icons: Record<IconName, LucideIcon> = {
  sprout: Sprout,
  calendar: CalendarDays,
  document: FileText,
  house: House,
  book: BookOpen,
  bug: Bug,
  images: Images,
  megaphone: Megaphone,
}

/** Linien-Icon (Strichstärke 1.8, eingebettetes SVG). Dekorativ, daher für Screenreader versteckt. */
export function Icon({ name, className }: { name: IconName; className?: string }) {
  const Component = icons[name] ?? Sprout
  return <Component aria-hidden="true" strokeWidth={1.8} className={className} />
}
