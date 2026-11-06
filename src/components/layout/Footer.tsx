import { getFusszeile, getVereinsdaten } from '@/lib/globals'
import { resolveLinks } from '@/lib/resolveLink'

export async function Footer() {
  const [fuss, verein] = await Promise.all([getFusszeile(), getVereinsdaten()])
  const links = resolveLinks(fuss.links)
  const ort = [verein.zip, verein.city].filter(Boolean).join(' ')
  return (
    <footer className="mt-12 border-t border-earth-200 bg-earth-100 text-earth-900">
      <div className="mx-auto grid max-w-5xl gap-8 px-4 py-10 md:grid-cols-3">
        <div>
          <p className="text-lg font-bold">{verein.name}</p>
          <address className="mt-2 not-italic leading-relaxed">
            {verein.street && <div>{verein.street}</div>}
            {ort && <div>{ort}</div>}
          </address>
        </div>
        <div className="leading-relaxed">
          {verein.email && (
            <div>
              <a className="underline hover:text-brand-800" href={`mailto:${verein.email}`}>
                {verein.email}
              </a>
            </div>
          )}
          {verein.phone && (
            <div>
              <a className="underline hover:text-brand-800" href={`tel:${verein.phone.replace(/[^+\d]/g, '')}`}>
                {verein.phone}
              </a>
            </div>
          )}
          {fuss.text && <p className="mt-2 whitespace-pre-line">{fuss.text}</p>}
        </div>
        {links.length > 0 && (
          <nav aria-label="Fusszeile">
            <ul className="space-y-1">
              {links.map((l) => (
                <li key={l.href + l.label}>
                  <a className="underline hover:text-brand-800" href={l.href} rel={l.external ? 'noopener noreferrer' : undefined}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
      <p className="border-t border-earth-200 py-4 text-center text-sm">
        © {new Date().getFullYear()} {verein.name}
      </p>
    </footer>
  )
}
