import React, { useState } from 'react'
import { bind } from '../../../../core/utils/bind'
import styles from './shopping-cart.module.css'
import { CartContext } from '../../../../core/components/main-template/main-template'
import { ShoppingCartItem } from '../shopping-cart-item/shopping-cart-item'

const cx = bind(styles)

export const ShoppingCart: React.FC = () => {
  return (
    <CartContext.Consumer>
      {({ products, incrementCount, decrementCount }) => (
        <div className={cx('shopping-cart-content')}>
          <table className={cx('shopping-cart-list')}>
            <thead>
              <tr>
                <th className={cx('th-thumb-product-list')}>Imagen</th>
                <th className={cx('th-price-product-list')}>Precio</th>
                <th className={cx('th-name-product-list')}>Nombre</th>
                <th className={cx('th-create-product-list')}>Cantidad</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <ShoppingCartItem
                  incrementCount={incrementCount}
                  decrementCount={decrementCount}
                  product={product}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </CartContext.Consumer>
  )
}
