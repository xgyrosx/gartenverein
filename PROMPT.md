# Aufgabe: Prototyp Vereinswebsite (Gartenverein) mit Payload CMS + Next.js

## Kontext
- Kleine Vereinswebsite, Inhalte werden von nicht-technischen Personen im CMS gepflegt (Texte, Bilder, News, Termine).
- Arbeitsordner = aktuelles Verzeichnis (leer). Sprache der Oberfläche und der Beispielinhalte: Deutsch (Schweiz, kein ß).
- NICHT Teil des Prototyps: Mitgliederbereich, Login fürs Frontend, Formulare, E-Mail-Versand, Zahlungen. Keine Platzhalter-Logik dafür bauen.

## Technische Vorgaben
- Paketmanager: pnpm. TypeScript strikt. Next.js App Router.
- Setup mit `npx create-payload-app@3` (stabile 3.x, KEINE Beta/4.0), Template `blank`, Datenbank SQLite (lokale Datei). Die vom Tool installierte Next.js-Version unverändert lassen; nichts manuell upgraden.
- Frontend: Tailwind CSS, schlicht, responsiv, gute Lesbarkeit, Barrierefreiheit (semantisches HTML, Alt-Texte, Kontraste).
- Inhalte aufgebaut aus Blocks (eigene Dateien unter `src/blocks/`), Collections unter `src/collections/`, Globals unter `src/globals/`.
- Admin auf Deutsch (i18n), alle Feldbeschriftungen deutsch, kurze Hilfetexte (`admin.description`) bei allen Feldern, die Laien verwirren könnten.
- Zugriffsregeln explizit setzen: Öffentlich nur lesen (nur veröffentlichte Inhalte), Schreiben nur für eingeloggte Admin-/Redaktions-User. Bei Zugriffen über die Local API im Frontend `overrideAccess: false` verwenden, wo Nutzerrechte gelten sollen.
- Keine unnötigen Pakete. Keine Docker-Setups, keine Cloud-Dienste, keine CI.

## Arbeitsweise (ressourcenschonend)
- Arbeite in den Releases unten. Pro Release: umsetzen, `pnpm tsc --noEmit` und `pnpm build` ausführen (Fehler beheben), einen Git-Commit mit Release-Namen erstellen, dann STOPPEN und auf mein «weiter» warten.
- Nach jedem Release maximal 5 Zeilen Bericht: was geht jetzt, wie starte ich es (`pnpm dev`), was soll ich im Browser prüfen.
- Keine langen Erklärungen, keine Wiederholung von Code im Chat, keine Dateien lesen, die du selbst gerade geschrieben hast, `node_modules` nie durchsuchen.
- Keine Tests-Suites, kein Linting-Setup über das hinaus, was das Template mitbringt.
- Bei Unklarheiten: sinnvollen Default wählen und im Bericht in einem Satz erwähnen, statt zu fragen. Nur bei Entscheidungen mit grossem Folgeaufwand nachfragen.

## Releases

### R0 – Fundament
- Projekt erzeugen (siehe oben), `git init`, .gitignore prüfen, `.env` aus Beispiel anlegen.
- Admin unter /admin läuft, ersten Admin-User beim ersten Start anlegen können, Admin-Sprache Deutsch.
- Erwartung: `pnpm dev` startet, /admin und Startseite erreichbar.

### R1 – Seiten editierbar
- Collection `Users` mit Rollen `admin` und `redaktion`.
- Collection `Media` (Bilder, Pflichtfeld Alt-Text, sinnvolle Bildgrössen).
- Collection `Seiten` (Titel, Slug, Entwürfe/Versionen aktiviert, Feld `layout` als Blocks).
- Blocks: `Hero` (Titel, Untertitel, Bild), `Text` (Rich Text, Lexical), `Bild+Text` (Bild links/rechts), `Hinweisbox` (farbig hervorgehobener Text).
- Frontend: Startseite (Slug `start`) und dynamische Route `/[slug]`, die die Blocks rendert. 404-Seite.
- Eine Seed-Funktion/Skript legt eine Beispiel-Startseite und «Über uns» an (kurze, realistische Texte zu einem Gartenverein).

### R2 – Navigation und Vereinsdaten
- Globals: `Kopfzeile` (Navigation: Liste aus Label + Verweis auf Seite oder externer Link), `Fusszeile` (Text, Links), `Vereinsdaten` (Name, Adresse, Kontaktangaben, Logo).
- Gemeinsames Layout mit Header/Footer aus den Globals, Mobile-Menü ohne schwere Libraries.
- Schlichtes Farbschema (Grün-/Erdtöne) über Tailwind-Theme-Variablen zentral definiert.

### R3 – News und Termine
- Collection `News` (Titel, Datum, Teaser, Titelbild, Inhalt als Rich Text, Entwürfe aktiviert) mit Übersichtsseite und Detailseite.
- Collection `Termine` (Titel, Datum/Zeit, Ort, Beschreibung); Seite «Termine» listet kommende Termine chronologisch.
- Zusätzliche Blocks `Neueste News` und `Nächste Termine` (Anzahl einstellbar) für die Startseite.

### R4 – Redaktionskomfort und Abschluss
- Vorschau: Draft Preview bzw. Live Preview für `Seiten` und `News`; On-Demand-Revalidierung nach Veröffentlichung, damit Änderungen zeitnah sichtbar sind.
- SEO-Felder (Titel, Beschreibung) via offiziellem SEO-Plugin, Sitemap und robots.txt.
- Admin aufräumen: sinnvolle Gruppierung der Menüpunkte, `useAsTitle`, Standardspalten, deutsche Beschriftungen überall.
- `docs/redaktion.md`: Kurzanleitung für Laien (Seite bearbeiten, Bild einfügen, Entwurf vs. veröffentlichen, News erfassen), maximal 1 Seite, mit Schritt-für-Schritt-Listen.
- `docs/entwicklung.md`: Start, Build, Seed, Struktur, offene Punkte (Mitgliederbereich, Formulare, E-Mail, Hosting, Backups).

Beginne jetzt mit R0.