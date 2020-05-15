import { Product } from './product'

export interface ProductRepository {
  findAll(): Promise<Product[]>
  findById(id: string): Promise<Product>
  findBySearch(query: string): Promise<Product[]>
}
