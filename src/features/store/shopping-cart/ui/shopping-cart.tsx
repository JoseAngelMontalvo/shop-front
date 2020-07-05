import React, { useState } from 'react'
import { bind } from '../../../../core/utils/bind'
import styles from './shopping-cart.module.css'
import { CartContext } from '../../../../core/components/main-template/main-template'
import { ShoppingCartItem } from '../shopping-cart-item/shopping-cart-item'
import { User } from '../../user/domain/user'
import { Icon } from '../../../../core/components/icons/icon'
import { ShoppingCart as ShoppingcartModel } from '../domain/shoppingCart'

const cx = bind(styles)
interface Props {
  user?: User | null
  shoppingcart?: ShoppingcartModel
}
export const ShoppingCart: React.FC<Props> = ({ user, shoppingcart }) => {
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
                  <th className={cx('th-actions')}></th>
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
            <Icon type="comercio-chino-icons" content={'icon_opps'} />
            <h2>Opss!!! Tu lista de la compra esta vacía</h2>
          </div>
        )
      }
    </CartContext.Consumer>
  )
}
