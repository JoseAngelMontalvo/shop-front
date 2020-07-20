import React, { useState, useReducer, useEffect } from 'react'
import { bind } from '../../../../../core/utils/bind'
import styles from './result-search-product.module.css'
import { Button } from '../../../../../core/components/buttons/button'
import { Icon } from '../../../../../core/components/icons/icon'
import { ProductCard } from '../../../../../core/components/product-card/product-card'
import { Category as CategoryModel } from '../../../../../core/components/categories-item/domain/category'
import { CategoriesItem } from '../../../../../core/components/categories-item/categories-item'
import { QueryContext } from '../../../../../core/components/main-template/main-template'
import { modalFilterReducer, initialState } from './infrastructure/modal-filter-reducer'
import { SliderRange } from '../../../../../core/components/slider-range/slider-range'
import { Query } from '../../domain/query'
import { ProductRepositoryFactory } from '../../infrastructure/product-repository-factory'
import { Product as ProductModel } from '../../domain/product'
import { useLocation, useHistory, Link } from 'react-router-dom'
import { CategoryRepositoryFactory } from '../../../../../core/components/categories-item/infrastructure/category-repository-factory'

const cx = bind(styles)
let sortBy: string

function useQuery() {
  return new URLSearchParams(useLocation().search)
}
interface Props {
  query: Query
}
export const ResultSearchProduct: React.FC<Props> = ({ query }) => {
  const [state, dispatch] = useReducer(modalFilterReducer, initialState)
  const [sortText, setSortText] = useState('')
  const [products, setProducts] = useState<ProductModel[]>([])
  const [categories, setCategories] = useState<CategoryModel[]>([])
  const history = useHistory()
  let qry: URLSearchParams = useQuery()

  const getProductsBySearch = async (query: string) => {
    const productRepository = ProductRepositoryFactory.get()
    const result = await productRepository.findBySearch(query)
    await setProducts(result)
  }

  const getCategories = async () => {
    const categoryRepository = CategoryRepositoryFactory.get()
    const result = await categoryRepository.findAll()
    await setCategories(result)
  }

  useEffect(() => {
    getProductsBySearch(qry.toString())
  }, [query])

  useEffect(() => {
    getCategories()
  }, [])

  switch (sortText) {
    case 'dist':
      sortBy = 'Distancia'
      break
    case 'rate':
      sortBy = 'Valoración media'
      break
    case 'lowprice':
      sortBy = 'Del más barato al más\n' + 'caro'
      break
    case 'highice':
      sortBy = 'Del más caro al más\n' + 'barato'
      break
    default:
      sortBy = 'Del más barato al más\n' + 'caro'
  }

  const closeModal: any = () => dispatch({ type: 'closeAll' })
  return (
    <QueryContext.Consumer>
      {({ category, rangePrice, setRangePrice, sort, setSort, query }) => (
        <>
          {setSortText(sort)}
          <div className={cx('result-search-content')}>
            <div className={cx('search-tools')}>
              {(state.category || state.price || state.short) && (
                <div
                  className={cx('overlay-filter-product')}
                  onClick={() => dispatch({ type: 'closeAll' })}
                >
                  {' '}
                </div>
              )}
              <div className={cx('filter-product-result')}>
                <div className={cx('filter-categories')}>
                  <Button
                    theme={'primary'}
                    icon={
                      <Icon
                        type={category.type}
                        content={category.content}
                        title="Select category"
                      />
                    }
                    className={'btn-model-window'}
                    onClick={() => dispatch({ type: 'openCategory' })}
                  >
                    {category.text}
                  </Button>
                  {state.category && (
                    <div className={cx('modal-filter-categories')}>
                      <p>Elige una categoría en la que buscar</p>
                      <ul className={cx('list-categories-filter')}>
                        {categories.map((category) => (
                          <CategoriesItem
                            key={category.id}
                            category={category}
                            close={closeModal}
                          />
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                <div className={cx('filter-range-price')}>
                  <Button
                    theme={'secondary'}
                    icon={
                      <Icon
                        type="material-icons"
                        content={'euro_symbol'}
                        title="Select price range"
                      />
                    }
                    className={'btn-model-window'}
                    onClick={() => dispatch({ type: 'openPrice' })}
                  >
                    {rangePrice[0] === 0 && rangePrice[1] === 5000 && 'Price'}
                    {(rangePrice[0] !== 0 || rangePrice[1] !== 5000) &&
                      `${rangePrice[0]} € - ${rangePrice[1]} €`}
                  </Button>
                  {state.price && (
                    <div className={cx('modal-filter-price')}>
                      <p>Elige un rango de precio</p>
                      <SliderRange query={query} changeRange={setRangePrice} />
                    </div>
                  )}
                </div>
              </div>

              <div className={cx('short-product-by')}>
                <Link
                  to="/"
                  target="_selft"
                  onClick={(event) => {
                    event.preventDefault()
                    dispatch({ type: 'openShort' })
                  }}
                >
                  <i className={cx('material-icons')}>unfold_more</i>Ordenado por:{' '}
                  <span>{sortBy}</span>
                </Link>
                {state.short && (
                  <div className={cx('modal-filter-short')}>
                    <p>Ordenar por:</p>
                    <ul>
                      <li>
                        <Link
                          to={'/'}
                          target={'_self'}
                          onClick={(event) => {
                            event.preventDefault()
                            setSort('dist')
                            history.push(
                              `/product/search?keyWord=${query.keyWords}&category=${category.text}&minPrice=${query.minPrice}&maxPrice=${query.maxPrice}&sort=dist`
                            )
                            dispatch({ type: 'closeAll' })
                          }}
                        >
                          <Icon type={'material-icons'} content={'room'} /> Distancia
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={'/'}
                          target={'_self'}
                          onClick={(event) => {
                            event.preventDefault()
                            setSort('rate')
                            history.push(
                              `/product/search?keyWord=${query.keyWords}&category=${category.text}&minPrice=${query.minPrice}&maxPrice=${query.maxPrice}&sort=rate`
                            )
                            dispatch({ type: 'closeAll' })
                          }}
                        >
                          <Icon type={'material-icons'} content={'star_half'} /> Valoración media
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={'/'}
                          target={'_self'}
                          onClick={(event) => {
                            event.preventDefault()
                            setSort('lowPrice')
                            history.push(
                              `/product/search?keyWord=${query.keyWords}&category=${category.text}&minPrice=${query.minPrice}&maxPrice=${query.maxPrice}&sort=lowPrice`
                            )
                            dispatch({ type: 'closeAll' })
                          }}
                        >
                          <Icon type={'material-icons'} content={'call_made'} /> Del más barato al
                          más caro
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={'/'}
                          target={'_self'}
                          onClick={(event) => {
                            event.preventDefault()
                            setSort('highPrice')
                            history.push(
                              `/product/search?keyWord=${query.keyWords}&category=${category.text}&minPrice=${query.minPrice}&maxPrice=${query.maxPrice}&sort=highPrice`
                            )
                            dispatch({ type: 'closeAll' })
                          }}
                        >
                          <Icon type={'material-icons'} content={'call_received'} /> Del más caro al
                          más barato
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
            <div className={cx('result-search-product-content')}>
              {products.map((product) => (
                <ProductCard product={product} />
              ))}
            </div>
          </div>
        </>
      )}
    </QueryContext.Consumer>
  )
}
