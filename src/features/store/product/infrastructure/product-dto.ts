export interface ProductDto {
  _id: string
  name: string
  categoryName: string
  categoryId: number
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
  location: {
    type: string
    coordinates: number[]
  }
}
