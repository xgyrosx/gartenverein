import { NavLink } from '@/components/layout/NavLink'
import { getFusszeile, getVereinsdaten } from '@/lib/globals'
import { resolveLinks } from '@/lib/resolveLink'

export async function Footer() {
  const [fuss, verein] = await Promise.all([getFusszeile(), getVereinsdaten()])
  const legal = resolveLinks(fuss.legalLinks)
  const partner = resolveLinks(fuss.partnerLinks)
  const ort = [verein.zip, verein.city].filter(Boolean).join(' ')
  const linkClass = 'underline hover:text-brand-800'
  return (
    <footer className="mt-12 border-t bg-secondary text-secondary-foreground">
      <div className="mx-auto grid max-w-page gap-8 px-4 py-10 md:grid-cols-3">
        <div>
          <h2 className="text-lg font-bold">{verein.name}</h2>
          <address className="mt-2 not-italic leading-relaxed">
            {verein.street && <div>{verein.street}</div>}
            {ort && <div>{ort}</div>}
          </address>
          {verein.email && (
            <div className="mt-2">
              <a className={linkClass} href={`mailto:${verein.email}`}>
                {verein.email}
              </a>
            </div>
          )}
          {verein.phone && (
            <div>
              <a className={linkClass} href={`tel:${verein.phone.replace(/[^+\d]/g, '')}`}>
                {verein.phone}
              </a>
            </div>
          )}
          {fuss.text && <p className="mt-3 whitespace-pre-line">{fuss.text}</p>}
        </div>
        {partner.length > 0 && (
          <nav aria-label="Partner">
            <h2 className="text-lg font-bold">Partner</h2>
            <ul className="mt-2 space-y-1">
              {partner.map((l) => (
                <li key={l.href + l.label}>
                  <NavLink className={linkClass} href={l.href} external={l.external}>
                    {l.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        )}
        {legal.length > 0 && (
          <nav aria-label="Rechtliches">
            <h2 className="text-lg font-bold">Rechtliches</h2>
            <ul className="mt-2 space-y-1">
              {legal.map((l) => (
                <li key={l.href + l.label}>
                  <NavLink className={linkClass} href={l.href} external={l.external}>
                    {l.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
      <p className="border-t py-4 text-center text-sm">
        © {new Date().getFullYear()} {verein.name}
      </p>
    </footer>
  )
}
