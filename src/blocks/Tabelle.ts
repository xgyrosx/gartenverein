import type { Block } from 'payload'

export const Tabelle: Block = {
  slug: 'tabelle',
  labels: { singular: 'Tabelle (Preisliste)', plural: 'Tabellen' },
  fields: [
    { name: 'title', type: 'text', label: 'Überschrift' },
    {
      type: 'row',
      fields: [
        { name: 'col1', type: 'text', label: 'Spalte 1', defaultValue: 'Leistung' },
        { name: 'col2', type: 'text', label: 'Spalte 2', defaultValue: 'Preis' },
        { name: 'col3', type: 'text', label: 'Spalte 3', admin: { description: 'Leer lassen, wenn nicht benötigt.' } },
      ],
    },
    {
      name: 'rows',
      type: 'array',
      label: 'Zeilen',
      labels: { singular: 'Zeile', plural: 'Zeilen' },
      minRows: 1,
      fields: [
        { name: 'a', type: 'text', label: 'Spalte 1', required: true },
        { name: 'b', type: 'text', label: 'Spalte 2' },
        { name: 'c', type: 'text', label: 'Spalte 3' },
      ],
    },
  ],
}
