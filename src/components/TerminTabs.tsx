import Link from 'next/link'

export function TerminTabs({ active }: { active: 'anstehend' | 'archiv' }) {
  const cls = (on: boolean) =>
    `rounded-md px-4 py-2 text-lg font-medium ${on ? 'bg-primary text-primary-foreground' : 'border bg-card hover:bg-sage-100'}`
  return (
    <nav aria-label="Terminansicht" className="flex flex-wrap gap-2">
      <Link href="/termine" className={cls(active === 'anstehend')} aria-current={active === 'anstehend' ? 'page' : undefined}>
        Anstehende
      </Link>
      <Link href="/termine/archiv" className={cls(active === 'archiv')} aria-current={active === 'archiv' ? 'page' : undefined}>
        Archiv
      </Link>
    </nav>
  )
}
