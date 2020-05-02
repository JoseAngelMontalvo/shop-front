import React, { createContext, useEffect, useState } from 'react'
import { bind } from '../../utils/bind'
import styles from './main-template.module.css'
import { Header } from '../header/header'
import { Footer } from '../footer/ui/footer'
import { Category as CategoryModel } from '../../../features/store/home/domain/category'
import { Product as ProductModel } from '../../../features/store/product/domain/product'
import { ProductRepositoryFactory } from '../../../features/store/product/infrastructure/product-repository-factory'
import { Query } from '../../../features/store/product/domain/query'
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
  const [stateKeyWords, setKeyWords] = useState('')
  const [stateCategory, setCategory] = useState<CategoryModel>({
    id: '10',
    text: 'Todas las categorias',
    link: '/',
    type: 'material-icons',
    content: 'category',
  })
  const [stateRangePrice, setRangePrice] = useState<number[]>([0, 5000])
  const [stateSort, setSort] = useState('lowprice')
  const [products, setProducts] = useState<ProductModel[]>([])

  let query: Query = {
    keyWords: stateKeyWords,
    category: stateCategory.text,
    range: stateRangePrice,
    sort: stateSort,
  }

  const getProductsBySearch = async (query: Query) => {
    const productRepository = ProductRepositoryFactory.get()
    const result = await productRepository.findBySearch(query)
    await setProducts(result)
  }

  return (
    <QueryContext.Provider
      value={{
        keywords: stateKeyWords,
        setkeywords: (keyword) => {
          setKeyWords(keyword)
        },
        categoryButton: stateCategory,
        setCategoryButton: (categoryButton) => {
          setCategory(categoryButton)
        },
        rangePrice: stateRangePrice,
        setRangePrice: (rangePrice) => {
          setRangePrice(rangePrice)
        },
        sort: stateSort,
        setSort: (sort) => {
          setSort(sort)
        },
      }}
    >
      <div className={cx('main-template-content')}>
        <Header />
        {children}
        <p>KEYWORDS: {stateKeyWords}</p>
        <p>CATEGORIES: {stateCategory.text}</p>
        <p>RANGE:{stateRangePrice[0] + ',' + stateRangePrice[1]}</p>
        <p>SORT:{stateSort}</p>
        <Footer />
      </div>
    </QueryContext.Provider>
  )
}
