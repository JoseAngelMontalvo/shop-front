import React, { useEffect, useState } from 'react'
import { bind } from '../../../../../core/utils/bind'
import styles from './showcase-home.module.css'
import { ProductCard } from '../../../../../core/components/product-card/product-card'
import { Product as ProductModel } from '../../../product/domain/product'
import { ProductRepositoryFactory } from '../../../product/infrastructure/product-repository-factory'

const cx = bind(styles)

export const ShowCaseHome: React.FunctionComponent = () => {
  const [products, setProducts] = useState<ProductModel[]>([])

  const getAllProducts = async () => {
    const productRepository = ProductRepositoryFactory.get()
    const products = await productRepository.findAll()
    await setProducts(products)
  }

  useEffect(() => {
    getAllProducts()
  }, [])

  console.log('HOLA' + products[0])

  return (
    <>
      <div className={cx('showcase')}>
        <h2>Ofertas de productos</h2>
        <p className={cx('slogan')}>
          En nuestro escaparate encontrarás los mejores productos de Madrid
        </p>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  )

  /*return(

    )*/
}
