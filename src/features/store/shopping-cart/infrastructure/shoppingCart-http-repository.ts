import { ShoppingCartRepository } from '../domain/shoppingCart-repository'
import { ShoppingCartDto } from './shoppingCart-dto'
import { ShoppingCartDtoToShoppingCatMapper } from './shoppingCart-dto-to-shoppingCart-mapper'
import { ShoppingCart } from '../domain/shoppingCart'
import Axios from 'axios'
import { ShoppingCartDB } from '../domain/shopingCartDB'

export class ShoppingCartHttpRepository implements ShoppingCartRepository {
  constructor(
    private readonly ShoppingCartDtoToShoppingCatMapper: ShoppingCartDtoToShoppingCatMapper
  ) {}

  async findById(id: string): Promise<ShoppingCart> {
    const result = await Axios.get<ShoppingCartDto>(
      `${process.env.REACT_APP_URL_API}/shoppingcart/getshoppingcart/${id}`
    )
    return this.ShoppingCartDtoToShoppingCatMapper.map(result.data)
  }
  async storeShoppingCart(shoppingCartDB: ShoppingCartDB): Promise<ShoppingCart> {
    const result = await Axios.post<ShoppingCartDto>(
      `${process.env.REACT_APP_URL_API}/shoppingcart/updateshoppingcart/`,
      shoppingCartDB
    )
    return this.ShoppingCartDtoToShoppingCatMapper.map(result.data)
  }
}
