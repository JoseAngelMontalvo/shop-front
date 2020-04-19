import React, {useState} from 'react'
import { bind } from '../../../utils/bind'
import styles from './header-tools.module.css'
import { Button } from '../../buttons/button'
import {SwitchTheme} from "../../switch-theme/switch-theme";

const cx = bind(styles)

export const HeaderTools: React.FunctionComponent = () => {

    return (
    <div className={cx('header-tools')}>
      <SwitchTheme/>
      <Button theme={'secondary'}>Sign in</Button>
      <Button theme={'primary'}>Sign up</Button>
    </div>
  )
}
