import Link from 'next/link'
import type { ComponentProps } from 'react'

type Props = Omit<ComponentProps<'a'>, 'href'> & { href: string; external?: boolean }

/** Interner Link (next/link) oder externer Link (mit rel="noopener noreferrer"). */
export function NavLink({ href, external, children, ...rest }: Props) {
  if (external) {
    return (
      <a href={href} rel="noopener noreferrer" {...rest}>
        {children}
      </a>
    )
  }
  return (
    <Link href={href} {...rest}>
      {children}
    </Link>
  )
}
