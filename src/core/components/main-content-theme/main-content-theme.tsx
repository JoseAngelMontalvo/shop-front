import React, { createContext, useState } from 'react'
import { bind } from '../../utils/bind'
import styles from './main-content-theme.module.css'

const cx = bind(styles)

export const ThemeContext = createContext<{
  theme: string
  icon: string
  setTheme: (theme: string) => void
}>({ theme: '', icon: '', setTheme: () => {} })

export const MainContentTheme: React.FC = ({ children }) => {
  const [contentIcon, setContentIcon] = useState('wb_sunny')
  const [stateTheme, setStateTheme] = useState('dark')
  return (
    <ThemeContext.Provider
      value={{
        theme: stateTheme,
        icon: contentIcon,
        setTheme: (theme) => {
          if (theme === 'light') {
            setStateTheme('dark')
            setContentIcon('wb_sunny')
          } else {
            setStateTheme('light')
            setContentIcon('brightness_3')
          }
        },
      }}
    >
      <ThemeContext.Consumer>
        {({ theme }) => <div className={cx('main-content-theme', `${theme}`)}>{children}</div>}
      </ThemeContext.Consumer>
    </ThemeContext.Provider>
  )
}
