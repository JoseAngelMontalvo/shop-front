import { ShoppingCartRepository } from '../domain/shoppingCart-repository'
import { ShoppingCartDto } from './shoppingCart-dto'
import { ShoppingCartDtoToShoppingCatMapper } from './shoppingCart-dto-to-shoppingCart-mapper'
import { ShoppingCart } from '../domain/shoppingCart'
import { ProductCart } from '../domain/productCart'
import Axios from 'axios'
import { ShoppingCartDB } from '../domain/shopingCartDB'

export class ShoppingCartHttpRepository implements ShoppingCartRepository {
  constructor(
    private readonly ShoppingCartDtoToShoppingCatMapper: ShoppingCartDtoToShoppingCatMapper
  ) {}

  async findById(id: string): Promise<ShoppingCart> {
    const result = await Axios.get<ShoppingCartDto>(
      `https://comercio-chino-back.herokuapp.com/api/shoppingcart/getshoppingcart/${id}`
    )
    return this.ShoppingCartDtoToShoppingCatMapper.map(result.data)
  }
  async storeShoppingCart(shoppingCartDB: ShoppingCartDB): Promise<ShoppingCart> {
    const result = await Axios.post<ShoppingCartDto>(
      'https://comercio-chino-back.herokuapp.com/api/shoppingcart/updateshoppingcart/',
      shoppingCartDB
    )
    return this.ShoppingCartDtoToShoppingCatMapper.map(result.data)
  }
}
