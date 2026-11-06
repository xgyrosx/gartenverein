import { NavLink } from '@/components/layout/NavLink'
import { getHinweisbanner } from '@/lib/globals'
import { resolveLink } from '@/lib/resolveLink'

export async function Banner() {
  const b = await getHinweisbanner()
  if (!b.enabled || !b.text) return null
  const now = Date.now()
  if (b.visibleFrom && new Date(b.visibleFrom).getTime() > now) return null
  if (b.visibleUntil && new Date(b.visibleUntil).getTime() < now) return null

  const link = b.hasLink && b.link ? resolveLink(b.link) : null
  const warn = b.type === 'warnung'
  return (
    <aside
      aria-label={warn ? 'Warnung' : 'Information'}
      className={`px-4 py-3 text-center ${warn ? 'bg-amber-100 text-amber-950' : 'bg-brand-100 text-brand-950'}`}
    >
      <p>
        <strong>{warn ? 'Achtung: ' : 'Hinweis: '}</strong>
        {b.text}
        {link && (
          <>
            {' '}
            <NavLink href={link.href} external={link.external} className="font-medium underline">
              {link.label}
            </NavLink>
          </>
        )}
      </p>
    </aside>
  )
}
