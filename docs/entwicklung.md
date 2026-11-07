# Entwicklung

## Voraussetzungen
Node.js LTS (≥ 24) und pnpm. Next.js (16.3) und Payload (3.93) sind auf feste Versionen gesetzt – nicht upgraden.

## Start
```bash
pnpm install
cp .env.example .env     # PAYLOAD_SECRET und NEXT_PUBLIC_SERVER_URL setzen
pnpm dev                 # http://localhost:3000 – Admin unter /admin
```
Beim ersten Aufruf von `/admin` den ersten Benutzer anlegen (wird automatisch `admin`). Danach `pnpm seed` für Beispielinhalte.

## Befehle
| Befehl | Zweck |
| --- | --- |
| `pnpm dev` | Entwicklungsserver (legt das Datenbankschema automatisch an) |
| `pnpm build` | Schema anlegen (`db:init`), dann Produktions-Build mit statischen Seiten |
| `pnpm start` | Produktionsserver (nach `pnpm build`) |
| `pnpm seed` | Beispielinhalte anlegen; Vorhandenes wird nicht überschrieben |
| `pnpm redirects:import` | `docs/redirects-alt-neu.csv` als Weiterleitungen einlesen (ohne Duplikate) |
| `pnpm generate:types` / `generate:importmap` | Nach Änderungen an Collections, Blocks, Globals oder Plugins |

Für saubere Tests eine eigene Datenbank nehmen: `DATABASE_URL=file:./test.db pnpm seed` (Dateien `*.db` sind ignoriert).

## Struktur
- `src/collections/` Seiten, News, Termine, Alben, Areale, Personen, Ratgeber, Gartenangebote, Dokumente, Media, Users
- `src/globals/` Navigation, Hinweisbanner, Fusszeile, Vereinsdaten, Konditionen, Öffnungszeiten
- `src/blocks/` Konfiguration der Seitenbausteine (Liste in `index.ts`), `src/components/blocks/` ihre Darstellung, `src/components/RenderBlocks.tsx` verteilt
- `src/app/(frontend)/` Website · `src/app/(payload)/` Admin · `src/app/robots.ts`, `opengraph-image.tsx`, `icon.svg`
- `src/lib/` Datenzugriff (`content.ts`, `getPage.ts`, `globals.ts`: Local API mit `overrideAccess: false`), Formatierung, ICS, SEO, Weiterleitungen
- `src/seed.ts` + `src/seed/` Beispielinhalte (Platzhalter, keine echten Personendaten, Preise als Beispiel markiert)
- Design-Tokens: `src/app/(frontend)/styles.css` · UI-Bausteine: `src/components/ui/` (shadcn) · Schrift: `src/fonts/`

**Hinweis shadcn-CLI:** `pnpm dlx shadcn@latest add …` trägt fälschlich das Paket `cn` ein. Danach `pnpm remove cn` ausführen und in den neuen Dateien `from "cn"` durch `from "@/lib/utils"` ersetzen.

## Statische Seiten und Revalidierung
Alle öffentlichen Seiten werden beim Build erzeugt (`generateStaticParams`). Die Hooks in `src/hooks/revalidate.ts` lösen bei Veröffentlichen, Ändern und Löschen sowie bei Änderungen an Globals `revalidatePath('/', 'layout')` aus; Entwürfe lösen nichts aus. Als Sicherheitsnetz (Termine, Banner-Zeitraum, Monatswechsel) gilt `revalidate = 3600` im Frontend-Layout. Der Seed setzt `context.disableRevalidate`.

## Vorschau, SEO, Weiterleitungen
- **Vorschau:** «Vorschau» im Admin ruft `/next/preview` auf (nur angemeldet), setzt den Draft Mode und zeigt den Entwurf; beenden über `/next/exit-preview`. Live Preview ist nicht eingerichtet.
- **SEO:** Plugin für Seiten, News, Termine, Areale und Ratgeber (Titel, Beschreibung, Bild; Vorschläge aus dem Inhalt). `/sitemap.xml`, `/robots.txt` und das Standard-Vorschaubild (`/opengraph-image`) nutzen `NEXT_PUBLIC_SERVER_URL` – im Betrieb auf die echte Adresse setzen.
- **Weiterleitungen:** Plugin «Weiterleitungen» (Einstellungen). `src/app/(frontend)/[...pfad]` und die Detailseiten prüfen bei unbekannten Adressen die Tabelle (`src/lib/redirects.ts`, dauerhaft 308). Vorlage aus der alten WordPress-Seite: `docs/redirects-alt-neu.csv` (337 Zeilen, nach `pnpm redirects:import` im Admin pflegbar). Adressen mit Parametern (`?p=…`) lassen sich nicht umleiten.
- **Suche:** Payload-Search-Plugin (`/api/suche`), indexiert veröffentlichte Ratgeber und Seiten.

## Lighthouse (lokal, Produktions-Build, Mobil)
Start 94 / Termine 100 / Gartenwissen 94 / Garten pachten 100 (Performance); Accessibility, Best Practices und SEO überall 100. Messung nach dem ersten Aufruf (Bild-Cache warm); kalt liegt die Startseite bei 87–89.

## Offene Punkte
- **404 im Browser:** Unbekannte Adressen unter dynamischen Routen (z. B. `/gibtsnicht`) liefern korrekt Status 404, aber der Inhalt wird im Production-Build erst per JavaScript dargestellt (Next-«Error-Shell»). Ursache nicht gefunden; Experimente ohne Wirkung: Draft-Banner entfernen, `revalidate` entfernen, `not-found.tsx` pro Segment, `notFound()` in `generateMetadata`.
- **Datenbank:** SQLite mit automatischem Schema-Abgleich («push», auch beim Build via `db:init`). Vor dem Go-Live auf Migrationen umstellen.
- **Formulare, E-Mail, Newsletter, Mitgliederbereich:** bewusst nicht enthalten (R13–R15).
- **Hosting und Backups:** offen. Nötig sind ein Node-Server mit persistentem Dateisystem für `gartenverein.db`, `media/` und `documents/`.
- **Inhalte:** Echte Texte, Preise (`Konditionen`), Personen, Rechtstexte (Impressum, Datenschutz) und Logo stehen aus; die Wissensartikel der alten Seite müssen mit denselben Adressen als Ratgeber angelegt werden, damit die Weiterleitungen greifen.
- **Adressen sind flach:** Seiten haben nur eine Ebene (`/formulare-downloads`, nicht `/fuer-paechter/formulare`). Termin-Adressen enthalten das Datum, alte Termin-URLs leiten daher auf `/termine`.
