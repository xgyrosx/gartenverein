'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

import type { ResolvedLink } from '@/lib/resolveLink'

export function Nav({ items }: { items: ResolvedLink[] }) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  const linkClass = (href: string) =>
    `block rounded px-3 py-2 text-lg font-medium hover:bg-brand-100 hover:text-brand-900 ${
      pathname === href ? 'bg-brand-100 text-brand-900' : 'text-earth-900'
    }`

  const list = items.map((item) => (
    <li key={item.href + item.label}>
      {item.external ? (
        <a className={linkClass(item.href)} href={item.href} rel="noopener noreferrer">
          {item.label}
        </a>
      ) : (
        <Link
          aria-current={pathname === item.href ? 'page' : undefined}
          className={linkClass(item.href)}
          href={item.href}
          onClick={() => setOpen(false)}
        >
          {item.label}
        </Link>
      )}
    </li>
  ))

  return (
    <nav aria-label="Hauptmenü">
      <button
        type="button"
        className="rounded border border-earth-300 px-3 py-2 text-lg font-medium text-earth-900 md:hidden"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((o) => !o)}
      >
        {open ? 'Menü schliessen' : 'Menü'}
      </button>
      <ul className="hidden items-center gap-1 md:flex">{list}</ul>
      {open && (
        <ul id="mobile-menu" className="absolute inset-x-0 top-full border-b border-earth-200 bg-white px-4 pb-4 shadow md:hidden">
          {list}
        </ul>
      )}
    </nav>
  )
}
