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
import { Product } from '../../../features/store/product/domain/product'
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
export const CartContext = createContext({
  products: [
    {
      id: '',
      image: '',
      price: 0,
      name: 'Loren ipsum',
      quantity: 1,
    },
  ],
  incrementCount: (id: Id) => {},
  decrementCount: (id: Id) => {},
  addProduct: (product: Product, count: number) => {},
})

interface Props {
  user?: User | null
}
export const MainTemplate: React.FC<Props> = ({ children, user }) => {
  const [state, dispatch] = useReducer(querySearchReducer, initialState)
  const [productsList, setProductList] = useState<ProductCart[]>([])
  const [quantity, setQuantity] = useState<number>(1)
  const [id, setId] = useState('')

  async function increment(id: Id) {
    setQuantity(quantity + 1)
    let newProductList: ProductCart[] = productsList

    await newProductList.map((product) => {
      if (product.id === id) {
        product.quantity = product.quantity + 1
      }
    })
    setProductList(newProductList)
  }
  async function decrement(id: Id) {
    setQuantity(quantity - 1)
    let newProductList: ProductCart[] = productsList

    await newProductList.map((product) => {
      if (product.id === id) {
        if (product.quantity !== 1) {
          product.quantity = product.quantity - 1
        } else {
          product.quantity = 1
        }
      }
    })
    setProductList(newProductList)
  }

  async function addProduct(product: Product, count: number) {
    let newProduct: ProductCart = {
      id: product.id,
      image: product.thumb,
      price: product.price,
      name: product.name,
      quantity: count,
    }
    console.log(product.id)
    if (productsList.length === 0) {
      setProductList([newProduct])
    } else {
      let newProductList: ProductCart[] = productsList
      let productExist = await productsList.filter((product) => product.id === newProduct.id)
      console.log(productExist)
      if (productExist.length !== 0) {
        await newProductList.map((product: ProductCart) => {
          if (product.id === newProduct.id) {
            console.log('igual ID')
            product.quantity = product.quantity + count
            setProductList(newProductList)
          }
        })
      } else {
        console.log('NO igual ID')
        setProductList([...productsList, newProduct])
      }
    }
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
            incrementCount: (id) => {
              increment(id)
            },
            decrementCount: (id) => {
              decrement(id)
            },
            addProduct: (product: Product, count) => {
              addProduct(product, count)
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
