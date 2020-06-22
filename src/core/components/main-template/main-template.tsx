import React, { createContext, useEffect, useReducer, useState } from 'react'
import { bind } from '../../utils/bind'
import styles from './main-template.module.css'
import { Header } from '../header/header'
import { Footer } from '../footer/ui/footer'
import { Category as CategoryModel } from '../categories-item/domain/category'
import { Query } from '../../../features/store/product/domain/query'
import { querySearchReducer, initialState } from './infrastructure/query-search-products-reducer'
import { Product as ProductModel } from '../../../features/store/product/domain/product'
import { useLocation, useParams } from 'react-router-dom'
import { ResultSearchProduct } from '../../../features/store/product/components/result-search-product/result-search-product'
const cx = bind(styles)

export const QueryContext = createContext<{
  keywords: string
  setKeyWords: (keywords: string) => void
  category: CategoryModel
  setCategory: (categoryButton: CategoryModel) => void
  rangePrice: number[]
  setRangePrice: (rangePrice: number[]) => void
  sort: string
  setSort: (sort: string) => void
  query: Query
}>({
  keywords: '',
  setKeyWords: () => {},
  category: {
    id: '',
    text: '',
    link: '',
    type: 'material-icons',
    content: '',
  },
  setCategory: () => {},
  rangePrice: [0, 5000],
  setRangePrice: () => {},
  sort: '',
  setSort: () => {},
  query: {
    keyWords: '',
    category: '',
    minPrice: 0,
    maxPrice: 5000,
    sort: '',
  },
})
interface Props {
  user?: string
}
export const MainTemplate: React.FC<Props> = ({ children, user }) => {
  const [state, dispatch] = useReducer(querySearchReducer, initialState)
  let location = useLocation()

  return (
    <QueryContext.Provider
      value={{
        keywords: state.keywords,
        setKeyWords: async (keyword) => {
          dispatch({
            type: 'setKeywords',
            payload: keyword,
          })
        },
        category: state.category,
        setCategory: (categoryButton) => {
          dispatch({ type: 'setCategory', payload: categoryButton })
        },
        rangePrice: state.rangePrice,
        setRangePrice: (rangePrice) => {
          dispatch({ type: 'setRangePrice', payload: rangePrice })
        },
        sort: state.sort,
        setSort: (sort) => {
          dispatch({ type: 'setSort', payload: sort })
        },
        query: state.query,
      }}
    >
      <div className={cx('main-template-content')}>
        <Header user={user} />
        {children}
        {location.pathname === `/product/search` && <ResultSearchProduct query={state.query} />}
        <Footer />
      </div>
    </QueryContext.Provider>
  )
}
