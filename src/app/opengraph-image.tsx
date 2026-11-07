import { ImageResponse } from 'next/og'

import { getVereinsdaten } from '@/lib/globals'

export const alt = 'Website des Gartenvereins'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

/** Standard-Vorschaubild für soziale Netzwerke, wenn eine Seite kein eigenes Bild hat. */
export default async function OpengraphImage() {
  const { name } = await getVereinsdaten()
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 80,
          background: '#264924',
          color: '#f2f8ef',
        }}
      >
        <div style={{ width: 120, height: 120, borderRadius: 60, background: '#e0efd9', marginBottom: 48, display: 'flex' }} />
        <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.15 }}>{name}</div>
        <div style={{ fontSize: 38, marginTop: 24, color: '#c2dfb5' }}>Gärtnern, ernten und feiern im Quartier</div>
      </div>
    ),
    size,
  )
}
