import { ShoppingCartDto } from './shoppingCart-dto'
import { ShoppingCart } from '../domain/shoppingCart'

export class ShoppingCartDtoToShoppingCatMapper {
  map(ShoppingCartDto: ShoppingCartDto): ShoppingCart {
    //Validaciones(estas validaciones deberian estar en dominio)
    /*if(ProductDto.rating>5 ){
               ProductDto.rating = 5
            }*/
    return {
      userid: ShoppingCartDto.userid,
      products: ShoppingCartDto.products,
    }
  }
}
