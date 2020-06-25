import React from 'react'
import { bind } from '../../utils/bind'
import styles from './header.module.css'
import { SearchHeader } from './search-header/search-header'
import { HeaderTools } from './header-tools/header-tools'
import { Link } from 'react-router-dom'
import { User } from '../../../features/store/user/domain/user'

const cx = bind(styles)
interface Props {
  user?: User | null
}
export const Header: React.FunctionComponent<Props> = ({ user }) => {
  return (
    <div className={cx('header')}>
      <Link to="/" className={cx('logo-ppal')} target={'_self'} title={'Ir a la Home'}>
        <i />
      </Link>
      <SearchHeader></SearchHeader>
      <HeaderTools user={user}></HeaderTools>
    </div>
  )
}
