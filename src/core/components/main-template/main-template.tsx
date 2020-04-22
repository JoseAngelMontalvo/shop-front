import React, { FC, createContext, useState } from 'react'
import { bind } from '../../utils/bind'
import styles from './main-template.module.css'
import { Header } from '../header/header'
import { Footer } from '../footer/ui/footer'
import { ThemeContext } from '../main-content-theme/main-content-theme'

const cx = bind(styles)

export const QueryContext = createContext<{
  keywords: string
  setKeywords: (keywords: string) => void
}>({ keywords: '', setKeywords: () => {} })

export const MainTemplate: React.FC = ({ children }) => {
  const [keywords, setKeywords] = useState('')

  return (
    <QueryContext.Provider
      value={{
        keywords: keywords,
        setKeywords: (keyword) => {
          setKeywords(keyword)
        },
      }}
    >
      <div className={cx('main-template-content')}>
        <Header />
        <p>{`HELLO: ${keywords}`}</p>
        {children}
        <Footer />
      </div>
    </QueryContext.Provider>
  )
}
