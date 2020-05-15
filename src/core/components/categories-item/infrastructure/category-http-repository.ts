import { Category } from '../domain/category'
import { CategoryDto } from './category-dto'
import { CategoryDtoToCategoryMapper } from './categorydto-to-category-mapper'
import { CategoryRepository } from '../domain/category-repository'

export class CategoryHttpRepository implements CategoryRepository {
  constructor(private readonly CategoryDtoToCategoryMapper: CategoryDtoToCategoryMapper) {}

  async findAll(): Promise<Category[]> {
    const response = await fetch('http://localhost:3001/categories/getallcategories')
    const data = (await response.json()) as CategoryDto[]
    const result: Category[] = data.map((data) => this.CategoryDtoToCategoryMapper.map(data))
    return result
  }
}
