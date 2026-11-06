import type { Access, FieldAccess } from 'payload'

/** Eingeloggt (Admin oder Redaktion). */
export const loggedIn: Access = ({ req }) => Boolean(req.user)

/** Nur Admins. */
export const isAdmin: Access = ({ req }) => req.user?.role === 'admin'

export const isAdminField: FieldAccess = ({ req }) => req.user?.role === 'admin'

/** Öffentlich nur veröffentlichte Inhalte, eingeloggte User sehen alles (inkl. Entwürfe). */
export const publishedOrLoggedIn: Access = ({ req }) => {
  if (req.user) return true
  return { _status: { equals: 'published' } }
}
