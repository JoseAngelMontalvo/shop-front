import { Id } from '../../../../core/domain/id/id'
import { ProductCart } from './productCart'

export interface ShoppingCartDB {
  userid: Id
  products: ProductCart[]
}
