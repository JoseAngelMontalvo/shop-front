export interface ProductDto {
  _id: string
  name: string
  lastName: string
  email: string
  password: number
  googleId: string
  ownAuth: boolean
  googleAuth: boolean
  state: 'ACTIVATED' | 'DEACTIVATED'
  role: 'USER_ROLE' | 'ADMIN_ROLE' | 'SUPERADMIN_ROLE'
  products: string[]
  shops: string[]
  reviews: string[]
}
