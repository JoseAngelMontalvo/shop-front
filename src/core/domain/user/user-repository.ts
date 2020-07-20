import { User } from './user'
import { DataSignup } from '../../../features/store/auth/domain/data-signup'

export interface UserRepository {
  Login(email: string, password: string): Promise<User>
  Signup(dataSignup: DataSignup): Promise<User>
}
