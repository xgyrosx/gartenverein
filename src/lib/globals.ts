import config from '@payload-config'
import { getPayload } from 'payload'

import type { Fusszeile, Hinweisbanner, Konditionen, Navigation, Oeffnungszeiten, Startseite, Vereinsdaten } from '@/payload-types'

async function load<T extends 'navigation' | 'hinweisbanner' | 'fusszeile' | 'vereinsdaten' | 'konditionen' | 'oeffnungszeiten' | 'startseite'>(slug: T) {
  const payload = await getPayload({ config })
  return payload.findGlobal({ slug, depth: 1, overrideAccess: false })
}

export const getNavigation = (): Promise<Navigation> => load('navigation')
export const getHinweisbanner = (): Promise<Hinweisbanner> => load('hinweisbanner')
export const getFusszeile = (): Promise<Fusszeile> => load('fusszeile')
export const getVereinsdaten = (): Promise<Vereinsdaten> => load('vereinsdaten')
export const getKonditionen = (): Promise<Konditionen> => load('konditionen')
export const getOeffnungszeiten = (): Promise<Oeffnungszeiten> => load('oeffnungszeiten')
export const getStartseite = (): Promise<Startseite> => load('startseite')
