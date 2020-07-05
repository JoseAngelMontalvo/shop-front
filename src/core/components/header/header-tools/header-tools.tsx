import React, { useState } from 'react'
import { bind } from '../../../utils/bind'
import styles from './header-tools.module.css'
import { Button } from '../../buttons/button'
import { SwitchTheme } from '../../switch-theme/switch-theme'
import { Link, useHistory } from 'react-router-dom'
import { Icon } from '../../icons/icon'
import { User } from '../../../../features/store/user/domain/user'
import { CartContext } from '../../main-template/main-template'
import { ShoppingCart } from '../../../../features/store/shopping-cart/domain/shoppingCart'

const cx = bind(styles)

interface Props {
  user?: User | null
  logout?(): void
}
export const HeaderTools: React.FunctionComponent<Props> = ({ user, logout }) => {
  let history = useHistory()

  function goUrl(url: string) {
    history.push(url)
  }

  return (
    <CartContext.Consumer>
      {({ products, emptyShoppingCart }) =>
        user ? (
          <div className={cx('header-tools')}>
            <div className={cx('header-profile')}>
              <p className={cx('name-user-profile')}>{user && user.name}</p>
              <Button
                theme={'only-icon'}
                icon={<Icon type="material-icons" content={'person'} title="Profile tools" />}
              />
            </div>
            <Button
              className={cx('btn-cart-header')}
              theme={'only-icon'}
              icon={
                <Icon type="comercio-chino-icons" content={'icon_cart'} title="Shopping cart" />
              }
              onClick={() => goUrl('/shoppingcart')}
            >
              <span className={cx('count-items-cart')}>{products.length}</span>
            </Button>
            <Button
              theme={'secondary'}
              onClick={() => {
                logout && logout()
                emptyShoppingCart()
                goUrl('/')
              }}
            >
              Sign out
            </Button>
          </div>
        ) : (
          <div className={cx('header-tools')}>
            <Button
              className={cx('btn-cart-header')}
              theme={'only-icon'}
              icon={
                <Icon type="comercio-chino-icons" content={'icon_cart'} title="Shopping cart" />
              }
              onClick={() => goUrl('/shoppingcart')}
            >
              <span className={cx('count-items-cart')}>{products.length}</span>
            </Button>

            <SwitchTheme />

            <Button theme={'secondary'} onClick={() => goUrl('/signin')}>
              Sign in
            </Button>

            <Button theme={'primary'} onClick={() => goUrl('/signup')}>
              Sign up
            </Button>
          </div>
        )
      }
    </CartContext.Consumer>
  )
}
