import { NewsletterForm } from '@/components/home/NewsletterForm'
import { NavLink } from '@/components/layout/NavLink'
import { getFusszeile, getVereinsdaten } from '@/lib/globals'
import { resolveLinks } from '@/lib/resolveLink'

export async function Footer() {
  const [fuss, verein] = await Promise.all([getFusszeile(), getVereinsdaten()])
  const legal = resolveLinks(fuss.legalLinks)
  const partner = resolveLinks(fuss.partnerLinks)
  const ort = [verein.zip, verein.city].filter(Boolean).join(' ')
  const linkClass = 'underline underline-offset-4 hover:text-white'
  return (
    <footer className="mt-0 bg-ink text-on-dark-soft">
      <div className="container-page grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <h2 className="font-display text-[22px] font-semibold text-white">{verein.name}</h2>
          <address className="mt-3 not-italic leading-relaxed">
            {verein.street && <div>{verein.street}</div>}
            {ort && <div>{ort}</div>}
          </address>
          {verein.email && (
            <div className="mt-3">
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
        {partner.length > 0 ? (
          <nav aria-label="Partner">
            <h2 className="font-display text-[18px] font-semibold text-white">Partner</h2>
            <ul className="mt-3 space-y-2">
              {partner.map((l) => (
                <li key={l.href + l.label}>
                  <NavLink className={linkClass} href={l.href} external={l.external}>
                    {l.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        ) : (
          <div className="hidden lg:block" />
        )}
        {legal.length > 0 ? (
          <nav aria-label="Rechtliches">
            <h2 className="font-display text-[18px] font-semibold text-white">Rechtliches</h2>
            <ul className="mt-3 space-y-2">
              {legal.map((l) => (
                <li key={l.href + l.label}>
                  <NavLink className={linkClass} href={l.href} external={l.external}>
                    {l.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        ) : (
          <div className="hidden lg:block" />
        )}
        <div className="md:col-span-2 lg:col-span-1">
          <h2 className="font-display text-[18px] font-semibold text-white">Newsletter</h2>
          <div className="mt-3">
            <NewsletterForm />
          </div>
        </div>
      </div>
      <p className="border-t border-white/15 py-5 text-center text-sm">
        © {new Date().getFullYear()} {verein.name}
      </p>
    </footer>
  )
}
