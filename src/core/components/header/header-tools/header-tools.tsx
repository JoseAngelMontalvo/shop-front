import React, { useState } from 'react'
import { bind } from '../../../utils/bind'
import styles from './header-tools.module.css'
import { Button } from '../../buttons/button'
import { SwitchTheme } from '../../switch-theme/switch-theme'
import { Link, useHistory } from 'react-router-dom'
import { Icon } from '../../icons/icon'

const cx = bind(styles)
interface Props {
  user?: string
}
export const HeaderTools: React.FunctionComponent<Props> = ({ user }) => {
  let history = useHistory()

  function goUrl(url: string) {
    history.push(url)
  }
  return (
    <div className={cx('header-tools')}>
      <div className={cx('header-profile')}>
        <p className={cx('name-user-profile')}>{user}</p>
        <Button
          theme={'only-icon'}
          icon={<Icon type="material-icons" content={'person'} title="Profile tools" />}
        />
      </div>
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
