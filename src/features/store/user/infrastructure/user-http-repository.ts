import { UserRepository } from '../domain/user-repository'
import { UserDto } from './user-dto'
import { UserDtoToUserMapper } from './user-dto-to-user-mapper'
import { User } from '../domain/user'
import Axios from 'axios'
import { DataSignup } from '../auth/signup/domain/data-signup'

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
}
