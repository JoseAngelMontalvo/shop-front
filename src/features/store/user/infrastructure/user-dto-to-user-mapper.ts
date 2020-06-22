import { UserDto } from './user-dto'
import { User } from '../domain/user'

export class UserDtoToUserMapper {
  map(UserDto: UserDto): User {
    //Validaciones(estas validaciones deberian estar en dominio)
    /*if(UserDto.rating>5 ){
               UserDto.rating = 5
            }*/
    return {
      id: UserDto.user.id,
      name: UserDto.user.name,
      lastName: UserDto.user.lastName,
      email: UserDto.user.email,
      role: UserDto.user.role,
      token: UserDto.token,
    }
  }
}
