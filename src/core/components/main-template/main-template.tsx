import React, { createContext, useEffect, useReducer, useState } from 'react'
import { bind } from '../../utils/bind'
import styles from './main-template.module.css'
import { Header } from '../header/header'
import { Footer } from '../footer/ui/footer'
import { Category as CategoryModel } from '../../../features/store/home/domain/category'
import { Product as ProductModel } from '../../../features/store/product/domain/product'
import { ProductRepositoryFactory } from '../../../features/store/product/infrastructure/product-repository-factory'
import { Query } from '../../../features/store/product/domain/query'
import { querySearchReducer, initialState } from './infrastructure/query-search-products-reducer'
const cx = bind(styles)

export const QueryContext = createContext<{
  keywords: string
  setkeywords: (keywords: string) => void
  categoryButton: CategoryModel
  setCategoryButton: (categoryButton: CategoryModel) => void
  rangePrice: number[]
  setRangePrice: (rangePrice: number[]) => void
  sort: string
  setSort: (sort: string) => void
}>({
  keywords: '',
  setkeywords: () => {},
  categoryButton: {
    id: '',
    text: '',
    link: '',
    type: 'material-icons',
    content: '',
  },
  setCategoryButton: () => {},
  rangePrice: [0, 5000],
  setRangePrice: () => {},
  sort: '',
  setSort: () => {},
})

export const MainTemplate: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(querySearchReducer, initialState)

  const [products, setProducts] = useState<ProductModel[]>([])

  let query: Query = {
    keyWords: state.keywords,
    category: state.category.text,
    range: state.rangePrice,
    sort: state.sort,
  }

  const getProductsBySearch = async (query: Query) => {
    const productRepository = ProductRepositoryFactory.get()
    const result = await productRepository.findBySearch(query)
    await setProducts(result)
  }

  return (
    <QueryContext.Provider
      value={{
        keywords: state.keywords,
        setkeywords: (keyword) => {
          dispatch({ type: 'setKeywords', payload: keyword })
        },
        categoryButton: state.category,
        setCategoryButton: (categoryButton) => {
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
      }}
    >
      <div className={cx('main-template-content')}>
        <Header />
        {children}
        <p>KEYWORDS: {state.keywords}</p>
        <p>CATEGORIES: {state.category.text}</p>
        <p>RANGE:{state.rangePrice[0] + ',' + state.rangePrice[1]}</p>
        <p>SORT:{state.sort}</p>
        <Footer />
      </div>
    </QueryContext.Provider>
  )
}
