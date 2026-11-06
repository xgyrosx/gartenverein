import type { CollectionConfig } from 'payload'

import { isAdmin, isAdminField } from '@/access'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: { singular: 'Benutzer', plural: 'Benutzer' },
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'role'],
    group: 'Einstellungen',
    description: 'Personen, die sich im Verwaltungsbereich anmelden dürfen.',
  },
  auth: true,
  access: {
    // Nur Admins legen Benutzer an. Der allererste Benutzer wird beim ersten Start über das Formular angelegt.
    create: isAdmin,
    delete: isAdmin,
    read: ({ req }) => {
      if (!req.user) return false
      if (req.user.role === 'admin') return true
      return { id: { equals: req.user.id } }
    },
    update: ({ req }) => {
      if (!req.user) return false
      if (req.user.role === 'admin') return true
      return { id: { equals: req.user.id } }
    },
    admin: ({ req }) => Boolean(req.user),
  },
  hooks: {
    beforeValidate: [
      async ({ data, operation, req }) => {
        // Der erste Benutzer wird immer Admin.
        if (operation === 'create') {
          const { totalDocs } = await req.payload.count({ collection: 'users', req })
          if (totalDocs === 0) return { ...data, role: 'admin' }
        }
        return data
      },
    ],
  },
  fields: [
    {
      name: 'role',
      type: 'select',
      label: 'Rolle',
      required: true,
      defaultValue: 'redaktion',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Redaktion', value: 'redaktion' },
      ],
      access: { update: isAdminField },
      admin: {
        description:
          'Admin darf alles (auch Benutzer verwalten und löschen). Redaktion darf Inhalte erfassen und bearbeiten.',
      },
    },
  ],
}
