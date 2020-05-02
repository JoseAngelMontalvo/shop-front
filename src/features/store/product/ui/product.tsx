import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { bind } from '../../../../core/utils/bind'
import styles from './product.module.css'
import { SliderProduct } from '../components/slider-product/slider-product'
import { FeaturesProduct } from '../components/features-product/features-product'
import { Product as ProductModel } from '../domain/product'
import { ProductRepositoryFactory } from '../infrastructure/product-repository-factory'

const cx = bind(styles)

export const Product: React.FunctionComponent = () => {
  const { id } = useParams()

  const [product, setProduct] = useState<ProductModel>()

  const getProduct = async (id: string) => {
    const productRepository = ProductRepositoryFactory.get()
    const result = await productRepository.findById(id)
    await setProduct(result)
  }
  useEffect(() => {
    if (id !== undefined) {
      getProduct(id)
    }
  }, [])

  if (product === undefined) {
    return <h1>Upps!!! ha ocurrido un error.</h1>
  } else {
    return (
      <div id={product.id} className={cx('main-content')}>
        <h1 className={cx('name-product-top none')}>Sofa 3 plazas cheslong cuero marrón</h1>
        <SliderProduct urlsImages={product.urlImages} />
        <FeaturesProduct product={product} />
      </div>
    )
  }
}
