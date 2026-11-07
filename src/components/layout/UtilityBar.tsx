import { getStartseite } from '@/lib/globals'

/** Grüne Leiste ganz oben mit dem Slogan (Abschnitt 4, Nr. 1). Mitgliederbereich und Sprachwahl folgen, sobald es sie gibt. */
export async function UtilityBar() {
  const { utilitySlogan } = await getStartseite()
  return (
    <div className="bg-forest text-white">
      <p className="container-page py-2 text-sm font-medium">
        {utilitySlogan || 'Gärtnern, ernten und feiern im Quartier (Platzhalter)'}
      </p>
    </div>
  )
}
