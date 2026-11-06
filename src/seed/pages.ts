import { type Ctx, type Layout, heading, paragraph, richText } from './helpers'

const platzhalter = (text: string): Layout => [{ blockType: 'text', content: richText(paragraph(text)) }]

/** Alle Seiten (werden nur angelegt, wenn der Slug noch fehlt). */
export async function seedPages(ctx: Ctx) {
  const { upload, page, pageId } = ctx

  // Startseite
  const hero = await upload(
    'beispiel-garten-hero.png',
    'Gezeichnete Hügellandschaft mit Sonne über den Gartenparzellen',
    ['#7fb069', '#5a9a4a', '#3f7d3a'],
  )
  // Grundseiten zuerst, damit Links auf sie zeigen können
  await page('garten-pachten', 'Garten pachten', [
    {
      blockType: 'text',
      content: richText(
        heading('Ihr eigener Garten im Quartier'),
        paragraph(
          'Bei uns können Sie eine Parzelle pachten, ein Gartenhaus übernehmen oder im Gemeinschaftsgarten mitmachen. Hier sehen Sie, wie es abläuft, was es kostet und was aktuell frei ist.',
        ),
      ),
    },
    {
      blockType: 'ablauf',
      title: 'In drei Schritten zum Garten',
      steps: [
        { title: 'Kontakt aufnehmen', text: 'Melden Sie sich beim Vorstand und nennen Sie Ihren Wunsch (Grösse, Art des Gartens).' },
        { title: 'Garten ansehen', text: 'Wir zeigen Ihnen einen freien Garten und beantworten Ihre Fragen.' },
        { title: 'Pachtvertrag abschliessen', text: 'Bei Einigkeit unterzeichnen Sie den Pachtvertrag und erhalten die Schlüssel.' },
      ],
    },
    { blockType: 'preistabelle', title: 'Kosten' },
    { blockType: 'angebotsliste', title: 'Aktuelle Angebote' },
    {
      blockType: 'hinweisbox',
      variant: 'hinweis',
      title: 'Online-Anmeldung folgt',
      content: richText(paragraph('Eine Anmeldung über die Website ist in Vorbereitung. Bis dahin melden Sie sich bitte direkt beim Vorstand.')),
    },
  ])
  await page('fuer-paechter', 'Für Pächter:innen', platzhalter('Platzhalter – wird in R9 ausgebaut.'))

  await page('start', 'Startseite', [
    {
      blockType: 'hero',
      title: 'Willkommen im Familiengartenverein Zürich-Affoltern',
      subtitle: 'Gemeinsam gärtnern, ernten und feiern – mitten im Quartier.',
      image: hero.id,
      hasButton: true,
      button: { label: 'Garten pachten', linkType: 'seite', page: await pageId('garten-pachten') },
    },
    {
      blockType: 'karten',
      title: 'Schnell zum Ziel',
      cards: [
        { title: 'Garten pachten', text: 'Ablauf, Kosten und freie Gärten auf einen Blick.', label: 'Zum Pachten', linkType: 'seite', page: await pageId('garten-pachten') },
        { title: 'Termine', text: 'Kurse, Anlässe und Arbeitseinsätze im Überblick.', label: 'Zu den Terminen', linkType: 'adresse', url: '/termine' },
        { title: 'Für Pächter:innen', text: 'Reglemente, Formulare und praktische Infos.', label: 'Zum Pächterbereich', linkType: 'seite', page: await pageId('fuer-paechter') },
      ],
    },
    { blockType: 'neueNews', title: 'Aktuelles', count: 3 },
    { blockType: 'naechsteTermine', title: 'Nächste Termine', count: 3 },
    { blockType: 'diesenMonat', title: 'Diesen Monat im Garten', count: 3 },
  ])

  const bild = await upload(
    'beispiel-ueber-uns.png',
    'Gezeichnete Wiese mit Gartenhäuschen im Hintergrund',
    ['#b5c99a', '#87a96b', '#4f772d'],
  )
  await page('ueber-uns', 'Über uns', [
    {
      blockType: 'text',
      content: richText(
        heading('Wer wir sind'),
        paragraph('Der Familiengartenverein Zürich-Affoltern besteht seit über 50 Jahren. Heute bewirtschaften rund 40 Mitglieder die Parzellen am Hang oberhalb des Dorfes.'),
        paragraph('Der Vorstand organisiert Arbeitseinsätze, Gartenkurse und das jährliche Sommerfest. Alle Aufgaben im Verein werden freiwillig übernommen.'),
      ),
    },
    {
      blockType: 'bildText',
      image: bild.id,
      imagePosition: 'links',
      content: richText(
        heading('Das Areal'),
        paragraph('Auf dem Areal gibt es Parzellen in drei Grössen, ein Vereinshaus mit Küche, Kompostplätze und eine Wasserstelle für alle.'),
      ),
    },
    {
      blockType: 'hinweisbox',
      variant: 'info',
      title: 'Mitglied werden',
      content: richText(paragraph('Freie Parzellen vergeben wir nach Warteliste. Sprechen Sie uns bei einem Besuch im Garten an, dann nehmen wir Sie gerne auf.')),
    },
  ])

  await page('vorstand', 'Vorstand und Ansprechpersonen', [
    { blockType: 'text', content: richText(paragraph('Der Vorstand führt den Verein. Für Fragen zu einem Areal sind die Ansprechpersonen da.')) },
    { blockType: 'personenraster', title: 'Vorstand', group: 'vorstand' },
    { blockType: 'personenraster', title: 'Ansprechpersonen', group: 'ansprechperson' },
    { blockType: 'personenraster', title: 'Ehrenmitglieder', group: 'ehrenmitglied' },
  ])
  await page('kontakt', 'Kontakt', [
    { blockType: 'text', content: richText(paragraph('Haben Sie Fragen zum Verein oder zu einem Garten? Wir freuen uns über Ihre Nachricht. Ein Kontaktformular ist in Vorbereitung.')) },
    { blockType: 'kontakt', title: 'So erreichen Sie uns' },
  ])
  await page('materialhuette', 'Materialhütte', [
    {
      blockType: 'text',
      content: richText(
        heading('Werkzeug und Material für alle Pächter:innen'),
        paragraph('In der Materialhütte können Pächterinnen und Pächter Werkzeuge ausleihen und Material beziehen. Bitte bringen Sie Geliehenes sauber zurück.'),
      ),
    },
    { blockType: 'oeffnungszeiten', title: 'Öffnungszeiten' },
  ])
  await page('vereinshuette', 'Vereinshütte', [
    {
      blockType: 'text',
      content: richText(
        heading('Feiern im Garten'),
        paragraph('Die Vereinshütte steht Mitgliedern für private Anlässe zur Verfügung. Sie bietet Platz für rund 30 Personen und hat eine kleine Küche.'),
      ),
    },
    {
      blockType: 'tabelle',
      title: 'Preise (Beispiel – vom Verein zu bestätigen)',
      col1: 'Leistung',
      col2: 'Preis',
      col3: 'Hinweis',
      rows: [
        { a: 'Miete halber Tag', b: 'CHF 120', c: 'Beispiel' },
        { a: 'Miete ganzer Tag', b: 'CHF 200', c: 'Beispiel' },
        { a: 'Reinigung (falls nicht selbst)', b: 'CHF 60', c: 'Beispiel' },
      ],
    },
    {
      blockType: 'hinweisbox',
      variant: 'hinweis',
      title: 'Anfrage folgt online',
      content: richText(paragraph('Eine Online-Anfrage ist in Vorbereitung. Bis dahin wenden Sie sich bitte an den Vorstand.')),
    },
  ])
  await page('verein', 'Verein', [
    { blockType: 'text', content: richText(paragraph('Wer wir sind, wo wir gärtnern und wie Sie uns erreichen.')) },
    {
      blockType: 'karten',
      cards: [
        { title: 'Über uns', text: 'Geschichte und Leitbild des Vereins.', label: 'Mehr erfahren', linkType: 'seite', page: await pageId('ueber-uns') },
        { title: 'Vorstand und Ansprechpersonen', text: 'Wer im Verein Verantwortung trägt.', label: 'Zum Vorstand', linkType: 'seite', page: await pageId('vorstand') },
        { title: 'Areale', text: 'Unsere Gartenareale mit Adressen und Karte.', label: 'Zu den Arealen', linkType: 'adresse', url: '/areale' },
        { title: 'Materialhütte', text: 'Werkzeug ausleihen, Öffnungszeiten.', label: 'Zur Materialhütte', linkType: 'seite', page: await pageId('materialhuette') },
        { title: 'Vereinshütte', text: 'Für Feiern und Anlässe mieten.', label: 'Zur Vereinshütte', linkType: 'seite', page: await pageId('vereinshuette') },
        { title: 'Kontakt', text: 'Adresse, E-Mail und Telefon.', label: 'Zum Kontakt', linkType: 'seite', page: await pageId('kontakt') },
      ],
    },
  ])
  await page('aktuelles', 'Aktuelles und Termine', [
    { blockType: 'neueNews', title: 'Neueste News', count: 3 },
    { blockType: 'naechsteTermine', title: 'Nächste Termine', count: 4 },
  ])
  await page('impressum', 'Impressum', platzhalter('Platzhalter – das Impressum ist vom Verein zu ergänzen.'))
  await page('datenschutz', 'Datenschutz', platzhalter('Platzhalter – die Datenschutzerklärung ist vom Verein zu ergänzen.'))
}
