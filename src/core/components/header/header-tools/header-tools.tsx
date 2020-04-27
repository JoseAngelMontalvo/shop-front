import React, { useState } from 'react'
import { bind } from '../../../utils/bind'
import styles from './header-tools.module.css'
import { Button } from '../../buttons/button'
import { SwitchTheme } from '../../switch-theme/switch-theme'
import { Link, useHistory } from 'react-router-dom'

const cx = bind(styles)

export const HeaderTools: React.FunctionComponent = () => {
  let history = useHistory()

  function goUrl(url: string) {
    history.push(url)
  }
  return (
    <div className={cx('header-tools')}>
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
