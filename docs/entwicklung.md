# Entwicklung

## Voraussetzungen
Node.js LTS (≥ 24) und pnpm. Next.js und Payload sind auf feste Versionen gesetzt (Payload 3.93, Next 16.3) – nicht upgraden.

## Start
```bash
pnpm install
cp .env.example .env     # PAYLOAD_SECRET setzen
pnpm dev                 # http://localhost:3000 – Admin unter /admin
```
Beim ersten Aufruf von `/admin` den ersten Benutzer anlegen (wird automatisch `admin`).

## Befehle
| Befehl | Zweck |
| --- | --- |
| `pnpm dev` | Entwicklungsserver |
| `pnpm build` | Schema anlegen (`db:init`), dann Produktions-Build mit statischen Seiten |
| `pnpm start` | Produktionsserver (nach `pnpm build`) |
| `pnpm seed` | Beispielinhalte anlegen (überspringt, was schon existiert) |
| `pnpm generate:types` / `generate:importmap` | Nach Änderungen an Collections, Blocks, Globals bzw. Plugins ausführen |

## Struktur
- `src/collections/` Seiten, News, Termine, Media (Bilder), Users · `src/globals/` Navigation, Hinweisbanner, Fusszeile, Vereinsdaten
- `src/blocks/` Inhaltsbausteine (Konfiguration) · `src/components/blocks/` ihre Darstellung · `src/components/layout/` Header, Footer, Banner
- `src/app/(frontend)/` Website, `src/app/(payload)/` Admin · `src/lib/` Datenzugriff (Local API mit `overrideAccess: false`)
- Design-Tokens (Farben, Radius, Breiten): `src/app/(frontend)/styles.css` · Schrift (selbst gehostet): `src/fonts/`

## Statische Seiten und Revalidierung
Alle öffentlichen Seiten werden beim Build erzeugt. Die Hooks in `src/hooks/revalidate.ts` lösen bei Veröffentlichen, Ändern und Löschen sowie bei Änderungen an Globals `revalidatePath('/', 'layout')` aus; Entwürfe lösen nichts aus. Als Sicherheitsnetz (Termine, Banner-Zeitraum) gilt zusätzlich `revalidate = 3600` im Frontend-Layout. Der Seed setzt `context.disableRevalidate`.

## Vorschau
«Vorschau» im Admin ruft `/next/preview` auf (nur angemeldet), setzt den Next.js-Draft-Mode und zeigt den Entwurf. Beenden über `/next/exit-preview`. Live Preview ist nicht eingerichtet.

## SEO
SEO-Plugin für Seiten und News (Titel, Beschreibung, Bild; Rückfall auf Titel bzw. Teaser). `/sitemap.xml` und `/robots.txt` nutzen `NEXT_PUBLIC_SERVER_URL` – im Betrieb auf die echte Adresse setzen.

## Offene Punkte
- **Datenbank:** SQLite mit automatischem Schema-Abgleich («push»). Vor dem Go-Live auf Migrationen umstellen.
- **Mitgliederbereich, Formulare, E-Mail-Versand:** bewusst nicht enthalten.
- **Hosting:** offen (Node-Server mit persistentem Dateisystem für `gartenverein.db` und `media/` nötig).
- **Backups:** `gartenverein.db` und `media/` regelmässig sichern; noch nicht eingerichtet.
- **Live Preview**, Rechtstexte (Impressum, Datenschutz) und echte Vereinsdaten stehen aus.
