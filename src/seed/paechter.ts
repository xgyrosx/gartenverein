import { type Ctx, type Layout, heading, paragraph, richText } from './helpers'

const rt = (...t: string[]) => richText(...t.map((x) => paragraph(x)))

/** Dokumente (Platzhalter-PDFs) und Seiten für Pächter:innen. */
export async function seedPaechter(ctx: Ctx) {
  const { count, uploadPdf, page, pageId } = ctx

  if ((await count('dokumente')) === 0) {
    const hinweis = 'Platzhalter-Dokument. Der Verein ersetzt es durch das echte PDF.'
    await uploadPdf('gartenordnung-beispiel.pdf', 'Gartenordnung (Beispiel)', 'reglement', 'Stand: Beispiel', [hinweis, 'Hier steht spaeter die gueltige Gartenordnung.'])
    await uploadPdf('anmeldung-garten-beispiel.pdf', 'Anmeldeformular Garten (Beispiel)', 'formular', 'Stand: Beispiel', [hinweis, 'Online-Formular folgt.'])
    await uploadPdf('baugesuch-beispiel.pdf', 'Formular Baugesuch (Beispiel)', 'formular', 'Stand: Beispiel', [hinweis, 'Online-Formular folgt.'])
    await uploadPdf('parkplatzplan-beispiel.pdf', 'Parkplatzplan (Beispiel)', 'information', 'Stand: Beispiel', [hinweis])
    ctx.payload.logger.info('Dokumente angelegt.')
  }

  const formularHinweis: Layout[number] = {
    blockType: 'hinweisbox',
    variant: 'hinweis',
    title: 'Online-Formular folgt',
    content: rt('Online-Formular folgt, bis dahin PDF-Download.'),
  }
  const akk = (title: string, items: [string, string][]): Layout[number] => ({
    blockType: 'akkordeon',
    title,
    items: items.map(([t, c]) => ({ title: t, content: rt(c) })),
  })

  await page('gartenordnung', 'Gartenordnung', [
    { blockType: 'text', content: richText(heading('Regeln für ein gutes Miteinander'), paragraph('Platzhalter: Die wichtigsten Regeln im Überblick. Die verbindliche Fassung finden Sie als PDF.')) },
    akk('Die wichtigsten Themen', [
      ['Bewirtschaftung', 'Platzhalter: Der Garten wird ordentlich bewirtschaftet, Wege und Zäune bleiben gepflegt.'],
      ['Grillieren und Feuer', 'Platzhalter: Grillieren ist an bezeichneten Stellen erlaubt. Offenes Feuer nur nach Absprache.'],
      ['Ruhezeiten', 'Platzhalter: Es gelten die ortsüblichen Ruhezeiten. Lärmige Arbeiten sind zu vermeiden.'],
      ['Abfall und Kompost', 'Platzhalter: Gartenabfälle gehören auf die Kompostplätze, Restmüll wird mitgenommen.'],
    ]),
    { blockType: 'dokumentenliste', title: 'Reglement zum Herunterladen', category: 'reglement' },
  ])
  await page('parkplaetze-bussen', 'Parkplätze und Bussen', [
    akk('Häufige Fragen', [
      ['Wo darf ich parken?', 'Platzhalter: Parkplätze befinden sich bei den Arealen. Die Zufahrten müssen frei bleiben.'],
      ['Was gilt für Be- und Entladen?', 'Platzhalter: Kurzes Halten zum Be- und Entladen ist erlaubt, danach ist das Fahrzeug zu entfernen.'],
      ['Wann gibt es Bussen?', 'Platzhalter: Bei Verstössen gegen die Parkordnung kann der Vorstand Bussen aussprechen. Die Höhe nennt das Reglement.'],
    ]),
    { blockType: 'dokumentenliste', title: 'Pläne und Informationen', category: 'information' },
    {
      blockType: 'karten',
      cards: [{ title: 'Areale und Zufahrt', text: 'Adressen und Karte zu jedem Areal.', label: 'Zu den Arealen', linkType: 'adresse', url: '/areale' }],
    },
  ])
  await page('bauen-baugesuche', 'Bauen und Baugesuche', [
    { blockType: 'text', content: richText(heading('Vor dem Bauen: bitte melden'), paragraph('Platzhalter: Bauliche Änderungen im Garten brauchen eine Bewilligung des Vereins und teils der Stadt.')) },
    akk('Gut zu wissen', [
      ['Was darf ich bauen?', 'Platzhalter: Kleinere Geräteschuppen und Gewächshäuser sind im Rahmen des Reglements möglich.'],
      ['Wie reiche ich ein Baugesuch ein?', 'Platzhalter: Das Formular ausfüllen und dem Vorstand schicken. Er prüft das Gesuch und gibt Bescheid.'],
    ]),
    formularHinweis,
    { blockType: 'dokumentenliste', title: 'Formulare', category: 'formular' },
  ])
  await page('formulare-downloads', 'Formulare und Downloads', [
    formularHinweis,
    { blockType: 'dokumentenliste', title: 'Alle Dokumente' },
  ])
  await page('materialhuette-infos', 'Materialhütte – Infos für Pächter:innen', [
    { blockType: 'text', content: richText(paragraph('Platzhalter: So leihen Sie Werkzeug aus und was Sie dabei beachten müssen. Werkzeug bitte sauber und rechtzeitig zurückbringen.')) },
    { blockType: 'oeffnungszeiten', title: 'Öffnungszeiten' },
  ])

  await page('fuer-paechter', 'Für Pächter:innen', [
    { blockType: 'text', content: richText(paragraph('Alles, was Sie als Pächterin oder Pächter wissen müssen: Regeln, Formulare und praktische Hinweise.')) },
    {
      blockType: 'karten',
      cards: [
        { title: 'Gartenordnung', text: 'Regeln für ein gutes Miteinander.', label: 'Zur Gartenordnung', linkType: 'seite', page: await pageId('gartenordnung') },
        { title: 'Parkplätze und Bussen', text: 'Wo Sie parken dürfen und was bei Verstössen gilt.', label: 'Mehr erfahren', linkType: 'seite', page: await pageId('parkplaetze-bussen') },
        { title: 'Bauen und Baugesuche', text: 'Was erlaubt ist und wie Sie ein Gesuch einreichen.', label: 'Mehr erfahren', linkType: 'seite', page: await pageId('bauen-baugesuche') },
        { title: 'Formulare und Downloads', text: 'Alle Formulare und Reglemente als PDF.', label: 'Zu den Downloads', linkType: 'seite', page: await pageId('formulare-downloads') },
        { title: 'Materialhütte', text: 'Werkzeug ausleihen und Öffnungszeiten.', label: 'Zur Materialhütte', linkType: 'seite', page: await pageId('materialhuette-infos') },
        { title: 'Termine', text: 'Arbeitseinsätze, Kurse und Anlässe.', label: 'Zu den Terminen', linkType: 'adresse', url: '/termine' },
      ],
    },
  ])
}
