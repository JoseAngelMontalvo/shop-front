import React from 'react'
import { bind } from '../../../../../core/utils/bind'
import styles from './admin-user-data.module.css'
import { Link } from 'react-router-dom'
import { Icon } from '../../../../../core/components/icons/icon'
import { Button } from '../../../../../core/components/buttons/button'
import { Input } from '../../../../../core/components/input/input'

const cx = bind(styles)

export const AdminUserData: React.FC = () => {
  return (
    <div className={cx('content-admin-user-data')}>
      <form className={cx('form-edit-profile')}>
        <fieldset>
          <legend>INFORMACIÓN SOBRE TU PERFIL</legend>
          <div className={cx('content-fieldset')}>
            <Input
              name={'Nombre'}
              htmlId={'name'}
              type={'text'}
              value={''}
              width={'100'}
              label
              required
            />

            <Input
              name={'Apellido'}
              htmlId={'lastName'}
              type={'text'}
              value={''}
              width={'100'}
              label
              required
            />

            <Input
              name={'Email'}
              htmlId={'email'}
              type={'email'}
              value={''}
              width={'100'}
              label
              required
            />
          </div>
        </fieldset>

        <Button theme={'primary'}>Save profile</Button>
      </form>
    </div>
  )
}
