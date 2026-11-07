import type { Ctx } from './helpers'

/** Inhalte des Globals «Startseite» (nur, wenn noch leer). Texte sind Beispiele, die der Verein ersetzt. */
export async function seedStartseite({ payload, upload, seite }: Ctx) {
  const s = await payload.findGlobal({ slug: 'startseite' })
  if (s.heroTitle) return
  const hero = await upload(
    'beispiel-startseite-hero.png',
    'Gezeichnete Hügellandschaft mit Sonne über den Gartenparzellen (Platzhalterbild)',
    ['#7fb069', '#5a9a4a', '#3f7d3a'],
  )
  const adresse = (label: string, url: string) => ({ label, linkType: 'adresse' as const, url })
  const card = (icon: string, title: string, text: string, target: { linkType: 'seite'; page: number } | { linkType: 'adresse'; url: string }) => ({
    icon,
    title,
    text,
    ...target,
  })
  const page = async (slug: string) => ({ linkType: 'seite' as const, page: (await seite('', slug)).page })
  await payload.updateGlobal({
    slug: 'startseite',
    context: { disableRevalidate: true },
    data: {
      utilitySlogan: 'Gärtnern, ernten und feiern im Quartier',
      heroTitle: 'Ihr Garten mitten in Zürich-Affoltern',
      heroIntro: 'Wir verpachten Gärten an Familien und Einzelpersonen, organisieren Kurse und Anlässe und pflegen die Gemeinschaft im Quartier.',
      heroImage: hero.id,
      heroPrimary: { ...(await seite('Garten anfragen', 'garten-pachten')) },
      heroSecondary: adresse('Termine ansehen', '/termine'),
      quickLinks: [
        card('sprout', 'Garten pachten', 'Ablauf, Kosten und freie Gärten.', await page('garten-pachten')),
        card('calendar', 'Termine', 'Kurse, Anlässe und Arbeitseinsätze.', { linkType: 'adresse', url: '/termine' }),
        card('document', 'Formulare', 'Anmeldungen und Reglemente als PDF.', await page('formulare-downloads')),
        card('house', 'Hütten', 'Material- und Vereinshütte.', await page('vereinshuette')),
      ],
      gardenTitle: 'Rund ums Gärtnern',
      gardenLinks: [
        card('book', 'Gut zu wissen', 'Tipps und Ratgeber für Ihren Garten.', { linkType: 'adresse', url: '/gartenwissen' }),
        card('bug', 'Tiere im Garten', 'Nützlinge, Gäste und wie wir sie fördern.', { linkType: 'adresse', url: '/gartenwissen/kategorie/tiere-insekten' }),
        card('images', 'Bildergalerie', 'Fotos aus dem Vereinsleben.', { linkType: 'adresse', url: '/galerie' }),
        card('megaphone', 'Inserate und Dies und Das', 'Neuigkeiten und Aktuelles aus dem Verein.', { linkType: 'adresse', url: '/news' }),
      ],
      joinTitle: 'Machen Sie mit!',
      joinText: 'Ob im Garten, bei Anlässen oder im Vorstand: Wir freuen uns über jede helfende Hand.',
      joinPrimary: { ...(await seite('Mitmachen', 'vorstand')) },
      joinSecondary: { ...(await seite('Kontakt aufnehmen', 'kontakt')) },
    } as never,
  })
  payload.logger.info('Startseite angelegt.')
}
