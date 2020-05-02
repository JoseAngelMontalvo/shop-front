import { ProductRepository } from '../domain/product-repository'
import { ProductDto } from './product-dto'
import { ProductDtoToProductMapper } from './product-dto-to-product-mapper'
import { Product } from '../domain/product'
import { Query } from '../domain/query'

export class ProductHttpRepository implements ProductRepository {
  constructor(private readonly ProductDtoToProductMapper: ProductDtoToProductMapper) {}

  async findAll(): Promise<Product[]> {
    const response = await fetch('http://localhost:3001/products/getallproducts')
    const data = (await response.json()) as ProductDto[]
    const result: Product[] = data.map((data) => this.ProductDtoToProductMapper.map(data))
    return result
  }

  async findById(id: string): Promise<Product> {
    const response = await fetch(`http://localhost:3001/products/getproductbyid/${id}`)
    const data = (await response.json()) as ProductDto
    const result: Product = this.ProductDtoToProductMapper.map(data)
    return result
  }

  async findBySearch(query: Query): Promise<Product[]> {
    const response = await fetch(
      `http://localhost:3001/products/getproductsearch?keyword=${query.keyWords}&${query.category}${query.range}${query.sort}`
    )
    const data = (await response.json()) as ProductDto[]
    const result: Product[] = data.map((data) => this.ProductDtoToProductMapper.map(data))
    return result
  }
}
