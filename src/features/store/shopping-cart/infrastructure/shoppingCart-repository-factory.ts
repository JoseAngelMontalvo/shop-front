import { ShoppingCartRepository } from '../domain/shoppingCart-repository'
import { ShoppingCartHttpRepository } from './shoppingCart-http-repository'
import { ShoppingCartDtoToShoppingCatMapper } from './shoppingCart-dto-to-shoppingCart-mapper'

export class ShoppingCartRepositoryFactory {
  static get(): ShoppingCartRepository {
    return new ShoppingCartHttpRepository(new ShoppingCartDtoToShoppingCatMapper())
  }
  static post(): ShoppingCartRepository {
    return new ShoppingCartHttpRepository(new ShoppingCartDtoToShoppingCatMapper())
  }
}
