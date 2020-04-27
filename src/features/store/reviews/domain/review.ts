export interface Review {
  _id: string
  userId: string
  productId: string
  range: string
  text: number
  state: 'ACTIVATED' | 'DEACTIVATED'
}
