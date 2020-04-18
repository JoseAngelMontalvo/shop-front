import {ProductRepository} from "../domain/product-repository";
import {ProductHttpRepository} from "./product-http-repository";
import {ProductDtoToProductMapper} from "./product-dto-to-product-mapper";

export class ProductRepositoryFactory {
    static get(): ProductRepository{
        return new ProductHttpRepository(new ProductDtoToProductMapper())
    }
}