/** Auswahl der Linien-Icons für Karten (siehe DESIGN.md, Abschnitt 5). Die Darstellung steht in components/home/Icon.tsx. */
export const iconOptions = [
  { label: 'Pflanze', value: 'sprout' },
  { label: 'Kalender', value: 'calendar' },
  { label: 'Dokument', value: 'document' },
  { label: 'Haus', value: 'house' },
  { label: 'Buch', value: 'book' },
  { label: 'Tier', value: 'bug' },
  { label: 'Bilder', value: 'images' },
  { label: 'Ankündigung', value: 'megaphone' },
] as const

export type IconName = (typeof iconOptions)[number]['value']
