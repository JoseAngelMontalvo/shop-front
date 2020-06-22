import { UserRepository } from '../domain/user-repository'
import { UserHttpRepository } from './user-http-repository'
import { UserDtoToUserMapper } from './user-dto-to-user-mapper'

export class UserRepositoryFactory {
  static post(): UserRepository {
    return new UserHttpRepository(new UserDtoToUserMapper())
  }
}
