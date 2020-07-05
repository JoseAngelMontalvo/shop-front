import { Id } from '../../../../core/domain/id/id'
import { ProductCart } from './productCart'

export interface ShoppingCart {
  userid: Id
  products: ProductCart[]
}
