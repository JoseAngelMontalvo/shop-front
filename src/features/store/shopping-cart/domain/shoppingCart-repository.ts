import { ShoppingCart } from './shoppingCart'
import { ShoppingCartDB } from './shopingCartDB'

export interface ShoppingCartRepository {
  findById(id: string): Promise<ShoppingCart>
  storeShoppingCart(shoppingCartDB: ShoppingCartDB): Promise<ShoppingCart>
}
