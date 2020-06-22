import { ProductRepository } from '../domain/product-repository'
import { ProductDto } from './product-dto'
import { ProductDtoToProductMapper } from './product-dto-to-product-mapper'
import { Product } from '../domain/product'

export class ProductHttpRepository implements ProductRepository {
  constructor(private readonly ProductDtoToProductMapper: ProductDtoToProductMapper) {}

  async findAll(): Promise<Product[]> {
    const response = await fetch('http://localhost:3001/api/products/getallproducts')
    const data = (await response.json()) as ProductDto[]
    const result: Product[] = data.map((data) => this.ProductDtoToProductMapper.map(data))
    return result
  }

  async findById(id: string): Promise<Product> {
    const response = await fetch(`http://localhost:3001/api/products/getproductbyid/${id}`)
    const data = (await response.json()) as ProductDto
    const result: Product = this.ProductDtoToProductMapper.map(data)
    return result
  }

  async findBySearch(query: string): Promise<Product[]> {
    const response = await fetch(`http://localhost:3001/api/products/getproductsearch?${query}`)
    const data = (await response.json()) as ProductDto[]
    const result: Product[] = data.map((data) => this.ProductDtoToProductMapper.map(data))
    return result
  }
}
