import React, { createContext, useReducer, useState } from 'react'
import { bind } from '../../utils/bind'
import styles from './main-template.module.css'
import { Header } from '../header/header'
import { Footer } from '../footer/ui/footer'
import { Category as CategoryModel } from '../categories-item/domain/category'
import { Query } from '../../../features/store/product/domain/query'
import { querySearchReducer, initialState } from './infrastructure/query-search-products-reducer'
import { useLocation } from 'react-router-dom'
import { ResultSearchProduct } from '../../../features/store/product/components/result-search-product/result-search-product'
import { User } from '../../../features/store/user/domain/user'
import { ProductCart } from '../../../features/store/shopping-cart/domain/productCart'
import { Id } from '../../domain/id/id'
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

export const CartContext = createContext<{
  products: ProductCart[]
  incrementCount: () => void
  decrementCount: () => void
}>({
  products: [
    {
      id: '123456',
      image: 'ndsnkds',
      price: 44,
      name: 'Loren ipsum',
      quantity: 1,
    },
  ],
  incrementCount: () => {},
  decrementCount: () => {},
})

interface Props {
  user?: User | null
}
export const MainTemplate: React.FC<Props> = ({ children, user }) => {
  const [state, dispatch] = useReducer(querySearchReducer, initialState)
  const [productsList, setProductList] = useState<ProductCart[]>([
    {
      id: '1',
      image: 'ndsnkds',
      price: 44,
      name: 'Loren ipsum',
      quantity: 1,
    },
    {
      id: '2',
      image: 'ndsnkds',
      price: 44,
      name: 'Loren ipsum',
      quantity: 1,
    },
    {
      id: '3',
      image: 'ndsnkds',
      price: 44,
      name: 'Loren ipsum',
      quantity: 1,
    },
  ])
  const [quantity, setQuantity] = useState<number>(1)
  const [id, setId] = useState('')

  function increment(id: string) {
    console.log(id)
    setQuantity(quantity + 1)
    let newProductList: ProductCart[] = productsList

    newProductList.map((product) => {
      if (product.id === id) {
        console.log('HOLA')
      }
    })
    setProductList(newProductList)
  }
  function decrement(id: Id) {
    setQuantity(quantity - 1)
  }
  let location = useLocation()

  return (
    <>
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
        <CartContext.Provider
          value={{
            products: productsList,
            incrementCount: () => {
              increment(id)
            },
            decrementCount: () => {
              decrement(id)
            },
          }}
        >
          <div className={cx('main-template-content')}>
            <Header user={user} />
            {children}
            {location.pathname === `/product/search` && <ResultSearchProduct query={state.query} />}
            <Footer />
          </div>
        </CartContext.Provider>
      </QueryContext.Provider>
    </>
  )
}
