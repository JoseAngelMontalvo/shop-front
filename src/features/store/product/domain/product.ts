import { Id } from '../../../../core/domain/id/id'

export interface Product {
  id: Id
  name: string
  category: string
  description: string
  price: number
  shopId: string
  state: 'activated' | 'deactivated'
  thumb: string
  urlImages: string[]
  userCreate: string
  highlight: boolean
  rating: number
  reviews: string[]
  location: number[]
}
