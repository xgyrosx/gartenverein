import config from '@payload-config'
import { getPayload } from 'payload'

import type { Fusszeile, Hinweisbanner, Navigation, Vereinsdaten } from '@/payload-types'

async function load<T extends 'navigation' | 'hinweisbanner' | 'fusszeile' | 'vereinsdaten'>(slug: T) {
  const payload = await getPayload({ config })
  return payload.findGlobal({ slug, depth: 1, overrideAccess: false })
}

export const getNavigation = (): Promise<Navigation> => load('navigation')
export const getHinweisbanner = (): Promise<Hinweisbanner> => load('hinweisbanner')
export const getFusszeile = (): Promise<Fusszeile> => load('fusszeile')
export const getVereinsdaten = (): Promise<Vereinsdaten> => load('vereinsdaten')
