import { Id } from '../id/id'

export interface User {
  id: Id
  name: string
  lastName: string
  email: string
  role: 'USER_ROLE' | 'ADMIN_ROLE' | 'SUPERADMIN_ROLE'
  token: string
}
