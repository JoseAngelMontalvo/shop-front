import { CategoryRepository } from '../domain/category-repository'
import { CategoryHttpRepository } from './category-http-repository'
import { CategoryDtoToCategoryMapper } from './categorydto-to-category-mapper'

export class CategoryRepositoryFactory {
  static get(): CategoryRepository {
    return new CategoryHttpRepository(new CategoryDtoToCategoryMapper())
  }
}
