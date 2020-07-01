import React, { useState } from 'react'
import { Button } from '../../../../core/components/buttons/button'
import { Icon } from '../../../../core/components/icons/icon'
import { bind } from '../../../../core/utils/bind'
import styles from './shopping-cart-item.module.css'
import { Id } from '../../../../core/domain/id/id'
import { ProductCart } from '../domain/productCart'
import { CartContext } from '../../../../core/components/main-template/main-template'

const cx = bind(styles)

interface Props {
  product: ProductCart
}
export const ShoppingCartItem: React.FunctionComponent<Props> = ({ product }) => {
  return (
    <CartContext.Consumer>
      {({ decrementCount, incrementCount }) => (
        <tr id={product.id} className={cx('product-item-list')}>
          <td className={cx('thumb-product-list')}>
            <img src={`/img/products/${product.image}`} alt="Imagen producto" />
          </td>
          <td className={cx('price-product-list')}>{product.price}</td>
          <td className={cx('name-product-list')}>{product.name}</td>
          <td className={cx('count-product-list')}>
            <div className={cx('quantity')}>
              <div className={cx('controls-quantity')}>
                <Button
                  theme={'only-icon'}
                  onClick={() => {
                    decrementCount(product.id)
                  }}
                  icon={<Icon type={'material-icons'} content={'remove'} />}
                />
                <input type="text" value={product.quantity} name="quantity" />
                <Button
                  theme={'only-icon'}
                  onClick={() => {
                    incrementCount(product.id)
                  }}
                  icon={<Icon type={'material-icons'} content={'add'} />}
                />
              </div>
            </div>
          </td>
        </tr>
      )}
    </CartContext.Consumer>
  )
}
