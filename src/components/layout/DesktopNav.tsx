'use client'

import { usePathname } from 'next/navigation'

import { NavLink } from '@/components/layout/NavLink'
import { Button } from '@/components/ui/button'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import type { NavItem } from '@/lib/resolveLink'

export function DesktopNav({ items }: { items: NavItem[] }) {
  const pathname = usePathname()
  // NavLink gemäss DESIGN.md: Padding 12 × 14 px, Radius 8 px, Hover sage-100
  const itemClass =
    'inline-flex h-auto items-center rounded-lg bg-transparent px-3.5 py-3 text-base font-medium text-ink hover:bg-sage-100 focus:bg-sage-100 data-[active=true]:bg-sage-100 data-[active=true]:text-forest'

  return (
    <NavigationMenu viewport={false} aria-label="Hauptmenü" className="hidden lg:flex">
      <NavigationMenuList className="gap-1">
        {items.map((item) => (
          <NavigationMenuItem key={item.href + item.label}>
            {item.children.length > 0 ? (
              <>
                <NavigationMenuTrigger className={`${itemClass} data-[state=open]:bg-sage-100`}>
                  {item.label}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-72 gap-1 p-2">
                    {[{ ...item, label: `${item.label} – Übersicht` }, ...item.children].map((child) => (
                      <li key={child.href + child.label}>
                        <NavigationMenuLink asChild active={pathname === child.href}>
                          <NavLink href={child.href} external={child.external} className="block rounded-md px-3 py-2 text-base">
                            {child.label}
                          </NavLink>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </>
            ) : item.highlight ? (
              <Button asChild className="ml-2">
                <NavLink href={item.href} external={item.external} aria-current={pathname === item.href ? 'page' : undefined}>
                  {item.label}
                </NavLink>
              </Button>
            ) : (
              <NavigationMenuLink asChild active={pathname === item.href} className={itemClass}>
                <NavLink href={item.href} external={item.external}>
                  {item.label}
                </NavLink>
              </NavigationMenuLink>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
