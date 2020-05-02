import { Product } from './product'
import { Query } from './query'

export interface ProductRepository {
  findAll(): Promise<Product[]>
  findById(id: string): Promise<Product>
  findBySearch(query: Query): Promise<Product[]>
}
