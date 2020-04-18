import React, {useState} from 'react'
import { bind } from '../../../utils/bind'
import styles from './header-tools.module.css'
import { Button } from '../../buttons/button'
import { Icon } from '../../icons/icon'

const cx = bind(styles)

export const HeaderTools: React.FunctionComponent = () => {


  function changeTheme(): void {
      const html: HTMLElement = document.getElementsByTagName('html')[0]
      if(html.classList.contains("dark")){
          html.classList.replace("dark", "light");
          setcontentIcon("brightness_3")
      }else{
          html.classList.replace("light", "dark");
          setcontentIcon("wb_sunny")
      }
  }


    const [contentIcon,setcontentIcon]= useState("wb_sunny")

    const iconTheme = <Icon type="material-icons" content={contentIcon} title="Light theme" />

    return (
    <div className={cx('header-tools')}>
      <Button onClick={changeTheme} theme={'only-icon'} icon={iconTheme} />
      <Button theme={'secondary'}>Sign in</Button>
      <Button theme={'primary'}>Sign up</Button>
    </div>
  )
}
