import type { Seiten } from '@/payload-types'

/** Typ eines einzelnen Bausteins einer Seite, z. B. BlockOf<'hero'>. */
export type BlockOf<T extends string> = Extract<NonNullable<Seiten['layout']>[number], { blockType: T }>
