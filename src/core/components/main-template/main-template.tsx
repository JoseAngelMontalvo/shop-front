import React, { createContext, useState } from 'react'
import { bind } from '../../utils/bind'
import styles from './main-template.module.css'
import { Header } from '../header/header'
import { Footer } from '../footer/ui/footer'
import { Category as CategoryModel } from '../../../features/store/home/domain/category'

const cx = bind(styles)

export const QueryContext = createContext<{
  keywords: string
  setkeywords: (keywords: string) => void
  categoryButton: string
  setCategoryButton: (cat: string) => void
}>({
  keywords: '',
  setkeywords: () => {},
  categoryButton: 'Todas las categorias',
  setCategoryButton: () => {},
})

export const MainTemplate: React.FC = ({ children }) => {
  const [stateKeyWords, setKeyWords] = useState('')
  const [stateCategory, setCategory] = useState('Todas las categorias')

  return (
    <QueryContext.Provider
      value={{
        keywords: stateKeyWords,
        setkeywords: (keyword) => {
          setKeyWords(keyword)
        },
        categoryButton: stateCategory,
        setCategoryButton: (cat) => {
          setCategory(cat)
        },
      }}
    >
      <div className={cx('main-template-content')}>
        <Header />
        {children}
        <p>KEYWORDS: {stateKeyWords}</p>
        <p>CATEGORIES: {stateCategory}</p>
        <Footer />
      </div>
    </QueryContext.Provider>
  )
}
