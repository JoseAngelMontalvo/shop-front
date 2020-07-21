import { ProductCart } from '../domain/productCart'
import { Id } from '../../../../core/domain/id/id'
import { ShoppingCartDB } from '../domain/shopingCartDB'
import { ShoppingCartRepositoryFactory } from './shoppingCart-repository-factory'

export class ManageShoppingCart {
  async storeShoppingCart(productsList: ProductCart[], idUser?: Id) {
    if (!idUser || idUser === null) {
      //saveShoppingCartLocalStorage()
      return
    }
    try {
      const shoppingCartDB: ShoppingCartDB = { userid: idUser, products: productsList }
      const shoppingCartRepository = ShoppingCartRepositoryFactory.post()
      const result = await shoppingCartRepository.storeShoppingCart(shoppingCartDB)
      return
    } catch (error) {
      console.log(error)
    }
  }
  async updateShoppingCart() {}
}
