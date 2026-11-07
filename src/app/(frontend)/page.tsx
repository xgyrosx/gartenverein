import type { Metadata } from 'next'

import { GardenLinks, Hero, JoinBand, NewsAndEvents, PachtSteps, QuickAccess } from '@/components/home/sections'
import { pickLink } from '@/components/home/content'
import { getNewsList, getUpcomingTermine } from '@/lib/content'
import { getPage } from '@/lib/getPage'
import { getStartseite } from '@/lib/globals'

export async function generateMetadata(): Promise<Metadata> {
  const s = await getStartseite()
  return {
    // Die Startseite zeigt nur den Vereinsnamen im Tab (Titel aus dem Layout).
    ...(s.heroIntro ? { description: s.heroIntro } : {}),
    alternates: { canonical: '/' },
  }
}

export default async function HomePage() {
  const [s, posts, termine, pachten] = await Promise.all([
    getStartseite(),
    getNewsList(3),
    getUpcomingTermine(3),
    getPage('garten-pachten'),
  ])
  const cta = pickLink(s.heroPrimary, { label: 'Garten anfragen', href: '/garten-pachten' })
  return (
    <>
      <Hero s={s} latest={posts[0]} />
      <QuickAccess s={s} />
      <NewsAndEvents posts={posts} termine={termine} />
      <PachtSteps page={pachten} cta={cta} />
      <GardenLinks s={s} />
      <JoinBand s={s} />
    </>
  )
}
