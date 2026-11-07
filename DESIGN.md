# DESIGN.md – Familiengartenverein Zürich-Affoltern

Verbindliche Design-Vorgaben für die Vereinswebsite (Next.js + Payload CMS). Bei jeder Umsetzung von Seiten oder Komponenten sind diese Vorgaben einzuhalten. Referenz: Design-Canvas «FGV Zürich-Affoltern – Redesign Startseite» (Desktop 1440 px, Mobil 390 px).

## 1. Leitprinzipien

| Prinzip | Umsetzung |
|---|---|
| Zielgruppe | Familien, ältere Mitglieder, Interessierte an einer Pacht; mehrsprachige Nachbarschaft |
| Hauptziel | Pacht anfragen, Termine und Aktuelles finden, Formulare erhalten |
| Tonalität | Warm, einladend, klar; Siezen |
| Mobile first | Mindestens die Hälfte der Besuche erfolgt voraussichtlich per Smartphone |
| Zugänglichkeit | WCAG 2.2 AA: Kontrast, Tastaturbedienung, Tippflächen ≥ 44 px, sprechende Link-Texte |
| Redaktion | Inhalte durch Laien pflegbar; keine Layout-Entscheide im CMS |

## 2. Design-Tokens

### 2.1 Farben

| Token | Wert | Verwendung |
|---|---|---|
| `forest` | `#2F5D2A` | Primärfarbe: Titel-Akzente, dunkle Flächen, Utility-Bar |
| `leaf` | `#3E8E34` | Grafische Akzente (Ziffern, Icons), nie für kleinen Fliesstext |
| `sage-100` | `#E6EFD9` | Helle Grünflächen, Hover der Navigation, Icon-Hintergründe |
| `sage-200` | `#DFE9CF` | Bildplatzhalter |
| `sage-300` | `#CFE0B9` | Bildplatzhalter auf grünem Band |
| `cream` | `#FBF8F1` | Seitenhintergrund |
| `paper` | `#FFFFFF` | Karten, Header |
| `ink` | `#1F2A1C` | Haupttext, Footer-Hintergrund |
| `ink-soft` | `#3D4A38` | Sekundärtext |
| `line` | `#E3E0D4` | Rahmen und Trennlinien |
| `accent` | `#B4432F` | Primäre Schaltflächen (Terrakotta), Textlinks wie «Alle Beiträge» |
| `on-dark-soft` | `#DCEBCB` | Sekundärtext auf Waldgrün |

Kontrastregel: Text auf `cream`/`paper` nur in `ink`, `ink-soft`, `forest` oder `accent`. Weisser Text nur auf `forest`, `ink` oder `accent`.

### 2.2 Typografie

| Rolle | Schrift | Gewicht | Grösse (Desktop / Mobil) | Zeilenhöhe |
|---|---|---|---|---|
| H1 | Fraunces | 600 | 62 / 38 px | 1.05 |
| H2 | Fraunces | 600 | 40 / 30 px | 1.1 |
| H3, Kartentitel | Fraunces | 600 | 21–26 / 19–24 px | 1.25 |
| Fliesstext gross | Inter | 400 | 19 / 17 px | 1.5 |
| Fliesstext | Inter | 400 | 15–17 px | 1.5 |
| Navigation, Buttons | Inter | 500–600 | 15–16 px | 1.5 |
| Eyebrow, Tags | Inter | 600 | 13–14 px, Grossbuchstaben bei Eyebrow mit 0.1em Laufweite | 1.5 |

Beide Schriften über `next/font/google` einbinden (Fraunces mit Gewichten 500 und 600, Inter mit 400, 500, 600). Keine weiteren Schriften.

### 2.3 Abstände, Radien, Schatten

| Token | Wert |
|---|---|
| Container | max. 1200 px, seitlich 32 px (Mobil 20 px) |
| Sektions-Abstand | 80–88 px vertikal (Mobil 48–56 px) |
| Kartenabstand (gap) | 20–24 px |
| Radius Karten | 20 px; grosse Flächen 24–28 px |
| Radius Buttons | 999 px (Pille); Eingabefelder 12 px |
| Schatten Hover | `0 8px 24px rgba(31,42,28,0.12)` |

### 2.4 Tailwind v4 (`globals.css`)

```css
@theme {
  --color-forest: #2f5d2a;
  --color-leaf: #3e8e34;
  --color-sage-100: #e6efd9;
  --color-sage-200: #dfe9cf;
  --color-sage-300: #cfe0b9;
  --color-cream: #fbf8f1;
  --color-paper: #ffffff;
  --color-ink: #1f2a1c;
  --color-ink-soft: #3d4a38;
  --color-line: #e3e0d4;
  --color-accent: #b4432f;
  --color-on-dark-soft: #dcebcb;

  --font-display: var(--font-fraunces), Georgia, serif;
  --font-sans: var(--font-inter), system-ui, sans-serif;

  --radius-card: 20px;
  --radius-panel: 28px;
}
```

Bei Tailwind v3 dieselben Werte unter `theme.extend.colors`, `fontFamily` und `borderRadius` in `tailwind.config.ts` eintragen.

## 3. Logo

Das Logo ist das Wappen von Zürich-Affoltern, kombiniert mit einer Pflanze, auf grünem Grund. Die vorhandene Datei (50 × 43 px) ist nur für Entwürfe geeignet. Für den Livegang das Original oder eine SVG-Version aus der Mediathek der bisherigen Website (Dateiname ohne Präfix `cropped-`) verwenden.

| Ort | Höhe | Hinweis |
|---|---|---|
| Header Desktop | 52 px | Rechts daneben Wortmarke: «Familiengartenverein» (Fraunces 600, 22 px, `forest`), darunter «ZÜRICH-AFFOLTERN» (Inter, 14 px, Grossbuchstaben, 0.12em Laufweite) |
| Header Mobil | 44 px | Wortmarke 17 px / 11 px |
| `alt`-Text | | «Wappen von Zürich-Affoltern mit Pflanze, Logo des Familiengartenvereins» |

## 4. Seitenaufbau Startseite

| Nr. | Sektion | Inhalt | Quelle |
|---|---|---|---|
| 1 | Utility-Bar (`forest`) | Slogan, Link «Mitgliederbereich», Sprachwahl DE / EN | Fest |
| 2 | Header (`paper`) | Logo, Hauptnavigation, Schaltfläche «Garten anfragen» | Navigation aus CMS-Global |
| 3 | Hero | Eyebrow «Willkommen · Bienvenue · Welcome», H1, Einleitung, 2 Buttons, grosses Foto, Karte «Direkt zu Aktuelles» | Hero-Global (Text, Bild) |
| 4 | Schnellzugriff | 4 Karten: Garten pachten, Termine, Formulare, Hütten | Fest, Links konfigurierbar |
| 5 | Aktuelles und Termine | 3 neueste Beiträge links, Panel «Nächste Termine» (`forest`) rechts mit 3 Terminen | Collections «Beiträge» und «Termine» |
| 6 | Pacht in drei Schritten | Erklärtext, 3 Schritte, Button «Garten anfragen» | Seite «Garten pachten» (Rich Text) |
| 7 | Rund ums Gärtnern | 4 Karten: Gut zu wissen, Tiere im Garten, Bildergalerie, Inserate und Dies und Das | Verlinkte Seiten |
| 8 | Mitmachen | Band in `forest` mit Text und 2 Buttons | Global |
| 9 | Footer (`ink`) | Name, Adresse, Links, Newsletter-Anmeldung | Global |

Hauptnavigation (6 Punkte statt bisher 17): Garten pachten · Aktuelles und Termine · Der Verein · Gut zu wissen · Mitmachen · Galerie.

Zuordnung der bisherigen Menüpunkte zur neuen Struktur:

| Bisheriger Punkt | Neu unter |
|---|---|
| Vorstand, Aktivitäten, Vereinshütte, Materialhütte | Der Verein |
| Aktuelles, Termine | Aktuelles und Termine |
| Formulare, Gut zu wissen, Dies und Das, Inserate, Partnerlinks, Tiere im Garten | Gut zu wissen |
| Mitmachen | Mitmachen |
| Bildergalerie | Galerie |
| FGV-Mitgliederbereich | Utility-Bar («Mitgliederbereich») |

## 5. Komponenten

| Komponente | Aufbau und Regeln |
|---|---|
| `Button` Primär | Pille, `accent`-Hintergrund, weisser Text, 600, Padding 15 × 28 px; Hover: leicht abdunkeln |
| `Button` Sekundär | Pille, 2 px Rahmen `forest`, Text `forest`, transparenter Grund |
| `Button` Invers | Pille, weisser Grund mit `forest`-Text, oder weisser Rahmen auf `forest` |
| `NavLink` | Padding 12 × 14 px, Radius 8 px, Hover `sage-100` |
| `QuickCard` | Weisse Karte, Rahmen `line`, Radius 20 px, 52-px-Icon im `sage-100`-Kreis, Titel (Fraunces 22 px), Kurztext; ganze Karte ist ein Link |
| `PostCard` | Bild (190 px hoch), Kategorie und Datum (13 px, `forest`), Titel (Fraunces 21 px), Teaser; ganze Karte ist ein Link |
| `EventRow` | Datumschip (weiss auf `forest`, Tag gross, Monat klein), Titel, Ort und Uhrzeit |
| `StepCard` | Grosse Ziffer in `leaf`, Titel, Kurztext |
| `ImagePlaceholder` | `sage-200`, zentrierter Text; nur bis zum Einsetzen echter Fotos |
| `NewsletterForm` | Beschriftetes E-Mail-Feld (`label` mit `for`), Schaltfläche «Anmelden» |

Icons: einfache Linien-Icons (Strichstärke 1.8 px, `forest`), eingebettet als SVG. Keine Emojis.

## 6. Responsives Verhalten

| Breite | Verhalten |
|---|---|
| ≥ 1024 px | Mehrspaltig; Navigation in einer Zeile; Karte «Direkt zu Aktuelles» überlappt Hero-Foto |
| 640–1023 px | Karten brechen auf 2 Spalten um; Hero stapelt Text über Bild |
| < 640 px | Eine Spalte; Navigation hinter Menü-Schaltfläche (48 × 48 px); Buttons über volle Breite; Schnellzugriff als Listenkarten (Icon links, Text rechts) |

Umsetzung mit Flex-Wrap und Grid; keine festen Pixelbreiten in Inhaltsbereichen.

## 7. Payload-Inhaltsmodell (Vorschlag)

| Typ | Name | Felder |
|---|---|---|
| Collection | `beitraege` | Titel, Slug, Datum, Kategorie, Titelbild (mit Alt-Text), Teaser, Inhalt (Rich Text), Veröffentlicht |
| Collection | `termine` | Titel, Datum und Zeit, Ort, Beschreibung, Anmeldung nötig (Ja/Nein) |
| Collection | `seiten` | Titel, Slug, Inhalt (Rich Text), Bereich (Der Verein / Gut zu wissen / Mitmachen) |
| Collection | `formulare` | Titel, Datei (PDF), Beschreibung |
| Collection | `galerie` | Titel, Bilder (mehrere), Datum |
| Global | `navigation` | Menüpunkte (Label, Ziel), Utility-Links |
| Global | `startseite` | Hero-Text, Hero-Bild, Mitmachen-Text |
| Global | `verein` | Adresse, Kontakt, Öffnungszeiten der Hütten |

Redaktionsregeln: Bilder müssen einen Alt-Text haben (Pflichtfeld); Teaser maximal 160 Zeichen; Termine werden automatisch nach Datum sortiert und nach Ablauf ausgeblendet.

## 8. Zugänglichkeit (Pflicht)

- Echte `<a>`, `<button>`, `<input>` mit `<label>`; keine klickbaren `div`.
- Sichtbarer Fokusring auf allen interaktiven Elementen.
- Kontrast mindestens 4.5:1 für Text unter 24 px.
- Dekorative SVGs mit `aria-hidden="true"`, Bilder mit sinnvollem `alt`.
- Link-Texte sind aussagekräftig («Alle Termine ansehen», nicht «Hier klicken»).
- `lang="de"` auf `<html>`; fremdsprachige Willkommens-Grüsse mit passendem `lang`-Attribut auszeichnen.

## 9. Erster Prompt für Claude Code

> Lies `DESIGN.md` im Projektstamm. Richte die Design-Tokens in `globals.css` ein (Abschnitt 2.4) und binde Fraunces und Inter über `next/font/google` ein. Baue danach die Startseite gemäss Abschnitt 4 und 5 als wiederverwendbare Komponenten (`Button`, `QuickCard`, `PostCard`, `EventRow`, `StepCard`, `NewsletterForm`). Inhalte kommen aus den Payload-Collections gemäss Abschnitt 7; fehlende Daten durch klar gekennzeichnete Platzhalter ersetzen. Halte dich an Abschnitt 6 (Responsive) und 8 (Zugänglichkeit). Zeige mir zuerst den Plan, bevor du Dateien änderst.
