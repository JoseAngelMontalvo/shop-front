import React from 'react'
import { bind } from '../../../../../core/utils/bind'
import styles from './admin-tools.module.css'
import { Link } from 'react-router-dom'
import { Icon } from '../../../../../core/components/icons/icon'

const cx = bind(styles)

export const AdminTools: React.FC = () => {
  return (
    <aside className={cx('tools-admin')}>
      <div className={cx('tools-admin-item')}>
        <Link to="#" target="_self">
          <Icon type={'material-icons'} content={'face'} />
          <p>Perfil</p>
        </Link>
      </div>
      <div className={cx('tools-admin-item')}>
        <Link to="#" target="_self">
          <Icon type={'material-icons'} content={'star'} />
          <p>Reviews</p>
        </Link>
      </div>
      <div className={cx('tools-admin-item')}>
        <Link to="#" target="_self">
          <Icon type={'material-icons'} content={'list'} />
          <p>Productos</p>
        </Link>
      </div>
      <div className={cx('tools-admin-item')}>
        <Link to="#" target="_self">
          <Icon type={'material-icons'} content={'store'} />
          <p>Tiendas</p>
        </Link>
      </div>
      <div className={cx('tools-admin-item')}>
        <Link to="#" target="_self">
          <Icon type={'material-icons'} content={'show_chart'} />
          <p>Estadisticas</p>
        </Link>
      </div>
    </aside>
  )
}
