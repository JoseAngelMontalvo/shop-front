import React from 'react'
import { bind } from '../../../../core/utils/bind'
import styles from './profile.module.css'
import { Link } from 'react-router-dom'
import { Icon } from '../../../../core/components/icons/icon'
import { Button } from '../../../../core/components/buttons/button'

const cx = bind(styles)

export const Profile: React.FC = () => {
  return (
    <div className={cx('main-content-admin')}>
      <aside className={cx('tools-admin')}>
        <div className={cx('tools-admin-item profile-icon-aside')}>
          <Link to="#" target="_self">
            <Icon type={'material-icons'} content={'face'} />
            <p>Perfil</p>
          </Link>
        </div>
        <div className={cx('tools-admin-item reviews-icon-aside')}>
          <Link to="#" target="_self">
            <Icon type={'material-icons'} content={'star'} />
            <p>Reviews</p>
          </Link>
        </div>
        <div className={cx('tools-admin-item products-icon-aside')}>
          <Link to="#" target="_self">
            <Icon type={'material-icons'} content={'list'} />
            <p>Productos</p>
          </Link>
        </div>
        <div className={cx('tools-admin-item shops-icon-aside')}>
          <Link to="#" target="_self">
            <Icon type={'material-icons'} content={'store'} />
            <p>Tiendas</p>
          </Link>
        </div>
        <div className={cx('tools-admin-item estadistics-icon-aside')}>
          <Link to="#" target="_self">
            <Icon type={'material-icons'} content={'show_chart'} />
            <p>Estadisticas</p>
          </Link>
        </div>
      </aside>
      <div className={cx('content-admin')}>
        <form className={cx('form-edit-profile')}>
          <fieldset>
            <legend>INFORMACIÓN SOBRE TU PERFIL</legend>
            <div className={cx('content-fieldset')}>
              <div className={cx('item-form-100')}>
                <label className={cx('label-form')} htmlFor="name">
                  Nombre<span className={cx('color-primary')}>*</span>
                </label>
                <input className={cx('input-form')} type="text" name="name" id="name" />
              </div>
              <div className={cx('tem-form-100')}>
                <label className={cx('label-form')} htmlFor="lastname">
                  Apellido<span className={cx('color-primary')}>*</span>
                </label>
                <input className={cx('input-form')} type="text" name="lastname" id="lastname" />
              </div>
              <div className={cx('item-form-100')}>
                <label className={cx('label-form')} htmlFor="email">
                  Email<span className={cx('color-primary')}>*</span>
                </label>
                <input className={cx('input-form')} type="email" name="email" id="email" />
              </div>
              <div className={cx('link-edit-profile')}>
                <Link to="/" className={cx('edit-form')}>
                  <Icon type={'material-icons'} content={'edit'} /> Edit password
                </Link>
                <Link to="/" className={cx('edit-form')}>
                  <Icon type={'material-icons'} content={'edit'} /> Edit profile
                </Link>
              </div>
            </div>
          </fieldset>

          <Button theme={'primary'}>Save profile</Button>
        </form>
      </div>
    </div>
  )
}
