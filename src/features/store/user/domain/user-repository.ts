import { User } from './user'

export interface UserRepository {
  findByLogin(email: string, password: string): Promise<User>
  //createUser(user: User): Promise<User>
}
