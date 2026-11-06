# Folgeaufgabe: Familiengartenverein Zürich-Affoltern – Umbau nach Vorbild der bestehenden Website

Voraussetzung: R0–R4 aus dem ersten Prompt (PROMPT.md) sind abgeschlossen und committet. Prüfe zu Beginn kurz mit `git log --oneline` und einem Blick auf `src/collections` und `src/globals`, was existiert. Baue darauf auf, erweitere bestehende Collections/Globals, statt Doppeltes anzulegen.

## Ziel
Die bestehende Vereinswebsite (WordPress, ca. 180 Menüeinträge) wird als schlanke, moderne Seite neu aufgebaut. Inhalte werden im CMS gepflegt, NICHT im Code. Redaktion = nicht-technische Vereinsmitglieder.

Weiterhin NICHT Teil dieser Releases: Mitgliederbereich/Login, Online-Formulare, E-Mail-Versand, Newsletter, Bestellungen, Inserate mit Einreichung. Diese kommen später (R13–R15). Formular-Verweise vorerst als normale Links oder Hinweistext («Online-Anmeldung folgt»).

## Technische Vorgaben (zusätzlich zum ersten Prompt)
- Payload 3.x und Next.js-Version unverändert lassen. Kein Upgrade.
- Tailwind CSS; UI-Bausteine mit shadcn/ui (nur die wirklich benötigten Komponenten per CLI hinzufügen, z. B. Accordion, Navigation/Sheet, Button, Card).
- Schrift via `next/font` selbst gehostet (keine Google-Fonts-Einbindung zur Laufzeit).
- Bilder immer über `next/image`, Alt-Text Pflicht.
- Barrierefreiheit nach WCAG 2.2 AA: semantisches HTML, Skip-Link, sichtbarer Fokus, Tastaturbedienung, ausreichende Kontraste, ein `h1` pro Seite.
- Seiten statisch generieren, nach Veröffentlichung im CMS gezielt revalidieren (On-Demand-Revalidierung wie in R4).
- Keine Tracker, keine externen Skripte, keine Cookies, keine Google-Maps-Einbettung.
- Seed-Inhalte: kurze, neutrale Platzhaltertexte auf Deutsch (Schweiz, kein ß). KEINE Originaltexte der alten Seite kopieren, KEINE echten Personendaten (Namen, Telefonnummern), Preise nur als markierte Beispielwerte («Beispiel – vom Verein zu bestätigen»).
- Redaktionsfreundlich: deutsche Labels, Hilfetexte bei jedem nicht selbsterklärenden Feld, sinnvolle Standardwerte, Pflichtfelder nur wo nötig.

## Arbeitsweise (ressourcenschonend)
- Pro Release: umsetzen, `pnpm tsc --noEmit` und `pnpm build` ausführen (Fehler beheben), `pnpm generate:types` und `pnpm generate:importmap` falls Collections/Blocks geändert wurden, Git-Commit «R<n> – <Titel>», dann STOPPEN und auf mein «weiter» warten.
- Nach jedem Release max. 5 Zeilen Bericht: was geht jetzt, was soll ich im Browser prüfen, getroffene Annahmen in einem Satz.
- In `docs/redaktion.md` pro Release 3–6 Zeilen ergänzen (neuer Bereich, wie bedient man ihn).
- Keine langen Erklärungen, keinen Code im Chat wiederholen, `node_modules` nie durchsuchen, keine Test-Suites.
- Unklarheiten: sinnvollen Default wählen und erwähnen. Nur bei grossen Folgekosten nachfragen.

## Releases

### R5 – Design-Fundament und Navigation
- Design-Tokens zentral (Tailwind-Theme/CSS-Variablen): Grün-/Erdtöne, Schriftgrössen, Abstände, Radius. Logo-Platzhalter in `Vereinsdaten`-Global, später durch echtes Logo ersetzbar.
- Global `Navigation` (ersetzt/erweitert `Kopfzeile`): bis zu 6 Hauptpunkte, je optional mit Unterpunkten (max. 1 Ebene, kein Drittlevel), Ziel = Seite (Relation) oder externer Link, ein Hauptpunkt als hervorgehobener Button («Garten pachten») markierbar.
- Global `Hinweisbanner`: Text, Link optional, Typ (Info/Warnung), Sichtbar von–bis, Ein/Aus. Wird oberhalb des Headers angezeigt.
- Header mit Mobile-Menü (Sheet), Footer aus Global `Fusszeile` (Kontakt, Impressum, Datenschutz, Partnerlinks), Skip-Link.
- Platzhalter-Seiten für alle geplanten Hauptpunkte anlegen (Seed), damit Navigation klickbar ist: Garten pachten, Verein, Aktuelles & Termine, Für Pächter:innen, Gartenwissen.

### R6 – Startseite und «Garten pachten»
- Global `Konditionen`: Pachtarten mit Jahrespacht von/bis, Aufnahmegebühr, Kaution, Hinweistext (Beispielwerte). Einzige Quelle für Preise, wird per Block `Preistabelle` überall eingebunden.
- Collection `Gartenangebote`: Typ (Parzelle mit Haus zur Miete / Haus zum Kauf / Gemeinschaftsgarten), Status (verfügbar / nur Warteliste / ausgebucht), Fläche, Areal (Relation, vorerst optional), Hinweis. Status wird als Text-Badge angezeigt (nie nur über Farbe oder Bild).
- Neue Blocks: `Ablauf` (nummerierte Schritte), `Preistabelle`, `Angebotsliste` (zeigt Gartenangebote), `Karten` (Info-Karten mit Titel, Text, Link).
- Startseite aufbauen: Hero mit Hauptbutton, 3 Einstiegskarten (Garten pachten, Termine, Für Pächter:innen), letzte News, nächste Termine, Abschnitt «Diesen Monat im Garten» (vorerst Platzhalter, wird in R10 befüllt).
- Seite «Garten pachten»: Einleitung, Ablauf in 3 Schritten, Preistabelle, Angebotsliste, Hinweis auf spätere Online-Anmeldung.

### R7 – Verein, Areale, Hütten
- Collection `Personen`: Name, Funktion, Gruppe (Vorstand / Ansprechperson / Ehrenmitglied), Foto optional, Kontaktangabe als Freitext, Sortierung. Block `Personenraster` (nach Gruppe filterbar).
- Collection `Areale` (6 Areale als Seed-Platzhalter): Name, Kurzbeschrieb, Adresse, Koordinaten (optional), Bilder, Infos zu Parkplätzen, Detailseite `/areale/[slug]` plus Übersicht. Link «Route/Karte öffnen» (OpenStreetMap-Link, keine Einbettung).
- Global `Oeffnungszeiten` (Materialhütte): reguläre Zeiten pro Wochentag, Ausnahmen mit Datum und Hinweis. Block `Oeffnungszeiten` zeigt die Werte, sodass sie nur an einer Stelle gepflegt werden.
- Seiten (per Seed, mit bestehenden Blocks): Über uns, Vorstand & Ansprechpersonen, Kontakt, Materialhütte, Vereinshütte (Beschrieb, Preise als Tabelle, Hinweis «Anfrage folgt online»).

### R8 – Aktuelles und Termine
- Collection `Termine` aus R3 erweitern: Kategorie (Kurs / Anlass / Arbeitseinsatz / Betrieb), Enddatum/-zeit, Areal oder Ort, «Anmeldung nötig» mit Hinweistext/Link, Dokument-Anhang optional.
- Terminseite: Filter «Anstehende» und «Archiv» (nach Jahr), Gruppierung nach Monat, Detailseite pro Termin.
- Kalender-Export: Route `/termine/[slug]/ics` und `/termine/kalender.ics` (ICS von Hand generieren, keine zusätzliche Library nötig).
- Strukturierte Daten (JSON-LD `Event`) auf Termin-Detailseiten.
- News aus R3: Archivseite mit Seitennummerierung, Teaser mit Bild, Bildunterschrift/Bildnachweis-Feld.
- Block `Terminliste` (Anzahl, Kategorie wählbar) und `Newsliste` auf Startseite und Aktuelles-Seite einsetzen.

### R9 – Für Pächter:innen
- Collection `Dokumente`: Titel, Datei (PDF), Kategorie (Formular / Reglement / Information), Version/Stand, «gültig bis» optional. Block `Dokumentenliste` mit Kategorie-Filter, Dateigrösse und Dateityp sichtbar.
- Neuer Block `Akkordeon` (Frage/Antwort bzw. Thema/Text mit Rich Text), für Themen wie Parkplätze, Bussen, Grillieren, Bauen.
- Seiten (Seed-Struktur, Platzhaltertexte): Für Pächter:innen (Übersicht mit Karten), Gartenordnung, Parkplätze & Bussen, Bauen & Baugesuche, Formulare & Downloads, Materialhütte-Infos.
- Hinweis auf jeder Formularseite: «Online-Formular folgt, bis dahin PDF-Download».

### R10 – Gartenwissen
- Collection `Ratgeber`: Titel, Slug, Kategorie (Boden & Düngen / Pflanzen & Ernte / Unkraut / Tiere & Insekten / Beeren / Allgemein), Monate (Mehrfachauswahl, optional), Teaserbild, Inhalt (Rich Text), verwandte Artikel (Relation).
- Übersicht `/gartenwissen` mit Kategorie-Filter, Kartenraster und Suche (offizielles Payload-Search-Plugin, nur `Ratgeber` und `Seiten` indizieren).
- Ansicht «Gartenjahr»: Seite mit Monatsauswahl, zeigt Ratgeber-Artikel des gewählten Monats. Startseiten-Abschnitt «Diesen Monat im Garten» nutzt den aktuellen Monat.
- Seed: 10 Pilotartikel (je 2–3 Sätze Platzhaltertext) über alle Kategorien. Die restliche Migration übernimmt die Redaktion.

### R11 – Galerie
- Collection `Alben`: Titel, Jahr, Datum optional, Beschreibung, Bilder (Mehrfach-Upload, je Alt-Text/Bildnachweis).
- Galerie-Übersicht nach Jahr gruppiert, Albumseite mit Raster und Lightbox (PhotoSwipe, tastaturbedienbar, Alt-Text sichtbar).
- Bildoptimierung: Bildgrössen in der Media-Collection definieren, Lazy Loading, keine Bilder über 2000 px Breite ausliefern.

### R12 – SEO, Redirects, Go-Live-Reife
- SEO-Plugin für `Seiten`, `News`, `Termine`, `Ratgeber`, `Areale` (Titel/Beschreibung/Vorschaubild), sinnvolle Standardwerte aus dem Inhalt.
- Sitemap und `robots.txt`; Open-Graph-Bilder (`next/og` oder Fallback-Bild).
- Redirects-Plugin einrichten. Erstelle `docs/redirects-alt-neu.csv` (Spalten: alte URL, neue URL, Bemerkung). Lies die alten URLs aus `https://www.fgvza.ch/wp-sitemap.xml` bzw. dem Menü der alten Seite, falls Netzzugriff möglich. Wenn nicht: Vorlage mit 10 Beispielzeilen erstellen und mich um die URL-Liste bitten. Zuordnung: Wissensseiten → `/gartenwissen/<slug>`, Termine/Anlässe → `/termine/<slug>`, Formulare → `/fuer-paechter/formulare`, Rest → passende Hauptseite.
- Checks: Lighthouse (Performance, Accessibility, SEO) für Startseite, Termine, Gartenwissen, Garten pachten. Ergebnisse in 5 Zeilen berichten, nur Befunde unter 90 Punkten beheben.
- `docs/entwicklung.md` aktualisieren (Struktur, Seed, Revalidierung, offene Punkte R13–R15).

## Nicht jetzt (nur zur Orientierung)
R13 Formulare und E-Mail (Form Builder, Spamschutz, Gartenanmeldung datensparsam), R14 Mitgliederbereich (Login, Rollen, Freigabe, geschützte Dokumente), R15 Betrieb (Deployment, Backups, Schulung). Nicht vorbereiten, nicht als Platzhalter-Code anlegen.

Beginne jetzt mit R5.
