import React from 'react'
import { bind } from '../../utils/bind'
import styles from './product-card.module.css'
import { CardRating } from '../card-rating/card-rating'
import { splitDescription } from './domain-infraestructura/methods'
import { Product } from '../../../features/store/product/domain/product'
import { Link } from 'react-router-dom'
const cx = bind(styles)

interface Props {
  product: Product
}

function splitTitle(title: string) {
  return title.substr(0, 16) + ' ...'
}

export const ProductCard: React.FunctionComponent<Props> = ({ product }) => {
  return (
    <div className={cx('product-card')}>
      <Link to={`/product/${product.id}`} target={'_self'}>
        <div className={cx('img-product')}>
          <img src={`/img/products/${product.thumb}`} alt="Imagen producto" />
        </div>
        <div className={cx('product-body-card')}>
          <h3 className={cx('title-product-card')}>{splitTitle(product.name)}</h3>
          <CardRating />
          <p className={cx('description-product-card')}>{splitDescription(product.description)}</p>
          <p className={cx('product-card-price')}>
            {product.price}
            <span>€</span>
          </p>
        </div>
      </Link>
    </div>
  )
}
