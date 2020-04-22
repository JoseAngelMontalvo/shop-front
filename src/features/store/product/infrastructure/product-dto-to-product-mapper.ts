import { ProductDto } from './product-dto'
import { Product } from '../domain/product'

export class ProductDtoToProductMapper {
  map(ProductDto: ProductDto): Product {
    //Validaciones(estas validaciones deberian estar en dominio)
    /*if(ProductDto.rating>5 ){
           ProductDto.rating = 5
        }*/
    return {
      id: ProductDto._id,
      name: ProductDto.name,
      category: ProductDto.category,
      description: ProductDto.description,
      price: ProductDto.price,
      shopId: ProductDto.shopId,
      state: ProductDto.state,
      thumb: ProductDto.thumb,
      urlImages: ProductDto.urlImages,
      userCreate: ProductDto.userCreate,
      highlight: ProductDto.highlight,
      rating: ProductDto.rating,
      reviews: ProductDto.reviews,
      location: ProductDto.location.coordinates,
    }
  }
}
