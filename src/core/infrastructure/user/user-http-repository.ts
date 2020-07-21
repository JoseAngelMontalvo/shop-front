import { UserRepository } from '../../domain/user/user-repository'
import { UserDto } from './user-dto'
import { UserDtoToUserMapper } from './user-dto-to-user-mapper'
import { User } from '../../domain/user/user'
import Axios from 'axios'
import { DataSignup } from '../../../features/store/auth/domain/data-signup'

export class UserHttpRepository implements UserRepository {
  constructor(private readonly UserDtoToUserMapper: UserDtoToUserMapper) {}

  async Login(email: string, password: string): Promise<User> {
    const result = await Axios.post<UserDto>(`${process.env.REACT_APP_URL_API}/auth/login`, {
      email,
      password,
    })
    return this.UserDtoToUserMapper.map(result.data)
  }
  async Signup(dataSignup: DataSignup): Promise<User> {
    const result = await Axios.post<UserDto>(`${process.env.REACT_APP_URL_API}/auth/signup`, {
      ...dataSignup,
    })
    return this.UserDtoToUserMapper.map(result.data)
  }
  async UpdateUserProfile(user: User): Promise<User> {
    const result = await Axios.post<User>(`${process.env.REACT_APP_URL_API}/users/updateuser`, user)
    return result.data
  }
}
