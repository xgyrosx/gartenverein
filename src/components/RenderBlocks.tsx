import { AblaufBlock } from '@/components/blocks/AblaufBlock'
import { AngebotslisteBlock } from '@/components/blocks/AngebotslisteBlock'
import { DiesenMonatBlock } from '@/components/blocks/DiesenMonatBlock'
import { KartenBlock } from '@/components/blocks/KartenBlock'
import { PreistabelleBlock } from '@/components/blocks/PreistabelleBlock'
import { KontaktBlock } from '@/components/blocks/KontaktBlock'
import { OeffnungszeitenBlock } from '@/components/blocks/OeffnungszeitenBlock'
import { PersonenrasterBlock } from '@/components/blocks/PersonenrasterBlock'
import { TabelleBlock } from '@/components/blocks/TabelleBlock'
import { AkkordeonBlock } from '@/components/blocks/AkkordeonBlock'
import { DokumentenlisteBlock } from '@/components/blocks/DokumentenlisteBlock'
import { BildTextBlock } from '@/components/blocks/BildTextBlock'
import { HeroBlock } from '@/components/blocks/HeroBlock'
import { HinweisboxBlock } from '@/components/blocks/HinweisboxBlock'
import { NaechsteTermineBlock } from '@/components/blocks/NaechsteTermineBlock'
import { NeueNewsBlock } from '@/components/blocks/NeueNewsBlock'
import { TextBlock } from '@/components/blocks/TextBlock'
import type { Seiten } from '@/payload-types'

export function RenderBlocks({ blocks }: { blocks: NonNullable<Seiten['layout']> }) {
  return (
    <>
      {blocks.map((block, i) => {
        const key = block.id ?? i
        switch (block.blockType) {
          case 'hero':
            return <HeroBlock key={key} block={block} />
          case 'text':
            return <TextBlock key={key} block={block} />
          case 'bildText':
            return <BildTextBlock key={key} block={block} />
          case 'hinweisbox':
            return <HinweisboxBlock key={key} block={block} />
          case 'neueNews':
            return <NeueNewsBlock key={key} block={block} />
          case 'naechsteTermine':
            return <NaechsteTermineBlock key={key} block={block} />
          case 'karten':
            return <KartenBlock key={key} block={block} />
          case 'ablauf':
            return <AblaufBlock key={key} block={block} />
          case 'preistabelle':
            return <PreistabelleBlock key={key} block={block} />
          case 'angebotsliste':
            return <AngebotslisteBlock key={key} block={block} />
          case 'diesenMonat':
            return <DiesenMonatBlock key={key} block={block} />
          case 'personenraster':
            return <PersonenrasterBlock key={key} block={block} />
          case 'oeffnungszeiten':
            return <OeffnungszeitenBlock key={key} block={block} />
          case 'kontakt':
            return <KontaktBlock key={key} block={block} />
          case 'tabelle':
            return <TabelleBlock key={key} block={block} />
          case 'akkordeon':
            return <AkkordeonBlock key={key} block={block} />
          case 'dokumentenliste':
            return <DokumentenlisteBlock key={key} block={block} />
          default:
            return null
        }
      })}
    </>
  )
}
