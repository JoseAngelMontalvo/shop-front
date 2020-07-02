import React, { useState } from 'react'
import { bind } from '../../../../core/utils/bind'
import styles from './shopping-cart.module.css'
import { CartContext } from '../../../../core/components/main-template/main-template'
import { ShoppingCartItem } from '../shopping-cart-item/shopping-cart-item'

const cx = bind(styles)

export const ShoppingCart: React.FC = () => {
  return (
    <CartContext.Consumer>
      {({ products }) =>
        products.length !== 0 ? (
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
                  <ShoppingCartItem product={product} />
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className={cx('empty-cart')}>
            <i className={cx('comercio-chino-icons')}></i>
            <h2>Opss!!! Tu lista de la compra esta vacía</h2>
          </div>
        )
      }
    </CartContext.Consumer>
  )
}
