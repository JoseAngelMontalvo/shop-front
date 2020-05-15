import { Category } from './category'

export interface CategoryRepository {
  findAll(): Promise<Category[]>
}
