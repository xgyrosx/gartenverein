import { draftMode } from 'next/headers'

export async function DraftBanner() {
  const { isEnabled } = await draftMode()
  if (!isEnabled) return null
  return (
    <aside aria-label="Vorschau" className="bg-earth-900 px-4 py-2 text-center text-white">
      <strong>Vorschau-Modus:</strong> Sie sehen unveröffentlichte Inhalte.{' '}
      <a className="font-medium underline" href="/next/exit-preview">
        Vorschau beenden
      </a>
    </aside>
  )
}
