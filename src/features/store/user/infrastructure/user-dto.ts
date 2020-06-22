export interface UserDto {
  user: {
    id: string
    name: string
    lastName: string
    email: string
    role: 'USER_ROLE' | 'ADMIN_ROLE' | 'SUPERADMIN_ROLE'
  }
  token: string
}
