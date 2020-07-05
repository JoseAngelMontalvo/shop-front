import React from 'react'
import { bind } from '../../utils/bind'
import styles from './header.module.css'
import { SearchHeader } from './search-header/search-header'
import { HeaderTools } from './header-tools/header-tools'
import { Link } from 'react-router-dom'
import { User } from '../../../features/store/user/domain/user'
import { ShoppingCart } from '../../../features/store/shopping-cart/domain/shoppingCart'

const cx = bind(styles)
interface Props {
  user?: User | null
  logout?(): void
}
export const Header: React.FunctionComponent<Props> = ({ user, logout }) => {
  return (
    <div className={cx('header')}>
      <Link to="/" className={cx('logo-ppal')} target={'_self'} title={'Ir a la Home'}>
        <i />
      </Link>
      <SearchHeader></SearchHeader>
      <HeaderTools user={user} logout={logout} />
    </div>
  )
}
