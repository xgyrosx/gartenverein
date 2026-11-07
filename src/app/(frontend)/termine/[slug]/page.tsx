import type { Metadata } from 'next'
import Link from 'next/link'

import { terminKategorien } from '@/collections/Termine'
import { DokumentEintrag } from '@/components/DokumentListe'
import { RichText } from '@/components/RichText'
import { getPublishedSlugs, getTermin } from '@/lib/content'
import { formatRange } from '@/lib/format'
import { terminOrt } from '@/lib/ics'
import { lexicalToPlainText } from '@/lib/richtext'
import { buildMetadata } from '@/lib/seo'
import { serverUrl } from '@/lib/url'
import type { Areale } from '@/payload-types'
import { redirectOrNotFound } from '@/lib/redirects'

type Args = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return (await getPublishedSlugs('termine')).map((t) => ({ slug: t.slug }))
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params
  const t = await getTermin(slug)
  if (!t) return redirectOrNotFound(`/termine/${slug}`)
  return buildMetadata({ path: `/termine/${slug}`,
    seo: t.meta,
    fallbackTitle: t.title,
    fallbackDescription: `${formatRange(t.startDate, t.endDate)}${terminOrt(t) ? ` – ${terminOrt(t)}` : ''}`,
  })
}

export default async function TerminDetail({ params }: Args) {
  const { slug } = await params
  const t = await getTermin(slug)
  if (!t) return redirectOrNotFound(`/termine/${slug}`)
  const ort = terminOrt(t)
  const areal = typeof t.areal === 'object' && t.areal ? (t.areal as Areale) : null
  const kategorie = terminKategorien.find((k) => k.value === t.category)?.label

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: t.title,
    startDate: t.startDate,
    ...(t.endDate ? { endDate: t.endDate } : {}),
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    url: `${serverUrl}/termine/${t.slug}`,
    ...(ort
      ? {
          location: {
            '@type': 'Place',
            name: ort,
            ...(areal?.street
              ? { address: { '@type': 'PostalAddress', streetAddress: areal.street, postalCode: areal.zip ?? undefined, addressLocality: areal.city ?? undefined, addressCountry: 'CH' } }
              : {}),
          },
        }
      : {}),
    ...(t.description ? { description: lexicalToPlainText(t.description) } : {}),
  }

  return (
    <article className="mx-auto max-w-content px-4 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      <p>
        <Link className="text-brand-800 underline hover:text-brand-950" href="/termine">
          ← Alle Termine
        </Link>
      </p>
      {kategorie && <p className="mt-6 text-muted-foreground">{kategorie}</p>}
      <h1 className="mt-1 text-4xl font-bold text-brand-900">{t.title}</h1>
      <dl className="mt-6 grid grid-cols-[auto_1fr] gap-x-6 gap-y-2">
        <dt className="font-medium">Wann</dt>
        <dd>
          <time dateTime={t.startDate}>{formatRange(t.startDate, t.endDate)}</time>
        </dd>
        {ort && (
          <>
            <dt className="font-medium">Wo</dt>
            <dd>
              {areal ? (
                <>
                  <Link className="text-brand-800 underline" href={`/areale/${areal.slug}`}>
                    {areal.name}
                  </Link>
                  {t.location ? `, ${t.location}` : ''}
                </>
              ) : (
                ort
              )}
            </dd>
          </>
        )}
        {t.registrationRequired && (
          <>
            <dt className="font-medium">Anmeldung</dt>
            <dd>
              Nötig.{t.registrationText ? ` ${t.registrationText}` : ''}
              {t.registrationUrl && (
                <>
                  {' '}
                  <a className="text-brand-800 underline" href={t.registrationUrl} rel="noopener noreferrer">
                    Zur Anmeldung
                  </a>
                </>
              )}
            </dd>
          </>
        )}
      </dl>
      {t.description && <RichText data={t.description} className="mt-8" />}
      {typeof t.attachment === 'object' && t.attachment && (
        <div className="mt-8">
          <h2 className="mb-2 text-xl font-bold">Dokument zum Termin</h2>
          <ul>
            <DokumentEintrag d={t.attachment} />
          </ul>
        </div>
      )}
      <p className="mt-8">
        <a className="font-medium text-brand-800 underline hover:text-brand-950" href={`/termine/${t.slug}/ics`}>
          Zum Kalender hinzufügen (ICS)
        </a>
      </p>
    </article>
  )
}
