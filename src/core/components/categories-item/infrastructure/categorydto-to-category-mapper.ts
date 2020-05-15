import { CategoryDto } from './category-dto'
import { Category } from '../domain/category'

export class CategoryDtoToCategoryMapper {
  map(CategoryDto: CategoryDto): Category {
    return {
      id: CategoryDto._id,
      text: CategoryDto.text,
      link: CategoryDto.link,
      type: CategoryDto.type,
      content: CategoryDto.content,
    }
  }
}
