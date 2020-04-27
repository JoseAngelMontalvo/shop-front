import React from 'react'
import { bind } from '../../utils/bind'
import styles from './header.module.css'
import { SearchHeader } from './search-header/search-header'
import { HeaderTools } from './header-tools/header-tools'
import { Link } from 'react-router-dom'

const cx = bind(styles)

export const Header: React.FunctionComponent = () => {
  return (
    <div className={cx('header')}>
      <Link to="/" className={cx('logo-ppal')} target={'_self'} title={'Ir a la Home'}>
        <i />
      </Link>
      <SearchHeader></SearchHeader>
      <HeaderTools></HeaderTools>
    </div>
  )
}
