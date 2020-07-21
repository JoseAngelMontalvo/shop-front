import React, { useState } from 'react'
import { bind } from '../../../../../core/utils/bind'
import styles from './admin-user-data.module.css'
import { Link } from 'react-router-dom'
import { Icon } from '../../../../../core/components/icons/icon'
import { Button } from '../../../../../core/components/buttons/button'
import { Input } from '../../../../../core/components/input/input'
import { User } from '../../../../../core/domain/user/user'

const cx = bind(styles)
interface Props {
  user: User | null
  saveProfile(userProfile: User): void
}
export const AdminUserData: React.FC<Props> = ({ user, saveProfile }) => {
  const [userProfile, setUserProfile] = useState<User | null>(user && user)

  function onchangeProfile(names: string, value: string) {
    console.log('pollas')
    userProfile && setUserProfile({ ...userProfile, [names]: value })
  }

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
              value={userProfile ? userProfile.name : ''}
              width={'100'}
              label
              required
              onChangeValue={onchangeProfile}
            />

            <Input
              name={'Apellido'}
              htmlId={'lastName'}
              type={'text'}
              value={userProfile ? userProfile.lastName : ''}
              width={'100'}
              label
              required
              onChangeValue={onchangeProfile}
            />

            <Input
              name={'Email'}
              htmlId={'email'}
              type={'email'}
              value={userProfile ? userProfile.email : ''}
              width={'100'}
              label
              required
              onChangeValue={onchangeProfile}
            />
          </div>
        </fieldset>

        <Button
          theme={'primary'}
          onClick={() => {
            userProfile && saveProfile(userProfile)
          }}
        >
          Save profile
        </Button>
        <ul>
          <li>{userProfile?.name}</li>
          <li>{userProfile?.lastName}</li>
          <li>{userProfile?.email}</li>
        </ul>
      </form>
    </div>
  )
}
