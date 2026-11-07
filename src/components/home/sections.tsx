import Link from 'next/link'

import { EventRow } from '@/components/home/EventRow'
import { ImagePlaceholder } from '@/components/home/ImagePlaceholder'
import { PostCard } from '@/components/home/PostCard'
import { QuickCard } from '@/components/home/QuickCard'
import { StepCard } from '@/components/home/StepCard'
import {
  type CardData,
  PH,
  defaultGardenCards,
  defaultQuickCards,
  defaultSteps,
  pachtFromPage,
  pickCards,
  pickLink,
} from '@/components/home/content'
import { Img } from '@/components/Img'
import { NavLink } from '@/components/layout/NavLink'
import { Button } from '@/components/ui/button'
import { formatDate } from '@/lib/format'
import type { News, Seiten, Startseite, Termine } from '@/payload-types'

/** Schaltfläche, die auf einen Link zeigt (intern oder extern). */
function LinkButton({ link, ...props }: { link: { label: string; href: string; external: boolean } } & React.ComponentProps<typeof Button>) {
  return (
    <Button asChild {...props}>
      <NavLink href={link.href} external={link.external}>
        {link.label}
      </NavLink>
    </Button>
  )
}

/* ---------- 3. Hero ---------- */
export function Hero({ s, latest }: { s: Startseite; latest?: News }) {
  const primary = pickLink(s.heroPrimary, { label: 'Garten anfragen', href: '/garten-pachten' })
  const secondary = pickLink(s.heroSecondary, { label: 'Termine ansehen', href: '/termine' })
  const image = typeof s.heroImage === 'object' ? s.heroImage : null
  return (
    <section aria-labelledby="hero-titel" className="section-y pt-8 lg:pt-14">
      <div className="container-page grid items-center gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
        <div>
          <p className="text-eyebrow text-forest">
            <span lang="de">Willkommen</span> · <span lang="fr">Bienvenue</span> · <span lang="en">Welcome</span>
          </p>
          <h1 id="hero-titel" className="mt-4 text-h1 text-forest">
            {s.heroTitle || `Gärtnern, ernten und feiern im Quartier ${PH}`}
          </h1>
          <p className="mt-5 max-w-xl text-lead text-ink-soft">
            {s.heroIntro || `Der Familiengartenverein verpachtet Gärten, organisiert Kurse und Anlässe und pflegt die Gemeinschaft. ${PH}`}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <LinkButton link={primary} className="w-full sm:w-auto" />
            <LinkButton link={secondary} variant="outline" className="w-full sm:w-auto" />
          </div>
        </div>
        <div className="relative">
          <div className="relative aspect-[4/3] overflow-hidden rounded-panel bg-sage-200 lg:aspect-[5/4]">
            {image ? (
              <Img media={image} fill priority sizes="(min-width: 1024px) 560px, 100vw" className="object-cover" />
            ) : (
              <ImagePlaceholder label={`Foto folgt ${PH}`} />
            )}
          </div>
          {latest && (
            <aside
              aria-label="Direkt zu Aktuelles"
              className="relative mt-4 rounded-card border border-line bg-paper p-5 shadow-hover lg:absolute lg:-left-12 lg:bottom-8 lg:mt-0 lg:w-[320px]"
            >
              <p className="text-eyebrow text-forest">Direkt zu Aktuelles</p>
              <p className="mt-2 font-display text-[19px] font-semibold leading-tight text-ink">
                <Link href={`/news/${latest.slug}`} className="underline-offset-4 hover:underline">
                  {latest.title}
                </Link>
              </p>
              <p className="mt-1 text-sm text-ink-soft">{formatDate(latest.publishedAt)}</p>
            </aside>
          )}
        </div>
      </div>
    </section>
  )
}

/* ---------- 4. Schnellzugriff ---------- */
function CardGrid({ cards }: { cards: CardData[] }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
      {cards.map((c) => (
        <li key={c.title}>
          <QuickCard {...c} />
        </li>
      ))}
    </ul>
  )
}

export function QuickAccess({ s }: { s: Startseite }) {
  return (
    <section aria-labelledby="schnellzugriff-titel" className="pb-14 lg:pb-20">
      <div className="container-page">
        <h2 id="schnellzugriff-titel" className="sr-only">
          Schnellzugriff
        </h2>
        <CardGrid cards={pickCards(s.quickLinks, defaultQuickCards)} />
      </div>
    </section>
  )
}

/* ---------- 5. Aktuelles und Termine ---------- */
export function NewsAndEvents({ posts, termine }: { posts: News[]; termine: Termine[] }) {
  return (
    <section aria-labelledby="aktuelles-titel" className="section-y pt-0">
      <div className="container-page">
        <h2 id="aktuelles-titel" className="text-h2 text-forest">
          Aktuelles und Termine
        </h2>
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px] lg:gap-10">
          <div>
            <div className="mb-5 flex items-baseline justify-between gap-4">
              <h3 className="text-h3 text-ink">Neueste Beiträge</h3>
              <Link href="/news" className="font-semibold text-accent underline underline-offset-4 hover:text-accent-dark">
                Alle Beiträge ansehen
              </Link>
            </div>
            {posts.length === 0 ? (
              <p className="rounded-card border border-line bg-paper p-6 text-ink-soft">Noch keine Beiträge veröffentlicht. {PH}</p>
            ) : (
              <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {posts.map((p) => (
                  <li key={p.id}>
                    <PostCard post={p} />
                  </li>
                ))}
              </ul>
            )}
          </div>
          <aside aria-labelledby="termine-titel" className="self-start rounded-panel bg-forest p-6 text-white sm:p-8">
            <h3 id="termine-titel" className="text-h3 text-white">
              Nächste Termine
            </h3>
            {termine.length === 0 ? (
              <p className="mt-4 text-on-dark-soft">Zurzeit sind keine Termine eingetragen.</p>
            ) : (
              <ul className="mt-4 space-y-2">
                {termine.map((t) => (
                  <EventRow key={t.id} termin={t} />
                ))}
              </ul>
            )}
            <Button asChild variant="secondary" className="mt-6 w-full sm:w-auto">
              <Link href="/termine">Alle Termine ansehen</Link>
            </Button>
          </aside>
        </div>
      </div>
    </section>
  )
}

/* ---------- 6. Pacht in drei Schritten ---------- */
export function PachtSteps({ page, cta }: { page: Seiten | null; cta: { label: string; href: string; external: boolean } }) {
  const { intro, steps } = pachtFromPage(page?.layout)
  const list = steps ?? defaultSteps
  return (
    <section aria-labelledby="pacht-titel" className="bg-sage-100 section-y">
      <div className="container-page">
        <div className="max-w-2xl">
          <h2 id="pacht-titel" className="text-h2 text-forest">
            Pacht in drei Schritten
          </h2>
          <p className="mt-4 text-lead text-ink-soft">
            {intro || `So kommen Sie zu einem Garten im Quartier – einfach und persönlich. ${PH}`}
          </p>
        </div>
        <ol className="mt-8 grid gap-5 sm:grid-cols-3">
          {list.map((st, i) => (
            <StepCard key={st.title} n={i + 1} title={st.title} text={st.text} />
          ))}
        </ol>
        <LinkButton link={cta} className="mt-8 w-full sm:w-auto" />
      </div>
    </section>
  )
}

/* ---------- 7. Rund ums Gärtnern ---------- */
export function GardenLinks({ s }: { s: Startseite }) {
  return (
    <section aria-labelledby="garten-titel" className="section-y">
      <div className="container-page">
        <h2 id="garten-titel" className="mb-8 text-h2 text-forest">
          {s.gardenTitle || 'Rund ums Gärtnern'}
        </h2>
        <CardGrid cards={pickCards(s.gardenLinks, defaultGardenCards)} />
      </div>
    </section>
  )
}

/* ---------- 8. Mitmachen ---------- */
export function JoinBand({ s }: { s: Startseite }) {
  const primary = pickLink(s.joinPrimary, { label: 'Mitmachen', href: '/vorstand' })
  const secondary = pickLink(s.joinSecondary, { label: 'Kontakt aufnehmen', href: '/kontakt' })
  return (
    <section aria-labelledby="mitmachen-titel" className="bg-forest text-white section-y">
      <div className="container-page flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <h2 id="mitmachen-titel" className="text-h2 text-white">
            {s.joinTitle || `Machen Sie mit! ${PH}`}
          </h2>
          <p className="mt-4 text-lead text-on-dark-soft">
            {s.joinText || `Ob im Garten, bei Anlässen oder im Vorstand: Wir freuen uns über jede helfende Hand. ${PH}`}
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <LinkButton link={primary} variant="secondary" className="w-full sm:w-auto" />
          <LinkButton link={secondary} variant="inverseOutline" className="w-full sm:w-auto" />
        </div>
      </div>
    </section>
  )
}
