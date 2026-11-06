'use client'

import 'photoswipe/style.css'
import PhotoSwipeLightbox from 'photoswipe/lightbox'
import Image from 'next/image'
import { useEffect } from 'react'

export type GalerieBild = {
  id: number
  alt: string
  credit?: string | null
  thumb: string
  large: string
  width: number
  height: number
}

/** Bildraster mit Lightbox (PhotoSwipe): Tastatur (Pfeile, Esc), Alt-Text und Bildnachweis als Beschriftung. */
export function Lightbox({ bilder, id = 'album' }: { bilder: GalerieBild[]; id?: string }) {
  useEffect(() => {
    const lightbox = new PhotoSwipeLightbox({
      gallery: `#${id}`,
      children: 'a',
      pswpModule: () => import('photoswipe'),
      bgOpacity: 0.92,
    })
    lightbox.on('uiRegister', () => {
      lightbox.pswp?.ui?.registerElement({
        name: 'custom-caption',
        order: 9,
        isButton: false,
        appendTo: 'root',
        html: '',
        onInit: (el, pswp) => {
          pswp.on('change', () => {
            const a = pswp.currSlide?.data.element as HTMLElement | undefined
            const alt = a?.dataset.alt ?? ''
            const credit = a?.dataset.credit
            el.textContent = credit ? `${alt} (${credit})` : alt
          })
        },
      })
    })
    lightbox.init()
    return () => lightbox.destroy()
  }, [id])

  return (
    <ul id={id} className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
      {bilder.map((b) => (
        <li key={b.id}>
          <a
            href={b.large}
            data-pswp-width={b.width}
            data-pswp-height={b.height}
            data-alt={b.alt}
            data-credit={b.credit ?? undefined}
            target="_blank"
            rel="noreferrer"
            className="block overflow-hidden rounded-lg border focus-visible:outline-offset-2"
          >
            <Image
              src={b.thumb}
              alt={b.alt}
              width={800}
              height={600}
              sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
              className="aspect-[4/3] w-full object-cover"
            />
          </a>
        </li>
      ))}
    </ul>
  )
}
