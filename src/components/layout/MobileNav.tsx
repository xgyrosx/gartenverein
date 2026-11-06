'use client'

import { MenuIcon } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

import { NavLink } from '@/components/layout/NavLink'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import type { NavItem } from '@/lib/resolveLink'

export function MobileNav({ items }: { items: NavItem[] }) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const close = () => setOpen(false)

  const linkClass = (href: string) =>
    `block rounded-md px-3 py-3 text-lg font-medium hover:bg-accent ${pathname === href ? 'bg-accent text-accent-foreground' : ''}`

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="lg" className="lg:hidden">
          <MenuIcon aria-hidden="true" />
          Menü
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="overflow-y-auto p-4">
        <SheetTitle className="text-xl">Menü</SheetTitle>
        <SheetDescription className="sr-only">Hauptmenü der Website</SheetDescription>
        <nav aria-label="Hauptmenü (mobil)">
          <ul className="space-y-1">
            {items.map((item) => (
              <li key={item.href + item.label}>
                {item.highlight ? (
                  <Button asChild size="lg" className="my-2 w-full text-base">
                    <NavLink href={item.href} external={item.external} onClick={close}>
                      {item.label}
                    </NavLink>
                  </Button>
                ) : (
                  <NavLink
                    href={item.href}
                    external={item.external}
                    onClick={close}
                    aria-current={pathname === item.href ? 'page' : undefined}
                    className={linkClass(item.href)}
                  >
                    {item.label}
                  </NavLink>
                )}
                {item.children.length > 0 && (
                  <ul className="ml-4 space-y-1 border-l pl-2">
                    {item.children.map((child) => (
                      <li key={child.href + child.label}>
                        <NavLink
                          href={child.href}
                          external={child.external}
                          onClick={close}
                          aria-current={pathname === child.href ? 'page' : undefined}
                          className={linkClass(child.href)}
                        >
                          {child.label}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
