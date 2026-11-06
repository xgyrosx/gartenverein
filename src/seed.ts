import config from '@payload-config'
import { getPayload } from 'payload'

import { seedAktuelles } from './seed/aktuelles'
import { seedBase } from './seed/base'
import { makeCtx } from './seed/helpers'
import { seedKonditionen } from './seed/konditionen'
import { seedNavigation } from './seed/navigation'
import { seedPages } from './seed/pages'
import { seedVerein } from './seed/verein'

// Beispielinhalte anlegen. Bereits vorhandene Inhalte werden nicht verändert.
// Top-Level-await, damit «payload run» auf das Ende des Seeds wartet.
try {
  const payload = await getPayload({ config })
  const ctx = makeCtx(payload)

  await seedKonditionen(ctx)
  await seedVerein(ctx)
  await seedAktuelles(ctx)
  await seedPages(ctx)
  await seedBase(ctx)
  await seedNavigation(ctx)

  payload.logger.info('Seed abgeschlossen.')
  process.exit(0)
} catch (err) {
  console.error(err)
  process.exit(1)
}
