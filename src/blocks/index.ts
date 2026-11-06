import type { Block } from 'payload'

import { Ablauf } from './Ablauf'
import { Angebotsliste } from './Angebotsliste'
import { BildText } from './BildText'
import { DiesenMonat } from './DiesenMonat'
import { Hero } from './Hero'
import { Hinweisbox } from './Hinweisbox'
import { Karten } from './Karten'
import { NaechsteTermine } from './NaechsteTermine'
import { NeueNews } from './NeueNews'
import { Preistabelle } from './Preistabelle'
import { Text } from './Text'

/** Alle Bausteine, die auf einer Seite verwendet werden können. */
export const pageBlocks: Block[] = [
  Hero,
  Text,
  BildText,
  Hinweisbox,
  Karten,
  Ablauf,
  Preistabelle,
  Angebotsliste,
  NeueNews,
  NaechsteTermine,
  DiesenMonat,
]
