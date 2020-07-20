import React, { createContext, useEffect, useReducer, useState } from 'react'
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
import Axios from 'axios'
import { UserRepositoryFactory } from '../../../features/store/user/infrastructure/user-repository-factory'
import { ShoppingCartRepositoryFactory } from '../../../features/store/shopping-cart/infrastructure/shoppingCart-repository-factory'
import { ShoppingCartDB } from '../../../features/store/shopping-cart/domain/shopingCartDB'
import { ShoppingCart } from '../../../features/store/shopping-cart/domain/shoppingCart'
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
  deleteProduct: (id: Id) => {},
  emptyShoppingCart: () => {},
})

interface Props {
  user?: User | null
  logout?(): void
  shoppingcart: ShoppingCart
}
export const MainTemplate: React.FC<Props> = ({ children, user, logout, shoppingcart }) => {
  const [state, dispatch] = useReducer(querySearchReducer, initialState)

  const [productsList, setProductsList] = useState<ProductCart[]>(shoppingcart.products)
  const [switchUser, setSwitchUser] = useState<boolean>(false)
  const [quantity, setQuantity] = useState<number>(1)

  if (user && !switchUser) {
    getshoppingcart(user.id)
    setSwitchUser(true)
  }

  function emptyProducts() {
    console.log('Hola magete')
    setProductsList([])
  }
  async function getshoppingcart(id: string) {
    try {
      const shoppingCartRepository = ShoppingCartRepositoryFactory.get()
      const resultShoppingCart = await shoppingCartRepository.findById(id)
      setProductsList(resultShoppingCart.products)
    } catch (error) {
      return error
    }
  }

  async function increment(id: Id) {
    setQuantity(quantity + 1)
    let newProductList: ProductCart[] = productsList

    await newProductList.map((product) => {
      if (product.id === id) {
        product.quantity = product.quantity + 1
      }
    })
    setProductsList(newProductList)
    storeShoppingCart(productsList, user?.id)
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
    setProductsList(newProductList)
    storeShoppingCart(productsList, user?.id)
  }

  async function addProduct(product: Product, count: number) {
    let newProduct: ProductCart = {
      id: product.id,
      image: product.thumb,
      price: product.price,
      name: product.name,
      quantity: count,
    }
    if (productsList === null || productsList === undefined) {
      setProductsList([newProduct])
      storeShoppingCart(productsList, user?.id)
      console.log('kakafuty')
    } else {
      const newProductList: ProductCart[] = productsList
      const productExist = await productsList.filter((product) => product.id === newProduct.id)
      if (productExist.length !== 0) {
        await newProductList.map((product: ProductCart) => {
          if (product.id === newProduct.id) {
            product.quantity = product.quantity + count
            setProductsList(newProductList)
            storeShoppingCart(productsList, user?.id)
          }
        })
      } else {
        setProductsList([...productsList, newProduct])
        storeShoppingCart(productsList, user?.id)
      }
    }
  }

  async function deleteProduct(id: Id) {
    const newProductList: ProductCart[] = await productsList.filter((product) => product.id !== id)
    setProductsList(newProductList)
    storeShoppingCart(productsList, user?.id)
  }

  async function storeShoppingCart(productsList: ProductCart[], idUser?: Id) {
    if (!idUser || idUser === null) {
      //saveShoppingCartLocalStorage()
      return
    }
    try {
      const shoppingCartDB: ShoppingCartDB = { userid: idUser, products: productsList }

      const shoppingCartRepository = ShoppingCartRepositoryFactory.post()
      const result = await shoppingCartRepository.storeShoppingCart(shoppingCartDB)

      return
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    storeShoppingCart(productsList, user?.id)
  }, [productsList])

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
            deleteProduct: (id: Id) => {
              deleteProduct(id)
            },
            emptyShoppingCart: () => {
              emptyProducts()
            },
          }}
        >
          <div className={cx('main-template-content')}>
            <Header user={user} logout={logout} />
            {children}
            {location.pathname === `/product/search` && <ResultSearchProduct query={state.query} />}
            <div>
              <ul>
                {productsList.map((product) => (
                  <li>{product.name}</li>
                ))}
              </ul>
            </div>

            <Footer />
          </div>
        </CartContext.Provider>
      </QueryContext.Provider>
    </>
  )
}
