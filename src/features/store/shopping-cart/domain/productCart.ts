import { Id } from '../../../../core/domain/id/id'

export interface ProductCart {
  id: Id
  image: string
  price: number
  name: string
  quantity: number
}
