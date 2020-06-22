import { User } from './user'
import { DataSignup } from '../auth/signup/domain/data-signup'

export interface UserRepository {
  Login(email: string, password: string): Promise<User>
  Signup(dataSignup: DataSignup): Promise<User>
}
