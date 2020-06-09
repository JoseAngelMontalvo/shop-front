import { Id } from '../../../../core/domain/id/id'

export interface Product {
  id: Id
  name: string
  lastName: string
  email: string
  password: string
  googleId: string
  ownAuth: boolean
  googleAuth: boolean
  state: 'ACTIVATED' | 'DEACTIVATED'
  role: 'USER_ROLE' | 'ADMIN_ROLE' | 'SUPERADMIN_ROLE'
  products: string[]
  shops: string[]
  reviews: string[]
}
