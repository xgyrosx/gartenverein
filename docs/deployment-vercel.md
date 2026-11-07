# Auf Vercel veröffentlichen (Neon + Blob)

Die Website läuft auf Vercel mit **Neon** (Postgres) für die Daten und **Vercel Blob** für Bilder und PDFs. Lokal bleibt alles wie gewohnt (SQLite-Datei, Ordner `media/` und `documents/`): Welche Datenbank gilt, entscheidet allein `DATABASE_URL`; Blob ist nur aktiv, wenn `BLOB_READ_WRITE_TOKEN` gesetzt ist.

## Einmalige Einrichtung
1. **Code ins Git-Repository** (GitHub/GitLab/Bitbucket) pushen.
2. **Vercel-Projekt anlegen:** vercel.com → «Add New… → Project» → Repository wählen. Framework «Next.js» wird erkannt (`vercel.json` setzt die Region Frankfurt `fra1`). Noch nicht deployen, sondern zuerst Schritte 3–4.
3. **Datenbank:** Im Projekt «Storage» → «Create Database» → **Neon** (Region Frankfurt `eu-central-1`) → mit dem Projekt verbinden. Das setzt `DATABASE_URL` und `DATABASE_URL_UNPOOLED`.
4. **Dateispeicher:** «Storage» → «Create» → **Blob** (öffentlich, Region Frankfurt) → mit dem Projekt verbinden. Das setzt `BLOB_READ_WRITE_TOKEN`.
5. **Weitere Variablen** (Settings → Environment Variables, für Production und Preview):
   - `PAYLOAD_SECRET` – langer Zufallswert (z. B. `openssl rand -hex 32`)
   - `NEXT_PUBLIC_SERVER_URL` – optional; ohne Angabe nimmt die Website die Vercel-Adresse. Bei eigener Domain hier eintragen.
6. **Beispielinhalte einspielen (einmalig):** Die Zugangsdaten von Neon und Blob sind in Vercel «geschützt» und lassen sich **nicht** auf den eigenen Rechner herunterladen (`vercel env pull` liefert nur Platzhalter). Deshalb übernimmt der Build das Einspielen: Setze die Variable `SEED_ON_BUILD=1` (Production). Der nächste Build füllt die Datenbank mit den Beispielinhalten und lädt die Beispielbilder nach Blob, **aber nur, wenn es noch keine Seiten gibt** (`src/scripts/seed-if-empty.ts`); danach legt er die Weiterleitungen der alten Website an. Variable danach wieder entfernen (schadet aber nicht, weil bestehende Inhalte nie überschrieben werden).
7. **Deployen:** In Vercel «Deploy» (bzw. einen Commit pushen). Der Build führt automatisch offene Migrationen aus (`scripts/build.mjs`), spielt bei gesetztem `SEED_ON_BUILD` die Beispielinhalte ein und baut danach die Seiten.
8. **Ersten Admin anlegen:** `https://<deine-adresse>/admin` öffnen, erster Benutzer wird `admin`.

## Laufender Betrieb
- **Inhalte** pflegt die Redaktion im Admin; nach «Veröffentlichen» aktualisiert sich die Website von selbst.
- **Neue Pull Requests/Branches** erzeugen Preview-Deployments auf derselben Datenbank. Für Tests mit eigenen Daten einen Neon-Branch pro Preview nutzen (Integration-Einstellung) – sonst ändern Previews die echten Daten nicht, lesen sie aber.
- **Schema ändern** (neue Felder/Collections): lokal mit einer Postgres-Datenbank `pnpm migrate:create <name>` ausführen (das Skript schaltet das Blob-Plugin mit einem Platzhalter-Token ein, damit dessen Zusatzfelder im Schema stehen) und die Dateien in `src/migrations/` einchecken. Der nächste Build wendet sie an. Ohne Migration schlägt die Seite auf Vercel fehl, weil das Schema nicht automatisch angepasst wird.
- **Backups:** Neon bietet Wiederherstellung über die Zeit (je nach Plan); Blob-Dateien sind nicht versioniert. Für Produktivbetrieb regelmässig exportieren.

## Grenzen und Hinweise
- **Upload-Grösse:** Vercel begrenzt Anfragen an Funktionen auf **4,5 MB**. Fotos über 4,5 MB lassen sich im Admin nicht hochladen – vorher verkleinern (z. B. auf 2000 px Breite, was die Website ohnehin ausliefert). Direkt-Uploads («Client Uploads») sind nicht aktiviert, weil dabei die automatischen Bildgrössen entfallen würden.
- **Blob-Adressen sind öffentlich:** Auch Entwürfe von PDFs/Bildern sind für jemanden mit der exakten Adresse abrufbar. Vertrauliches gehört nicht in diese Website.
- **Vercel Hobby** ist für nicht-kommerzielle Nutzung gedacht; Bedingungen und Kontingente (Bildoptimierung, Bandbreite) vor dem Produktivbetrieb prüfen.
- **Neon (Gratis-Plan):** Die Datenbank schläft bei Inaktivität; der erste Aufruf danach kann einen Moment dauern.
- **Nicht getestet** wurde der Betrieb mit echtem Neon und echtem Blob (kein Zugang). Getestet wurden Postgres 16 lokal (Migration, Seed, Build, Seiten, Suche, Veröffentlichen) und der Wechsel zwischen den Datenbanken.
