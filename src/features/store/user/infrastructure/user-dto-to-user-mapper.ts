import { UserDto } from './user-dto'
import { User } from '../domain/user'

export class UserDtoToUserMapper {
  map(UserDto: UserDto): User {
    //Validaciones(estas validaciones deberian estar en dominio)
    /*if(UserDto.rating>5 ){
               UserDto.rating = 5
            }*/
    return {
      id: UserDto.userLogin.id,
      name: UserDto.userLogin.name,
      lastName: UserDto.userLogin.lastName,
      email: UserDto.userLogin.email,
      role: UserDto.userLogin.role,
      token: UserDto.token,
    }
  }
}
