import type { GlobalConfig } from 'payload'

import { revalidateGlobalAfterChange } from '@/hooks/revalidate'
import { loggedIn } from '@/access'
import { linkFields } from '@/fields/link'

export const Navigation: GlobalConfig = {
  slug: 'navigation',
  label: 'Navigation (Hauptmenü)',
  admin: {
    group: 'Einstellungen',
    description: 'Das Menü oben auf jeder Seite: bis zu 6 Hauptpunkte, je mit optionalen Unterpunkten.',
  },
  access: { read: () => true, update: loggedIn },
  hooks: { afterChange: [revalidateGlobalAfterChange] },
  fields: [
    {
      name: 'items',
      type: 'array',
      label: 'Hauptpunkte',
      labels: { singular: 'Hauptpunkt', plural: 'Hauptpunkte' },
      maxRows: 6,
      admin: {
        description:
          'Maximal 6 Hauptpunkte. Reihenfolge per Ziehgriff ändern. Nicht veröffentlichte Seiten erscheinen nicht im Menü.',
        initCollapsed: true,
      },
      validate: (value: unknown) => {
        const rows = Array.isArray(value) ? (value as { highlight?: boolean }[]) : []
        return rows.filter((r) => r.highlight).length > 1
          ? 'Nur ein Hauptpunkt kann als Button hervorgehoben werden.'
          : true
      },
      fields: [
        ...linkFields,
        {
          name: 'highlight',
          type: 'checkbox',
          label: 'Als Button hervorheben',
          defaultValue: false,
          admin: {
            description:
              'Für den wichtigsten Punkt, z. B. «Garten pachten». Nur einer möglich. Ein hervorgehobener Punkt hat keine Unterpunkte.',
          },
        },
        {
          name: 'children',
          type: 'array',
          label: 'Unterpunkte',
          labels: { singular: 'Unterpunkt', plural: 'Unterpunkte' },
          maxRows: 10,
          admin: {
            description: 'Optional. Es gibt nur eine Ebene von Unterpunkten.',
            condition: (_, sibling) => !sibling?.highlight,
            initCollapsed: true,
          },
          fields: linkFields,
        },
      ],
    },
  ],
}
